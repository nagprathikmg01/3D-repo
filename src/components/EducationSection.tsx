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
      accent: "from-emerald-500 to-emerald-500",
    },
    {
      institution: "Ambika PU College",
      degree: "Pre-University Education (PCMC)",
      duration: "2021 – 2023",
      score: "Percentage: 92.5%",
      location: "Mangaluru, Karnataka",
      featured: false,
      accent: "from-amber-500 to-yellow-500",
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
          <div className="h-[2px] w-16 bg-[#B5654A] mx-auto mt-4" />
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
                className={`rounded-[3px] border transition-all duration-300 backdrop-blur-md flex flex-col justify-between p-8 relative overflow-hidden ${
                  edu.featured
                    ? "lg:col-span-6 border-[#2A2C33] bg-[#22242D] hover:border-[#B5654A]"
                    : "lg:col-span-3 border-[#2A2C33] bg-[#22242D] hover:border-[#B5654A]"
                }`}
              >
                {/* Accent Top Bar for featured */}
                {edu.featured && (
                  <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#B5654A]" />
                )}

                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-[3px] flex items-center justify-center bg-[#2E3039] border border-[#2A2C33] text-[#EDEDE8]">
                      <GraduationCap size={24} />
                    </div>
                    <span className="text-[10px] font-mono text-[#9C9C94] uppercase tracking-widest bg-[#2E3039] border border-[#2A2C33] px-2.5 py-1 rounded-[3px]">
                      {edu.duration}
                    </span>
                  </div>

                  <h3 className={`font-bold leading-snug mb-2 text-slate-900 dark:text-white ${
                    edu.featured ? "text-xl md:text-2xl" : "text-base md:text-lg"
                  }`}>
                    {edu.institution}
                  </h3>

                  <p className="text-sm font-semibold text-[#B5654A] tracking-wide mb-4">
                    {edu.degree}
                  </p>
                </div>

                <div className="space-y-4 pt-6 border-t border-[#2A2C33]">
                  <div className="flex items-center gap-2 text-xs text-[#9C9C94]">
                    <MapPin size={14} />
                    <span>{edu.location}</span>
                  </div>

                  <div className="flex items-center gap-2.5 bg-[#2E3039] rounded-[3px] px-4 py-3 border border-[#2A2C33]">
                    <Award size={16} className="text-[#B5654A] shrink-0" />
                    <span className="text-sm font-bold text-[#EDEDE8]">
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
