"use client";

import { FadeUp } from '@/components/ui/AnimateOnScroll';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { SERVICES } from '@/lib/services-data';
import {
  Activity,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Smile,
  Stethoscope,
  Syringe,
} from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const GAP_CLASS = 'pl-6'; // 24px gap via -ml-6 on content

const ICONS: Record<number, React.ReactNode> = {
  1: <Stethoscope size={28} className="text-[var(--color-special-smiles-primary)]" />,
  2: <Syringe size={28} className="text-[var(--color-special-smiles-primary)]" />,
  3: <Smile size={28} className="text-[var(--color-special-smiles-primary)]" />,
  4: <HeartPulse size={28} className="text-[var(--color-special-smiles-primary)]" />,
  5: <CheckSquare size={28} className="text-[var(--color-special-smiles-primary)]" />,
  6: <Activity size={28} className="text-[var(--color-special-smiles-primary)]" />,
  7: <Activity size={28} className="text-[var(--color-special-smiles-primary)]" />,
};

export default function ServicesGrid() {
  const services = SERVICES.map((s) => ({ ...s, icon: ICONS[s.id] ?? null }));
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
    queueMicrotask(sync); // initial sync deferred to avoid synchronous setState in effect
    return () => {
      api.off('select', sync);
    };
  }, [api]);

  const goTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <section className="py-24 bg-[#f8fbfe] overflow-hidden">
      <div className="container mx-auto px-4">
        <FadeUp className="text-center mb-16">
          <span className="text-(--color-special-smiles-primary) font-semibold tracking-wide uppercase text-sm mb-2 block">
            OUR SERVICES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore the solutions we provide
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We are committed to providing top-notch dental care in a comfortable and friendly environment for individuals with special needs.
          </p>
        </FadeUp>

        <Carousel
          setApi={setApi}
          opts={{ align: 'start', loop: false }}
          className="w-full"
        >
          <CarouselContent className="-ml-6 py-10">
            {services.map((service) => (
              <CarouselItem
                key={service.id}
                className={`${GAP_CLASS} basis-full md:basis-1/2 lg:basis-1/3`}
              >
                <article className="group h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="block h-full bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[var(--color-special-smiles-primary)]/15 hover:border-[var(--color-special-smiles-primary)]/20 relative overflow-hidden"
                  >
                    {/* Hover overlay: grows from bottom, starts with rounded top 50%, then matches card radius */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-0 rounded-t-[50%] group-hover:rounded-2xl bg-[var(--color-special-smiles-primary)] group-hover:h-full pointer-events-none"
                      style={{
                        transition: 'height 0.5s ease-out, border-radius 0.35s ease-out 0.5s',
                      }}
                      aria-hidden
                    />
                    <div
                      className="relative z-10 transition-colors duration-300 [&_*]:transition-colors [&_*]:duration-300 [&_*]:delay-200 group-hover:[&_h3]:text-white group-hover:[&_p]:text-white/95 group-hover:[&_span]:text-white group-hover:[&_span]:border-white/80 group-hover:[&_svg]:text-white"
                      style={{
                        transitionProperty: 'color, border-color',
                        transitionDelay: '0.25s',
                      }}
                    >
                      <div
                        className="w-16 h-16 bg-[var(--color-special-smiles-primary)]/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-white/20"
                        style={{ transitionDelay: '0.25s' }}
                      >
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                        {service.description}
                      </p>
                      <span className="inline-flex items-center text-gray-900 font-medium border-b border-gray-300 pb-0.5">
                        Learn More
                      </span>
                    </div>
                  </Link>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel controls – custom styling to match design */}
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
                  className={`h-2.5 rounded-full transition-all ${i === current
                      ? 'w-8 bg-[var(--color-special-smiles-primary)]'
                      : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
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
