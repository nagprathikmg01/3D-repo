import { useState } from "react";
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

export default function Showcase() {
  const [filter, setFilter] = useState<ProjectType>("All");

  const projects: Project[] = [
    {
      title: "GeoQuest — AI-Driven Travel Planner",
      description: "AI-driven personalized travel curation engine using LLM generation, trip routing, and interactive maps.",
      tech: "Next.js + LLM + Tailwind + PostgreSQL",
      github: "https://github.com/nagprathikmg01/GeoQuest",
      type: "AI/ML",
    },
    {
      title: "Adaptive Drone Navigation & Drift Detection",
      description: "Autonomous drone navigation model using computer vision, drift forecasting, and simulation drift correction.",
      tech: "Python + PyTorch + ROS + OpenCV",
      github: "https://github.com/nagprathikmg01/drone-drift-detection",
      type: "AI/ML",
      finalYear: true,
    },
    {
      title: "ClubOS — Cross-Platform Club Management",
      description: "Multi-tenant university community app for event scheduling, membership tracking, and push notifications.",
      tech: "Flutter + Dart + Firebase",
      github: "https://github.com/nagprathikmg01/ClubOS",
      type: "Full-Stack",
    },
    {
      title: "GreenCart — Agentic AI Shopping",
      description: "Sustainable e-commerce agent that analyzes cart items for carbon footprint and suggests eco-friendly swaps.",
      tech: "React + LangChain + Python + Gemini API",
      github: "https://github.com/nagprathikmg01/GreenCart",
      live: "https://github.com/nagprathikmg01/GreenCart",
      type: "AI/ML",
    },
    {
      title: "Karnataka Agricultural Analytics",
      description: "Real-time crop disease classification and yield forecasting engine using satellite imagery and Gemini API.",
      tech: "React + Gemini API + Python + Streamlit",
      github: "https://github.com/nagprathikmg01/karnataka-agri-app",
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
          badge: "border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/5",
          border: "border-blue-500/20 dark:border-blue-500/10 hover:border-blue-500 dark:hover:border-blue-500/50 hover:shadow-blue-500/10",
        };
      case "Full-Stack":
        return {
          badge: "border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5",
          border: "border-emerald-500/20 dark:border-emerald-500/10 hover:border-emerald-500 dark:hover:border-emerald-500/50 hover:shadow-emerald-500/10",
        };
      case "Cloud":
        return {
          badge: "border-purple-500/20 text-purple-600 dark:text-purple-400 bg-purple-500/5",
          border: "border-purple-500/20 dark:border-purple-500/10 hover:border-purple-500 dark:hover:border-purple-500/50 hover:shadow-purple-500/10",
        };
      default:
        return {
          badge: "border-slate-500/20 text-slate-400 bg-slate-500/5",
          border: "border-slate-200 dark:border-surfaceBorder hover:border-primaryBlue",
        };
    }
  };

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[-15%] w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] left-[-15%] w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono uppercase tracking-[0.25em] text-primaryBlue font-bold"
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
              onClick={() => {
                setFilter(tab);
                if (typeof window !== "undefined" && (window as any).playClickSound) {
                  (window as any).playClickSound();
                }
              }}
              className={`px-6 py-2.5 rounded-xl text-xs uppercase font-mono tracking-widest border transition-all duration-300 font-bold ${
                filter === tab
                  ? "bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white shadow-md"
                  : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20"
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
            {filteredProjects.map((project) => {
              const styles = getTypeStyles(project.type);
              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 30 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className={`rounded-2xl border bg-slate-50/50 dark:bg-surface/50 p-6 flex flex-col justify-between transition-all duration-300 backdrop-blur-md relative ${styles.border}`}
                >
                  {/* Top line indicator */}
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-primaryBlue/10 to-transparent" />

                  {/* Header / Badges */}
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider font-bold uppercase border ${styles.badge}`}>
                        {project.type}
                      </span>
                      {project.finalYear && (
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider font-bold uppercase border border-amber-500/20 text-amber-600 dark:text-amber-400 bg-amber-500/5 animate-pulse">
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
                        return (
                          <span
                            key={name}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider font-semibold border border-slate-200 dark:border-white/[0.05] bg-white dark:bg-black/20 text-slate-600 dark:text-slate-400"
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
                          className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-slate-900 dark:hover:border-white transition-all duration-200"
                          title="View GitHub Repository"
                        >
                          <GithubIcon size={14} />
                        </a>
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-slate-900 dark:hover:border-white transition-all duration-200"
                            title="View Live Site"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
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
            className="group inline-flex items-center gap-3 border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white px-8 py-4 text-xs tracking-[0.25em] uppercase font-bold hover:bg-slate-950 dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-slate-900 dark:hover:border-white transition-all duration-300 rounded-full hover:shadow-lg hover:scale-105 active:scale-98"
          >
            Explore More on GitHub <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}