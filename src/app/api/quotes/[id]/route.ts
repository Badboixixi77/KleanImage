/**
 * GET /api/quotes/[id]  — Get quote detail (admin).
 * PATCH /api/quotes/[id] — Update quote status/note (admin).
 * Built in TASK-29.
 */
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}

export async function PATCH() {
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
