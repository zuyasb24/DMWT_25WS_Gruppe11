// GET /api/tutorials/ratings?keys=...
// Returns aggregated rating statistics (average + count) for a list of tutorial keys.
// Public endpoint used to display rating summaries in the tutorials overview.
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const keysParam = url.searchParams.get("keys") || "";

  const keys = keysParam
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  if (keys.length === 0) {
    return NextResponse.json({});
  }

  // Build placeholders $1, $2, $3 etc to query an arbitrary number of tutorial keys
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");

  const result = await sql.query<{
    tutorial_key: string;
    avg: number;
    count: number;
  }>(
    `
    SELECT
      tutorial_key,
      COALESCE(AVG(rating), 0)::float AS avg,
      COUNT(*)::int AS count
    FROM tutorial_ratings
    WHERE tutorial_key IN (${placeholders})
    GROUP BY tutorial_key
    `,
    keys
  );

  // result.rows is the array
  const map: Record<string, { avg: number; count: number }> = {};
  for (const r of result.rows) {
    map[r.tutorial_key] = { avg: r.avg, count: r.count };
  }

  // keys with no ratings still appear
  for (const k of keys) {
    if (!map[k]) map[k] = { avg: 0, count: 0 };
  }

  return NextResponse.json(map);
}