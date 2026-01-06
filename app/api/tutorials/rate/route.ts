import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { auth } from "@/app/lib/auth";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }


  const userId = Number((session.user as { id?: string }).id);
  if (!Number.isFinite(userId)) {
    return NextResponse.json({ error: "User id missing in session" }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  const tutorialKey = String(body?.tutorialKey ?? "").trim();
  const rating = Number(body?.rating);

  if (!tutorialKey) {
    return NextResponse.json({ error: "tutorialKey is required" }, { status: 400 });
  }

  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "rating must be 1-5" }, { status: 400 });
  }

  await sql.query(
    `
    INSERT INTO tutorial_ratings (tutorial_key, user_id, rating)
    VALUES ($1, $2, $3)
    ON CONFLICT (tutorial_key, user_id)
    DO UPDATE SET rating = EXCLUDED.rating, updated_at = now()
    `,
    [tutorialKey, userId, rating]
  );

  const stats = await sql.query<{ avg: number; count: number }>(
    `
    SELECT COALESCE(AVG(rating), 0)::float AS avg,
           COUNT(*)::int AS count
    FROM tutorial_ratings
    WHERE tutorial_key = $1
    `,
    [tutorialKey]
  );

  return NextResponse.json({
    avg: stats.rows[0]?.avg ?? 0,
    count: stats.rows[0]?.count ?? 0,
  });
}