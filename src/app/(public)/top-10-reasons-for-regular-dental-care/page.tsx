import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FadeUp } from "@/components/ui/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Top 10 Reasons for Regular Dental Care",
  description:
    "By Jordan Strott, DMD. Why regular dental visits matter: oral cancer, cavities, gum disease, wisdom teeth, and more. FHCCGLA.",
  openGraph: {
    title: "Top 10 Reasons for Regular Dental Care | FHCCGLA",
    description:
      "By Jordan Strott, DMD. Why regular dental visits matter: oral cancer, cavities, gum disease, wisdom teeth, and more.",
  },
  robots: "index, follow",
};

const reasons = [
  {
    title: "Oral cancer",
    text: "can be life threatening if left unchecked. Luckily with early detection oral cancer tends to be easily treatable.",
  },
  {
    title: "Cavities",
    text: "when caught early, can be easily fixed. If treatment is delayed one risks potential crown, root canal or even loss of the tooth.",
  },
  {
    title: "Gum disease",
    text: "is caused when plaque and tartar sit around the teeth and gums. If left too long it may cause bone loss which may result in tooth loss.",
  },
  {
    title: "Wisdom teeth",
    text: "can pose challenges for any individual. Dentists monitor development, positioning and cleansability at each recare visit.",
  },
  {
    title: "Check fillings, crowns and dentures",
    text: "to make sure they are free of any decay, defects or fractures. This helps avoid pain, infection and the need for more extensive work in the future.",
  },
  {
    title: "Routine X-rays",
    text: "do more than check for cavities. They help the dentist look for fractures, cysts, tumors, abscesses and other abnormalities that would not normally be visible by just an exam.",
  },
  {
    title: "Bad breath",
    text: "is a common complaint in a dental practice. By visiting the dentist, they can help pinpoint the source and provide recommendations.",
  },
  {
    title: "Check on “bad” habits",
    text: "such as grinding, clenching, or biting/chewing on objects. Dentists can try to help prevent further destruction or damage to keep teeth intact for as long as possible.",
  },
  {
    title: "Reviewing oral hygiene plans",
    text: "regularly helps maintain good habits and oral health. Plans can be modified as specific needs change.",
  },
  {
    title: "We love seeing our patients",
    text: "hearing about how everyone is doing and what everyone is up to!",
  },
];

export default function Top10ReasonsPage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased selection:bg-[var(--color-special-smiles-primary)] selection:text-white">
      <section className="bg-white py-12 border-b border-gray-200">
        <FadeUp className="container mx-auto px-4 max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-[var(--color-special-smiles-primary)] mb-4"
          >
            &larr; Back to home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Top 10 Reasons for Regular Dental Care
          </h1>
          <div className="my-6 overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1596541223130-5d56447c23a6?q=80&w=800&auto=format&fit=crop"
              alt="Jordan Strott, DMD providing care"
              width={800}
              height={533}
              className="w-full object-cover"
            />
          </div>
          <p className="text-sm text-gray-600 mb-1">By Jordan Strott, DMD</p>
          <time className="text-sm text-gray-500" dateTime="2022-09-14">
            14 Sep 2022
          </time>
        </FadeUp>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <p className="text-gray-700 leading-relaxed mb-8">
              Going to the dentist regularly may not be an activity many people look forward to, but it might be one of the most important appointments to keep. Here are some of the top 10 reasons to see your dentist regularly:
            </p>

            <ol className="space-y-6 list-none pl-0">
              {reasons.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-special-smiles-primary)] text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <strong className="text-gray-900">{item.title}</strong>{" "}
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-10 text-gray-700 leading-relaxed">
              Our mission at FHCCGLA is to make sure patients are pain free, infection free and cavity free in a hope to maintain, if not improve, quality of life. If you have not been to the dentist in more than a year, please call us to schedule the next visit at{" "}
              <a href="tel:+923064206007" className="text-[var(--color-special-smiles-primary)] font-semibold hover:underline">
                +92 306 4206007
              </a>
              .
            </p>

            <div className="mt-10 pt-8 border-t border-gray-100">
              <Link
                href="/#booking"
                className="inline-flex items-center gap-2 bg-[var(--color-special-smiles-primary)] hover:bg-[var(--color-special-smiles-primary-dark)] text-white px-6 py-3 rounded-full font-semibold transition-colors"
              >
                Schedule a visit
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
