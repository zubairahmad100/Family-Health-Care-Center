"use client";

import { FadeUp } from '@/components/ui/AnimateOnScroll';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { SERVICES } from '@/lib/services-data';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const GAP_CLASS = 'pl-6';

/** Maps service ID → local image path */
const SERVICE_IMAGES: Record<number, string> = {
  1: '/images/services/preventative.png',
  2: '/images/services/cosmetic.png',
  3: '/images/services/implants.png',
  4: '/images/services/invisalign.png',
  5: '/images/services/restorative.png',
  6: '/images/services/emergency.png',
};

export default function ServicesGrid() {
  const services = SERVICES;
  const [api, setApi] = useState<CarouselApi>(undefined);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    const sync = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };
    api.on('select', sync);
    queueMicrotask(sync);
    return () => { api.off('select', sync); };
  }, [api]);

  const goTo = useCallback((index: number) => { api?.scrollTo(index); }, [api]);

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <FadeUp className="text-center mb-16">
          <span className="text-[var(--color-special-smiles-primary)] font-bold tracking-wider uppercase text-sm mb-3 block">
            OUR SERVICES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive Dental Care
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From preventative checkups to complete smile transformations — we provide world-class care in a warm, welcoming environment.
          </p>
        </FadeUp>

        <Carousel setApi={setApi} opts={{ align: 'start', loop: false }} className="w-full">
          <CarouselContent className="-ml-6 py-10">
            {services.map((service) => (
              <CarouselItem
                key={service.id}
                className={`${GAP_CLASS} basis-full md:basis-1/2 lg:basis-1/3`}
              >
                <article className="group h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex flex-col h-full bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={SERVICE_IMAGES[service.id] ?? '/images/hero/hero-1.png'}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      {/* Bottom gradient fade into card body */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>

                    {/* Card body */}
                    <div className="flex flex-col flex-1 p-6">
                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[var(--color-special-smiles-primary)] transition-colors leading-snug">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                        {service.description}
                      </p>

                      {/* Highlights */}
                      {service.highlights && (
                        <ul className="space-y-1.5 mb-5 flex-1">
                          {service.highlights.slice(0, 3).map((h) => (
                            <li key={h} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-special-smiles-primary)] shrink-0" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* CTA */}
                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-special-smiles-primary)] group-hover:gap-2.5 transition-all">
                          Learn More <ArrowRight size={14} />
                        </span>
                        <span className="w-8 h-8 rounded-full bg-[var(--color-special-smiles-primary)]/10 flex items-center justify-center group-hover:bg-[var(--color-special-smiles-primary)] transition-colors">
                          <ArrowRight size={14} className="text-[var(--color-special-smiles-primary)] group-hover:text-white transition-colors" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              disabled={current <= 0}
              className="rounded-full bg-[var(--color-special-smiles-primary)] text-white p-3 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-special-smiles-primary)]/90 transition-colors shadow-md"
              aria-label="Previous services"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all ${i === current ? 'w-8 bg-[var(--color-special-smiles-primary)]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === current}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              disabled={current >= count - 1}
              className="rounded-full bg-[var(--color-special-smiles-primary)] text-white p-3 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-special-smiles-primary)]/90 transition-colors shadow-md"
              aria-label="Next services"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
