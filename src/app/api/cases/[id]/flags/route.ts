import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sql = getDb();
    const caseId = parseInt(params.id);

    const flags = await sql`
      SELECT id, case_id, title, category, status,
             budget_screen_info, case_file_info, explanation,
             notes, reviewed_at, created_at
      FROM flags
      WHERE case_id = ${caseId}
      ORDER BY created_at
    `;

    return NextResponse.json(flags);
  } catch (error) {
    console.error("Error fetching flags:", error);
    return NextResponse.json({ error: "Failed to fetch flags" }, { status: 500 });
  }
}
