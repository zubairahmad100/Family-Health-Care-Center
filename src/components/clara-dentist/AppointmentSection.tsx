"use client";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { formatTime } from "@/lib/utils/format";
import { BookingFormSchema, SERVICE_LABELS, SERVICE_TYPES, type BookingFormInput } from "@/lib/validations";
import type { BusinessHours, ClinicSettings, TimeSlot } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, CalendarIcon, Loader2, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AppointmentSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [modal, setModal] = useState<{ type: "success" | "error"; title: string; message: string } | null>(null);
  const [businessHours, setBusinessHours] = useState<BusinessHours | null>(null);
  const [clinic, setClinic] = useState<ClinicSettings | null>(null);

  useEffect(() => {
    // Load hours from public settings API used by the dashboard
    fetch("/api/public/clinic-settings")
      .then((res) => res.json())
      .then((data) => {
        const settings = data?.data as ClinicSettings | null;
        if (settings?.business_hours) {
          setBusinessHours(settings.business_hours as BusinessHours);
        }
        setClinic(settings);
      })
      .catch(() => {
        setBusinessHours(null);
        setClinic(null);
      });
  }, []);

  const form = useForm<BookingFormInput>({
    resolver: zodResolver(BookingFormSchema) as never,
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      service_type: "general",
      appointment_date: "",
      appointment_time: "",
      notes: "",
      consent: false,
      website: "",
    },
  });

  const watchDate = form.watch("appointment_date");
  const watchTime = form.watch("appointment_time");

  useEffect(() => {
    if (!watchDate) {
      setSlots([]);
      setSelectedDate(undefined);
      return;
    }
    const d = new Date(watchDate);
    setSelectedDate(d);
    setLoadingSlots(true);
    fetch(`/api/slots?date=${watchDate}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setSlots(data);
        else if (data?.data) setSlots(data.data);
        else setSlots([]);
      })
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [watchDate]);

  async function onSubmit(values: BookingFormInput) {
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      // Try to parse JSON but don't blow up if it fails during error conditions
      try {
        await res.json();
      } catch (e) {
        // empty catch block
      }

      if (res.status === 201) {
        setModal({
          type: "success",
          title: "Appointment booked",
          message: "Your appointment is confirmed. We’ll send a confirmation shortly.",
        });
        form.reset({
          full_name: "",
          email: "",
          phone: "",
          service_type: "general",
          appointment_date: "",
          appointment_time: "",
          notes: "",
          consent: false,
          website: "",
        });
        setSelectedDate(undefined);
        setSlots([]);
        return;
      }
      if (res.status === 409) {
        setModal({
          type: "error",
          title: "Slot unavailable",
          message: "That time was just taken. Please choose another available time.",
        });
        return;
      }
      if (res.status === 429) {
        setModal({
          type: "error",
          title: "Too many requests",
          message: "You’ve made too many attempts. Please wait a little and try again.",
        });
        return;
      }
      setModal({
        type: "error",
        title: "Something went wrong",
        message: "We couldn’t book your appointment. Please call the clinic to schedule.",
      });
    } catch {
      setModal({
        type: "error",
        title: "Network error",
        message: "We couldn’t reach the server. Please check your connection or call the clinic.",
      });
    }
  }

  const clinicPhone = clinic?.phone ?? "+92 306 4206007";

  return (
    <section className="py-24 bg-(--color-special-smiles-primary) relative overflow-hidden" data-booking-section="true">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start ">

        {/* Working Hours Area - sticky to bottom of section on desktop only */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-black/10">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center">
              <Calendar size={28} className="text-(--color-special-smiles-primary)" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Working Hours</h3>
              <p className="text-gray-500">Book your visit at your convenience.</p>
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            {businessHours ? (
              <>
                {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => {
                  const h = businessHours[day];
                  const label =
                    !h || h.closed
                      ? "Closed"
                      : `${h.open} - ${h.close}`;
                  return (
                    <li
                      key={day}
                      className={`flex justify-between items-center text-gray-700 font-medium ${day === "saturday" || day === "sunday" ? "font-bold" : ""
                        }`}
                    >
                      <span className={day === "saturday" || day === "sunday" ? "text-gray-900 capitalize" : "capitalize"}>
                        {day}
                      </span>
                      {label === "Closed" ? (
                        <span className="bg-red-50 text-red-500 px-3 py-1 rounded-md text-sm">
                          Closed
                        </span>
                      ) : (
                        <span className="text-[var(--color-special-smiles-primary)]">
                          {label}
                        </span>
                      )}
                    </li>
                  );
                })}
              </>
            ) : (
              <>
                <li className="flex justify-between items-center text-gray-700 font-medium">
                  <span>Monday</span>
                  <span className="text-[var(--color-special-smiles-primary)]">8:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between items-center text-gray-700 font-medium">
                  <span>Tuesday</span>
                  <span className="text-[var(--color-special-smiles-primary)]">8:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between items-center text-gray-700 font-medium">
                  <span>Wednesday</span>
                  <span className="text-[var(--color-special-smiles-primary)]">8:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between items-center text-gray-700 font-medium">
                  <span>Thursday</span>
                  <span className="text-[var(--color-special-smiles-primary)]">8:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between items-center text-gray-700 font-medium">
                  <span>Friday</span>
                  <span className="text-[var(--color-special-smiles-primary)]">8:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between items-center font-bold">
                  <span className="text-gray-900">Saturday - Sunday</span>
                  <span className="bg-red-50 text-red-500 px-3 py-1 rounded-md text-sm">Closed</span>
                </li>
              </>
            )}
          </ul>

          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Phone className="text-[var(--color-special-smiles-primary)]" size={24} />
            </div>
            <div>
              <div className="text-gray-500 text-sm font-bold uppercase tracking-wider">Call Now</div>
              <a
                href={`tel:${clinicPhone}`}
                className=" gap-3 py-2 text-xl font-bold font-(family-name:--font-body) text-canvas/60 hover:text-canvas"
              >

                {clinicPhone}
              </a>
            </div>

          </div>
        </div>

        {/* Appointment Form */}
        <div className="text-white space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Start Your Dental <br /> Care Today
            </h2>
            <p className="text-blue-50/90 text-lg max-w-lg leading-relaxed">
              Ready to get that perfect smile? Schedule an appointment with our expert team and experience dental care like never before.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 1 }}
            className="bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-sm"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <input
                  {...form.register("website")}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute left-[-9999px] top-0 w-px h-px opacity-0"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-blue-50/90 font-medium">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <input
                            className="w-full bg-white border-0 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-white/50 transition-all placeholder:text-gray-400 font-medium"
                            placeholder="John Doe"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-200 text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-blue-50/90 font-medium">
                          Email
                        </FormLabel>
                        <FormControl>
                          <input
                            type="email"
                            className="w-full bg-white border-0 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-white/50 transition-all placeholder:text-gray-400 font-medium"
                            placeholder="john@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-200 text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-blue-50/90 font-medium">
                          Phone
                        </FormLabel>
                        <FormControl>
                          <input
                            className="w-full bg-white border-0 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-white/50 transition-all placeholder:text-gray-400 font-medium"
                            placeholder="(555) 000-0000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-200 text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="service_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-blue-50/90 font-medium">
                          Service
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full bg-white border-0 text-gray-900 text-sm rounded-xl px-4 py-6 focus:ring-2 focus:ring-white/50 transition-all font-medium">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SERVICE_TYPES.map((t) => (
                              <SelectItem key={t} value={t}>
                                {SERVICE_LABELS[t]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-200 text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="appointment_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-50/90 font-medium">
                        Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start border-0 bg-white text-gray-900 hover:bg-gray-50 text-sm font-medium rounded-xl px-4 py-6"
                          >
                            <CalendarIcon className="mr-2 h-5 w-5 text-[var(--color-special-smiles-primary)]" />
                            {field.value
                              ? format(
                                new Date(field.value + "T12:00:00"),
                                "PPP"
                              )
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white rounded-2xl shadow-xl border-0 text-gray-900">
                          <CalendarUI
                            mode="single"
                            selected={
                              field.value
                                ? new Date(field.value + "T12:00:00")
                                : undefined
                            }
                            onSelect={(d) =>
                              d && field.onChange(format(d, "yyyy-MM-dd"))
                            }
                            disabled={(d) =>
                              d < new Date(new Date().setHours(0, 0, 0, 0)) ||
                              d.getDay() === 0 || d.getDay() === 6
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-red-200 text-sm" />
                    </FormItem>
                  )}
                />

                <AnimatePresence>
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <label className="text-blue-50/90 font-medium block">
                        Available Times
                      </label>
                      {loadingSlots ? (
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                          {Array(10)
                            .fill(0)
                            .map((_, i) => (
                              <Skeleton
                                key={i}
                                className="h-11 rounded-xl bg-white/20"
                              />
                            ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                          {slots.map((slot) => (
                            <button
                              key={slot.time}
                              type="button"
                              disabled={!slot.available}
                              onClick={() =>
                                form.setValue(
                                  "appointment_time",
                                  slot.time,
                                  { shouldValidate: true }
                                )
                              }
                              className={
                                !slot.available
                                  ? "py-3 rounded-xl bg-white/5 text-white/30 text-xs font-medium cursor-not-allowed line-through"
                                  : watchTime !== slot.time
                                    ? "py-3 rounded-xl border border-white/30 text-white text-xs font-semibold hover:bg-white hover:text-[var(--color-special-smiles-primary)] transition-all duration-200"
                                    : "py-3 rounded-xl bg-white text-[var(--color-special-smiles-primary)] text-xs font-bold shadow-lg shadow-black/10 scale-105 transition-all"
                              }
                            >
                              {formatTime(slot.time)}
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel className="text-blue-50/90 font-medium">
                          Notes
                        </FormLabel>
                        <span className="text-xs text-blue-50/60 font-medium">
                          {(field.value?.length ?? 0)}/500
                        </span>
                      </div>
                      <FormControl>
                        <textarea
                          rows={3}
                          className="w-full bg-white border-0 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-white/50 transition-all resize-none placeholder:text-gray-400 font-medium"
                          placeholder="Any special requests or details..."
                          maxLength={500}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-200 text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-3 bg-white/10 p-4 rounded-xl mt-6">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5 border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-[var(--color-special-smiles-primary)]"
                        />
                      </FormControl>
                      <FormLabel className="text-sm text-white/90 font-medium leading-relaxed cursor-pointer">
                        I agree to be contacted for appointment confirmation.{" "}
                        <Link
                          href="/privacy-policy"
                          className="text-white underline font-bold"
                        >
                          Privacy Policy
                        </Link>
                      </FormLabel>
                      <FormMessage className="text-red-200 text-sm" />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full mt-6 bg-white text-[var(--color-special-smiles-primary)] hover:bg-gray-50 font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Book Appointment
                    </>
                  )}
                </button>
              </form>
            </Form>
          </motion.div>

        </div>

      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className={`text-lg font-semibold mb-2 ${modal.type === "success" ? "text-emerald-700" : "text-red-600"}`}>
              {modal.title}
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              {modal.message}
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="px-4 py-2 text-sm rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
