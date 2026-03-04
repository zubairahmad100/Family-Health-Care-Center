import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';

export default function CommitmentSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Interactive Image Area */}
        <div className="relative">
          {/* Main Background Box */}
          <div className="absolute inset-0 bg-blue-50/50 rounded-[40px] transform -rotate-3 border border-red-100"></div>

          {/* Image Feature */}
          <div className="relative aspect-square md:aspect-[4/3] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <Image
              src="/images/clara/commitment.png"
              alt="Dentist Commitment"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Floating Stat Box 1 */}
          <div className="absolute -left-6 top-1/4 bg-(--color-special-smiles-primary) text-white p-5 rounded-2xl shadow-xl shadow-red-500/20 z-20 flex flex-col items-center">
            <span className="text-3xl font-bold">45%</span>
            <span className="text-xs uppercase tracking-wider font-medium opacity-80 mt-1">Appointments</span>
          </div>

          {/* Floating Stat Box 2 */}
          <div className="absolute -right-6 bottom-1/4 bg-(--color-special-smiles-primary)/80 text-white p-5 rounded-2xl shadow-xl z-20 flex flex-col items-center">
            <span className="text-3xl font-bold">32K+</span>
            <span className="text-xs uppercase tracking-wider font-medium opacity-80 mt-1">Meetings</span>
          </div>

          {/* Design Element */}
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-red-50 rounded-full blur-3xl -z-10"></div>
        </div>

        {/* Right Content */}
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <Star className="text-yellow-400 fill-yellow-400" size={20} />
            <span className="text-[var(--color-special-smiles-primary)] font-semibold text-sm tracking-widest uppercase">
              Our Commitment
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.15]">
            Safe, Comprehensive Care <br className="hidden md:block" /> for Special Needs
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-[var(--color-special-smiles-primary)] pl-6 bg-gray-50/50 py-2">
            We are dedicated to providing oral healthcare to individuals with intellectual, psychological, or developmental disabilities who require general anesthesia. Our facility and team ensure safe, coordinated care for every patient and caregiver.
          </p>

          <ul className="space-y-4 pt-4">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center mt-1 flex-shrink-0">
                <div className="w-2 h-2 bg-[var(--color-special-smiles-primary)] rounded-full"></div>
              </div>
              <span className="text-gray-700 font-medium">General anesthesia by anesthesiologists</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center mt-1 flex-shrink-0">
                <div className="w-2 h-2 bg-[var(--color-special-smiles-primary)] rounded-full"></div>
              </div>
              <span className="text-gray-700 font-medium">Consultation and pre-operative coordination</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center mt-1 flex-shrink-0">
                <div className="w-2 h-2 bg-[var(--color-special-smiles-primary)] rounded-full"></div>
              </div>
              <span className="text-gray-700 font-medium">Support for patients and caregivers</span>
            </li>
          </ul>

          <div className="pt-6">
            <a href="/about-us" className="inline-flex items-center gap-2 bg-[var(--color-special-smiles-primary)] hover:bg-[var(--color-special-smiles-primary-dark)] text-white px-8 py-4 rounded-md font-semibold transition-colors shadow-lg shadow-red-500/25">
              Learn More About Us <ArrowRight size={18} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
