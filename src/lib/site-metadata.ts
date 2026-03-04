/**
 * Site metadata for FHCCGLA.
 * Used across app/layout.tsx and (public)/layout.tsx for consistent SEO and social tags.
 */

const baseUrl =
  typeof process.env.NEXT_PUBLIC_SITE_URL === "string" && process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "https://fhccgla.com";

export const siteMetadata = {
  name: "FHCCGLA",
  defaultTitle: "Family Health Care Centers of Greater Los Angeles | Dental Care",
  defaultDescription:
    "Family Health Care Centers of Greater Los Angeles provide comprehensive oral care for adults and children at our outpatient facility.",
  baseUrl,
  /** robots content from source site */
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    locale: "en_US" as const,
    type: "website" as const,
    siteName: "FHCCGLA",
    /** Default OG image path; resolve with metadataBase. Add /og-image.jpg to public for previews. */
    imagePath: "/og-image.jpg",
    imageWidth: 1835,
    imageHeight: 922,
    imageType: "image/jpeg",
  },
  themeColor: "#ffffff",
  /** Favicon / app icon (used in metadata.icons) */
  iconPath: "/images/fhccgla/icon.png",
  /** Optional: Google site verification (from source meta name="google-site-verification") */
  googleSiteVerification: "google547ad8aa8f5d8f0b",
} as const;
