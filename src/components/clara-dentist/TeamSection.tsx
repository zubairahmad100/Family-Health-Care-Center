"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { teamMembers } from '@/lib/special-smiles-content';
import { FadeUp } from '@/components/ui/AnimateOnScroll';

export default function TeamSection() {
  const [index, setIndex] = useState(0);
  const total = teamMembers.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex(() => (next < 0 ? total - 1 : next >= total ? 0 : next));
    },
    [total]
  );

  return (
    <section className="py-24 bg-[#f8fbfe] overflow-hidden">
      <div className="container mx-auto px-4">
        <FadeUp className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[var(--color-special-smiles-primary)] font-semibold tracking-wide uppercase text-sm mb-2 block">
            OUR TEAM
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Specialized Dentists & Leaders
          </h2>
          <p className="text-gray-600 text-lg">
            Meet the Family Health Care Centers of Greater Los Angeles team dedicated to comprehensive oral healthcare for individuals with special needs.
          </p>
        </FadeUp>

        <div className="max-w-4xl mx-auto">
          {/* Single-card carousel */}
          <div className="relative">
            {teamMembers.map((m, i) => (
              <div
                key={m.id}
                className="transition-opacity duration-500 ease-out"
                style={{
                  opacity: i === index ? 1 : 0,
                  position: i === index ? 'relative' : 'absolute',
                  inset: 0,
                  zIndex: i === index ? 1 : 0,
                  pointerEvents: i === index ? 'auto' : 'none',
                }}
                aria-hidden={i !== index}
              >
                <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 aspect-[4/5] md:aspect-auto md:min-h-[340px] relative bg-gray-100">
                      <Image
                        src={m.image}
                        alt={m.alt}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 40vw"
                        priority={i === 0}
                      />
                    </div>
                    <div className="md:w-3/5 p-8 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {m.name}
                      </h3>
                      <p className="text-[var(--color-special-smiles-primary)] font-semibold text-sm uppercase tracking-wide mb-4">
                        {m.title}
                      </p>
                      <p className="text-gray-600 leading-relaxed line-clamp-6">
                        {m.bio}
                      </p>
                      <div className="mt-6">
                        <Link
                          href="/about-us/team"
                          className="inline-flex items-center text-[var(--color-special-smiles-primary)] font-semibold hover:underline"
                        >
                          Read more →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="rounded-full bg-[var(--color-special-smiles-primary)] text-white p-3 hover:bg-[var(--color-special-smiles-primary)]/90 transition-colors shadow-md"
              aria-label="Previous team member"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              {teamMembers.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${i === index
                      ? 'w-8 bg-[var(--color-special-smiles-primary)]'
                      : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to team member ${i + 1}`}
                  aria-current={i === index}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="rounded-full bg-[var(--color-special-smiles-primary)] text-white p-3 hover:bg-[var(--color-special-smiles-primary)]/90 transition-colors shadow-md"
              aria-label="Next team member"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
