// Stub - Phase 1.2
import { NextResponse } from "next/server";

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}
export function apiError(
  error: string,
  status = 400,
  fieldErrors?: Record<string, string[]>
) {
  return NextResponse.json({ success: false, error, fieldErrors }, { status });
}
