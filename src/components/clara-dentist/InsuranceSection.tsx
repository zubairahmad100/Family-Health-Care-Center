"use client";

const plans = [
  "Delta Dental",
  "Cigna",
  "Aetna",
  "BlueCross BlueShield",
  "MetLife",
  "Guardian",
  "United Concordia",
];

export default function InsuranceSection() {
  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <span className="text-[var(--color-special-smiles-primary)] font-bold tracking-wider uppercase text-sm mb-4 block">Coverage</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          We work with your insurance.
        </h2>
        <p className="text-gray-600 mb-10 text-lg">
          Don&apos;t see yours listed? Call us — we&apos;ll check your coverage in under 5 minutes.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {plans.map((name) => (
            <span
              key={name}
              className="text-gray-700 font-medium bg-gray-50 border border-gray-200 rounded-full px-6 py-3 hover:border-[var(--color-special-smiles-primary)] hover:text-[var(--color-special-smiles-primary)] hover:bg-red-50/30 transition-all cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
        <p className="mt-10 text-sm text-gray-400 font-medium tracking-wide">
          Also accepting: Visa · Mastercard · HSA/FSA · CareCredit · Cash
        </p>
      </div>
    </section>
  );
}
