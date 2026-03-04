import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Directions",
  description: "Directions and location for Special Smiles, Ltd. in Philadelphia.",
  openGraph: {
    title: "Directions | Special Smiles, Ltd.",
    description: "Directions and location for Special Smiles, Ltd. in Philadelphia.",
  },
  robots: "index, follow",
};

export default function DirectionsPage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <Link href="/about-us" className="text-[var(--color-special-smiles-primary)] hover:underline text-sm font-medium mb-4 inline-block">← About Us</Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Directions</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Special Smiles, Ltd. is located at 2301 E. Allegheny Avenue, Suite 120, Philadelphia, PA 19134.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Address</h2>
            <p className="text-gray-600 mb-4">
              1234 Hollywood Blvd, Suite 200<br />
              Los Angeles, CA 90028
            </p>
            <p className="text-gray-600 mb-6">
              <strong>Hours:</strong> Monday–Friday, 7:00 AM – 3:30 PM
            </p>
            <a
              href="https://www.google.com/maps/search/2301+E+Allegheny+Avenue+Philadelphia+PA+19134"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--color-special-smiles-primary)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--color-special-smiles-primary-dark)] transition-colors"
            >
              Get directions on Google Maps
            </a>
          </div>
          <p>
            <Link href="/contact" className="text-[var(--color-special-smiles-primary)] font-medium hover:underline">Contact us</Link> for questions about your visit.
          </p>
        </div>
      </section>
    </main>
  );
}
