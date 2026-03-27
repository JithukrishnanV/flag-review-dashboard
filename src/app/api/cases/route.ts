import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const sql = getDb();
    const cases = await sql`
      SELECT c.id, c.case_number,
        COUNT(f.id) AS total_flags,
        COUNT(CASE WHEN f.status = 'REVIEWED' THEN 1 END) AS reviewed_flags
      FROM cases c
      LEFT JOIN flags f ON f.case_id = c.id
      GROUP BY c.id, c.case_number
      ORDER BY c.case_number
    `;
    return NextResponse.json(cases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    return NextResponse.json({ error: "Failed to fetch cases" }, { status: 500 });
  }
}
