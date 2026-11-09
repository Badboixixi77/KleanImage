/**
 * GET /api/export-quotes — Export filtered quotes as CSV (admin, owner only).
 * Built in TASK-30.
 */
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
