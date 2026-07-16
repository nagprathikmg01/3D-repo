import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg className="fill-current" width={size} height={size} viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

type ProjectType = "All" | "AI/ML" | "Full-Stack" | "Cloud";

interface Project {
  title: string;
  description: string;
  tech: string;
  github: string;
  live?: string;
  type: Exclude<ProjectType, "All">;
  finalYear?: boolean;
}

// 3D tilt card wrapper component
function TiltCard({ children, className }: { children: React.ReactNode; className: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlowPos({ x: 50, y: 50 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => setIsHovered(true);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? 'transform 0.08s ease' : 'transform 0.5s ease',
      }}
    >
      {/* Inner glow that follows cursor */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 200px at ${glowPos.x}% ${glowPos.y}%, rgba(79,70,229,0.12), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function Showcase() {
  const [filter, setFilter] = useState<ProjectType>("All");

  const projects: Project[] = [
    {
      title: "GeoQuest — AI-Driven Travel Planner",
      description: "AI-powered travel itinerary builder. Generates daily plans optimized for travel pace, budget splits, and personal interests using Claude & Llama on NVIDIA NIM, with interactive Leaflet maps.",
      tech: "React 18 + TypeScript + Express.js + Prisma + PostgreSQL + Redis + Claude 3.5 Sonnet + Meta Llama 3.1 + NVIDIA NIM",
      github: "https://github.com/nagprathikmg01/GeoQuest",
      type: "AI/ML",
    },
    {
      title: "Adaptive Drone Navigation & Drift Detection",
      description: "Transformer-based navigation model with 92% drift forecast accuracy and online learning. Tested in AirSim environment with Streamlit analytics dashboard.",
      tech: "Python + PyTorch + Transformers + Streamlit + AirSim",
      github: "https://github.com/nagprathikmg01/drone-drift-detection",
      type: "AI/ML",
      finalYear: true,
    },
    {
      title: "ClubOS — Cross-Platform Club Management",
      description: "Management system for student clubs. Features Kanban task boards, fiscal budget logs, vault inventory tracking, real-time chat, and automated PDF certificate generation.",
      tech: "Flutter + Dart + Firebase + Firestore + fl_chart",
      github: "https://github.com/nagprathikmg01/Club-OS",
      type: "Full-Stack",
    },
    {
      title: "GreenCart — Agentic AI Sustainable Shopping",
      description: "Sustainable shopping assistant with 3 autonomous agents (Analyzer, Search, Education) intent parsing, custom RAG pipeline, and real-time carbon footprint suggestions.",
      tech: "React + JavaScript + RAG + Agentic AI + Vercel",
      github: "https://github.com/nagprathikmg01/GreenCart",
      live: "https://green-cart-blush-xi.vercel.app",
      type: "AI/ML",
    },
    {
      title: "Karnataka Agricultural Analytics Platform",
      description: "Smart India Hackathon project. Features an interactive 31-district SVG map of Karnataka, providing soil metrics, local rainfall data, crop pricing forecasts, and Gemini API RAG.",
      tech: "React + TypeScript + Vite + Tailwind CSS + Gemini API + Vercel",
      github: "https://github.com/nagprathikmg01/SIH-Project",
      type: "Cloud",
    },
  ];

  const filteredProjects = filter === "All"
    ? projects
    : projects.filter(p => p.type === filter);

  // Styling helper for project types
  const getTypeStyles = (type: string) => {
    switch (type) {
      case "AI/ML":
        return {
          badge: "border-indigo-500/30 text-indigo-600 dark:text-indigo-400 bg-indigo-500/8",
          border: "border-indigo-500/20 dark:border-indigo-500/15 hover:border-indigo-500/60 dark:hover:border-indigo-500/40",
          accent: "#4f46e5",
        };
      case "Full-Stack":
        return {
          badge: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/8",
          border: "border-emerald-500/20 dark:border-emerald-500/15 hover:border-emerald-500/60 dark:hover:border-emerald-500/40",
          accent: "#10b981",
        };
      case "Cloud":
        return {
          badge: "border-violet-500/30 text-violet-600 dark:text-violet-400 bg-violet-500/8",
          border: "border-violet-500/20 dark:border-violet-500/15 hover:border-violet-500/60 dark:hover:border-violet-500/40",
          accent: "#7c3aed",
        };
      default:
        return {
          badge: "border-slate-500/20 text-slate-400 bg-slate-500/5",
          border: "border-slate-200 dark:border-surfaceBorder hover:border-primaryBlue",
          accent: "#4f46e5",
        };
    }
  };

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-darkBg text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[-15%] w-[500px] h-[500px] bg-indigo-500/6 rounded-full blur-[160px]" />
        <div className="absolute bottom-[20%] left-[-15%] w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono uppercase tracking-[0.25em] text-glowIndigo font-bold"
          >
            My Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mt-2 text-slate-900 dark:text-white"
          >
            Portfolio Showcase
          </motion.h2>
          <div className="h-[3px] w-20 bg-gradient-to-r from-primaryBlue via-secondaryPurple to-brightTeal mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16">
          {(["All", "AI/ML", "Full-Stack", "Cloud"] as ProjectType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs uppercase font-mono tracking-widest border transition-all duration-300 font-bold ${
                filter === tab
                  ? "bg-gradient-to-r from-primaryBlue to-secondaryPurple text-white border-transparent shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                  : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-primaryBlue/40 dark:hover:border-primaryBlue/30"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => {
              const styles = getTypeStyles(project.type);
              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 30 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                >
                  <TiltCard className={`rounded-2xl border bg-slate-50/50 dark:bg-surface/50 p-6 flex flex-col justify-between backdrop-blur-md relative group overflow-hidden h-full ${styles.border} transition-all duration-300`}>
                    {/* Accent top bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                      style={{ background: `linear-gradient(90deg, transparent, ${styles.accent}50, transparent)` }}
                    />

                    {/* Holographic Shimmer Sweep */}
                    <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                    {/* Header / Badges */}
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider font-bold uppercase border ${styles.badge}`}>
                          {project.type}
                        </span>
                        {project.finalYear && (
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider font-bold uppercase border border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/8 animate-pulse">
                            Final Year Project
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans mb-6">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Tags & Links */}
                    <div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.split("+").map((techName) => {
                          const name = techName.trim();
                          // Brand color mapping
                          const techColor = (() => {
                            if (/react|next/i.test(name)) return "border-cyan-500/20 text-cyan-600 dark:text-cyan-400 bg-cyan-500/5";
                            if (/pytorch|python/i.test(name)) return "border-orange-500/20 text-orange-600 dark:text-orange-400 bg-orange-500/5";
                            if (/gcp|firebase|google/i.test(name)) return "border-yellow-500/20 text-yellow-600 dark:text-yellow-400 bg-yellow-500/5";
                            if (/typescript|ts/i.test(name)) return "border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/5";
                            if (/flutter|dart/i.test(name)) return "border-sky-500/20 text-sky-600 dark:text-sky-400 bg-sky-500/5";
                            if (/vercel|cloud/i.test(name)) return "border-slate-500/20 text-slate-600 dark:text-slate-300 bg-slate-500/5";
                            return "border-slate-200 dark:border-white/[0.06] bg-white dark:bg-black/20 text-slate-600 dark:text-slate-400";
                          })();
                          return (
                            <span
                              key={name}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider font-semibold border ${techColor}`}
                            >
                              {name}
                            </span>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/5">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 dark:text-white/30 font-mono">
                          Project Links
                        </span>
                        <div className="flex items-center gap-3">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50 hover:bg-primaryBlue hover:text-white hover:border-primaryBlue dark:hover:bg-primaryBlue dark:hover:border-primaryBlue transition-all duration-200"
                            title="View GitHub Repository"
                          >
                            <GithubIcon size={14} />
                          </a>
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50 hover:bg-brightTeal hover:text-white hover:border-brightTeal dark:hover:bg-brightTeal dark:hover:border-brightTeal transition-all duration-200"
                              title="View Live Site"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Explore More GitHub CTA */}
        <div className="flex justify-center mt-16">
          <a
            href="https://github.com/nagprathikmg01"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white px-8 py-4 text-xs tracking-[0.25em] uppercase font-bold hover:bg-gradient-to-r hover:from-primaryBlue hover:to-secondaryPurple hover:text-white hover:border-transparent transition-all duration-300 rounded-full hover:shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-98"
          >
            Explore More on GitHub <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}