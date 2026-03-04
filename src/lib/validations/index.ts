import { z } from "zod";

const sanitize = (v: string) =>
  v
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();

export const SERVICE_TYPES = [
  "general",
  "cosmetic",
  "implants",
  "invisalign",
  "emergency",
  "cleaning",
  "whitening",
] as const;

export const SERVICE_LABELS: Record<string, string> = {
  general: "General Dentistry",
  cosmetic: "Cosmetic Dentistry",
  implants: "Dental Implants",
  invisalign: "Invisalign",
  emergency: "Emergency Care",
  cleaning: "Teeth Cleaning",
  whitening: "Teeth Whitening",
};

export const BookingFormSchema = z.object({
  full_name: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-zA-Z\s'\-\.]+$/, "Letters only")
    .transform(sanitize),
  email: z.string().email().max(255).toLowerCase().transform(sanitize),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{9,14}$/, "Valid phone required")
    .transform((v) => v.replace(/\s/g, "")),
  service_type: z.enum(SERVICE_TYPES),
  appointment_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine(
      (d) => new Date(d) >= new Date(new Date().toDateString()),
      "Must be future date"
    )
    .refine((d) => new Date(d).getDay() !== 0, "Closed Sundays"),
  appointment_time: z
    .string()
    .regex(/^([0-1]?\d|2[0-3]):[0-5]\d$/)
    .refine((t) => {
      const [h] = t.split(":").map(Number);
      return h >= 9 && h < 17;
    }, "9am–5pm only"),
  notes: z
    .string()
    .max(500)
    .optional()
    .transform((v) => (v ? sanitize(v) : undefined)),
  consent: z.boolean().refine((v) => v === true, "Agreement required"),
  website: z.string().max(0).optional(),
  clinic_id: z.string().uuid().optional(),
});

export type BookingFormInput = z.infer<typeof BookingFormSchema>;

export const AppointmentUpdateSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
  notes: z
    .string()
    .max(1000)
    .optional()
    .transform((v) => (v ? sanitize(v) : undefined)),
  appointment_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  appointment_time: z
    .string()
    .regex(/^([0-1]?\d|2[0-3]):[0-5]\d$/)
    .optional(),
});

export const PatientUpdateSchema = z.object({
  full_name: z.string().min(2).max(100).transform(sanitize).optional(),
  email: z.string().email().max(255).toLowerCase().optional(),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/).optional(),
});

export const ClinicSettingsSchema = z.object({
  clinic_name: z.string().min(2).max(200).transform(sanitize),
  address: z.string().max(500).optional().transform((v) => (v ? sanitize(v) : undefined)),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/).optional(),
  email: z.string().email().optional(),
  business_hours: z.record(
    z.string(),
    z.object({
      open: z.string(),
      close: z.string(),
      closed: z.boolean(),
    })
  ),
});

export const LoginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(8).max(100),
});

export const ChatMessageSchema = z.object({
  message: z.string().min(1).max(500).transform(sanitize),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(1000),
      })
    )
    .max(10)
    .optional()
    .default([]),
});

export const SlotsQuerySchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine(
      (d) => new Date(d) >= new Date(new Date().toDateString()),
      "Past dates invalid"
    ),
});
