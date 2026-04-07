import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, service, message } = req.body as Record<string, string>;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "derek@youneedled.com";
  // Use verified sender domain once youneedled.com is verified in Resend dashboard.
  // Until then, onboarding@resend.dev works without domain verification.
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "YouNeedLED Website <onboarding@resend.dev>";

  if (!resendApiKey) {
    console.error("RESEND_API_KEY not configured");
    return res.status(500).json({ error: "Email service not configured" });
  }

  const resend = new Resend(resendApiKey);

  const subject = `New Contact Form Submission — ${service ? service.toUpperCase() : "General Inquiry"}`;
  const text = `
New contact form submission from youneedled.com

Name:    ${name}
Email:   ${email}
Phone:   ${phone || "Not provided"}
Service: ${service || "Not specified"}

Message:
${message}
`.trim();

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }

  return res.status(200).json({ ok: true });
}
