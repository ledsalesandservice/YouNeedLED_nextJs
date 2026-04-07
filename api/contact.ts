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

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "derek@youneedled.com";

  if (!resendApiKey) {
    console.error("RESEND_API_KEY not configured");
    return res.status(500).json({ error: "Email service not configured" });
  }

  // Use Resend's SMTP relay — no App Password needed, just the API key
  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    secure: true,
    auth: { user: "resend", pass: resendApiKey },
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
      from: "YouNeedLED Website <contact@youneedled.com>",
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
