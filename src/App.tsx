import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import { ArrowUpRight, Menu, X, Sun, Moon, Mail, Download } from "lucide-react";

// Inline brand icon SVGs to avoid dependency mismatches
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
const NeuralNetworkSVG = () => (
  <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <radialGradient id="neuralGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#neuralGlow)" />
    <line x1="20" y1="30" x2="50" y2="20" stroke="#3b82f6" strokeWidth="0.2" className="animate-pulse" />
    <line x1="50" y1="20" x2="80" y2="35" stroke="#7c3aed" strokeWidth="0.2" />
    <line x1="80" y1="35" x2="70" y2="70" stroke="#3b82f6" strokeWidth="0.2" />
    <line x1="70" y1="70" x2="35" y2="80" stroke="#06b6d4" strokeWidth="0.2" className="animate-pulse" />
    <line x1="35" y1="80" x2="20" y2="30" stroke="#7c3aed" strokeWidth="0.2" />
    <line x1="20" y1="30" x2="45" y2="55" stroke="#3b82f6" strokeWidth="0.2" />
    <line x1="50" y1="20" x2="45" y2="55" stroke="#7c3aed" strokeWidth="0.2" />
    <line x1="80" y1="35" x2="45" y2="55" stroke="#06b6d4" strokeWidth="0.2" />
    <line x1="70" y1="70" x2="45" y2="55" stroke="#3b82f6" strokeWidth="0.2" />
    <line x1="35" y1="80" x2="45" y2="55" stroke="#7c3aed" strokeWidth="0.2" />
    <circle cx="20" cy="30" r="1.5" fill="#3b82f6" className="animate-ping" style={{ animationDuration: '3s' }} />
    <circle cx="20" cy="30" r="1" fill="#3b82f6" />
    <circle cx="50" cy="20" r="1.2" fill="#7c3aed" />
    <circle cx="80" cy="35" r="1.5" fill="#06b6d4" className="animate-ping" style={{ animationDuration: '4s' }} />
    <circle cx="80" cy="35" r="1" fill="#06b6d4" />
    <circle cx="70" cy="70" r="1.2" fill="#3b82f6" />
    <circle cx="35" cy="80" r="1.5" fill="#7c3aed" className="animate-ping" style={{ animationDuration: '5s' }} />
    <circle cx="35" cy="80" r="1" fill="#7c3aed" />
    <circle cx="45" cy="55" r="2" fill="#06b6d4" />
  </svg>
);

import ParticleBackground from "@/components/ParticleBackground";
import WelcomeScreen from "@/components/WelcomeScreen";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import Showcase from "@/components/Showcase";
import ExperienceSection from "@/components/ExperienceSection";
import CertificationsSection from "@/components/CertificationsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import HeroThree from "@/components/HeroThree";

// Simple robust CountUp using requestAnimationFrame & IntersectionObserver with glow flash
function CountUp({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [flashing, setFlashing] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setFlashing(true);
        setTimeout(() => setFlashing(false), 800);
      }
    };
    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return (
    <span
      ref={ref}
      className={`font-display transition-all duration-300 ${
        flashing ? "text-white brightness-150 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]" : ""
      }`}
    >
      {count}
      {suffix}
    </span>
  );
}

// Simple robust Typewriter component
function Typewriter({ words, delay = 100, period = 2000 }: { words: string[]; delay?: number; period?: number }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: any;
    const activeWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length - 1));
      }, delay / 2);
    } else {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length + 1));
      }, delay);
    }

    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), period);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, delay, period]);

  return (
    <span className="border-r-2 border-primaryBlue pr-1 text-transparent bg-clip-text bg-gradient-to-r from-primaryBlue via-secondaryPurple to-brightTeal">
      {currentText}
    </span>
  );
}

const sections = [
  { id: "Home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("Home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };
    const handleMouseLeave = () => setCursorVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeMouseMove = null; // clean up check
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Sync dark mode class with html node
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Turn off welcome screen
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Sync document scroll state
  useEffect(() => {
    if (showWelcome || mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showWelcome, mobileMenu]);

  // Scroll Progress and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }

      // Check current active section
      let currentSection = "Home";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentSection = section.id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Web Audio synth click helper
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

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden relative font-sans">
            
            {/* Scroll Indicator */}
            <div
              className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-secondaryPurple via-primaryBlue to-brightTeal z-[100] transition-all duration-100 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />

            {/* Mesh Background */}
            <ParticleBackground />

            {/* Welcome Animation */}
            <AnimatePresence>{showWelcome && <WelcomeScreen />}</AnimatePresence>

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4.5 backdrop-blur-2xl bg-white/60 dark:bg-[#0a0a0f]/45 border-b border-slate-200/50 dark:border-surfaceBorder/50 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
              
              {/* Logo Initials */}
              <div className="flex items-center gap-3">
                <span className="text-lg tracking-widest font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-secondaryPurple to-primaryBlue font-display">
                  NPM G
                </span>
              </div>

              {/* Navigation Links */}
              <ul className="hidden xl:flex items-center gap-8 text-[11px] font-mono tracking-widest uppercase font-bold text-slate-500 dark:text-white/60">
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

              {/* Theme Toggle & Mobile Burger */}
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

            {/* Mobile Drawer Navigation Menu */}
            <AnimatePresence>
              {mobileMenu && (
                <motion.div
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
                  className="fixed inset-y-0 right-0 w-[280px] z-40 bg-white dark:bg-[#0a0a0f]/95 backdrop-blur-xl border-l border-slate-200 dark:border-surfaceBorder shadow-2xl flex flex-col justify-center px-8 gap-8"
                >
                  <ul className="flex flex-col gap-6 text-sm tracking-widest font-mono uppercase font-bold text-slate-500 dark:text-white/60">
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

            {/* Hero Section */}
            <section
              id="Home"
              className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 px-6 md:px-12 lg:px-24 bg-slate-50 dark:bg-[#0a0a0f] overflow-hidden"
            >
              {/* Background Spots */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px]" />
              </div>

              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                
                {/* Left: Bio text & CTA */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  {/* Pulse open badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wider font-mono">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    Open to Internships
                  </div>

                  <h1 className="text-5xl md:text-6xl xl:text-7xl font-black font-display tracking-tight text-slate-950 dark:text-white leading-tight">
                    NAG PRATHIK M G
                  </h1>

                  {/* Typewriter */}
                  <h3 className="text-xl md:text-2xl font-bold font-mono tracking-wide h-[40px]">
                    <Typewriter
                      words={[
                        "Building AI-Powered Products",
                        "Full-Stack + AI/ML Engineer",
                        "Google Student Ambassador · Top 250 Globally",
                        "Cloud · React · Flutter · PyTorch",
                      ]}
                    />
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-sans max-w-xl">
                    Pre-final year B.E. Information Science & Engineering student at NMIT, Bangalore (CGPA 8.5/10). Google Student Ambassador ranked Top 250 Globally. Nationally selected IBM AI Intern (AICTE + IBM SkillsBuild). I build production-grade AI systems, cross-platform apps, and cloud-native solutions.
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button
                      onClick={() => {
                        playClickSound();
                        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-primaryBlue to-secondaryPurple text-white px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider hover:shadow-[0_10px_25px_rgba(59,130,246,0.35)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                    >
                      View Projects <ArrowUpRight size={16} />
                    </button>

                    <a
                      href="/resume.pdf"
                      download="Nag_Prathik_M_G_Resume.pdf"
                      className="inline-flex items-center gap-2 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white bg-slate-200/50 dark:bg-white/5 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-slate-950 dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-slate-900 dark:hover:border-white transition-all duration-300"
                    >
                      <Download size={16} /> Download Resume
                    </a>
                  </div>

                  {/* Social Row */}
                  <div className="flex gap-4 pt-4 items-center">
                    <a
                      href="https://github.com/nagprathikmg01"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-white/60 hover:text-slate-950 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/30 transition-all duration-300"
                    >
                      <GithubIcon size={18} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/nag-prathik-m-g"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-white/60 hover:text-slate-950 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/30 transition-all duration-300"
                    >
                      <LinkedinIcon size={18} />
                    </a>
                    <a
                      href="mailto:nagprathikmg@gmail.com"
                      className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-white/60 hover:text-slate-950 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/30 transition-all duration-300"
                    >
                      <Mail size={18} />
                    </a>
                  </div>
                </div>

                {/* Right: 3D animated crystal mesh with Neural network SVG background */}
                <div className="lg:col-span-5 flex justify-center relative py-12 lg:py-0 w-full h-[400px] md:h-[450px]">
                  {/* Neural network SVG background */}
                  <NeuralNetworkSVG />
                  
                  {/* R3F Canvas */}
                  <div className="absolute inset-0 z-10 w-full h-full">
                    <HeroThree />
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Bar */}
            <div className="w-full py-8 border-y border-slate-200 dark:border-surfaceBorder bg-slate-100/50 dark:bg-surface/30 backdrop-blur-md relative z-10 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 items-center text-center">
                
                <div className="space-y-1">
                  <p className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-secondaryPurple to-primaryBlue font-display">
                    #<CountUp end={250} />
                  </p>
                  <p className="text-[10px] tracking-widest font-mono text-slate-500 uppercase font-bold">
                    Google Ambassador
                  </p>
                </div>

                <div className="border-l border-slate-200 dark:border-surfaceBorder space-y-1">
                  <p className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primaryBlue to-brightTeal font-display">
                    <CountUp end={15} />+
                  </p>
                  <p className="text-[10px] tracking-widest font-mono text-slate-500 uppercase font-bold">
                    Certifications
                  </p>
                </div>

                <div className="border-l border-slate-200 dark:border-surfaceBorder space-y-1">
                  <p className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brightTeal to-emerald-500 font-display">
                    <CountUp end={5} />+
                  </p>
                  <p className="text-[10px] tracking-widest font-mono text-slate-500 uppercase font-bold">
                    Deployed Projects
                  </p>
                </div>

                <div className="border-l border-slate-200 dark:border-surfaceBorder space-y-1">
                  <p className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-500 font-display">
                    <CountUp end={8.5} duration={1.5} />
                  </p>
                  <p className="text-[10px] tracking-widest font-mono text-slate-500 uppercase font-bold">
                    College CGPA
                  </p>
                </div>

                <div className="border-l border-slate-200 dark:border-surfaceBorder space-y-1">
                  <p className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-pink-500 font-display">
                    <CountUp end={200} />+
                  </p>
                  <p className="text-[10px] tracking-widest font-mono text-slate-500 uppercase font-bold">
                    Event Attendees
                  </p>
                </div>

                <div className="border-l border-slate-200 dark:border-surfaceBorder space-y-1">
                  <p className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-secondaryPurple font-display">
                    <CountUp end={2} />
                  </p>
                  <p className="text-[10px] tracking-widest font-mono text-slate-500 uppercase font-bold">
                    Hackathons Hosted
                  </p>
                </div>

              </div>
            </div>

            {/* Sections */}
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

            {/* Footer */}
            <FooterSection />

            {/* Custom Trailing Cursor */}
            {cursorVisible && (
              <div className="hidden lg:block">
                <div
                  className="fixed w-2.5 h-2.5 rounded-full bg-primaryBlue pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out mix-blend-difference"
                  style={{ left: mousePos.x, top: mousePos.y }}
                />
                <div
                  className="fixed w-7 h-7 rounded-full border border-secondaryPurple/60 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
                  style={{ left: mousePos.x, top: mousePos.y }}
                />
              </div>
            )}
          </div>
        }
      />
    </Routes>
  );
}