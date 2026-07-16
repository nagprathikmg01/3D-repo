import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BandCard = lazy(() => import("./BandCard"));

export default function FrontendDeveloperSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [showCard, setShowCard] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [goAbout, setGoAbout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (goAbout) {
      const t = setTimeout(() => {
        navigate("/about");
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [goAbout, navigate]);

  return (
    <motion.section
      ref={ref}
      id="about"
      initial={{ x: 0, scale: 1, opacity: 1, filter: "blur(0px)" }}
      animate={
        goAbout
          ? { x: "-40vw", scale: 0.92, opacity: 0, filter: "blur(8px)" }
          : { x: 0, scale: 1, opacity: 1, filter: "blur(0px)" }
      }
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full min-h-screen bg-[#1A1B20] text-[#EDEDE8] overflow-hidden flex items-start px-6 md:px-20 pt-16 md:pt-28 select-none"
    >
      {/* Background spotlights - disabled */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" />

      {/* TEXT */}
      <div className="relative z-10 max-w-2xl">
        <motion.div className="flex items-center mb-6">
          <motion.span
            animate={{ width: ["0ch", "32ch", "32ch", "0ch"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.8, 1] }}
            className="inline-block overflow-hidden whitespace-nowrap text-[11px] tracking-[0.3em] uppercase text-[#B5654A]/80 font-mono font-bold"
          >
            Google Student Ambassador
          </motion.span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-[#B5654A] font-mono ml-[2px]"
          >
            |
          </motion.span>
        </motion.div>

        <div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 50 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 text-[clamp(56px,9vw,120px)]"
          >
            AI / ML
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: -80, rotate: -4 }}
            animate={inView ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: -80, rotate: -4 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold leading-[1.05] tracking-tight text-white/50 text-[clamp(56px,9vw,120px)] mb-6"
          >
            Engineer
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-[Poppins] font-medium tracking-wide text-white/70"
        >
          Pre-final year Information Science & Engineering student at NMIT (CGPA: 8.5/10). Hands-on experience building production-grade AI applications, scalable full-stack platforms, LLM-powered systems, RAG pipelines, and cloud architectures. Globally recognized as a Top 250 Google Student Ambassador.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 flex flex-wrap gap-4"
        >
          {["PyTorch", "Generative AI", "GCP / AWS", "Agentic AI"].map((tech) => {
            const glowColor = "hover:border-[#B5654A] hover:text-[#EDEDE8]";
            
            return (
              <div
                key={tech}
                onMouseEnter={() => {
                  if (typeof window !== "undefined" && (window as any).playClickSound) {
                    (window as any).playClickSound();
                  }
                }}
                className={`relative group px-5 py-2.5 rounded-[3px] text-xs font-semibold tracking-wider uppercase font-mono text-[#9C9C94] bg-[#2E3039] border border-[#2A2C33] overflow-hidden transition-all duration-300 ${glowColor}`}
              >
                <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 bg-white/5"></span>
                <span className="relative z-10">{tech}</span>
              </div>
            );
          })}
        </motion.div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-20">
          {/* Show Card Button */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            onMouseEnter={() => {
              if (typeof window !== "undefined" && (window as any).playClickSound) {
                (window as any).playClickSound();
              }
            }}
            onClick={() => {
              if (typeof window !== "undefined" && (window as any).playClickSound) {
                (window as any).playClickSound();
              }
              setShowCard((s) => !s);
            }}
            className="inline-flex items-center gap-2 border border-[#B5654A] text-[#B5654A] px-6 py-3 text-xs tracking-[0.25em] uppercase font-bold hover:bg-[#B5654A] hover:text-[#EDEDE8] transition-all duration-300 rounded-[3px]"
          >
            {showCard ? "Hide 3D Card" : "Show 3D Card"}
          </motion.button>

          {/* About Button */}
          <motion.button
            initial={{ opacity: 0, x: 80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, delay: 1.4 }}
            onMouseEnter={() => {
              if (typeof window !== "undefined" && (window as any).playClickSound) {
                (window as any).playClickSound();
              }
            }}
            onClick={() => {
              if (typeof window !== "undefined" && (window as any).playClickSound) {
                (window as any).playClickSound();
              }
              setGoAbout(true);
            }}
            className="inline-flex items-center gap-2 border border-[#2A2C33] text-[#EDEDE8] bg-[#22242D] px-6 py-3 text-xs tracking-[0.25em] uppercase font-bold hover:bg-[#2E3039] hover:border-[#B5654A] transition-all duration-300 rounded-[3px]"
          >
            Detailed Bio
          </motion.button>
        </div>
      </div>

      {/* 3D ID CARD */}
      <AnimatePresence>
        {showCard && mounted && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-[5] pointer-events-none"
          >
            <Suspense fallback={null}>
              <BandCard />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}