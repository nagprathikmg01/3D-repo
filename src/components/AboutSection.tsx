import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { lazy, Suspense, useState, useEffect } from "react";

const BandCard = lazy(() => import("./BandCard"));

export default function AboutSection() {
  const [showCard, setShowCard] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bullets = [
    "Pre-final year Information Science & Engineering student at NMIT, Bangalore.",
    "Selected as Google Student Ambassador — Top 250 globally recognized community leaders.",
    "Applied IBM Granite LLMs, Agentic AI, and RAG to UN SDG challenges during IBM AI Internship.",
    "Proficient in PyTorch, React, Flutter, GCP, and Cloud DevOps practices.",
  ];

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#1A1B20] text-[#EDEDE8] overflow-hidden transition-colors duration-300">
      {/* Background Glow - disabled */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono uppercase tracking-[0.25em] text-[#B5654A] font-bold"
          >
            Get To Know Me
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mt-2 text-slate-900 dark:text-white"
          >
            About Myself
          </motion.h2>
          <div className="h-[2px] w-16 bg-[#B5654A] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Bio & Bullet Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              Passionate AI/ML Engineer & Full-Stack Developer
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans text-base">
              I am a pre-final year B.E. Information Science & Engineering student at NMIT, Bangalore with a CGPA of 8.5/10. 
              My expertise spans the intersection of Artificial Intelligence, Cloud Infrastructure, and Modern Web Development. 
              I design and build production-ready AI applications, Agentic RAG pipelines, and responsive Full-Stack platforms that solve real-world challenges.
            </p>

            {/* Bullet Highlights */}
            <div className="space-y-3.5 pt-2">
              {bullets.map((bullet, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="text-[#B5654A] mt-1 shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-sans">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border border-[#2A2C33] bg-[#22242D] p-4 rounded-[3px] backdrop-blur-md">
                <span className="block text-3xl font-bold text-[#EDEDE8] font-display">
                  8.5
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tracking-widest uppercase">
                  CGPA Score
                </span>
              </div>
              <div className="border border-[#2A2C33] bg-[#22242D] p-4 rounded-[3px] backdrop-blur-md">
                <span className="block text-3xl font-bold text-[#EDEDE8] font-display">
                  Top 250
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tracking-widest uppercase">
                  Google Ambassador
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setShowCard(true);
                  if (typeof window !== "undefined" && (window as any).playClickSound) {
                    (window as any).playClickSound();
                  }
                }}
                className="inline-flex items-center gap-2 border border-[#B5654A] text-[#B5654A] px-6 py-3 text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#B5654A] hover:text-[#EDEDE8] transition-all duration-300 rounded-[3px]"
              >
                <Sparkles size={14} /> Interactive 3D Card
              </button>
            </div>
          </motion.div>

          {/* Right Column - Profile Image with rotating ring */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center relative py-12"
          >
            {/* Rotating border container */}
            <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">
              {/* Outer rotating gradient ring */}
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#B5654A]/35 animate-rotate-ring pointer-events-none" />
              
              {/* Secondary rotating accent ring */}
              <div className="absolute inset-[6px] rounded-full border border-dashed border-[#9C9C94]/30 animate-[rotate-ring_12s_linear_infinite_reverse] pointer-events-none" />
              
              {/* Image Frame */}
              <div className="w-[200px] h-[200px] md:w-[230px] md:h-[230px] rounded-full overflow-hidden border-[6px] border-[#2E3039] shadow-none relative z-10">
                <img
                  src="/profile.jpg"
                  alt="Nag Prathik M G Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3D ID CARD Dropdown overlay */}
      <AnimatePresence>
        {showCard && mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center pointer-events-auto"
          >
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <Suspense fallback={null}>
                <BandCard />
              </Suspense>
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => {
                setShowCard(false);
                if (typeof window !== "undefined" && (window as any).playClickSound) {
                  (window as any).playClickSound();
                }
              }}
              className="absolute top-6 right-6 z-[60] w-12 h-12 rounded-[3px] border border-[#2A2C33] bg-[#2E3039] hover:bg-[#22242D] text-[#EDEDE8] flex items-center justify-center transition-all duration-200"
            >
              Close ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
