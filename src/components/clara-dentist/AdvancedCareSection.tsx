import { FadeUp } from '@/components/ui/AnimateOnScroll';
import { Activity, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AdvancedCareSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-[1.15]">
            Comprehensive Care <br /> For Special Needs
          </h2>
          <p className="text-gray-600 text-lg">
            We provide oral healthcare to individuals with intellectual, psychological, or developmental disabilities who require general anesthesia to safely receive care.
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Card 1 */}
          <Link href="/services/first-visit-treatment" className="block h-full">
            <FadeUp delay={0.1} className="bg-gray-50 rounded-2xl p-6 relative overflow-hidden group flex flex-col items-center text-center h-full">
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl mb-6 relative overflow-hidden">
                <Image
                  src="/images/clara/care.png"
                  alt="First visit and treatment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">FIRST VISIT & TREATMENT</h3>
              <p className="text-gray-600 mb-6">Consultation, pre-operative planning, and treatment with anesthesia support.</p>
              <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-[var(--color-special-smiles-primary)] group-hover:text-white transition-colors cursor-pointer mt-auto">
                <ArrowRight size={24} />
              </div>
            </FadeUp>
          </Link>

          {/* Card 2: Progress Bars (Center) */}
          <FadeUp delay={0.2} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl shadow-red-500/5">
            <h3 className="text-xl font-bold text-gray-900 mb-6">What We Offer</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">• Our Patients & first visit</li>
              <li className="flex items-center gap-2">• New patient forms & information</li>
              <li className="flex items-center gap-2">• PA & NJ caregiver resources</li>
              <li className="flex items-center gap-2">• Special outreach services</li>
            </ul>
            <Link href="/services" className="block mt-8">
              <button type="button" className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded-lg transition-colors border border-gray-200">
                View All Services
              </button>
            </Link>
          </FadeUp>

          {/* Card 3 */}
          <FadeUp delay={0.3} className="bg-[var(--color-special-smiles-primary)] rounded-2xl p-8 text-white flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Activity size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">OUR PATIENTS</h3>
              <p className="text-blue-50/80 mb-8 leading-relaxed">
                We serve individuals with special needs who require general anesthesia for safe, comprehensive dental care.
              </p>
            </div>

            <Link href="/services/our-patients" className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all border-b border-white/30 pb-1 self-start">
              Learn More <ArrowRight size={18} />
            </Link>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
