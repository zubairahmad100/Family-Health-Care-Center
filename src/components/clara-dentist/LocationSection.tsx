"use client";

import type { ClinicSettings } from "@/types";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";

const DEFAULT_GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6193.276485232816!2d-75.11610120642095!3d39.98977699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c821e36c2aa1%3A0xc239fb91ce1ebb00!2sSpecial%20Smiles%2C%20Ltd!5e1!3m2!1sen!2s!4v1772559499221!5m2!1sen!2s";

export default function LocationSection() {
  const [settings, setSettings] = useState<ClinicSettings | null>(null);

  useEffect(() => {
    fetch("/api/public/clinic-settings")
      .then((res) => res.json())
      .then((data) => {
        const s = data?.data as ClinicSettings | null;
        setSettings(s);
      })
      .catch(() => setSettings(null));
  }, []);

  const address =
    settings?.address ?? "1234 Hollywood Blvd, Suite 200, Los Angeles, CA 90028";
  const phone = settings?.phone ?? "+92 306 4206007";
  const phoneHref = `tel:${settings?.phone ?? "+923064206007"}`;
  const email = settings?.email ?? "info@fhccgla.com";
  const emailHref = `mailto:${settings?.email ?? "info@fhccgla.com"}`;
  const googleMapsUrl =
    settings?.google_maps_url ?? "https://www.google.com/maps";
  const hoursStr = settings?.business_hours
    ? (() => {
      const m = settings.business_hours.monday;
      if (m?.closed) return "See contact for hours";
      return "Mon – Fri 7:00 AM – 3:30 PM";
    })()
    : "Monday – Friday 7:00 AM – 3:30 PM";

  const contactItems: {
    label: string;
    value: string;
    icon: typeof MapPin | typeof Phone | typeof Mail | typeof Clock;
    href?: string;
  }[] = [
      { label: "Address", value: address, icon: MapPin },
      { label: "Phone", value: phone, icon: Phone, href: phoneHref },
      { label: "Email", value: email, icon: Mail, href: emailHref },
      { label: "Hours", value: hoursStr, icon: Clock },
    ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <span className="text-[var(--color-special-smiles-primary)] font-bold tracking-wider uppercase text-sm mb-4 block">Find Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10">
            We&apos;re easy<br />to find.
          </h2>
          <div className="space-y-8">
            {contactItems.map(({ label, value, icon: Icon, href }) => (
              <div key={label} className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-[var(--color-special-smiles-primary)]">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-1">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-lg font-medium text-gray-900 hover:text-[var(--color-special-smiles-primary)] transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-lg font-medium text-gray-900">
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-10 border-t border-gray-200">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold text-[var(--color-special-smiles-primary)] hover:gap-4 transition-all"
            >
              Get Directions
              <ArrowRight size={20} />
            </a>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden h-[400px] lg:h-[600px] bg-white shadow-2xl shadow-black/5 border border-gray-100 relative">
          <iframe
            title="Clinic location map"
            src={DEFAULT_GOOGLE_MAPS_EMBED}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
