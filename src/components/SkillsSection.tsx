import { motion } from "framer-motion";
import { Brain, Cpu, Cloud, Database, Code2 } from "lucide-react";

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "AI / ML",
      icon: Brain,
      color: "border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/5",
      skills: ["PyTorch", "TensorFlow", "Generative AI", "LLMs", "RAG Pipelines", "Agentic AI", "Computer Vision", "NLP"],
    },
    {
      title: "Full-Stack / Web",
      icon: Cpu,
      color: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5",
      skills: ["React", "TypeScript", "Next.js", "Node.js", "Express.js", "Flutter", "Tailwind CSS", "Redux"],
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      color: "border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/5",
      skills: ["GCP", "AWS", "Docker", "Terraform", "CI/CD Pipelines", "Git & GitHub", "Vercel", "Linux"],
    },
    {
      title: "Databases",
      icon: Database,
      color: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase", "Vector Databases (Pinecone)"],
    },
    {
      title: "Languages",
      icon: Code2,
      color: "border-orange-500/30 text-orange-600 dark:text-orange-400 bg-orange-500/5",
      skills: ["Python", "Dart", "C++", "Java", "JavaScript", "SQL", "HTML & CSS"],
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
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      {/* Background spotlights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[110px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]" />
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
          <div className="h-[3px] w-20 bg-gradient-to-r from-primaryBlue to-brightTeal mx-auto mt-4 rounded-full" />
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
                className="p-6 rounded-2xl border border-slate-200 dark:border-surfaceBorder bg-slate-50/50 dark:bg-surface/50 hover:border-slate-300 dark:hover:border-slate-800 hover:shadow-xl hover:shadow-primaryBlue/5 transition-all duration-300 backdrop-blur-md"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl border ${category.color}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold tracking-wide border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-black/25 text-slate-700 dark:text-slate-300 hover:border-primaryBlue/30 hover:text-primaryBlue dark:hover:text-primaryBlue hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
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
