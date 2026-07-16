import { useEffect, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ArrowUpRight, Sun, Moon } from "lucide-react";

import ParticleBackground from "@/components/ParticleBackground";
import WelcomeScreen from "@/components/WelcomeScreen";
import FrontendDeveloperSection from "@/components/FrontendDeveloperSection";
import About from "@/pages/About";
import heroEye from "@/assets/hero-eye.png";

export default function App() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [time, setTime] = useState("");

  // Spotlight heading configurations
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [colorMode, setColorMode] = useState(0);
  const text = "PRATHIK";
  const [displayed, setDisplayed] = useState("");

  const colors = [
    "text-transparent bg-clip-text bg-gradient-to-r from-secondaryPurple via-primaryBlue to-brightTeal",
    "text-transparent bg-clip-text bg-gradient-to-r from-primaryBlue via-brightTeal to-emerald-400",
    "text-transparent bg-clip-text bg-gradient-to-r from-glowingMagenta via-secondaryPurple to-primaryBlue",
  ];

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

  // Update clock time
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Custom cursor listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };
    const handleMouseLeave = () => setCursorVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Typographic typing animation
  useEffect(() => {
    if (showWelcome) return;
    let idx = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[idx]);
      idx++;
      if (idx === text.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, [showWelcome]);

  const handleTitleMouseMove = (e: React.MouseEvent) => {
    if (!titleRef.current) return;
    const rect = titleRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

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

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-slate-50 dark:bg-darkBg text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden relative font-sans">
            
            {/* Mesh Background */}
            <ParticleBackground />

            {/* Welcome Loader */}
            <AnimatePresence>{showWelcome && <WelcomeScreen />}</AnimatePresence>

            {/* Simple Top Header Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 select-none">
              <span
                onClick={() => {
                  playClickSound();
                  navigate("/");
                }}
                className="text-lg tracking-widest font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-secondaryPurple to-primaryBlue font-display cursor-pointer"
              >
                NPM G
              </span>
              <div className="flex items-center gap-6">
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
                <div className="text-[10px] tracking-[0.3em] text-slate-500 dark:text-white/70 uppercase">
                  {time}
                </div>
              </div>
            </nav>

            {/* Hero Section */}
            <section
              id="Home"
              className="relative w-full h-screen min-h-[640px] overflow-hidden bg-slate-50 dark:bg-darkBg"
            >
              {/* Background Cyber Grid */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)`,
                  backgroundSize: "50px 50px",
                }}
              />

              {/* Floating Spotlight Glows */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px]" />
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <img
                  src={heroEye}
                  alt="Hero backdrop"
                  className="h-[90%] w-[90%] object-contain object-center opacity-10 dark:opacity-20 animate-pulse-slow"
                />
              </div>

              <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-12 pt-28 pb-10">
                <h1
                  ref={titleRef}
                  onMouseMove={handleTitleMouseMove}
                  onClick={() => {
                    playClickSound();
                    setColorMode((prev) => (prev + 1) % colors.length);
                  }}
                  className={`font-display uppercase leading-[0.85] tracking-[-0.03em] text-[20vw] md:text-[14vw] lg:text-[13rem] cursor-pointer transition-all duration-300 drop-shadow-[0_0_40px_rgba(255,255,255,0.08)] select-none ${colors[colorMode]}`}
                  style={{
                    backgroundImage: `radial-gradient(circle 120px at ${spotlightPos.x}% ${spotlightPos.y}%, #ffffff 0%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0.06) 100%)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  {displayed || "\u00A0"}
                </h1>

                <p className="md:absolute md:top-28 md:right-12 mt-4 md:mt-0 text-right text-3xl md:text-4xl lg:text-5xl leading-[1.05] max-w-md font-display font-black tracking-wide text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-white/60 dark:to-white animate-[shine_4s_linear_infinite]">
                  Creating <br /> Websites <br /> That Feel <br /> Alive.
                </p>

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-auto">
                  <p className="relative text-sm sm:text-base lg:text-lg leading-relaxed max-w-md font-sans font-medium tracking-wide text-slate-600 dark:text-slate-400">
                    Turning creative ideas into interactive and <br />
                    <em className="not-italic text-slate-950 dark:text-white font-bold">
                      {" "}
                      high-quality web experiences.{" "}
                    </em>
                  </p>
                  <a
                    href="https://github.com/nagprathikmg01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 border border-slate-300 dark:border-white/15 bg-white/5 text-slate-800 dark:text-white px-6 py-3.5 text-xs tracking-[0.25em] uppercase font-bold hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-slate-900 dark:hover:border-white transition-all duration-300 rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-105"
                  >
                    GITHUB <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </section>

            {/* Custom Separator Marquee */}
            <div className="bg-slate-100 dark:bg-black border-t border-b border-slate-200 dark:border-white/10 py-5 overflow-hidden select-none">
              <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
                {[
                  "AI & MACHINE LEARNING",
                  "FULL-STACK DEVELOPMENT",
                  "CLOUD & DEVOPS PLATFORMS",
                  "INTERACTIVE 3D DESIGN",
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="text-slate-400 dark:text-white/40 text-xs tracking-[0.3em] uppercase font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                display: flex;
                width: max-content;
                animation: marquee 20s linear infinite;
              }
            `}</style>

            {/* Frontend / AI Draggable Lanyard Card Section */}
            <FrontendDeveloperSection />

            {/* Custom Trailing Cursor */}
            {cursorVisible && (
              <div className="hidden lg:block pointer-events-none">
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
      <Route path="/about" element={<About />} />
    </Routes>
  );
}