"use client";

import type { ClinicSettings } from '@/types';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import FhccglaLogo from './FhccglaLogo';
import { useEffect, useState } from 'react';

export default function Footer() {
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

  const address = settings?.address ?? "1234 Hollywood Blvd, Suite 200\nLos Angeles, CA 90028";
  const phone = settings?.phone ?? "+92 306 4206007";
  const email = settings?.email ?? "info@fhccgla.com";

  return (
    <footer className="bg-gray-900 text-gray-300">

      {/* Newsletter Section */}
      <div className="bg-[var(--color-special-smiles-primary)] text-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold mb-2">Stay Updated With Our Latest News</h2>
            <p className="text-blue-50/80">Subscribe to our newsletter for dental tips, clinic updates, and exclusive offers.</p>
          </div>
          <div className="w-full md:w-auto flex-1 max-w-md relative">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-white/10 border border-white/20 text-white rounded-xl py-4 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-blue-50/50"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-white text-[var(--color-special-smiles-primary)] hover:bg-gray-100 rounded-lg px-4 flex items-center justify-center transition-colors shadow-lg">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Info */}
          <div className="space-y-6 lg:pr-8">
            <Link href="/" className="inline-block shrink-0">
              <FhccglaLogo className="h-10 w-auto" />
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Serving the Greater Los Angeles area, providing comprehensive and compassionate oral healthcare for patients of all ages and needs.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--color-special-smiles-primary)] hover:text-white transition-all text-gray-400">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--color-special-smiles-primary)] hover:text-white transition-all text-gray-400">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--color-special-smiles-primary)] hover:text-white transition-all text-gray-400">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--color-special-smiles-primary)] hover:text-white transition-all text-gray-400">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">About Us</h4>
            <ul className="space-y-4">
              <li><Link href="/about-us" className="hover:text-[var(--color-special-smiles-primary)] transition-colors flex items-center gap-2"><span>•</span> Overview</Link></li>
              <li><Link href="/about-us/team" className="hover:text-[var(--color-special-smiles-primary)] transition-colors flex items-center gap-2"><span>•</span> Team</Link></li>
              <li><Link href="/about-us/facility" className="hover:text-[var(--color-special-smiles-primary)] transition-colors flex items-center gap-2"><span>•</span> Our Facility</Link></li>
              <li><Link href="/about-us/directions" className="hover:text-[var(--color-special-smiles-primary)] transition-colors flex items-center gap-2"><span>•</span> Directions</Link></li>
              <li><Link href="/faqs" className="hover:text-[var(--color-special-smiles-primary)] transition-colors flex items-center gap-2"><span>•</span> FAQs</Link></li>
              <li><Link href="/blog" className="hover:text-[var(--color-special-smiles-primary)] transition-colors flex items-center gap-2"><span>•</span> News</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-special-smiles-primary)] transition-colors flex items-center gap-2"><span>•</span> Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Services</h4>
            <ul className="space-y-4">
              <li><Link href="/services/our-patients" className="hover:text-[var(--color-special-smiles-primary)] transition-colors flex items-center gap-2"><span>•</span> Our Patients</Link></li>
              <li><Link href="/services/first-visit-treatment" className="hover:text-[var(--color-special-smiles-primary)] transition-colors flex items-center gap-2"><span>•</span> First Visit &amp; Treatment</Link></li>
              <li><Link href="/services/new-patient-information" className="hover:text-[var(--color-special-smiles-primary)] transition-colors flex items-center gap-2"><span>•</span> New Patient Information</Link></li>
              <li><Link href="/services/forms" className="hover:text-[var(--color-special-smiles-primary)] transition-colors flex items-center gap-2"><span>•</span> Forms</Link></li>
              <li><Link href="/services/pa-caregiver-resources" className="hover:text-[var(--color-special-smiles-primary)] transition-colors flex items-center gap-2"><span>•</span> PA Caregiver Resources</Link></li>
              <li><Link href="/services/nj-caregiver-resources" className="hover:text-[var(--color-special-smiles-primary)] transition-colors flex items-center gap-2"><span>•</span> NJ Caregiver Resources</Link></li>
              <li><Link href="/services/special-outreach-services" className="hover:text-[var(--color-special-smiles-primary)] transition-colors flex items-center gap-2"><span>•</span> Special Outreach Services</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Contact Info</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-[var(--color-special-smiles-primary)] mt-1 shrink-0" size={20} />
                <span className="text-gray-400 leading-relaxed">
                  {address.split("\n").map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-[var(--color-special-smiles-primary)] shrink-0" size={20} />
                <a href={`tel:${settings?.phone ?? "+13105550199"}`} className="text-gray-400 hover:text-white">{phone}</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-[var(--color-special-smiles-primary)] shrink-0" size={20} />
                <a href={`mailto:${email}`} className="text-gray-400 hover:text-white">{email}</a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Family Health Care Centers of Greater Los Angeles. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
