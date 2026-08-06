"use client";

import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      
      {/* Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full mix-blend-screen filter blur-[60px] md:blur-[100px] opacity-70 animate-blob"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[60px] md:blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-screen filter blur-[60px] md:blur-[100px] opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20"></div>
      </div>

      <Navbar />

      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* FOOTER */}
      <footer className="py-8 text-center text-slate-500 font-mono text-sm border-t border-white/5 flex flex-col items-center gap-4 relative z-10 bg-dark-900/50 backdrop-blur-sm">
        <p>
          Designed & Built by{" "}
          <a href="#" className="text-brand-400 hover:text-brand-300 transition-colors">
            Ramuthu Theniya
          </a>
        </p>
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </>
  );
}
