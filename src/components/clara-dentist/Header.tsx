"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import FhccglaLogo from './FhccglaLogo';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { BusinessHours, ClinicSettings } from '@/types';

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [businessHours, setBusinessHours] = useState<BusinessHours | null>(null);
  const [clinic, setClinic] = useState<ClinicSettings | null>(null);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
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

  const openingHoursText = (() => {
    if (!businessHours) {
      return "Opening Hours: Mon - Fri: 9:00 am - 5:00 pm";
    }
    const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    const sample = businessHours["monday"];
    if (sample && !sample.closed) {
      const fmt = (t: string) => {
        const [h, m] = t.split(":").map(Number);
        const period = h >= 12 ? "pm" : "am";
        const h12 = h % 12 || 12;
        return `${h12}:${String(m).padStart(2, "0")}${period}`;
      };
      return `Mon - Fri: ${fmt(sample.open)} - ${fmt(sample.close)}`;
    }
    return "Opening Hours: See contact for details";
  })();

  const aboutLinks = [
    { label: "Team", href: "/about-us/team" },
    { label: "Our Facility", href: "/about-us/facility" },
    { label: "Directions", href: "/about-us/directions" },
  ];
  const serviceLinks = [
    { label: "Our Patients", href: "/services/our-patients" },
    { label: "First Visit & Treatment", href: "/services/first-visit-treatment" },
    { label: "New Patient Information", href: "/services/new-patient-information" },
    { label: "Forms", href: "/services/forms" },
    { label: "PA Caregiver Resources", href: "/services/pa-caregiver-resources" },
    { label: "NJ Caregiver Resources", href: "/services/nj-caregiver-resources" },
    { label: "Special Outreach Services", href: "/services/special-outreach-services" },
  ];

  return (
    <>
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        {/* Top Bar - FHCCGLA brand color */}
        <div className="bg-[var(--color-special-smiles-primary)] text-white py-2 text-sm hidden md:block">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex space-x-6">
              <span className="flex items-center gap-2">
                <MapPin size={14} /> {clinic?.address ?? "2301 E. Allegheny Ave, Suite 120, Philadelphia, PA 19134"}
              </span>
              <span className="flex items-center gap-2">
                <Mail size={14} /> {clinic?.email ?? "info@fhccgla.com"}
              </span>
            </div>
            <div className="flex space-x-4">
              <span>{openingHoursText}</span>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <FhccglaLogo className="h-14 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 font-medium">
            <Link
              href="/"
              className={`transition-colors ${isActive("/") ? "text-[var(--color-special-smiles-primary)]" : "text-gray-700 hover:text-[var(--color-special-smiles-primary)]"
                }`}
            >
              Home
            </Link>
            <div className="relative group">
              <span
                className={`inline-flex items-center cursor-pointer transition-colors ${pathname.startsWith("/about-us") ? "text-[var(--color-special-smiles-primary)]" : "text-gray-700 hover:text-[var(--color-special-smiles-primary)]"
                  }`}
              >
                About Us
              </span>
              <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[180px]">
                  <Link href="/about-us" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[var(--color-special-smiles-primary)]">Overview</Link>
                  {aboutLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[var(--color-special-smiles-primary)]">{l.label}</Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group">
              <span
                className={`inline-flex items-center cursor-pointer transition-colors ${pathname.startsWith("/services") ? "text-[var(--color-special-smiles-primary)]" : "text-gray-700 hover:text-[var(--color-special-smiles-primary)]"
                  }`}
              >
                Services
              </span>
              <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[220px]">
                  <Link href="/services" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[var(--color-special-smiles-primary)]">Overview</Link>
                  {serviceLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[var(--color-special-smiles-primary)] text-sm">{l.label}</Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/faqs" className={`transition-colors ${pathname === "/faqs" ? "text-[var(--color-special-smiles-primary)]" : "text-gray-700 hover:text-[var(--color-special-smiles-primary)]"}`}>FAQs</Link>
            <Link href="/blog" className={`transition-colors ${pathname.startsWith("/blog") ? "text-[var(--color-special-smiles-primary)]" : "text-gray-700 hover:text-[var(--color-special-smiles-primary)]"}`}>News</Link>
            <Link
              href="/contact"
              className={`transition-colors ${isActive("/contact") ? "text-[var(--color-special-smiles-primary)]" : "text-gray-700 hover:text-[var(--color-special-smiles-primary)]"
                }`}
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              type="button"
              onClick={() => {
                const el = document.querySelector("#booking, [data-booking-section='true']");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="bg-[var(--color-special-smiles-primary)] hover:bg-[var(--color-special-smiles-primary-dark)] text-white px-6 py-2.5 rounded-md font-medium transition-colors flex items-center gap-2"
            >
              <Phone size={18} /> Book Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-800 p-2 -m-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-[100] flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 -m-2 text-gray-800"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col justify-center px-8 gap-6"
            >
              <Link href="/" onClick={() => setMobileOpen(false)} className={`text-left font-bold text-3xl ${isActive("/") ? "text-[var(--color-special-smiles-primary)]" : "text-gray-900 hover:text-[var(--color-special-smiles-primary)]"}`}>Home</Link>
              <div className="space-y-2">
                <span className="block font-bold text-2xl text-gray-500">About Us</span>
                <Link href="/about-us" onClick={() => setMobileOpen(false)} className="block text-xl text-gray-700 hover:text-[var(--color-special-smiles-primary)]">Overview</Link>
                {aboutLinks.map((l) => (
                  <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block text-xl text-gray-700 hover:text-[var(--color-special-smiles-primary)] pl-2">{l.label}</Link>
                ))}
              </div>
              <div className="space-y-2">
                <span className="block font-bold text-2xl text-gray-500">Services</span>
                <Link href="/services" onClick={() => setMobileOpen(false)} className="block text-xl text-gray-700 hover:text-[var(--color-special-smiles-primary)]">Overview</Link>
                {serviceLinks.map((l) => (
                  <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block text-xl text-gray-700 hover:text-[var(--color-special-smiles-primary)] pl-2">{l.label}</Link>
                ))}
              </div>
              <Link href="/faqs" onClick={() => setMobileOpen(false)} className={`text-left font-bold text-3xl ${pathname === "/faqs" ? "text-[var(--color-special-smiles-primary)]" : "text-gray-900 hover:text-[var(--color-special-smiles-primary)]"}`}>FAQs</Link>
              <Link href="/blog" onClick={() => setMobileOpen(false)} className={`text-left font-bold text-3xl ${pathname.startsWith("/blog") ? "text-[var(--color-special-smiles-primary)]" : "text-gray-900 hover:text-[var(--color-special-smiles-primary)]"}`}>News</Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className={`text-left font-bold text-3xl ${isActive("/contact") ? "text-[var(--color-special-smiles-primary)]" : "text-gray-900 hover:text-[var(--color-special-smiles-primary)]"}`}>Contact</Link>
            </motion.nav>

            <div className="p-8">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  const el = document.querySelector("#booking, [data-booking-section='true']");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="w-full bg-[var(--color-special-smiles-primary)] hover:bg-[var(--color-special-smiles-primary-dark)] text-white font-medium text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Phone size={20} /> Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
