import { FadeUp } from '@/components/ui/AnimateOnScroll';
import { getServiceBySlug, getAllServiceSlugs } from '@/lib/services-data';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service)
    return {
      title: "Service",
      openGraph: { title: "Service | Special Smiles, Ltd." },
      robots: "index, follow",
    };
  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: `${service.title} | Special Smiles, Ltd.`,
      description: service.description,
    },
    robots: "index, follow",
  };
}

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <main className="min-h-screen bg-white font-sans text-gray-800 antialiased selection:bg-[var(--color-special-smiles-primary)] selection:text-white">
      {/* Page Header */}
      <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[var(--color-special-smiles-primary)] via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeUp className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
            <p className="text-lg text-gray-300">{service.description}</p>
          </FadeUp>
        </div>
      </section>

      {/* Service details */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeUp>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              {service.details ?? service.description}
            </p>
          </FadeUp>
          {service.highlights && service.highlights.length > 0 && (
            <FadeUp delay={0.1}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What we offer</h2>
              <ul className="space-y-4">
                {service.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="text-[var(--color-special-smiles-primary)] shrink-0 mt-0.5" size={22} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          )}
          {service.pdfUrl && (
            <FadeUp delay={0.15}>
              <p className="mt-8">
                <a
                  href={service.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--color-special-smiles-primary)] font-semibold hover:underline"
                >
                  Download form / PDF →
                </a>
              </p>
            </FadeUp>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-special-smiles-primary)] py-16">
        <FadeUp className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Book a consultation and we&apos;ll create a personalized plan for your smile.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-[var(--color-special-smiles-primary)] hover:bg-gray-50 px-8 py-4 rounded-full font-bold text-lg transition-transform hover:-translate-y-1 shadow-lg inline-block"
            >
              Book a Consultation
            </Link>
            <Link
              href="/services"
              className="bg-white/10 text-white hover:bg-white/20 border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-colors inline-block"
            >
              View All Services
            </Link>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
