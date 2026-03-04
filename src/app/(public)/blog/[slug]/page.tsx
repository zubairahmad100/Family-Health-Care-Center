import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeUp } from "@/components/ui/AnimateOnScroll";
import { newsItems } from "@/lib/special-smiles-content";

export function generateStaticParams() {
  return newsItems.map((post) => ({ slug: post.slug }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = newsItems.find((p) => p.slug === slug);
  if (!post)
    return {
      title: "News",
      openGraph: { title: "News | Special Smiles, Ltd." },
      robots: "index, follow",
    };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Special Smiles, Ltd.`,
      description: post.excerpt,
    },
    robots: "index, follow",
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = newsItems.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased selection:bg-[var(--color-special-smiles-primary)] selection:text-white">
      <section className="bg-white py-12 border-b border-gray-200">
        <FadeUp className="container mx-auto px-4 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-gray-500 hover:text-[var(--color-special-smiles-primary)] mb-4"
          >
            &larr; Back to news
          </Link>
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--color-special-smiles-primary)] mb-2">
            {post.category}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {post.title}
          </h1>
          <div className="text-xs text-gray-500">{post.date}</div>
        </FadeUp>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {post.excerpt}
            </p>
            <p className="mt-8 text-gray-500 text-sm">
              For more information, contact us at{" "}
              <a href="tel:+923064206007" className="text-[var(--color-special-smiles-primary)] hover:underline">+92 306 4206007</a> or{" "}
              <a href="mailto:info@fhccgla.com" className="text-[var(--color-special-smiles-primary)] hover:underline">info@fhccgla.com</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
