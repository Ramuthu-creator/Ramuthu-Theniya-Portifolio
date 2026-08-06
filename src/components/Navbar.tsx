"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    navLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(link.href.substring(1)),
          onEnterBack: () => setActiveSection(link.href.substring(1)),
        });
      }
    });
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 py-6">
      <div
        className={`mx-auto max-w-7xl px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${
          isScrolled ? "glass-nav rounded-2xl mx-4 mt-2 py-4" : "bg-transparent py-2"
        }`}
      >
        <a
          href="#home"
          className="text-2xl font-display font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400 hover:scale-105 transition-transform"
        >
          RT<span className="text-slate-100">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-brand-400 ${
                activeSection === link.href.substring(1) ? "text-brand-400" : "text-slate-300"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-brand-400 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 bg-dark-800/95 backdrop-blur-xl shadow-2xl border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col py-4 px-6 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left text-lg font-medium py-3 border-b border-white/5 transition-colors ${
                    activeSection === link.href.substring(1)
                      ? "text-brand-400"
                      : "text-slate-300 hover:text-brand-400"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
