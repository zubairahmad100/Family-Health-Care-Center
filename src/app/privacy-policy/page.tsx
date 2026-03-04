import type { Metadata } from "next";
import { FadeUp } from "@/components/ui/AnimateOnScroll";
import { getClinicSettings } from "@/lib/clinicSettings";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Family Health Care Centers of Greater Los Angeles privacy policy. How we collect, use, and protect your information.",
  openGraph: {
    title: "Privacy Policy | FHCCGLA",
    description:
      "Family Health Care Centers of Greater Los Angeles privacy policy. How we collect, use, and protect your information.",
  },
  robots: "index, follow",
};

export default async function PrivacyPolicyPage() {
  const settings = await getClinicSettings();
  const clinicName = settings?.clinic_name ?? "Family Health Care Centers of Greater Los Angeles";
  const phone =
    settings?.phone ?? "+92 306 4206007";
  const email =
    settings?.email ?? "info@claradentist.com";

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased selection:bg-[var(--color-special-smiles-primary)] selection:text-white">
      {/* Header */}
      <section className="bg-white py-16 border-b border-gray-200">
        <FadeUp className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {clinicName} (&quot;we&quot;, &quot;us&quot;) respects your
            privacy.
          </p>
        </FadeUp>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 space-y-10">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Data Collected
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  We collect information you provide when booking an appointment (name, email,
                  phone, date of birth, notes).
                </li>
                <li>
                  We collect information when you use our website (e.g., chat messages, IP address,
                  cookies).
                </li>
                <li>
                  We do not store medical or clinical records in this system.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                How We Use Your Data
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Your data is used to schedule and manage appointments and communicate with you
                  about your visits.
                </li>
                <li>
                  Your data helps us improve our services and comply with legal obligations.
                </li>
                <li>We do not sell your personal information.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                HIPAA Notice
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  This website and booking system do not store protected health information (PHI) or
                  medical records.
                </li>
                <li>
                  Clinical records are maintained separately by the clinic in compliance with HIPAA.
                </li>
                <li>
                  Any health-related details you share via chat or notes are used only for
                  scheduling and are not retained as part of a medical record in this system.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Retention
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Appointment and contact data are retained as long as needed for operations and as
                  required by law.
                </li>
                <li>
                  You may request deletion of your data by contacting us.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Contact
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  For privacy questions or to exercise your rights, contact us at{" "}
                  <a
                    href={`mailto:${email}`}
                    className="text-[var(--color-special-smiles-primary)] hover:underline"
                  >
                    {email}
                  </a>{" "}
                  or{" "}
                  <a
                    href={`tel:${phone}`}
                    className="text-[var(--color-special-smiles-primary)] hover:underline"
                  >
                    {phone}
                  </a>
                  .
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
