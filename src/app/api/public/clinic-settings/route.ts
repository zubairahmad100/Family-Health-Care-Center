import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/apiResponse";
import { getClinicSettings } from "@/lib/clinicSettings";

export async function GET(_req: NextRequest) {
  try {
    const settings = await getClinicSettings();
    if (!settings) {
      return apiError("No clinic settings found", 404);
    }
    return apiSuccess(settings);
  } catch (e) {
    console.error("Public clinic settings error:", e);
    return apiError("Failed to load clinic settings", 500);
  }
}

