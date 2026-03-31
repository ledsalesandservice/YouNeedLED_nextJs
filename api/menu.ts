import type { VercelRequest, VercelResponse } from "@vercel/node";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const restaurant = (req.query.restaurant as string) || "piccini";

  try {
    const catRes = await fetch(
      `${SUPABASE_URL}/rest/v1/menu_categories?restaurant_id=eq.${restaurant}&is_active=eq.true&order=display_order`,
      { headers: { apikey: SUPABASE_ANON_KEY!, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
    );
    const categories = await catRes.json();

    const itemRes = await fetch(
      `${SUPABASE_URL}/rest/v1/menu_items?restaurant_id=eq.${restaurant}&order=category_id`,
      { headers: { apikey: SUPABASE_ANON_KEY!, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
    );
    const items = await itemRes.json();

    const menu = categories.map((cat: any) => ({
      category: cat.name,
      items: items
        .filter((item: any) => item.category_id === cat.id)
        .map((item: any) => ({
          name: item.name,
          description: item.description,
          price: item.base_price,
          available: item.is_available,
        })),
    }));

    return res.status(200).json({ restaurant, menu });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch menu" });
  }
}
