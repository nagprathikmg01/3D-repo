import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sun, Moon, Menu, X } from "lucide-react";

import ParticleBackground from "@/components/ParticleBackground";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import Showcase from "@/components/Showcase";
import ExperienceSection from "@/components/ExperienceSection";
import CertificationsSection from "@/components/CertificationsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function About() {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync dark mode class with html node
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Audio click helper
  const playClickSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  };

  // Tracking scroll progress & active sections
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }

      // Intersection checker
      const scrollPos = window.scrollY + 200;
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 overflow-x-hidden relative">
      
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-secondaryPurple via-primaryBlue to-brightTeal z-[100] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Cyber Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating Spotlight Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <ParticleBackground />

      {/* Frosted Sticky Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4.5 backdrop-blur-2xl bg-white/60 dark:bg-[#050508]/45 border-b border-slate-200/50 dark:border-surfaceBorder/50 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
        
        {/* Back Arrow & Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              playClickSound();
              navigate("/");
            }}
            className="flex items-center gap-2 text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white text-xs font-mono tracking-widest uppercase transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10" />
          <span className="text-lg tracking-widest font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-secondaryPurple to-primaryBlue font-display">
            NPM G
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="hidden xl:flex items-center gap-8 text-[11px] font-mono tracking-widest uppercase font-bold text-slate-500 dark:text-white/60">
          <li
            onClick={() => {
              playClickSound();
              navigate("/");
            }}
            className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer py-1.5"
          >
            Home
          </li>
          {sections.map((section) => (
            <li
              key={section.id}
              onClick={() => {
                playClickSound();
                document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`relative hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer py-1.5 ${
                activeSection === section.id ? "text-primaryBlue dark:text-primaryBlue font-black" : ""
              }`}
            >
              {section.label}
              {activeSection === section.id && (
                <motion.div
                  layoutId="activeNavLine"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primaryBlue"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              playClickSound();
              setDarkMode(!darkMode);
            }}
            className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-200/50 dark:hover:bg-white/5 transition-all duration-300 text-slate-700 dark:text-white/80"
            title="Toggle Light/Dark Theme"
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            onClick={() => {
              playClickSound();
              setMobileMenu(!mobileMenu);
            }}
            className="xl:hidden p-2.5 rounded-full border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white"
          >
            {mobileMenu ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 w-[280px] z-40 bg-white dark:bg-[#050508]/95 backdrop-blur-xl border-l border-slate-200 dark:border-surfaceBorder shadow-2xl flex flex-col justify-center px-8 gap-8"
          >
            <ul className="flex flex-col gap-6 text-sm tracking-widest font-mono uppercase font-bold text-slate-500 dark:text-white/60">
              <li
                onClick={() => {
                  playClickSound();
                  navigate("/");
                }}
                className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
              >
                Home
              </li>
              {sections.map((section) => (
                <li
                  key={section.id}
                  onClick={() => {
                    playClickSound();
                    document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                    setMobileMenu(false);
                  }}
                  className={`hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer ${
                    activeSection === section.id ? "text-primaryBlue dark:text-primaryBlue" : ""
                  }`}
                >
                  {section.label}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrolling Sections wrapper */}
      <div className="pt-20">
        <section id="about">
          <AboutSection />
        </section>

        <section id="skills">
          <SkillsSection />
        </section>

        <section id="projects">
          <Showcase />
        </section>

        <section id="experience">
          <ExperienceSection />
        </section>

        <section id="certifications">
          <CertificationsSection />
        </section>

        <section id="education">
          <EducationSection />
        </section>

        <section id="contact">
          <ContactSection />
        </section>

        <FooterSection />
      </div>
    </div>
  );
}