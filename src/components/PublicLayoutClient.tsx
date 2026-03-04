"use client";

import dynamic from "next/dynamic";
import Footer from "./clara-dentist/Footer";
import Header from "./clara-dentist/Header";


const ChatWidget = dynamic(
  () => import("@/components/chatbot/ChatWidget"),
  { ssr: false }
);

export function PublicLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-canvas focus:rounded-lg focus:shadow-lg focus:text-sky focus:font-medium"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main" className="bg-canvas">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
