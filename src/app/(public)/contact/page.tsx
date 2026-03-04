import { FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { getClinicSettings, businessHoursToDisplay } from '@/lib/clinicSettings';

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Special Smiles, Ltd. Philadelphia outpatient dental facility for individuals with special needs.",
  openGraph: {
    title: "Contact Us | Special Smiles, Ltd.",
    description:
      "Get in touch with Special Smiles, Ltd. Philadelphia outpatient dental facility for individuals with special needs.",
  },
  robots: "index, follow",
};

function formatPhone(value: string | undefined): string {
  if (!value) return '';
  const digits = value.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) return `${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
  if (digits.length === 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return value;
}

export default async function ContactPage() {
  const settings = await getClinicSettings();
  const hours = settings?.business_hours
    ? businessHoursToDisplay(settings.business_hours)
    : null;
  const address = settings?.address ?? "1234 Hollywood Blvd, Suite 200, Los Angeles, CA 90028";
  const phone = (formatPhone(settings?.phone) || settings?.phone) ?? "+92 306 4206007";
  const email = settings?.email ?? "info@fhccgla.com";
  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased selection:bg-[var(--color-special-smiles-primary)] selection:text-white">
      {/* Header */}
      <section className="bg-white py-16 border-b border-gray-200">
        <FadeUp className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">We'd love to hear from you. Whether you have a question about our services or want to book an appointment.</p>
        </FadeUp>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Info Sidebar */}
            <div className="w-full lg:w-1/3 space-y-8">
              <FadeUp delay={0.1} className="bg-[var(--color-special-smiles-primary)] text-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

                <StaggerContainer className="space-y-6">
                  <StaggerItem className="flex items-start gap-4">
                    <MapPin className="text-blue-200 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h4 className="font-semibold text-lg">Our Location</h4>
                      <p className="text-blue-100 leading-relaxed mt-1 whitespace-pre-line">
                        {address}
                      </p>
                    </div>
                  </StaggerItem>

                  <StaggerItem className="flex items-start gap-4">
                    <Phone className="text-blue-200 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h4 className="font-semibold text-lg">Phone</h4>
                      <p className="text-blue-100 leading-relaxed mt-1">{phone}</p>
                    </div>
                  </StaggerItem>

                  <StaggerItem className="flex items-start gap-4">
                    <Mail className="text-blue-200 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h4 className="font-semibold text-lg">Email Address</h4>
                      <p className="text-blue-100 leading-relaxed mt-1">{email}</p>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </FadeUp>

              <FadeUp delay={0.2} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="text-[var(--color-special-smiles-primary)]" size={28} />
                  <h3 className="text-xl font-bold text-gray-900">Working Hours</h3>
                </div>
                <StaggerContainer className="space-y-3 text-gray-600">
                  {hours
                    ? hours.map((h) => (
                      <StaggerItem
                        key={h.day}
                        className={`flex justify-between pb-2 ${h.label === 'Closed'
                          ? 'text-red-500'
                          : 'border-b border-gray-50'
                          }`}
                      >
                        <span className="capitalize">
                          {h.day}
                        </span>
                        <span className="font-medium text-gray-900">
                          {h.label}
                        </span>
                      </StaggerItem>
                    ))
                    : (
                      <>
                        <StaggerItem className="flex justify-between border-b border-gray-50 pb-2">
                          <span>Monday - Friday</span>
                          <span className="font-medium text-gray-900">8:00 AM - 6:00 PM</span>
                        </StaggerItem>
                        <StaggerItem className="flex justify-between border-b border-gray-50 pb-2">
                          <span>Saturday</span>
                          <span className="font-medium text-gray-900">9:00 AM - 4:00 PM</span>
                        </StaggerItem>
                        <StaggerItem className="flex justify-between pb-2 text-red-500">
                          <span>Sunday</span>
                          <span className="font-medium">Closed</span>
                        </StaggerItem>
                      </>
                    )}
                </StaggerContainer>
              </FadeUp>
            </div>

            {/* Contact Form */}
            <FadeUp delay={0.3} className="w-full lg:w-2/3 bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
              <p className="text-gray-500 mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-special-smiles-primary)] focus:border-transparent transition-shadow" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-special-smiles-primary)] focus:border-transparent transition-shadow" placeholder="Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-special-smiles-primary)] focus:border-transparent transition-shadow" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-special-smiles-primary)] focus:border-transparent transition-shadow" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Subject</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-special-smiles-primary)] focus:border-transparent transition-shadow bg-white">
                    <option>General Inquiry</option>
                    <option>Book Appointment</option>
                    <option>Emergency Service</option>
                    <option>Billing Question</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Message</label>
                  <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-special-smiles-primary)] focus:border-transparent transition-shadow resize-none" placeholder="How can we help you?"></textarea>
                </div>

                <button type="button" className="w-full bg-[var(--color-special-smiles-primary)] hover:bg-[var(--color-special-smiles-primary-dark)] text-white font-bold py-4 rounded-lg transition-colors shadow-md">
                  Send Message
                </button>
              </form>
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}
