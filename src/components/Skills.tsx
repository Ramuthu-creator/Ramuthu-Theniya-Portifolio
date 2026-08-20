"use client";

import { MonitorSmartphone, Server, Cloud, Smartphone } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "../hooks/useScrollReveal";
import Starfield from "./Starfield";

const skillCategories = [
  {
    title: "Frontend",
    icon: MonitorSmartphone,
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express", "Python", "PostgreSQL", "MySQL"],
  },
  {
    title: "Tools & Cloud",
    icon: Cloud,
    skills: ["Git", "Docker", "AWS", "Firebase"],
  },
  {
    title: "Mobile",
    icon: Smartphone,
    skills: ["React Native", "Flutter", "iOS UI/UX"],
  },
];

export default function Skills() {
  const headerRef = useScrollReveal();
  const gridRef = useStaggerReveal(".skill-card");

  return (
    <section id="skills" className="relative w-full border-t border-white/5 z-10 overflow-hidden">
      <Starfield />
      <div className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
        <div ref={headerRef} className="mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-100 mb-4 flex items-center gap-4">
            <span className="w-8 md:w-16 h-px bg-brand-400 hidden sm:block"></span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
              My Skills
            </span>
            <span className="w-8 md:w-16 h-px bg-brand-400 sm:hidden block"></span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg font-light">
            Technologies and tools I work with on a daily basis.
          </p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="skill-card glass-panel p-8 rounded-2xl hover:border-brand-500/50 hover:bg-white/[0.05] hover:-translate-y-2 transition-all duration-300 group shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6 text-brand-400 group-hover:scale-110 origin-left transition-transform duration-300">
                  <Icon size={24} />
                  <h3 className="text-xl font-display font-bold text-slate-100">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-1.5 bg-[#0a0a0a]/50 text-slate-300 text-sm font-medium rounded-full border border-white/10 hover:border-brand-400 hover:text-brand-400 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
