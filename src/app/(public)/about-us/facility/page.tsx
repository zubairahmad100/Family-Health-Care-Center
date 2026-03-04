import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Facility",
  description:
    "Learn about the Special Smiles, Ltd. outpatient dental facility in Philadelphia.",
  openGraph: {
    title: "Our Facility | Special Smiles, Ltd.",
    description:
      "Learn about the Special Smiles, Ltd. outpatient dental facility in Philadelphia.",
  },
  robots: "index, follow",
};

export default function FacilityPage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <Link href="/about-us" className="text-[var(--color-special-smiles-primary)] hover:underline text-sm font-medium mb-4 inline-block">← About Us</Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Facility</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Special Smiles, Ltd. is a licensed tenant at Temple University Hospital – Episcopal Division in Philadelphia. Our outpatient facility is equipped to provide dental treatment under general anesthesia in a safe, professional environment.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-gray-600 leading-relaxed mb-6">
            We are located at 1234 Hollywood Blvd, Suite 200, Los Angeles, CA 90028. For hours and directions, visit our <Link href="/contact" className="text-[var(--color-special-smiles-primary)] font-medium hover:underline">Contact</Link> page.
          </p>
        </div>
      </section>
    </main>
  );
}
