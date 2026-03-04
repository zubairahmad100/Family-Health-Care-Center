import { FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';
import { SERVICES } from '@/lib/services-data';
import { FileCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Our Services",
  description:
    "Special Smiles provides comprehensive oral healthcare for individuals with special needs: our patients, first visit & treatment, new patient information, forms, and caregiver resources.",
  openGraph: {
    title: "Our Services | Special Smiles, Ltd.",
    description:
      "Special Smiles provides comprehensive oral healthcare for individuals with special needs: our patients, first visit & treatment, new patient information, forms, and caregiver resources.",
  },
  robots: "index, follow",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-800 antialiased selection:bg-[var(--color-special-smiles-primary)] selection:text-white">
      <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[var(--color-special-smiles-primary)] via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeUp className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-lg text-gray-300">
              Comprehensive oral healthcare for individuals with intellectual, psychological, or developmental disabilities who require general anesthesia to safely receive care.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <StaggerContainer className="space-y-6">
            {SERVICES.map((service, index) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="flex flex-col sm:flex-row gap-6 items-start p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-[var(--color-special-smiles-primary)]/30 transition-all group"
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--color-special-smiles-primary)]/10 text-[var(--color-special-smiles-primary)] flex-shrink-0">
                    <FileCheck size={28} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-[var(--color-special-smiles-primary)] transition-colors mb-2">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {service.shortDescription ?? service.description}
                    </p>
                  </div>
                  <span className="text-[var(--color-special-smiles-primary)] font-medium group-hover:underline flex-shrink-0">Learn more →</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-[var(--color-special-smiles-primary)] py-16">
        <FadeUp className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">New patient?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Fill out the New Patient Intake/Health History form and contact us to schedule a consultation.
          </p>
          <Link href="/services/new-patient-information" className="bg-white text-[var(--color-special-smiles-primary)] hover:bg-gray-50 px-8 py-4 rounded-full font-bold text-lg transition-transform transform hover:-translate-y-1 shadow-lg inline-block mr-4">
            New Patient Information
          </Link>
          <Link href="/contact" className="bg-white/20 text-white hover:bg-white/30 px-8 py-4 rounded-full font-bold text-lg transition-colors inline-block">
            Contact Us
          </Link>
        </FadeUp>
      </section>
    </main>
  );
}
