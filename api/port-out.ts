import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    fullName, company, email, phone,
    currentCarrier, accountNumber, accountPin,
    serviceAddress, phoneNumbers, notes,
  } = req.body as Record<string, string>;

  if (!fullName || !email || !phone || !currentCarrier || !accountNumber || !accountPin || !serviceAddress || !phoneNumbers) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.CONTACT_TO_EMAIL || "info@youneedled.com";

  if (!smtpUser || !smtpPass) {
    console.error("SMTP credentials not configured");
    return res.status(500).json({ error: "Email service not configured" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: smtpUser, pass: smtpPass },
  });

  const text = `
New Port-Out Request from youneedled.com/client-portal

CONTACT
  Name:    ${fullName}
  Company: ${company || "N/A"}
  Email:   ${email}
  Phone:   ${phone}

CARRIER DETAILS
  Current Carrier:  ${currentCarrier}
  Account Number:   ${accountNumber}
  Account PIN:      ${accountPin}
  Service Address:  ${serviceAddress}

NUMBERS TO PORT
${phoneNumbers}

NOTES
${notes || "None"}
`.trim();

  try {
    await transporter.sendMail({
      from: `"YouNeedLED Website" <${smtpUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `Port-Out Request — ${fullName}`,
      text,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Failed to send port-out email:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
