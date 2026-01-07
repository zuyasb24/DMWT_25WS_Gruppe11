import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { auth } = await import("@/app/lib/auth");
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as { replyId?: unknown };
    const replyId = Number(body.replyId);

    if (!Number.isFinite(replyId)) {
      return NextResponse.json({ error: "replyId is required" }, { status: 400 });
    }

    const result = await sql`
      UPDATE forum_replies
      SET likes = COALESCE(likes, 0) + 1
      WHERE id = ${replyId}
      RETURNING likes;
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Reply not found" }, { status: 404 });
    }

    return NextResponse.json({ likes: result.rows[0].likes });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to like reply";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}