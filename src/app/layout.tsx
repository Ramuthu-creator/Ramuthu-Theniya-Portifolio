import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ramuthu Theniya | Portfolio",
  description: "Building digital experiences that combine beautiful design with robust engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-[#0a0a0a] text-slate-50 font-sans selection:bg-[#0ea5e9]/30 selection:text-brand-200 relative min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
