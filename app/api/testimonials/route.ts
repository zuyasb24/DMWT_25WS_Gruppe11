import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET: Fetch all testimonials
export async function GET() {
  try {
    console.log("Fetching testimonials...");
    const result = await sql`SELECT * FROM testimonials ORDER BY id DESC;`;
    console.log("Testimonials fetched:", result.rows);
    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// POST: Add a new testimonial
export async function POST(request: Request) {
  try {
    console.log("Parsing request body...");
    const body = await request.json();
    const { name, role, testimonial, rating } = body;

    console.log("Received:", { name, role, testimonial, rating });

    if (!name || !testimonial) {
      return NextResponse.json(
        { error: "Name and testimonial are required" },
        { status: 400 }
      );
    }

    console.log("Inserting testimonial...");
    const result = await sql`
      INSERT INTO testimonials (name, role, testimonial, rating)
      VALUES (${name}, ${role || null}, ${testimonial}, ${rating || 5})
      RETURNING *;
    `;

    console.log("Testimonial inserted:", result.rows);
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error: any) {
    console.error("POST Error:", error);
    console.error("Error details:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to add testimonial" },
      { status: 500 }
    );
  }
}

