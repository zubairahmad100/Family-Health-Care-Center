'use client';

import { faqsData } from '@/lib/special-smiles-content';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export default function FaqSection() {
  const faqs = faqsData.slice(0, 5).map(({ question, answer }) => ({ question, answer }));

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">

        <div className="text-center mb-16">
          <span className="text-[var(--color-special-smiles-primary)] font-semibold tracking-wide uppercase text-sm mb-2 block">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
             const isOpen = openIndex === index;
             return (
               <div
                 key={index}
                 className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                   isOpen ? 'border-[var(--color-special-smiles-primary)] shadow-lg shadow-red-500/10' : 'border-gray-200 hover:border-gray-300'
                 }`}
               >
                  <button
                    onClick={() => toggleOpen(index)}
                    className={`w-full text-left px-6 py-5 flex justify-between items-center bg-white transition-colors ${
                      isOpen ? 'text-[var(--color-special-smiles-primary)]' : 'text-gray-900'
                    }`}
                  >
                    <span className="font-bold text-lg pr-8">{faq.question}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? 'bg-[var(--color-special-smiles-primary)] text-white' : 'bg-gray-100 text-gray-500'}`}>
                       {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                     <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 mt-2 pt-4">
                        {faq.answer}
                     </div>
                  </div>
               </div>
             )
          })}
        </div>
      </div>
    </section>
  );
}
