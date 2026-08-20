"use client";

import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Starfield from "./Starfield";

const projects = [
  {
    id: "PROJ_ID: RENTXPRESS",
    year: "2023",
    title: "RentXpress",
    description: "Car rental system with real-time availability and booking management, built using HTML, CSS, JavaScript, and MySQL.",
    tech: ["HTML", "CSS", "JAVASCRIPT", "MYSQL"],
    github: "https://github.com/Ramuthu-creator/rentxpress",
  },
  {
    id: "PROJ_ID: TECHCARE",
    year: "2025",
    title: "Tech Care",
    description: "A web application for managing and resolving IT support tickets, providing a centralized platform for users to submit requests and track their resolution.",
    tech: ["REACT", "TAILWIND", "JAVASCRIPT", "FIREBASE"],
  },
  {
    id: "PROJ_ID: NEIGHBOURKNOT",
    year: "2026",
    title: "NeighbourKnot",
    description: "A cross-platform mobile app for sharing skills through a token-based system, where users earn tokens by teaching others and use them to learn new skills from the community.",
    tech: ["HTML", "CSS", "FIREBASE", "JAVASCRIPT"],
    github: "https://github.com/Ramuthu-creator/neighbourknot",
    live: "https://neighbourknot.web.app/",
  },
  {
    id: "PROJ_ID: FIN-PLAN",
    year: "2026",
    title: "Fin-Plan",
    description: "A comprehensive Flutter-based mobile application for managing personal finances. Features include expense tracking, budget management, financial analytics, and goal planning with a secure data management system.",
    tech: ["FLUTTER", "DART", "C++", "CMAKE"],
    github: "https://github.com/Ramuthu-creator/Fin-Plan",
    live: "#",
  },
  {
    id: "PROJ_ID: HAND-LANDMARK",
    year: "2025",
    title: "Hand Landmark Model",
    description: "A computer vision application that detects and visualizes hand landmarks using Google's MediaPipe framework. Features real-time tracking, animated rainbow connections, and multi-hand detection.",
    tech: ["PYTHON", "OPENCV", "MEDIAPIPE", "NUMPY"],
    github: "https://github.com/Ramuthu-creator/Hand-Land-Mark-Model",
    live: "#",
  },
  {
    id: "PROJ_ID: FLOODGUARDLK",
    year: "ONGOING",
    title: "FloodGuardLK",
    description: "An IoT-driven flood early warning system for Sri Lanka. Features multi-sensor fusion, edge computing for offline resilience, Azure IoT Hub analytics, and a multilingual citizen mobile app for real-time alerts.",
    tech: ["IOT", "AZURE", "LORAWAN", "MQTT", "RASPBERRY PI"],
  },
  {
    id: "PROJ_ID: ProjectBridge",
    year: "2026",
    title: "ProjectBridge",
    description: "A decentralized full-stack ecosystem designed to translate undergraduate IT research into commercial ventures. It securely connects students with tech investors using SHA-256 hashing for intellectual property protection.",
    tech: ["MONGODB", "EXPRESS.JS", "REACT", "NODE.JS"],
    github: "https://github.com/Ramuthu-creator/ProjectBridge",
    live: "https://project-bridge-puce.vercel.app/",
  },
];

export default function Projects() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useScrollReveal();

  useGSAP(() => {
    if (!targetRef.current || !trackRef.current) return;

    const media = gsap.matchMedia();

    // The horizontal track is a desktop interaction. On phones its transformed
    // width can enlarge Safari's page canvas and make the whole site pan sideways.
    media.add("(min-width: 769px)", () => {
      gsap.to(trackRef.current, {
        x: () => {
          if (!trackRef.current) return 0;
          const offset = window.innerWidth > 1024 ? 96 : 48;
          return -(trackRef.current.scrollWidth - window.innerWidth + offset);
        },
        ease: "none",
        scrollTrigger: {
          trigger: targetRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => media.revert();
  }, { scope: targetRef });

  return (
    <section id="projects" ref={targetRef} className="relative h-auto md:h-[300vh] border-t border-white/5 z-10 bg-transparent overflow-x-clip">
      <div className="relative md:sticky md:top-0 h-auto md:h-screen flex flex-col justify-center overflow-hidden py-24">
        <Starfield />

        {/* Header Section */}
        <div ref={headerRef} className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full mb-12 relative z-10">
          <p className="text-brand-400 font-mono text-sm tracking-[0.2em] uppercase mb-4">
            Deployments
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-100">
            Core Projects
          </h2>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="px-6 md:pl-12 md:pr-0 lg:pl-24 relative z-10">
          <div ref={trackRef} className="flex flex-col md:flex-row gap-6 md:gap-0 md:border-t md:border-l border-white/10 w-full md:w-fit">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative flex-none w-full md:w-[500px] border border-white/10 md:border-l-0 md:border-t-0 p-6 md:p-8 flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-500 min-h-[360px] md:min-h-[400px]"
              >
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-slate-500 font-mono text-xs tracking-widest">{project.id}</span>
                    <span className="text-slate-500 font-mono text-xs">{project.year}</span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-slate-200 mb-4 group-hover:text-brand-400 transition-colors">
                    {project.live && project.live !== "#" ? (
                      <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                        {project.title}
                      </a>
                    ) : (
                      <span className="flex items-center gap-2">{project.title}</span>
                    )}
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

                  <div className="flex gap-4 text-slate-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    {project.github && project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-brand-400 transition-colors"
                        aria-label="GitHub Link"
                      >
                        <FaGithub size={18} />
                      </a>
                    )}
                    {project.live && project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-brand-400 transition-colors"
                        aria-label="External Link"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
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
