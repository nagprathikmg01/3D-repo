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
      className="relative w-full min-h-screen bg-[#020617] text-white overflow-hidden flex items-start px-6 md:px-20 pt-16 md:pt-28 select-none"
    >
      {/* Background Floating spotlights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      {/* TEXT */}
      <div className="relative z-10 max-w-2xl">
        <motion.div className="flex items-center mb-6">
          <motion.span
            animate={{ width: ["0ch", "32ch", "32ch", "0ch"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.8, 1] }}
            className="inline-block overflow-hidden whitespace-nowrap text-[11px] tracking-[0.3em] uppercase text-cyan-400/80 font-mono font-bold"
          >
            Google Student Ambassador
          </motion.span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-cyan-400 font-mono ml-[2px]"
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
            let glowColor = "hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:border-white/20";
            if (tech === "PyTorch") glowColor = "hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:border-red-500/30 hover:text-red-400";
            else if (tech === "Generative AI") glowColor = "hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-purple-500/30 hover:text-purple-400";
            else if (tech === "GCP / AWS") glowColor = "hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-cyan-500/30 hover:text-cyan-400";
            else if (tech === "Agentic AI") glowColor = "hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:border-indigo-500/30 hover:text-indigo-400";
            
            return (
              <div
                key={tech}
                onMouseEnter={() => {
                  if (typeof window !== "undefined" && (window as any).playClickSound) {
                    (window as any).playClickSound();
                  }
                }}
                className={`relative group px-5 py-2.5 rounded-2xl text-xs font-semibold tracking-wider uppercase font-mono text-white/70 bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300 ${glowColor}`}
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
            className="inline-flex items-center gap-2 border border-cyan-500 text-cyan-400 px-6 py-3 text-xs tracking-[0.25em] uppercase font-bold hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 rounded-full"
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
            className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 text-xs tracking-[0.25em] uppercase font-bold hover:bg-white hover:text-black transition-all duration-300 rounded-full"
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