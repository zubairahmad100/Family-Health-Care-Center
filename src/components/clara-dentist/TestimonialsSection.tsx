'use client';

import { FadeUp } from '@/components/ui/AnimateOnScroll';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      text: "You all did great, very friendly staff. Took your time with my daughter.",
      name: "Cheryl",
      role: "Google review",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
    },
    {
      id: 2,
      text: "Absolutely the best dental care I have ever experienced! Professional, courteous, and friendly staff made me feel like family... would highly recommend to anyone.",
      name: "Mark Roberts",
      role: "Patient",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80"
    },
    {
      id: 3,
      text: "Excellent service and a beautiful clinic. Dr. Michael explained everything clearly and the procedure went flawlessly. I finally found my permanent dentist.",
      name: "Emily Clark",
      role: "Patient",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  const next = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 bg-[#f8fbfe]">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Content Placeholder for Image or Navigation Area */}
        <FadeUp delay={0.2} className="relative order-2 lg:order-1">
           <div className="aspect-square max-w-md mx-auto relative hidden md:block">
              {/* Abstract decorative elements meant to mirror the "customer floating" style in the theme */}
              <div className="absolute inset-0 bg-red-100/50 rounded-full -z-10 blur-3xl"></div>

              <div className="absolute top-10 left-10 w-24 h-24 bg-gray-200 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-xs text-gray-400 text-center font-bold overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" alt="Patient" fill className="object-cover" />
              </div>
              <div className="absolute top-1/2 right-10 w-32 h-32 bg-gray-200 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-xs text-gray-400 text-center font-bold overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80" alt="Patient" fill className="object-cover" />
              </div>
              <div className="absolute bottom-10 left-1/4 w-28 h-28 bg-gray-200 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-xs text-gray-400 text-center font-bold overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80" alt="Patient" fill className="object-cover" />
              </div>

              {/* Central element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--color-special-smiles-primary)] rounded-full flex flex-col items-center justify-center text-white shadow-xl shadow-red-500/30">
                 <span className="text-4xl font-bold">4.9/5</span>
                 <span className="text-sm font-medium uppercase tracking-wider mt-1 opacity-90">Rating</span>
                 <div className="flex gap-1 mt-2">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 bg-white rounded-full"></div>)}
                 </div>
              </div>
           </div>
        </FadeUp>

        {/* Right Testimonial Content */}
        <FadeUp delay={0.4} className="order-1 lg:order-2">
          <div className="mb-10">
            <span className="text-[var(--color-special-smiles-primary)] font-semibold tracking-wide uppercase text-sm mb-2 block">
              PATIENT TESTIMONIALS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Patients Say
            </h2>
          </div>

          <div className="relative">
             <Quote size={80} className="text-[var(--color-special-smiles-primary)]/10 absolute -top-8 -left-6" />

             <div className="min-h-[200px]">
               <p className="text-2xl text-gray-700 leading-relaxed font-medium relative z-10 italic">
                 "{testimonials[currentIndex].text}"
               </p>
             </div>

             <div className="flex items-center justify-between mt-12 border-t border-gray-200 pt-8">
               <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden relative">
                   <Image src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} fill className="object-cover" />
                 </div>
                 <div>
                   <h4 className="font-bold text-xl text-gray-900">{testimonials[currentIndex].name}</h4>
                   <p className="text-[var(--color-special-smiles-primary)] font-medium">{testimonials[currentIndex].role}</p>
                 </div>
               </div>

               <div className="flex gap-3">
                 <button onClick={prev} className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[var(--color-special-smiles-primary)] hover:border-[var(--color-special-smiles-primary)] hover:text-white transition-all text-gray-500">
                   <ChevronLeft size={24} />
                 </button>
                 <button onClick={next} className="w-12 h-12 rounded-full bg-[var(--color-special-smiles-primary)] text-white flex items-center justify-center hover:bg-[var(--color-special-smiles-primary-dark)] transition-all shadow-lg shadow-red-500/30">
                   <ChevronRight size={24} />
                 </button>
               </div>
             </div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
