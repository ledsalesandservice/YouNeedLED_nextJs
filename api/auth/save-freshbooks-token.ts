/**
 * POST /api/auth/save-freshbooks-token
 *
 * Receives a new FreshBooks refresh token (and optionally client credentials)
 * and persists them to Vercel environment variables using the VERCEL_API_TOKEN
 * that is already configured in this project.
 *
 * This allows the local OAuth script (scripts/freshbooks-auth-local.js) to
 * push a newly obtained token directly to Vercel without Derek needing to
 * touch the Vercel dashboard.
 *
 * Auth: Bearer <SYNC_SECRET>
 *
 * Body:
 *   { "refreshToken": "...", "clientId": "...", "clientSecret": "..." }
 *   (clientId and clientSecret are optional — only refreshToken is required)
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

interface UpdatePayload {
  refreshToken: string;
  clientId?: string;
  clientSecret?: string;
}

async function updateVercelEnvVar(
  vercelToken: string,
  projectId: string,
  envId: string,
  value: string
): Promise<boolean> {
  const res = await fetch(`https://api.vercel.com/v9/projects/${projectId}/env/${envId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${vercelToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value }),
  });
  return res.ok;
}

async function createOrUpdateVercelEnvByKey(
  vercelToken: string,
  projectId: string,
  key: string,
  value: string
): Promise<boolean> {
  // Try to update by listing env vars and finding by key name
  const listRes = await fetch(`https://api.vercel.com/v9/projects/${projectId}/env`, {
    headers: { Authorization: `Bearer ${vercelToken}` },
  });
  if (!listRes.ok) return false;

  const data = (await listRes.json()) as { envs: { id: string; key: string }[] };
  const existing = data.envs?.find((e) => e.key === key);

  if (existing) {
    return updateVercelEnvVar(vercelToken, projectId, existing.id, value);
  }

  // Create new env var
  const createRes = await fetch(`https://api.vercel.com/v9/projects/${projectId}/env`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${vercelToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key, value, type: "encrypted", target: ["production", "preview"] }),
  });
  return createRes.ok;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // Auth check
  const secret = process.env.SYNC_SECRET;
  const auth = req.headers.authorization;
  if (!secret || auth !== `Bearer ${secret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { refreshToken, clientId, clientSecret } = (req.body || {}) as Partial<UpdatePayload>;

  if (!refreshToken) {
    return res.status(400).json({ error: "refreshToken is required" });
  }

  const vercelToken = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;

  if (!vercelToken || !projectId) {
    return res.status(500).json({
      error: "VERCEL_API_TOKEN or VERCEL_PROJECT_ID not set — cannot auto-save",
      refreshToken, // Return the token so caller can save manually
    });
  }

  const results: Record<string, boolean> = {};

  // Always update the refresh token
  results.FRESHBOOKS_REFRESH_TOKEN = await createOrUpdateVercelEnvByKey(
    vercelToken,
    projectId,
    "FRESHBOOKS_REFRESH_TOKEN",
    refreshToken
  );

  // Update client credentials if provided
  if (clientId) {
    results.FRESHBOOKS_CLIENT_ID = await createOrUpdateVercelEnvByKey(
      vercelToken,
      projectId,
      "FRESHBOOKS_CLIENT_ID",
      clientId
    );
  }

  if (clientSecret) {
    results.FRESHBOOKS_CLIENT_SECRET = await createOrUpdateVercelEnvByKey(
      vercelToken,
      projectId,
      "FRESHBOOKS_CLIENT_SECRET",
      clientSecret
    );
  }

  const allOk = Object.values(results).every(Boolean);

  if (!allOk) {
    return res.status(500).json({
      error: "Some env vars failed to update",
      results,
      refreshToken,
    });
  }

  // Trigger a redeployment so the new env vars take effect
  let redeployed = false;
  try {
    const deployRes = await fetch(
      `https://api.vercel.com/v13/deployments?projectId=${projectId}`,
      { headers: { Authorization: `Bearer ${vercelToken}` } }
    );
    if (deployRes.ok) {
      const deployData = (await deployRes.json()) as {
        deployments?: { uid: string; target?: string }[];
      };
      const latest = deployData.deployments?.find((d) => d.target === "production");
      if (latest) {
        const redepRes = await fetch(`https://api.vercel.com/v13/deployments`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${vercelToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "youneedled-nextjs",
            deploymentId: latest.uid,
            target: "production",
          }),
        });
        redeployed = redepRes.ok;
      }
    }
  } catch {
    // Redeploy is best-effort
  }

  return res.status(200).json({
    ok: true,
    updated: results,
    redeployed,
    message: redeployed
      ? "Token saved and redeployment triggered — sync will work in ~1 minute."
      : "Token saved to Vercel. Trigger a redeployment from vercel.com for it to take effect.",
  });
}
// trigger: redeploy
