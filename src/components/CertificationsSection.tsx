import { motion as motionFramer } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

export default function CertificationsSection() {
  const certs = [
    {
      title: "Google Cloud Engineering Certificate",
      issuer: "Google Cloud",
      date: "August 2025",
      color: "border-blue-500/20 text-blue-400 bg-blue-500/5",
      glowColor: "rgba(66,133,244,0.2)",
      iconColor: "#4285F4",
      url: "https://cloud.google.com/",
    },
    {
      title: "Prompt Design in Vertex AI",
      issuer: "Google Cloud",
      date: "September 2025",
      color: "border-blue-500/20 text-blue-400 bg-blue-500/5",
      glowColor: "rgba(66,133,244,0.2)",
      iconColor: "#4285F4",
      url: "https://cloud.google.com/",
    },
    {
      title: "Gemini Multimodality & Multimodal RAG",
      issuer: "Google Cloud",
      date: "September 2025",
      color: "border-blue-500/20 text-blue-400 bg-blue-500/5",
      glowColor: "rgba(66,133,244,0.2)",
      iconColor: "#4285F4",
      url: "https://cloud.google.com/",
    },
    {
      title: "GenAI Apps with Gemini & Streamlit",
      issuer: "Google Cloud",
      date: "October 2025",
      color: "border-blue-500/20 text-blue-400 bg-blue-500/5",
      glowColor: "rgba(66,133,244,0.2)",
      iconColor: "#4285F4",
      url: "https://cloud.google.com/",
    },
    {
      title: "Build Infrastructure with Terraform on GCP",
      issuer: "Google Cloud",
      date: "November 2025",
      color: "border-blue-500/20 text-blue-400 bg-blue-500/5",
      glowColor: "rgba(66,133,244,0.2)",
      iconColor: "#4285F4",
      url: "https://cloud.google.com/",
    },
    {
      title: "Develop Your Google Cloud Network",
      issuer: "Google Cloud",
      date: "November 2025",
      color: "border-blue-500/20 text-blue-400 bg-blue-500/5",
      glowColor: "rgba(66,133,244,0.2)",
      iconColor: "#4285F4",
      url: "https://cloud.google.com/",
    },
    {
      title: "Implement Load Balancing on Compute Engine",
      issuer: "Google Cloud",
      date: "December 2025",
      color: "border-blue-500/20 text-blue-400 bg-blue-500/5",
      glowColor: "rgba(66,133,244,0.2)",
      iconColor: "#4285F4",
      url: "https://cloud.google.com/",
    },
    {
      title: "Set Up an App Dev Environment on GCP",
      issuer: "Google Cloud",
      date: "December 2025",
      color: "border-blue-500/20 text-blue-400 bg-blue-500/5",
      glowColor: "rgba(66,133,244,0.2)",
      iconColor: "#4285F4",
      url: "https://cloud.google.com/",
    },
    {
      title: "AWS Cloud Foundations Badge",
      issuer: "Amazon Web Services",
      date: "September 2025",
      color: "border-amber-500/20 text-amber-400 bg-amber-500/5",
      glowColor: "rgba(255,153,0,0.2)",
      iconColor: "#FF9900",
      url: "https://aws.amazon.com/",
    },
    {
      title: "AWS Cloud Architecting Badge",
      issuer: "Amazon Web Services",
      date: "October 2025",
      color: "border-amber-500/20 text-amber-400 bg-amber-500/5",
      glowColor: "rgba(255,153,0,0.2)",
      iconColor: "#FF9900",
      url: "https://aws.amazon.com/",
    },
    {
      title: "Cisco Networking Basics",
      issuer: "Cisco",
      date: "March 2025",
      color: "border-cyan-500/20 text-cyan-400 bg-cyan-500/5",
      glowColor: "rgba(27,160,215,0.2)",
      iconColor: "#1BA0D7",
      url: "https://netacad.com/",
    },
    {
      title: "Simplilearn JFSD: Back-end & Database Development",
      issuer: "Simplilearn",
      date: "April 2025",
      color: "border-sky-500/20 text-sky-400 bg-sky-500/5",
      glowColor: "rgba(14,165,233,0.2)",
      iconColor: "#0ea5e9",
      url: "https://simplilearn.com/",
    },
    {
      title: "Simplilearn JFSD: Data Structures & Algorithms",
      issuer: "Simplilearn",
      date: "May 2025",
      color: "border-sky-500/20 text-sky-400 bg-sky-500/5",
      glowColor: "rgba(14,165,233,0.2)",
      iconColor: "#0ea5e9",
      url: "https://simplilearn.com/",
    },
    {
      title: "Simplilearn JFSD: Planning & Designing UI",
      issuer: "Simplilearn",
      date: "June 2025",
      color: "border-sky-500/20 text-sky-400 bg-sky-500/5",
      glowColor: "rgba(14,165,233,0.2)",
      iconColor: "#0ea5e9",
      url: "https://simplilearn.com/",
    },
    {
      title: "Infosys Springboard: Database and SQL",
      issuer: "Infosys",
      date: "July 2025",
      color: "border-sky-500/20 text-sky-400 bg-sky-500/5",
      glowColor: "rgba(0,124,195,0.2)",
      iconColor: "#007CC3",
      url: "https://springboard.infosys.com/",
    },
  ];

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-darkBg text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] left-[-10%] w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motionFramer.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono uppercase tracking-[0.25em] text-primaryBlue font-bold"
          >
            My Certifications
          </motionFramer.p>
          <motionFramer.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mt-2 text-slate-900 dark:text-white"
          >
            Verified Credentials
          </motionFramer.h2>
          <div className="h-[3px] w-20 bg-gradient-to-r from-primaryBlue to-secondaryPurple mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, idx) => {
            return (
              <motionFramer.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{
                  y: -5,
                  boxShadow: `0 15px 30px ${cert.glowColor}`,
                  borderColor: cert.iconColor,
                  transition: { duration: 0.3 }
                }}
                className="p-6 rounded-2xl border border-slate-200 dark:border-surfaceBorder bg-slate-50/50 dark:bg-surface/50 transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border text-lg font-bold"
                      style={{
                        borderColor: `${cert.iconColor}30`,
                        color: cert.iconColor,
                        backgroundColor: `${cert.iconColor}08`
                      }}
                    >
                      <Award size={20} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
                      {cert.date}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-semibold text-primaryBlue tracking-wide mb-4">
                    {cert.issuer}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 dark:text-white/30 font-mono">
                    Credential Link
                  </span>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50 hover:bg-primaryBlue hover:text-white hover:border-primaryBlue transition-all duration-200"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </motionFramer.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
