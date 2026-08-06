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
  metadataBase: new URL('https://ramuthu-theniya-portfolio.web.app'),
  title: "Ramuthu Theniya | Software Developer & Web Designer",
  description: "Portfolio of Ramuthu Theniya, a Software Developer and Web Designer specializing in React, Node.js, and building modern web applications.",
  openGraph: {
    title: "Ramuthu Theniya | Software Developer & Web Designer",
    description: "Portfolio of Ramuthu Theniya, a Software Developer and Web Designer specializing in React, Node.js, and building modern web applications.",
    images: [
      {
        url: "/assets/DP.png",
        width: 1200,
        height: 630,
        alt: "Ramuthu Theniya DP",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramuthu Theniya | Software Developer & Web Designer",
    description: "Portfolio of Ramuthu Theniya, a Software Developer and Web Designer specializing in React, Node.js, and building modern web applications.",
    images: ["/assets/DP.png"],
  },
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
