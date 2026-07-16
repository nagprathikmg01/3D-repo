import { motion } from "framer-motion";
import { Briefcase, Calendar, Award, Star, Compass } from "lucide-react";

export default function ExperienceSection() {
  const experiences = [
    {
      role: "AI Sustainability Intern",
      company: "1M1B – AICTE – IBM SkillsBuild",
      duration: "Dec 2025 – Jan 2026",
      icon: Briefcase,
      color: "from-teal-500 to-teal-600",
      glow: "rgba(13,148,136,0.15)",
      description: "Applied IBM Granite LLMs, Agentic AI, and RAG to UN SDG challenges. Co-certified by AICTE & IBM SkillsBuild.",
    },
    {
      role: "Google Student Ambassador — Top 250 Globally",
      company: "Google Developers",
      duration: "Jul 2025 – Present",
      icon: Award,
      color: "from-sky-500 to-sky-500",
      glow: "rgba(14,165,233,0.15)",
      description: "Conducted 5+ workshops on GCP & GenAI for 100+ students. Co-organised 2 hackathons with Google.",
    },
    {
      role: "Marketing Head",
      company: "IEEE Computer Society Student Chapter – NMIT",
      duration: "Jan 2026 – Present",
      icon: Star,
      color: "from-teal-500 to-sky-500",
      glow: "rgba(13,148,136,0.15)",
      description: "Leading branding, marketing outreach, and event visibility campaigns for technical conferences, competitions, and code challenges.",
    },
    {
      role: "Head of Events & PR Lead",
      company: "Team Adwaitha | DataWiz | CloudZilla NMIT",
      duration: "Dec 2024 – Present",
      icon: Compass,
      color: "from-amber-500 to-yellow-500",
      glow: "rgba(245,158,11,0.15)",
      description: "Organized 6+ technical events with 200+ participants each.",
    },
  ];

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#1A1B20] text-[#EDEDE8] overflow-hidden transition-colors duration-300">
      {/* Background Glow - disabled */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono uppercase tracking-[0.25em] text-[#B5654A] font-bold"
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
          <div className="h-[2px] w-16 bg-[#B5654A] mx-auto mt-4" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Animated Timeline Draw Line */}
          <div className="timeline-line absolute left-6 md:left-1/2 top-2 -translate-x-[1px] bg-[#2A2C33]" />

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
                  {/* Circle Node on Line */}
                  <div className="absolute left-6 md:left-1/2 w-8 h-8 rounded-full border border-[#2A2C33] bg-[#1A1B20] flex items-center justify-center -translate-x-1/2 z-10">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#B5654A]" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="p-6 rounded-[3px] border border-[#2A2C33] bg-[#22242D] hover:border-[#B5654A] transition-all duration-300 backdrop-blur-md relative"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-[3px] flex items-center justify-center bg-[#2E3039] border border-[#2A2C33] text-[#EDEDE8]">
                          <Icon size={18} />
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                            {exp.role}
                          </h3>
                          <p className="text-xs text-[#B5654A] font-semibold mt-1">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#9C9C94] font-mono mb-3">
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
