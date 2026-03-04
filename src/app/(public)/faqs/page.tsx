import type { Metadata } from "next";
import Link from "next/link";
import { faqsData } from "@/lib/special-smiles-content";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about Special Smiles, Ltd. and dental care for individuals with special needs.",
  openGraph: {
    title: "FAQs | Special Smiles, Ltd.",
    description:
      "Frequently asked questions about Special Smiles, Ltd. and dental care for individuals with special needs.",
  },
  robots: "index, follow",
};

export default function FAQsPage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">FAQs</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Frequently Asked Questions about Special Smiles and dental care for individuals with special needs.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-8">
            {faqsData.map((faq) => (
              <div key={faq.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h2>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">{faq.answer}</div>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center">
            <Link href="/contact" className="text-[var(--color-special-smiles-primary)] font-semibold hover:underline">
              Contact us
            </Link>{" "}
            for more information.
          </p>
        </div>
      </section>
    </main>
  );
}
