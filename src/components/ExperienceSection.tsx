import { motion } from "framer-motion";
import { Briefcase, Calendar, Award, Star, Compass } from "lucide-react";

export default function ExperienceSection() {
  const experiences = [
    {
      role: "AI Sustainability Intern",
      company: "1M1B – AICTE – IBM SkillsBuild",
      duration: "Dec 2025 – Jan 2026",
      icon: Briefcase,
      color: "from-emerald-500 to-teal-500",
      glow: "rgba(16,185,129,0.15)",
      description: "Applied IBM Granite LLMs, Agentic AI, and RAG to UN SDG challenges. Co-certified by AICTE & IBM SkillsBuild.",
    },
    {
      role: "Google Student Ambassador — Top 250 Globally",
      company: "Google Developers",
      duration: "Jul 2025 – Present",
      icon: Award,
      color: "from-blue-500 to-indigo-500",
      glow: "rgba(59,130,246,0.15)",
      description: "Conducted 5+ workshops on GCP & GenAI for 100+ students. Co-organised 2 hackathons with Google.",
    },
    {
      role: "Marketing Head",
      company: "IEEE Computer Society Student Chapter – NMIT",
      duration: "Jan 2026 – Present",
      icon: Star,
      color: "from-purple-500 to-pink-500",
      glow: "rgba(168,85,247,0.15)",
      description: "Leading branding, marketing outreach, and event visibility campaigns for technical conferences, competitions, and code challenges.",
    },
    {
      role: "Head of Events & PR Lead",
      company: "Team Adwaitha | DataWiz | CloudZilla NMIT",
      duration: "Dec 2024 – Present",
      icon: Compass,
      color: "from-orange-500 to-amber-500",
      glow: "rgba(249,115,22,0.15)",
      description: "Organized 6+ technical events with 200+ participants each.",
    },
  ];

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-slate-50 dark:bg-darkBg text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/6 rounded-full blur-[110px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-violet-500/5 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono uppercase tracking-[0.25em] text-glowIndigo font-bold"
          >
            My Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mt-2 text-slate-900 dark:text-white"
          >
            Work & Leadership
          </motion.h2>
          <div className="h-[3px] w-20 bg-gradient-to-r from-primaryBlue via-secondaryPurple to-brightTeal mx-auto mt-4 rounded-full" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-2 bottom-2 w-[2px] bg-slate-200 dark:bg-surfaceBorder/80 -translate-x-[1px]" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const Icon = exp.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Circle Node on Line with pulsing glow ring */}
                  <div className="absolute left-6 md:left-1/2 w-8 h-8 rounded-full border border-indigo-500/30 dark:border-indigo-500/20 bg-white dark:bg-darkBg flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_20px_rgba(79,70,229,0.2)]">
                    {/* Outer ping ring */}
                    <span className="absolute w-8 h-8 rounded-full bg-indigo-500/10 animate-ping" style={{ animationDuration: '2.5s' }} />
                    <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-br ${exp.color}`} />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      whileHover={{ y: -4, shadow: `0 20px 40px ${exp.glow}` }}
                      className="p-6 rounded-2xl border border-slate-200 dark:border-surfaceBorder bg-white dark:bg-surface/50 hover:border-slate-300 dark:hover:border-slate-800 transition-all duration-300 backdrop-blur-md relative"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${exp.color} text-white shadow-md`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                            {exp.role}
                          </h3>
                          <p className="text-xs text-primaryBlue font-semibold mt-1">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono mb-3">
                        <Calendar size={13} />
                        <span>{exp.duration}</span>
                      </div>

                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                        {exp.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Empty space filler for desktop spacing alignment */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
