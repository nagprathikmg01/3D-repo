import { motion } from "framer-motion";
import { Brain, Cpu, Cloud, Database, Code2 } from "lucide-react";

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "AI / ML",
      icon: Brain,
      color: "border-[#2A2C33] text-[#9C9C94] bg-[#2E3039]",
      skills: ["PyTorch", "Transformers", "LLMs", "RAG", "Agentic AI", "NLP", "Generative AI", "Gemini API", "Vertex AI", "Prompt Engineering", "Streamlit"],
    },
    {
      title: "Full-Stack / Web",
      icon: Cpu,
      color: "border-[#2A2C33] text-[#9C9C94] bg-[#2E3039]",
      skills: ["Flutter", "React.js", "Vite", "Tailwind CSS", "Node.js", "Express.js", "REST APIs", "TypeScript", "Prisma"],
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      color: "border-[#2A2C33] text-[#9C9C94] bg-[#2E3039]",
      skills: ["GCP", "AWS (EC2, S3, IAM)", "Terraform", "Firebase", "Docker", "GitHub", "Vercel", "CI/CD", "NVIDIA NIM"],
    },
    {
      title: "Databases",
      icon: Database,
      color: "border-[#2A2C33] text-[#9C9C94] bg-[#2E3039]",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firestore"],
    },
    {
      title: "Languages",
      icon: Code2,
      color: "border-[#2A2C33] text-[#9C9C94] bg-[#2E3039]",
      skills: ["Python", "Java", "JavaScript", "TypeScript", "Dart", "C", "SQL"],
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#1A1B20] text-[#EDEDE8] overflow-hidden transition-colors duration-300">
      {/* Background spotlights - disabled */}
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
            My Tech Stack
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mt-2 text-slate-900 dark:text-white"
          >
            Skills & Expertise
          </motion.h2>
          <div className="h-[2px] w-16 bg-[#B5654A] mx-auto mt-4" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="p-6 rounded-[3px] border border-[#2A2C33] bg-[#22242D] hover:border-[#B5654A] transition-all duration-300 backdrop-blur-md relative overflow-hidden group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-[3px] border ${category.color}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, sIdx) => (
                    <motion.span
                      key={skill}
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 3.2 + (sIdx % 3) * 0.7,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="px-3.5 py-1.5 rounded-[3px] text-xs font-mono font-semibold tracking-wide border border-[#2A2C33] bg-[#2E3039] text-[#9C9C94] hover:border-[#B5654A] hover:text-[#EDEDE8] transition-all duration-300 cursor-default inline-block"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
