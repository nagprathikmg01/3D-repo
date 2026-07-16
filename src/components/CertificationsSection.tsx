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
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#1A1B20] text-[#EDEDE8] overflow-hidden transition-colors duration-300">
      {/* Background Glow - disabled */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motionFramer.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono uppercase tracking-[0.25em] text-[#B5654A] font-bold"
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
          <div className="h-[2px] w-16 bg-[#B5654A] mx-auto mt-4" />
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
                  borderColor: "#B5654A",
                  transition: { duration: 0.3 }
                }}
                className="p-6 rounded-[3px] border border-[#2A2C33] bg-[#22242D] transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-[3px] flex items-center justify-center border border-[#2A2C33] bg-[#2E3039] text-[#EDEDE8]">
                      <Award size={20} />
                    </div>
                    <span className="text-[10px] font-mono text-[#9C9C94] uppercase tracking-widest bg-[#2E3039] border border-[#2A2C33] px-2.5 py-1 rounded-[3px]">
                      {cert.date}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#B5654A] tracking-wide mb-4">
                    {cert.issuer}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#2A2C33]">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#9C9C94] font-mono">
                    Credential Link
                  </span>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 rounded-[3px] border border-[#2A2C33] text-[#9C9C94] hover:bg-[#B5654A] hover:text-[#EDEDE8] hover:border-[#B5654A] transition-all duration-200"
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
