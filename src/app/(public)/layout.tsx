import type { Metadata } from "next";
import { PublicLayoutClient } from "@/components/PublicLayoutClient";
import { siteMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: {
    default: "Special Smiles, Ltd. | Philadelphia",
    template: "%s | Special Smiles, Ltd.",
  },
  description:
    "At our outpatient dental facility in Philadelphia, special needs dentists provide comprehensive oral healthcare to individuals with intellectual, psychological or developmental disabilities who require general anesthesia to safely receive care.",
  openGraph: {
    type: "website",
    images: [
      {
        url: siteMetadata.openGraph.imagePath,
        width: siteMetadata.openGraph.imageWidth,
        height: siteMetadata.openGraph.imageHeight,
        type: siteMetadata.openGraph.imageType,
        alt: siteMetadata.name,
      },
    ],
  },
  robots: { index: true, follow: true },
  alternates:
    process.env.NEXT_PUBLIC_SITE_URL
      ? { canonical: process.env.NEXT_PUBLIC_SITE_URL }
      : undefined,
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayoutClient>{children}</PublicLayoutClient>;
}
