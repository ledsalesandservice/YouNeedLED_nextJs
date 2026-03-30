import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, service, message } = req.body as Record<string, string>;

  if (!name || !email || !message) {
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

  try {
    await transporter.sendMail({
      from: `"YouNeedLED Website" <${smtpUser}>`,
      to: toEmail,
      replyTo: email,
      subject,
      text,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
