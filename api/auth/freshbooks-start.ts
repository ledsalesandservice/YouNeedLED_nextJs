/**
 * FreshBooks OAuth start — Vercel serverless function
 * GET /api/auth/freshbooks-start
 *
 * Redirects Derek to FreshBooks to authorize the app.
 * After authorization, FreshBooks redirects to /api/auth/freshbooks-callback.
 *
 * Visit https://youneedled.com/api/auth/freshbooks-start to re-authorize.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.FRESHBOOKS_CLIENT_ID;
  if (!clientId) {
    return res.status(500).send("<h1>FRESHBOOKS_CLIENT_ID not set in Vercel environment variables</h1>");
  }

  // Always use the canonical domain — VERCEL_URL is a deployment-specific preview URL
  // and will not match the redirect URI registered in the FreshBooks developer portal.
  const redirectUri = encodeURIComponent("https://youneedled.com/api/auth/freshbooks-callback");

  const authUrl =
    `https://my.freshbooks.com/service/auth/oauth/authorize` +
    `?client_id=${clientId}` +
    `&response_type=code` +
    `&redirect_uri=${redirectUri}`;

  return res.redirect(302, authUrl);
}
