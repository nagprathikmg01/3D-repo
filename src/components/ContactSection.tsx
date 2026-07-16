import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Download } from "lucide-react";

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg className="fill-current" width={size} height={size} viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg className="fill-current" width={size} height={size} viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);
import confetti from "canvas-confetti";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      
      // Blast confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#7c3aed", "#10b981", "#06b6d4"]
      });

      // Reset form
      setFormData({ name: "", email: "", message: "" });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }, 1200);
  };

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono uppercase tracking-[0.25em] text-primaryBlue font-bold"
          >
            Get In Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mt-2 text-slate-900 dark:text-white"
          >
            Let's Build Together
          </motion.h2>
          <div className="h-[3px] w-20 bg-gradient-to-r from-primaryBlue via-secondaryPurple to-brightTeal mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Info Card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                Connect With Me
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Whether you have an internship opportunity, an open-source project to collaborate on, or just want to chat about AI/ML or Cloud development—drop a message!
              </p>
            </div>

            {/* Social Channels */}
            <div className="space-y-4">
              <a
                href="mailto:nagprathikmg01@gmail.com"
                className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-surfaceBorder bg-white/40 dark:bg-[#111118]/45 hover:border-primaryBlue/35 hover:shadow-lg hover:shadow-primaryBlue/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500/10 text-primaryBlue group-hover:bg-primaryBlue group-hover:text-white transition-all duration-300">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-mono tracking-widest uppercase">Email</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">nagprathikmg01@gmail.com</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/nag-prathik-m-g"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-surfaceBorder bg-white/40 dark:bg-[#111118]/45 hover:border-secondaryPurple/35 hover:shadow-lg hover:shadow-secondaryPurple/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-500/10 text-secondaryPurple group-hover:bg-secondaryPurple group-hover:text-white transition-all duration-300">
                  <LinkedinIcon size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-mono tracking-widest uppercase">LinkedIn</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">nag-prathik-m-g</p>
                </div>
              </a>

              <a
                href="https://github.com/nagprathikmg01"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-surfaceBorder bg-white/40 dark:bg-[#111118]/45 hover:border-slate-400 dark:hover:border-white/30 hover:shadow-lg hover:shadow-white/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-white group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all duration-300">
                  <GithubIcon size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-mono tracking-widest uppercase">GitHub</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">nagprathikmg01</p>
                </div>
              </a>
            </div>

            {/* Resume CTA */}
            <div className="pt-4">
              <a
                href="/resume.pdf"
                download="Nag_Prathik_M_G_Resume.pdf"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primaryBlue to-secondaryPurple text-white px-8 py-4 rounded-xl text-sm uppercase tracking-wider font-bold hover:shadow-[0_10px_25px_rgba(59,130,246,0.35)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 w-full justify-center"
              >
                <Download size={18} /> Download Resume
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form Card */}
          <div className="lg:col-span-7">
            <motion.div
              onMouseMove={handleMouseMove}
              whileHover={{ rotateX: 2, rotateY: -2, scale: 1.01 }}
              transition={{ duration: 0.4 }}
              className="relative bg-white dark:bg-surface/50 border border-slate-200 dark:border-surfaceBorder rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden h-full flex flex-col justify-between"
            >
              {/* Dynamic mouse hover light effect */}
              <div
                className="absolute w-64 h-64 rounded-full pointer-events-none blur-[80px] opacity-15 dark:opacity-20 transition-all duration-200"
                style={{
                  left: position.x - 128,
                  top: position.y - 128,
                  background: "radial-gradient(circle, rgba(59,130,246,0.4), transparent 70%)",
                }}
              />

              <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10 h-full flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Nag Prathik"
                      className="w-full h-12 px-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-black/25 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-primaryBlue outline-none transition-all duration-300 font-medium font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="nagprathikmg01@gmail.com"
                      className="w-full h-12 px-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-black/25 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-primaryBlue outline-none transition-all duration-300 font-medium font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Hi, let's connect..."
                      className="w-full p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-black/25 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-primaryBlue outline-none transition-all duration-300 font-medium font-sans resize-none"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider text-xs hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : success ? (
                      "Message Sent Successfully!"
                    ) : (
                      <>
                        Send Message <Send size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}