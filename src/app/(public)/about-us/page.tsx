import { FadeUp } from '@/components/ui/AnimateOnScroll';
import { CheckCircle2, Heart, Shield, Users } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: "About Us",
  description:
    "Learn more about Special Smiles, Ltd., our team, facility, and commitment to oral healthcare for individuals with special needs.",
  openGraph: {
    title: "About Us | Special Smiles, Ltd.",
    description:
      "Learn more about Special Smiles, Ltd., our team, facility, and commitment to oral healthcare for individuals with special needs.",
  },
  robots: "index, follow",
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased selection:bg-[var(--color-special-smiles-primary)] selection:text-white">
      {/* Page Header */}
      <section className="bg-[var(--color-special-smiles-primary)] text-white py-24">
        <FadeUp className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Our Story</h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90">
            Dedicated to bringing healthy, confident smiles to our community since 2010.
          </p>
        </FadeUp>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <FadeUp delay={0.1} className="w-full lg:w-1/2 relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/3845766/pexels-photo-3845766.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Modern dental clinic interior with dentist and patient"
                fill
                className="object-cover"
                priority
              />
            </FadeUp>

            <div className="w-full lg:w-1/2 space-y-8">
              <FadeUp delay={0.2}>
                <h2 className="text-[var(--color-special-smiles-primary)] font-semibold tracking-wider uppercase text-sm mb-2">Our Philosophy</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Modern Dentistry with a Gentle Touch
                </h3>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Special Smiles, Ltd. is an outpatient dental facility in Philadelphia where special needs dentists provide comprehensive oral healthcare to individuals with intellectual, psychological or developmental disabilities who require general anesthesia to safely receive care. Our team, facility, and protocols are designed to support patients and caregivers through every step of treatment.
                </p>
              </FadeUp>

              <FadeUp delay={0.4} className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-blue-50 p-2 rounded-full text-[var(--color-special-smiles-primary)]">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Patient-Centric</h4>
                    <p className="text-sm text-gray-600 mt-1">Your comfort and health are our absolute priority.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-blue-50 p-2 rounded-full text-[var(--color-special-smiles-primary)]">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Advanced Tech</h4>
                    <p className="text-sm text-gray-600 mt-1">State-of-the-art equipment for precise treatments.</p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <FadeUp className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
            <div className="w-24 h-1 bg-[var(--color-special-smiles-primary)] mx-auto mt-6 rounded-full"></div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: 'Excellence', desc: 'We deliver the highest standard of dental care through continuous education and training.', icon: <CheckCircle2 size={32} /> },
              { title: 'Compassion', desc: 'We treat every patient with empathy, understanding their unique needs and anxieties.', icon: <Heart size={32} /> },
              { title: 'Community', desc: 'We are proud to serve our local community and build lasting relationships with families.', icon: <Users size={32} /> },
            ].map((value, idx) => (
              <FadeUp delay={0.1 + idx * 0.15} key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-[var(--color-special-smiles-primary)] hover:shadow-md transition-all text-center">
                <div className="text-[var(--color-special-smiles-primary)] flex justify-center mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
