import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sql = getDb();
    const flagId = parseInt(params.id);
    const body = await request.json();

    const { notes, explanation } = body;

    const result = await sql`
      UPDATE flags
      SET notes = COALESCE(${notes ?? null}, notes),
          explanation = COALESCE(${explanation ?? null}, explanation)
      WHERE id = ${flagId}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: "Flag not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating flag:", error);
    return NextResponse.json({ error: "Failed to update flag" }, { status: 500 });
  }
}
