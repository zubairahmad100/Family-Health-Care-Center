/**
 * Content from fhccgla.com for FAQs, news, and static copy.
 */

/** Hero carousel slides – images only. */
export const heroCarouselSlides = [
  { id: "1", image: "/images/hero/hero-1.png", alt: "Professional dental care at FHCCGLA" },
  { id: "2", image: "/images/hero/hero-2.png", alt: "State of the art dental facility" },
  { id: "3", image: "/images/hero/hero-3.png", alt: "Patient-first approach with beautiful smiles" },
  { id: "4", image: "/images/hero/hero-4.png", alt: "Comprehensive oral health checkup" },
] as const;

export const faqsData: { id: string; question: string; answer: string }[] = [
  {
    id: "preventative-care",
    question: "How often should I visit the dentist for a checkup?",
    answer:
      "We recommend visiting FHCCGLA at least every six months for a routine exam and professional cleaning. Regular visits help us catch and prevent dental issues early, keeping your smile healthy and bright.",
  },
  {
    id: "teeth-whitening",
    question: "Is professional teeth whitening safe for my enamel?",
    answer:
      "Yes, professional teeth whitening at FHCCGLA is completely safe. We use ADA-approved bleaching agents that lift deep stains without damaging your tooth enamel. It's much safer and more effective than over-the-counter kits.",
  },
  {
    id: "dental-implants",
    question: "Am I a good candidate for dental implants?",
    answer:
      "Most healthy adults with missing teeth are great candidates for implants. You need adequate jawbone density and healthy gums to support the implant. We offer complimentary consultations to assess your mouth and determine if implants are right for you.",
  },
  {
    id: "invisalign",
    question: "How long does Invisalign treatment usually take?",
    answer:
      "Treatment duration varies based on the complexity of your case, but most adult patients complete their Invisalign journey in 12 to 18 months. You will start seeing noticeable results in just a few weeks.",
  },
  {
    id: "dental-anxiety",
    question: "What do you do for patients with dental anxiety?",
    answer:
      "We understand that going to the dentist can be stressful. We offer a calm, luxurious environment and gentle care. For patients with severe anxiety, we provide various sedation options, including nitrous oxide (laughing gas) and oral conscious sedation.",
  },
  {
    id: "payment-options",
    question: "What payment options and insurances do you accept?",
    answer:
      "We accept most major PPO dental insurance plans. For out-of-pocket expenses, we accept all major credit cards, HSA/FSA cards, and offer flexible financing through CareCredit so you can get the care you need immediately.",
  },
];

export const newsItems = [
  {
    slug: "new-3d-imaging-technology",
    title: "FHCCGLA Upgrades to Ultra-Precise 3D CBCT Imaging",
    excerpt:
      "We are excited to announce the integration of a new Cone Beam Computed Tomography (CBCT) scanner at our Los Angeles clinic. This state-of-the-art 3D imaging allows our doctors to place dental implants with unmatched precision and safety.",
    date: "2025",
    category: "Technology",
    image: "/images/hero/hero-1.png",
  },
  {
    slug: "award-winning-cosmetic-dentistry",
    title: "Voted Best Cosmetic Dentists in Greater Los Angeles",
    excerpt:
      "FHCCGLA is deeply honored to be recognized by the LA Health Alliance as the top practice for Cosmetic Dentistry in 2025, highlighting our commitment to flawless porcelain veneers and comprehensive smile makeovers.",
    date: "2025",
    category: "Awards",
    image: "/images/hero/hero-4.png",
  },
  {
    slug: "free-teeth-whitening-new-patients",
    title: "Spring Special: Complimentary Teeth Whitening Initiative",
    excerpt:
      "To welcome new patients to our growing practice, we are offering complimentary professional teeth whitening with every comprehensive exam and cleaning completed this Spring.",
    date: "2024",
    category: "Promotions",
    image: "/images/hero/hero-3.png",
  },
  {
    slug: "understanding-invisalign-benefits",
    title: "Why More Adults Are Choosing Invisalign Over Braces",
    excerpt:
      "It is never too late to achieve the straight smile you've always wanted. Discover how modern Invisalign clear aligners can quickly and discreetly transform your smile, without metal brackets.",
    date: "2024",
    category: "Education",
    image: "/images/hero/hero-2.png",
  },
];

export const teamMembers = [
  {
    id: "dr-emily-chen",
    name: "Emily Chen, DDS",
    title: "Chief Dental Officer",
    image: "/images/team/doctor-1.png",
    alt: "Emily Chen, DDS",
    bio: "Dr. Chen leads our clinical team with over 15 years of experience in comprehensive, reconstructive, and cosmetic dentistry. She received her dental degree from the University of Southern California and completed advanced residency training. At FHCCGLA, she is dedicated to ensuring every patient receives beautiful results in a safe and comfortable environment.",
  },
  {
    id: "dr-david-miller",
    name: "David Miller, DMD",
    title: "Cosmetic Dentist",
    image: "/images/team/doctor-2.png",
    alt: "David Miller, DMD",
    bio: "Dr. Miller specializes in aesthetic smile makeovers and porcelain veneers. He graduated from UCLA School of Dentistry and uses a highly artistic approach combined with digital smile design technology. He strives to create naturally stunning smiles tailored to each individual patient's facial structure.",
  },
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    title: "Practice Manager",
    image: "/images/team/manager-1.png",
    alt: "Sarah Jenkins",
    bio: "With a background in luxury healthcare administration, Sarah ensures our clinics run smoothly every day. She is passionate about providing a red-carpet patient experience from the moment you walk through the doors, coordinating seamlessly with our clinical team.",
  },
  {
    id: "dr-michael-rodriguez",
    name: "Michael Rodriguez, DDS",
    title: "Implant Specialist",
    image: "/images/team/doctor-3.png",
    alt: "Michael Rodriguez, DDS",
    bio: "Dr. Rodriguez brings extensive surgical experience to FHCCGLA. He takes pride in providing quality comprehensive implant placements and full-arch restorations, allowing patients with missing teeth to eat, speak, and smile with absolute confidence.",
  },
];
