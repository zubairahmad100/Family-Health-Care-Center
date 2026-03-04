"use client";

import { heroContent } from "@/data/siteData";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-gray-900">
        <Image
          src={heroContent.backgroundImage}
          alt={heroContent.backgroundAlt}
          fill
          className="object-cover opacity-60"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/80"
          aria-hidden
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {heroContent.headline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/90 sm:text-xl max-w-xl">
            {heroContent.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={heroContent.ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg transition hover:bg-white/95 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              {heroContent.ctaLabel}
            </Link>
            <a
              href={heroContent.phoneHref}
              className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 hover:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Call {heroContent.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
