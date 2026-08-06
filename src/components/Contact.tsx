"use client";

import { Send } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Contact() {
  const leftColRef = useScrollReveal();
  const rightColRef = useScrollReveal({ delay: 0.2 });
  return (
    <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10 border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left Column: Info & Links */}
        <div
          ref={leftColRef}
          className=""
        >
          <p className="text-brand-400 font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-slate-100 mb-8 tracking-tight">
            Send a message
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md mb-16 font-light">
            I'm always open to discussing new opportunities, interesting projects, or just a friendly chat about tech. Based in Sri Lanka, working globally.
          </p>

          <div className="flex flex-col border-t border-white/5">
            <div className="flex items-center border-b border-white/5 py-6 group">
              <span className="w-32 text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-widest group-hover:text-slate-400 transition-colors">
                GITHUB
              </span>
              <a
                href="https://github.com/Ramuthu-creator"
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 text-sm md:text-base hover:text-brand-400 transition-colors"
              >
                github.com/Ramuthu-creator
              </a>
            </div>
            
            <div className="flex items-center border-b border-white/5 py-6 group">
              <span className="w-32 text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-widest group-hover:text-slate-400 transition-colors">
                LINKEDIN
              </span>
              <a
                href="https://linkedin.com/in/ramuthu-theniya"
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 text-sm md:text-base hover:text-brand-400 transition-colors"
              >
                linkedin.com/in/ramuthu-theniya
              </a>
            </div>

            <div className="flex items-center border-b border-white/5 py-6 group">
              <span className="w-32 text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-widest group-hover:text-slate-400 transition-colors">
                EMAIL
              </span>
              <a
                href="mailto:tramuthu@gmail.com"
                className="text-slate-300 text-sm md:text-base hover:text-brand-400 transition-colors"
              >
                tramuthu@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div
          ref={rightColRef}
          className=""
        >
          <form 
            className="flex flex-col gap-8"
            action="https://formspree.io/f/xkjwgozp"
            method="POST"
          >
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className="bg-transparent border border-white/10 p-4 text-slate-200 text-sm placeholder:text-slate-700 focus:outline-none focus:border-brand-400 transition-colors w-full"
                required
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                className="bg-transparent border border-white/10 p-4 text-slate-200 text-sm placeholder:text-slate-700 focus:outline-none focus:border-brand-400 transition-colors w-full"
                required
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="message" className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project or just say hi..."
                rows={5}
                className="bg-transparent border border-white/10 p-4 text-slate-200 text-sm placeholder:text-slate-700 focus:outline-none focus:border-brand-400 transition-colors resize-none w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-max bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs tracking-widest uppercase px-8 py-4 flex items-center gap-3 transition-colors"
            >
              <Send size={16} className="text-white" />
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
