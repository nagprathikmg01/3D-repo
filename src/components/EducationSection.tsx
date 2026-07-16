import { motion } from "framer-motion";
import { GraduationCap, Award, MapPin } from "lucide-react";

export default function EducationSection() {
  const education = [
    {
      institution: "Nitte Meenakshi Institute of Technology",
      degree: "B.E. in Information Science & Engineering",
      duration: "2023 – 2027",
      score: "CGPA: 8.5 / 10",
      location: "Bengaluru, Karnataka",
      featured: true,
      accent: "from-blue-500 to-blue-500",
    },
    {
      institution: "Ambika PU College",
      degree: "Pre-University Education (PCMC)",
      duration: "2021 – 2023",
      score: "Percentage: 92.5%",
      location: "Mangaluru, Karnataka",
      featured: false,
      accent: "from-purple-500 to-pink-500",
    },
    {
      institution: "St. Joseph's High School",
      degree: "Secondary School Leaving Certificate (SSLC)",
      duration: "2018 – 2021",
      score: "Percentage: 96.8%",
      location: "Mangaluru, Karnataka",
      featured: false,
      accent: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-slate-50 dark:bg-darkBg text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px]" />
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
            My Education
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mt-2 text-slate-900 dark:text-white"
          >
            Academic Foundation
          </motion.h2>
          <div className="h-[3px] w-20 bg-gradient-to-r from-primaryBlue to-secondaryPurple mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {education.map((edu, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`rounded-2xl border transition-all duration-300 backdrop-blur-md flex flex-col justify-between p-8 relative overflow-hidden ${
                  edu.featured
                    ? "lg:col-span-6 border-primaryBlue/30 bg-white dark:bg-[#111118]/80 shadow-[0_10px_30px_rgba(59,130,246,0.08)] dark:shadow-[0_10px_30px_rgba(59,130,246,0.03)]"
                    : "lg:col-span-3 border-slate-200 dark:border-surfaceBorder bg-white/40 dark:bg-[#111118]/40 hover:border-slate-300 dark:hover:border-slate-800"
                }`}
              >
                {/* Accent Top Bar for featured */}
                {edu.featured && (
                  <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-primaryBlue to-secondaryPurple" />
                )}

                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${edu.accent} text-white shadow-lg`}>
                      <GraduationCap size={24} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-white/40 uppercase tracking-widest bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
                      {edu.duration}
                    </span>
                  </div>

                  <h3 className={`font-bold leading-snug mb-2 text-slate-900 dark:text-white ${
                    edu.featured ? "text-xl md:text-2xl" : "text-base md:text-lg"
                  }`}>
                    {edu.institution}
                  </h3>

                  <p className="text-sm font-semibold text-primaryBlue tracking-wide mb-4">
                    {edu.degree}
                  </p>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin size={14} />
                    <span>{edu.location}</span>
                  </div>

                  <div className="flex items-center gap-2.5 bg-slate-100 dark:bg-white/5 rounded-xl px-4 py-3 border border-slate-200/50 dark:border-white/[0.03]">
                    <Award size={16} className="text-secondaryPurple shrink-0" />
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {edu.score}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
