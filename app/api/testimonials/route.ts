import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type ApiError = {
  message: string;
};

// GET: Fetch all testimonials
export async function GET() {
  try {
    console.log("Fetching testimonials...");
    const result = await sql`SELECT * FROM testimonials ORDER BY id DESC;`;
    console.log("Testimonials fetched:", result.rows);
    return NextResponse.json(result.rows);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch testimonials";
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}