"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";

export default function About() {
  const leftColRef = useScrollReveal();
  const rightColRef = useScrollReveal({ delay: 0.2 });

  return (
    <section id="about" className="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-white/5 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* Left Column: Bio & Stats */}
        <div
          ref={leftColRef}
          className="flex flex-col gap-8 opacity-0 translate-y-10"
        >
          <div>
            <p className="text-brand-400 font-mono text-sm tracking-[0.2em] uppercase mb-4">
              ABOUT
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-100 tracking-tight leading-tight mb-8">
              Engineering with purpose.
            </h2>

            <div className="space-y-6 text-slate-400 text-sm md:text-base leading-relaxed">
              <p>
                I am an undergraduate student who is passionate about software engineering and building web applications. I have experience working with technologies like React and Node.js through my projects. I enjoy learning new things and trying out new technologies to improve my skills.
              </p>
              <p>
                Right now, I am focusing on improving my development skills and creating accessible and inclusive digital experiences. I am also preparing to start my career in the IT industry.
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-12 mt-8 pt-8 border-t border-white/5">
            <div className="flex flex-col gap-2">
              <span className="text-4xl font-display text-brand-400 font-medium">3+</span>
              <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">YRS CODING</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl font-display text-brand-400 font-medium">10+</span>
              <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">PROJECTS</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl font-display text-brand-400 font-medium">5+</span>
              <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">TECH STACKS</span>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Info Card */}
        <div
          ref={rightColRef}
          className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 md:p-10 flex flex-col gap-8 backdrop-blur-sm opacity-0 translate-y-10"
        >
          <div className="flex flex-col gap-3 border-b border-white/5 pb-8">
            <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">EDUCATION</span>
            <h3 className="text-slate-200 font-medium text-lg">Bachelor (Hons.) in Software Engineering</h3>
            <p className="text-sm text-slate-400 font-light">Cinec Campus, Sri Lanka</p>
          </div>

          <div className="flex flex-col gap-3 border-b border-white/5 pb-8">
            <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">LOCATION</span>
            <h3 className="text-slate-200 font-medium text-lg flex items-center gap-2">
              Sri Lanka 🇱🇰
            </h3>
            <p className="text-sm text-slate-400 font-light">Open to remote globally</p>
          </div>

          <div className="flex flex-col gap-3 border-b border-white/5 pb-8">
            <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">STARTED</span>
            <h3 className="text-slate-200 font-medium text-lg">2021</h3>
            <p className="text-sm text-slate-400 font-light">Building side projects and learning</p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[10px] text-brand-400 font-mono tracking-widest uppercase flex items-center gap-2">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              FUN FACT
            </span>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              I love building simple, user-friendly, and highly useful applications that solve real-world problems.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
