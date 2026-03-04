import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { teamMembers } from "@/lib/special-smiles-content";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the Special Smiles, Ltd. team dedicated to oral healthcare for individuals with special needs.",
  openGraph: {
    title: "Team | Special Smiles, Ltd.",
    description:
      "Meet the Special Smiles, Ltd. team dedicated to oral healthcare for individuals with special needs.",
  },
  robots: "index, follow",
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#f8fbfe] font-sans text-gray-800 antialiased">
      {/* Hero */}
      <section className="relative bg-white py-20 md:py-24 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Link
            href="/about-us"
            className="inline-flex items-center gap-1.5 text-[var(--color-special-smiles-primary)] hover:underline text-sm font-medium mb-6"
          >
            ← About Us
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            Our Team
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            The Special Smiles team includes dentists, anesthesiologists, and nursing staff trained to provide comprehensive oral healthcare to individuals with intellectual, psychological, or developmental disabilities in a safe, supportive environment.
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {teamMembers.map((m) => (
              <article
                key={m.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100/80 hover:shadow-xl hover:shadow-[var(--color-special-smiles-primary)]/5 hover:border-[var(--color-special-smiles-primary)]/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/5] relative bg-gray-100">
                  <Image
                    src={m.image}
                    alt={m.alt}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                    {m.name}
                  </h2>
                  <p className="mt-1.5 text-[var(--color-special-smiles-primary)] font-semibold uppercase tracking-wider text-xs">
                    {m.title}
                  </p>
                  <p className="mt-5 text-gray-600 text-[15px] leading-relaxed">
                    {m.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 md:mt-20 p-6 md:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm text-center">
            <p className="text-gray-600 leading-relaxed">
              Questions? Contact us at{" "}
              <a href="tel:+923064206007" className="text-[var(--color-special-smiles-primary)] font-semibold hover:underline">+92 306 4206007</a>
              {" "}or{" "}
              <a href="mailto:info@fhccgla.com" className="text-[var(--color-special-smiles-primary)] font-semibold hover:underline">info@fhccgla.com</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
