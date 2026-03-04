import AdvancedCareSection from '@/components/clara-dentist/AdvancedCareSection';
import AppointmentSection from '@/components/clara-dentist/AppointmentSection';
import CommitmentSection from '@/components/clara-dentist/CommitmentSection';
import FaqSection from '@/components/clara-dentist/FaqSection';
import HeroSection from '@/components/clara-dentist/HeroSection';
import LocationSection from '@/components/clara-dentist/LocationSection';
import ServicesGrid from '@/components/clara-dentist/ServicesGrid';
import TeamSection from '@/components/clara-dentist/TeamSection';
import TestimonialsSection from '@/components/clara-dentist/TestimonialsSection';
import BeforeAfterSlider from '@/components/clara-dentist/BeforeAfterSlider';
import { newsItems } from '@/lib/special-smiles-content';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: "FHCCGLA | Family Health Care Centers of Greater Los Angeles",
  description:
    "Premium comprehensive dental care and aesthetic treatments in the heart of Los Angeles.",
  openGraph: {
    title: "FHCCGLA | Cosmetic & General Dentistry in Los Angeles",
    description:
      "Premium comprehensive dental care and aesthetic treatments in the heart of Los Angeles.",
    url: "/",
  },
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
};

export default function HomePage() {
  return (

    <main className="min-h-screen bg-white font-sans text-gray-800 antialiased selection:bg-(--color-special-smiles-primary) selection:text-white">
      <HeroSection />
      {/* <PartnersSection /> */}
      <AdvancedCareSection />
      <ServicesGrid />
      <CommitmentSection />
      <BeforeAfterSlider />
      <TeamSection />
      <AppointmentSection />
      <TestimonialsSection />
      {/* New Patient Forms CTA */}
      {/* <section className="py-12 bg-[var(--color-special-smiles-primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-medium mb-4">If you are a new patient, please fill out the New Patient Intake/Health History form.</p>
          <Link
            href="/services/new-patient-information"
            className="inline-flex items-center gap-2 bg-white text-[var(--color-special-smiles-primary)] hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg"
          >
            View New Patient Forms
          </Link>
        </div>
      </section> */}
      {/* Dr. Strott's Top 10 CTA */}
      {/* <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Dr. Strott&apos;s Top 10 Reasons for Regular Dentist Visits</h2>
          <Link
            href="/top-10-reasons-for-regular-dental-care"
            className="inline-flex items-center gap-2 border-2 border-[var(--color-special-smiles-primary)] text-[var(--color-special-smiles-primary)] hover:bg-[var(--color-special-smiles-primary)] hover:text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            CLICK HERE
          </Link>
        </div>
      </section> */}
      {/* Featured Insights / News */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="text-[var(--color-special-smiles-primary)] font-bold tracking-wider uppercase text-sm mb-3 block">Latest News</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Insights</h2>
              <p className="mt-3 text-gray-600 max-w-xl">
                Updates from FHCCGLA: technology advancements, cosmetic success stories, and more.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 justify-center px-5 py-2.5 rounded-full border border-[var(--color-special-smiles-primary)] text-[var(--color-special-smiles-primary)] font-semibold text-sm hover:bg-[var(--color-special-smiles-primary)] hover:text-white transition-colors shrink-0"
            >
              View all news <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-3xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Image */}
                <div className="relative w-full h-52 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Category badge over image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-[var(--color-special-smiles-primary)] text-white text-xs font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full shadow">
                    {post.category}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[var(--color-special-smiles-primary)] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 flex-1 leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">{post.date}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-special-smiles-primary)] group-hover:gap-2 transition-all">
                      Read more <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FaqSection />
      {/* <NewsletterSection /> */}
      <LocationSection />
    </main>

  );
}
