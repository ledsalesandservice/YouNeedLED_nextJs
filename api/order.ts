import type { VercelRequest, VercelResponse } from "@vercel/node";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { customerName, phone, orderType, deliveryAddress, items, total, restaurant } = req.body;

  if (!customerName || !phone || !orderType || !items) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const orderNumber = `${(restaurant || "piccini").toUpperCase()}-${Date.now()}`;

    await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        restaurant_id: restaurant || "piccini",
        order_number: orderNumber,
        order_type: orderType,
        order_status: "pending",
        total_amount: total || 0,
        special_instructions: deliveryAddress ? `Delivery to: ${deliveryAddress}` : null,
        order_source: "voice_agent",
      }),
    });

    return res.status(200).json({
      success: true,
      orderNumber,
      message: `Order ${orderNumber} received for ${customerName}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to submit order" });
  }
}
