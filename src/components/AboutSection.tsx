import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Award, Briefcase, Sparkles } from "lucide-react";
import { lazy, Suspense, useState, useEffect } from "react";

const BandCard = lazy(() => import("./BandCard"));

export default function AboutSection() {
  const [showCard, setShowCard] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const highlights = [
    {
      icon: GraduationCap,
      title: "B.E. in Information Science",
      subtitle: "Nitte Meenakshi Institute of Technology",
      detail: "Batch: 2023 - 2027 | CGPA: 8.5 / 10",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Award,
      title: "Google Student Ambassador",
      subtitle: "Top 250 Globally recognized",
      detail: "Selected from thousands of applicants to represent Google developers on campus.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Briefcase,
      title: "AI Sustainability Intern",
      subtitle: "1M1B - AICTE - IBM SkillsBuild",
      detail: "Hands-on implementation of machine learning workflows for sustainable AI platforms.",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono uppercase tracking-[0.25em] text-primaryBlue font-bold"
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
          <div className="h-[3px] w-20 bg-gradient-to-r from-secondaryPurple to-primaryBlue mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              Passionate AI/ML Engineer & Full-Stack Developer
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans text-base">
              I am a pre-final year Information Science & Engineering student at NMIT with a CGPA of 8.5/10. 
              My passion lies at the intersection of AI, Cloud Architecture, and Web Development. 
              I build production-grade AI systems, RAG pipelines, and highly interactive Full-Stack applications that feel alive.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans text-base">
              Recognized as a <strong className="text-slate-900 dark:text-white">Top 250 Google Student Ambassador</strong> worldwide, I play an active role in cultivating tech communities, hosting workshops, and leading events. 
              From model training in PyTorch to secure deployment on AWS & Google Cloud, I focus on delivering scalable, premium digital experiences.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border border-slate-200 dark:border-surfaceBorder bg-slate-100/50 dark:bg-[#111118]/50 p-4 rounded-xl backdrop-blur-md">
                <span className="block text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondaryPurple to-primaryBlue font-display">
                  8.5
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tracking-widest uppercase">
                  CGPA Score
                </span>
              </div>
              <div className="border border-slate-200 dark:border-surfaceBorder bg-slate-100/50 dark:bg-[#111118]/50 p-4 rounded-xl backdrop-blur-md">
                <span className="block text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryBlue to-brightTeal font-display">
                  Top 250
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tracking-widest uppercase">
                  Google Ambassador
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setShowCard(true);
                  if (typeof window !== "undefined" && (window as any).playClickSound) {
                    (window as any).playClickSound();
                  }
                }}
                className="inline-flex items-center gap-2 border border-primaryBlue text-primaryBlue px-6 py-3 text-xs tracking-[0.2em] uppercase font-bold hover:bg-primaryBlue hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 rounded-full"
              >
                <Sparkles size={14} /> Interactive 3D Card
              </button>
            </div>
          </motion.div>

          {/* Right Column - Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="flex gap-5 p-6 rounded-2xl border border-slate-200 dark:border-surfaceBorder bg-white/40 dark:bg-[#111118]/40 hover:border-slate-300 dark:hover:border-slate-800 hover:shadow-lg hover:shadow-primaryBlue/5 transition-all duration-300 backdrop-blur-md"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.color} text-white shadow-lg shrink-0`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-primaryBlue font-semibold mb-2">
                      {item.subtitle}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
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
              className="absolute top-6 right-6 z-[60] w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all duration-200"
            >
              Close ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
