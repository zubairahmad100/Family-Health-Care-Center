import type { Metadata } from "next";
import { FadeUp } from "@/components/ui/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for using Family Health Care Centers of Greater Los Angeles website and booking system.",
  openGraph: {
    title: "Terms of Service | FHCCGLA",
    description:
      "Terms of service for using Family Health Care Centers of Greater Los Angeles website and booking system.",
  },
  robots: "index, follow",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased selection:bg-[var(--color-special-smiles-primary)] selection:text-white">
      {/* Header */}
      <section className="bg-white py-16 border-b border-gray-200">
        <FadeUp className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            By using Family Health Care Centers of Greater Los Angeles&apos;s website and booking system, you
            agree to these terms.
          </p>
        </FadeUp>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 space-y-10">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Acceptance
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Use of this site and our online booking feature constitutes acceptance of these
                  Terms of Service and our Privacy Policy.
                </li>
                <li>
                  If you do not agree with these terms, please do not use the service.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Appointment Policy
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Booked appointments are subject to availability and confirmation by the clinic.
                </li>
                <li>
                  We reserve the right to reschedule or cancel in case of emergencies or
                  operational needs.
                </li>
                <li>You will be notified of any changes.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                24-Hour Cancellation
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Please cancel or reschedule at least 24 hours in advance.
                </li>
                <li>
                  Failure to do so may result in a missed-appointment fee as per our clinic policy.
                </li>
                <li>
                  Contact us by phone or through the dashboard if you need to change your
                  appointment.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Limitation of Liability
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  This website and booking system are provided &quot;as is.&quot;
                </li>
                <li>
                  We are not liable for technical failures, delays, or inaccuracies.
                </li>
                <li>
                  Dental and health advice must be obtained from a licensed provider; the site does
                  not provide medical advice.
                </li>
                <li>
                  Our liability is limited to the fullest extent permitted by law.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
