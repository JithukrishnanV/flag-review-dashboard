import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sql = getDb();
    const flagId = parseInt(params.id);
    const body = await request.json();
    const { action, notes } = body;

    if (!action || !["CONFIRMED", "REJECTED"].includes(action)) {
      return NextResponse.json(
        { error: "Action must be CONFIRMED or REJECTED" },
        { status: 400 }
      );
    }

    const newStatus = action === "CONFIRMED" ? "REVIEWED" : "REJECTED";
    await sql`
      UPDATE flags
      SET status = ${newStatus},
          notes = COALESCE(${notes ?? null}, notes),
          reviewed_at = NOW()
      WHERE id = ${flagId}
    `;

    await sql`
      INSERT INTO flag_actions (flag_id, action, notes)
      VALUES (${flagId}, ${action}, ${notes ?? ""})
    `;

    const updated = await sql`SELECT * FROM flags WHERE id = ${flagId}`;

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Error performing action:", error);
    return NextResponse.json({ error: "Failed to perform action" }, { status: 500 });
  }
}
