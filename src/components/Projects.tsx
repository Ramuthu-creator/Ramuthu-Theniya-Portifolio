"use client";

import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const projects = [
  {
    id: "PROJ_ID: RENTXPRESS",
    year: "2023",
    title: "RentXpress",
    description: "Car rental system with real-time availability and booking management, built using HTML, CSS, JavaScript, and MySQL.",
    tech: ["HTML", "CSS", "JAVASCRIPT", "MYSQL"],
    github: "https://github.com/Ramuthu-creator/rentxpress",
    live: "https://github.com/Ramuthu-creator/rentxpress",
  },
  {
    id: "PROJ_ID: TECHCARE",
    year: "2023",
    title: "Tech Care",
    description: "A web application for managing and resolving IT support tickets, providing a centralized platform for users to submit requests and track their resolution.",
    tech: ["REACT", "TAILWIND", "JAVASCRIPT", "FIREBASE"],
    github: "https://github.com/Ramuthu-creator/tech-care",
    live: "https://github.com/Ramuthu-creator/tech-care",
  },
  {
    id: "PROJ_ID: NEIGHBOURKNOT",
    year: "2024",
    title: "NeighbourKnot",
    description: "A cross-platform mobile app for sharing skills through a token-based system, where users earn tokens by teaching others and use them to learn new skills from the community.",
    tech: ["HTML", "CSS", "FIREBASE", "JAVASCRIPT"],
    github: "https://github.com/Ramuthu-creator/neighbourknot",
    live: "https://github.com/Ramuthu-creator/neighbourknot",
  },
  {
    id: "PROJ_ID: FIN-PLAN",
    year: "2024",
    title: "Fin-Plan",
    description: "A comprehensive Flutter-based mobile application for managing personal finances. Features include expense tracking, budget management, financial analytics, and goal planning with a secure data management system.",
    tech: ["FLUTTER", "DART", "C++", "CMAKE"],
    github: "https://github.com/Ramuthu-creator/Fin-Plan",
    live: "#",
  },
  {
    id: "PROJ_ID: FLOODGUARDLK",
    year: "ONGOING",
    title: "FloodGuardLK",
    description: "An IoT-driven flood early warning system for Sri Lanka. Features multi-sensor fusion, edge computing for offline resilience, Azure IoT Hub analytics, and a multilingual citizen mobile app for real-time alerts.",
    tech: ["IOT", "AZURE", "LORAWAN", "MQTT", "RASPBERRY PI"],
    github: "#",
    live: "#",
  },
  {
    id: "PROJ_ID: ProjectBridge",
    year: "ONGOING",
    title: "ProjectBridge",
    description: "A decentralized full-stack ecosystem designed to translate undergraduate IT research into commercial ventures. It securely connects students with tech investors using SHA-256 hashing for intellectual property protection.",
    tech: ["MONGODB", "EXPRESS.JS", "REACT", "NODE.JS"],
    github: "#",
    live: "#",
  },
];

export default function Projects() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useScrollReveal();

  useGSAP(() => {
    if (!targetRef.current || !trackRef.current) return;

    // Use GSAP ScrollTrigger to scrub horizontal translate based on vertical scroll
    gsap.to(trackRef.current, {
      xPercent: -65,
      ease: "none",
      scrollTrigger: {
        trigger: targetRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, { scope: targetRef });

  return (
    <section id="projects" ref={targetRef} className="relative h-[300vh] border-t border-white/5 z-10 bg-transparent">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-24">
        
        {/* Header Section */}
        <div ref={headerRef} className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full mb-12 opacity-0 translate-y-10">
          <p className="text-brand-400 font-mono text-sm tracking-[0.2em] uppercase mb-4">
            Deployments
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-100">
            Core Projects
          </h2>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="pl-6 md:pl-12 lg:pl-24">
          <div ref={trackRef} className="flex gap-0 border-t border-l border-white/10 w-fit">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative flex-none w-[85vw] md:w-[500px] border-r border-b border-white/10 p-8 flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-500 min-h-[400px]"
              >
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-slate-500 font-mono text-xs tracking-widest">{project.id}</span>
                    <span className="text-slate-500 font-mono text-xs">{project.year}</span>
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-slate-200 mb-4 group-hover:text-brand-400 transition-colors">
                    <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                      {project.title}
                    </a>
                  </h3>
                  
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-slate-500 font-mono text-[10px] tracking-wider uppercase border border-white/10 px-2 py-1 rounded-sm bg-white/[0.02]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-brand-400 transition-colors"
                      aria-label="GitHub Link"
                    >
                      <FaGithub size={18} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-brand-400 transition-colors"
                      aria-label="External Link"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
                
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 to-brand-500/0 group-hover:from-brand-500/5 group-hover:to-transparent pointer-events-none transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
