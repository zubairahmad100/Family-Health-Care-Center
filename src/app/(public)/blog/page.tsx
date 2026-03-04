import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/ui/AnimateOnScroll";
import { newsItems } from "@/lib/special-smiles-content";

export const metadata = {
  title: "News | FHCCGLA",
  description:
    "News and updates from Family Health Care Centers of Greater Los Angeles — technology advancements, awards, promotions, and dental education.",
  openGraph: {
    title: "News | FHCCGLA",
    description:
      "News and updates from Family Health Care Centers of Greater Los Angeles — technology advancements, awards, promotions, and dental education.",
  },
  robots: "index, follow",
};

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased selection:bg-[var(--color-special-smiles-primary)] selection:text-white">
      {/* Page Header */}
      <section className="bg-white py-16 border-b border-gray-200">
        <FadeUp className="container mx-auto px-4 text-center">
          <span className="text-[var(--color-special-smiles-primary)] font-bold tracking-wider uppercase text-sm mb-3 block">
            Latest News
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Insights
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Updates from FHCCGLA: technology advancements, cosmetic success stories, awards, and more.
          </p>
        </FadeUp>
      </section>

      {/* Cards Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((post) => (
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  {/* Category badge */}
                  <span className="absolute bottom-4 left-4 bg-[var(--color-special-smiles-primary)] text-white text-xs font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full shadow">
                    {post.category}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[var(--color-special-smiles-primary)] transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 flex-1 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
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
    </main>
  );
}
