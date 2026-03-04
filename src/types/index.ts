// Stub - Phase 1.2
export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type ServiceType = "general" | "cosmetic" | "implants" | "invisalign" | "emergency" | "cleaning" | "whitening";
export interface Patient {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
  clinic_id: string;
}
export interface Appointment {
  id: string;
  patient_id: string;
  service_type: ServiceType;
  appointment_date: string;
  appointment_time: string;
  status: AppointmentStatus;
  notes?: string;
  created_at: string;
  clinic_id: string;
  patients?: Patient;
}
export interface TimeSlot {
  time: string;
  available: boolean;
}
export interface BusinessHours {
  [day: string]: { open: string; close: string; closed: boolean };
}
export interface ClinicSettings {
  id: string;
  clinic_name: string;
  tagline?: string;
  address?: string;
  phone?: string;
  email?: string;
  google_maps_url?: string;
  business_hours: BusinessHours;
  notification_email: boolean;
}
export interface ApiResponse<T = null> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}
