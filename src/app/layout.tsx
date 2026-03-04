import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import "@/lib/env";
import { siteMetadata } from "@/lib/site-metadata";
import CursorEffect from "@/components/CursorEffect";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.baseUrl),
  title: {
    default: siteMetadata.defaultTitle,
    template: "%s | FHCCGLA",
  },
  description: siteMetadata.defaultDescription,
  robots: siteMetadata.robots,
  themeColor: siteMetadata.themeColor,
  openGraph: {
    locale: siteMetadata.openGraph.locale,
    type: siteMetadata.openGraph.type,
    siteName: siteMetadata.openGraph.siteName,
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
    url: siteMetadata.baseUrl,
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
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
  },
  alternates: {
    canonical: siteMetadata.baseUrl,
  },
  verification: {
    google: siteMetadata.googleSiteVerification,
  },
  icons: {
    icon: { url: siteMetadata.iconPath, type: "image/png" },
    apple: { url: siteMetadata.iconPath, type: "image/png" },
  },
  other: {
    "msapplication-TileColor": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={mulish.variable} suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <CursorEffect />
          {children}
        </Providers>
      </body>
    </html>
  );
}
