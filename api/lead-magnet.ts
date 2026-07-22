import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const LED_CRM_BASE = "https://ledservice.manus.space/api/sync";
const LED_CRM_KEY = process.env.LED_CRM_API_KEY || "sk-ledcrm-2026-serviceagent-prod-x9K4mP2nQ8vL5wR7";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    firstName,
    lastName,
    businessName,
    email,
    phone,
  } = req.body as Record<string, string>;

  // Validate required fields
  if (!businessName || !email) {
    return res.status(400).json({ error: "Business name and email are required." });
  }

  const contactName = [firstName, lastName].filter(Boolean).join(" ") || businessName;

  // ── 1. Create client in LED CRM ─────────────────────────────────────────────
  let crmClientId: number | null = null;
  try {
    const crmRes = await fetch(`${LED_CRM_BASE}/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": LED_CRM_KEY,
      },
      body: JSON.stringify({
        propertyName: businessName,
        contactName: contactName,
        contactEmail: email,
        contactPhone: phone || "",
        city: "",
        state: "NJ",
        zip: "",
      }),
    });

    if (crmRes.ok) {
      const crmData = await crmRes.json() as { success: boolean; data?: { id?: number } };
      if (crmData.success && crmData.data?.id) {
        crmClientId = crmData.data.id;
      }
    } else {
      const errText = await crmRes.text();
      console.error("LED CRM create client error:", crmRes.status, errText);
    }
  } catch (err) {
    console.error("LED CRM fetch error:", err);
  }

  // ── 2. Send notification email to Derek ─────────────────────────────────────
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "derek@youneedled.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "YouNeedLED Website <onboarding@resend.dev>";

  if (resendApiKey) {
    const resend = new Resend(resendApiKey);
    const crmNote = crmClientId
      ? `✅ CRM Client Created — ID: ${crmClientId}`
      : `⚠️ CRM auto-create failed — add manually`;

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `🚨 NEW LEAD: ${businessName} downloaded the Security Checklist`,
      text: `
NEW LEAD — Security Audit Checklist Download
=============================================
Business:  ${businessName}
Contact:   ${contactName}
Email:     ${email}
Phone:     ${phone || "Not provided"}

${crmNote}

Source: Free Security Audit Checklist — youneedled.com/free-security-audit
Suggested follow-up: "Hey ${firstName || contactName}, saw you downloaded our safety audit. Did you have any questions about the 4K low-lux requirements for your NJ property?"
`.trim(),
    }).catch((err: unknown) => console.error("Resend error:", err));
  }

  // ── 3. Return success — client gets the PDF download URL ────────────────────
  return res.status(200).json({
    ok: true,
    downloadUrl: "/downloads/commercial-security-audit-checklist.pdf",
    crmClientId,
  });
}
