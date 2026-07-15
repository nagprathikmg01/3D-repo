import { ArrowUpRight, Menu, X, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";

import heroEye from "@/assets/hero-eye.png";
import WelcomeScreen from "@/components/WelcomeScreen";
import FrontendDeveloperSection from "@/components/FrontendDeveloperSection";
import Showcase from "./components/Showcase";
import ContactSection from "@/components/ContactSection";
import About from "./pages/About";
import ParticleBackground from "@/components/ParticleBackground";

const logos = ["PRATHIK", "WEBKAIZEN", "FRONTEND", "DEVELOPER"];

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [time, setTime] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [displayed, setDisplayed] = useState("");
  const [colorMode, setColorMode] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const titleRef = useRef<HTMLHeadingElement>(null);
  const text = "PRATHIK";

  const colors = [
    "bg-gradient-to-b from-white via-gray-200 via-gray-500 to-black text-transparent bg-clip-text",
    "text-white",
    "bg-gradient-to-b from-black via-gray-500 via-gray-200 to-white text-transparent bg-clip-text",
  ];

  // Web Audio Synth Click
  const playClickSound = () => {
    if (!audioEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      console.warn("Audio Context blocked:", e);
    }
  };

  if (typeof window !== "undefined") {
    (window as any).playClickSound = playClickSound;
  }

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showWelcome || mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showWelcome, mobileMenu]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    function type() {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i < text.length) setTimeout(type, 200);
    }
    type();
  }, []);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Title mouse move spotlight tracking
  const handleTitleMouseMove = (e: React.MouseEvent) => {
    if (!titleRef.current) return;
    const rect = titleRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden relative">
            {/* Scroll Progress Indicator */}
            <div
              className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-indigo-500 via-cyan-500 to-pink-500 z-[100] transition-all duration-100 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />

            {/* Constellation Particle Physics Background */}
            <ParticleBackground />

            <AnimatePresence>{showWelcome && <WelcomeScreen />}</AnimatePresence>

            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4.5 backdrop-blur-2xl bg-slate-950/45 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
              <div className="flex items-center gap-3">
                <img src="/favicon.svg" alt="Logo" className="w-8 h-8 rounded-full object-cover" />
                <span className="text-[10px] md:text-xs tracking-[0.3em] text-white/70 uppercase font-medium">
                  PRATHIKWEBKAIZEN
                </span>
              </div>

              <ul className="hidden md:flex items-center gap-10 text-xs tracking-widest text-white/70 uppercase">
                {["Home", "about", "showcase", "contact"].map((section) => (
                  <li
                    key={section}
                    onMouseEnter={playClickSound}
                    onClick={() => {
                      playClickSound();
                      document.getElementById(section === "Home" ? "Home" : section)?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {section === "about" ? "About" : section}
                  </li>
                ))}
              </ul>

              <div className="hidden md:flex items-center gap-6">
                {/* Audio Synth Control */}
                <button
                  onClick={() => {
                    const newAudio = !audioEnabled;
                    setAudioEnabled(newAudio);
                    if (newAudio) {
                      setTimeout(() => {
                        // Play a brief introductory pitch
                        try {
                          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                          if (AudioContext) {
                            const ctx = new AudioContext();
                            const osc = ctx.createOscillator();
                            const gain = ctx.createGain();
                            osc.type = "sine";
                            osc.frequency.setValueAtTime(600, ctx.currentTime);
                            osc.frequency.linearRampToValueAtTime(1000, ctx.currentTime + 0.15);
                            gain.gain.setValueAtTime(0.015, ctx.currentTime);
                            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
                            osc.connect(gain);
                            gain.connect(ctx.destination);
                            osc.start();
                            osc.stop(ctx.currentTime + 0.15);
                          }
                        } catch (e) {}
                      }, 50);
                    }
                  }}
                  className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                    audioEnabled
                      ? "border-cyan-500/30 text-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                      : "border-white/10 text-white/50 bg-white/5 hover:text-white hover:border-white/20"
                  }`}
                  title={audioEnabled ? "Mute interface feedback" : "Unmute interactive micro-synth clicks"}
                >
                  {audioEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                </button>

                <div className="text-[10px] tracking-[0.3em] text-white/70 uppercase">
                  {time}
                </div>
              </div>

              <button
                onClick={() => {
                  playClickSound();
                  setMobileMenu(!mobileMenu);
                }}
                className="md:hidden text-white z-50"
              >
                {mobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </nav>

            {mobileMenu && (
              <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 text-white uppercase tracking-[0.3em] text-sm md:hidden">
                <div className="absolute top-30 text-center">
                  <p className="text-[10px] text-white/40 tracking-[0.3em] mb-2">TIME</p>
                  <h2 className="text-2xl tracking-widest font-semibold">{time}</h2>
                </div>
                {["Home", "about", "showcase", "contact"].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => {
                      playClickSound();
                      document.getElementById(sec === "Home" ? "Home" : sec)?.scrollIntoView({
                        behavior: "smooth",
                      });
                      setMobileMenu(false);
                    }}
                    className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
                  >
                    {sec === "about" ? "About" : sec}
                  </button>
                ))}
              </div>
            )}

            <section
              id="Home"
              className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#020617]"
            >
              {/* Background Cyber Grid */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)`,
                  backgroundSize: "50px 50px",
                }}
              />

              {/* Floating Spotlight Glows */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[140px] animate-pulse" />
                <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <img src={heroEye} alt="Hero" className="h-[90%] w-[90%] object-contain object-center" />
              </div>

              <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-12 pt-24 pb-10">
                <h1
                  ref={titleRef}
                  onMouseMove={handleTitleMouseMove}
                  onClick={() => {
                    playClickSound();
                    setColorMode((prev) => (prev + 1) % colors.length);
                  }}
                  className={`font-display uppercase leading-[0.85] tracking-[-0.03em] text-[22vw] md:text-[14vw] lg:text-[13rem] cursor-pointer transition-all duration-300 drop-shadow-[0_0_40px_rgba(255,255,255,0.08)] ${colors[colorMode]}`}
                  style={{
                    backgroundImage: `radial-gradient(circle 120px at ${spotlightPos.x}% ${spotlightPos.y}%, #ffffff 0%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0.06) 100%)`,
                    backgroundClip: colorMode === 0 || colorMode === 2 ? "text" : "initial",
                    WebkitBackgroundClip: colorMode === 0 || colorMode === 2 ? "text" : "initial",
                  }}
                >
                  {displayed || "\u00A0"}
                </h1>

                <p className="md:absolute md:top-28 md:right-12 mt-4 md:mt-0 text-right text-3xl md:text-4xl lg:text-5xl leading-[1.05] max-w-md font-[Poppins] font-bold tracking-wide text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-white via-white/60 to-white animate-[shine_4s_linear_infinite]">
                  Creating <br /> Websites <br /> That Feel <br /> Alive.
                </p>

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-auto">
                  <p className="relative text-sm sm:text-base lg:text-xl leading-relaxed max-w-md font-[Poppins] font-medium tracking-wide text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-white via-white/60 to-white animate-[shine_4s_linear_infinite]">
                    Turning creative ideas into interactive and <br />
                    <em className="not-italic text-white"> high-quality web experiences. </em>
                  </p>
                  <a href="https://github.com/nagprathikmg01" target="_blank" rel="noopener noreferrer">
                    <button
                      onMouseEnter={playClickSound}
                      onClick={playClickSound}
                      className="inline-flex items-center gap-3 border border-white/15 bg-white/5 text-white px-6 py-3.5 text-xs tracking-[0.25em] uppercase font-bold hover:bg-white hover:text-black hover:border-white transition-all duration-300 rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-98"
                    >
                      GITHUB <ArrowUpRight size={16} />
                    </button>
                  </a>
                </div>
              </div>
            </section>

            <div className="bg-black border-t border-white/10 py-5 overflow-hidden">
              <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
                {[...logos, ...logos, ...logos].map((logo, i) => (
                  <span key={i} className="text-white/40 text-xs tracking-[0.3em] uppercase font-medium">
                    {logo}
                  </span>
                ))}
              </div>
            </div>

            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-33.333%); }
              }
              .animate-marquee {
                animation: marquee 10s linear infinite;
              }
            `}</style>

            <section id="about">
              <FrontendDeveloperSection />
            </section>

            <section id="showcase">
              <Showcase />
            </section>

            <section id="contact">
              <ContactSection />
            </section>
          </div>
        }
      />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}