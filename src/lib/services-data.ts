export type ServiceItem = {
  id: number;
  slug: string;
  title: string;
  description: string;
  shortDescription?: string;
  highlights?: string[];
  details?: string;
  pdfUrl?: string;
};

export const SERVICES: ServiceItem[] = [
  {
    id: 1,
    slug: "preventative-dentistry",
    title: "Preventative Dentistry",
    description:
      "Maintain your bright smile and oral health with regular preventative care. Our comprehensive exams and cleanings prevent issues before they start.",
    shortDescription:
      "Routine exams, professional cleanings, and oral cancer screenings.",
    highlights: [
      "Comprehensive oral examinations",
      "Professional tartar and plaque removal",
      "Digital X-rays and imaging",
      "Oral cancer screenings",
    ],
    details:
      "We believe that prevention is the most effective way to protect your smile. By visiting us every six months, our hygienists can remove hard-to-reach plaque, while our dentists monitor your oral health to catch early signs of decay or gum disease.",
  },
  {
    id: 2,
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    description:
      "Transform your smile with our premium cosmetic solutions. From professional teeth whitening to flawless porcelain veneers, we build confidence.",
    shortDescription:
      "Transformative treatments including veneers and teeth whitening.",
    highlights: [
      "Professional teeth whitening",
      "Custom porcelain veneers",
      "Dental bonding",
      "Complete smile makeovers",
    ],
    details:
      "Your smile is your most important accessory. Whether you want to correct chips, gaps, severe discoloration, or just brighten your teeth by a few shades, our cosmetic treatments are personalized to deliver natural, stunning results.",
  },
  {
    id: 3,
    slug: "dental-implants",
    title: "Dental Implants",
    description:
      "Restore missing teeth permanently with state-of-the-art dental implants that look, feel, and function just like your natural teeth.",
    shortDescription:
      "Permanent, natural-looking replacements for missing teeth.",
    highlights: [
      "Single tooth replacement",
      "Implant-supported bridges",
      "All-on-4 full arch restoration",
      "3D guided implant placement",
    ],
    details:
      "Dental implants are the gold standard for replacing missing teeth. A titanium post acts as a new tooth root, stimulating your jawbone to prevent bone loss, while a custom-crafted porcelain crown provides a beautiful and durable chewing surface.",
  },
  {
    id: 4,
    slug: "invisalign-orthodontics",
    title: "Invisalign Clear Aligners",
    description:
      "Achieve the perfectly straight smile you've always wanted without the metal. Invisalign uses virtually invisible aligners to gently shift your teeth.",
    shortDescription: "Virtually invisible teeth straightening system.",
    highlights: [
      "Custom clear aligners",
      "Faster treatment times than traditional braces",
      "Removable for eating and brushing",
      "Comfortable and discreet",
    ],
    details:
      "Invisalign aligners are custom-made using advanced 3D scanning technology to ensure a precise fit. They are virtually invisible, allowing you to straighten your teeth with maximum comfort and zero lifestyle interruptions.",
  },
  {
    id: 5,
    slug: "restorative-dentistry",
    title: "Restorative Dentistry",
    description:
      "Repair damaged or decayed teeth with natural-looking restorative treatments, engineered to bring back your tooth's strength and function.",
    shortDescription: "Repair and restore damaged or decayed teeth.",
    highlights: [
      "Tooth-colored composite fillings",
      "Porcelain dental crowns",
      "Dental bridges",
      "Root canal therapy",
    ],
    details:
      "When a tooth is compromised by decay or trauma, our restorative treatments can save it. We use modern, metal-free materials that blend seamlessly with your natural teeth while providing incredible durability for years to come.",
  },
  {
    id: 6,
    slug: "emergency-dental-care",
    title: "Emergency Dental Care",
    description:
      "Experiencing severe tooth pain or a dental injury? We offer same-day emergency appointments to get you out of pain and protect your smile.",
    shortDescription: "Same-day appointments for urgent dental issues.",
    highlights: [
      "Severe toothaches",
      "Chipped or knocked-out teeth",
      "Lost crowns or fillings",
      "Dental abscesses",
    ],
    details:
      "Dental emergencies happen when you least expect them. Whether you're dealing with sudden pain, trauma to the mouth, or a loose restoration, our team acts quickly to relieve your discomfort and provide urgent care.",
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}
