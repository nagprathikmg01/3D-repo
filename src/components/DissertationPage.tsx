import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import InteractiveHeroCanvas from "./InteractiveHeroCanvas";
import NeuralTopologyWidget from "./NeuralTopologyWidget";
import CodeInspectorWidget from "./CodeInspectorWidget";
import CandidateBadge3D from "./CandidateBadge3D";
import AudioAbstractPlayer from "./AudioAbstractPlayer";
import VisualCertificationsShowcase from "./VisualCertificationsShowcase";
import {
  identity,
  stats,
  skills,
  projects,
  experience,
  education,
  certifications,
  type SkillTier,
  type Project,
} from "@/data/portfolio";

const TIER_LABEL: Record<SkillTier, string> = {
  ai: "AI & MACHINE LEARNING",
  fs: "FULL-STACK ENGINEERING",
  cloud: "CLOUD ARCHITECTURE & DEVOPS",
};

const TIER_ANNOTATION: Record<SkillTier, string> = {
  ai: "Empirical optimization of neural pipelines, RAG context windows, LLM fine-tuning, and multi-agent orchestration.",
  fs: "Production-grade web and cross-platform applications constructed with type-safe APIs and responsive user interfaces.",
  cloud: "Resilient cloud infrastructure, automated container deployment, and managed relational & document datastores.",
};

function Typewriter() {
  const [text, setText] = useState("");
  const state = useRef({ word: 0, len: 0, deleting: false, wait: 0 });

  useEffect(() => {
    const id = setInterval(() => {
      const s = state.current;
      const word = identity.roles[s.word];
      if (s.wait > 0) {
        s.wait -= 1;
        return;
      }
      if (!s.deleting) {
        s.len += 1;
        if (s.len >= word.length) {
          s.deleting = true;
          s.wait = 24;
        }
      } else {
        s.len -= 1;
        if (s.len <= 0) {
          s.deleting = false;
          s.word = (s.word + 1) % identity.roles.length;
          s.wait = 6;
        }
      }
      setText(word.slice(0, Math.max(0, s.len)));
    }, 75);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="font-mono text-xs text-crimson flex items-center gap-2">
      <span className="opacity-60">CURRENT SPECIFICATION ▸</span>
      <span className="font-semibold tracking-wider">{text}</span>
      <span className="caret font-bold">_</span>
    </div>
  );
}

function SectionHeading({ chapter, title, subtitle }: { chapter: string; title: string; subtitle?: string }) {
  return (
    <div className="fade-in mb-12 border-b border-paperBorder pb-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-crimson font-bold bg-paperSheet border border-paperBorder px-2.5 py-1">
          CHAPTER {chapter}
        </span>
        <span className="h-px bg-paperBorder flex-1" />
        <span className="font-mono text-[10px] text-inkMuted uppercase tracking-widest hidden sm:inline">
          DISSERTATION SECTION {chapter}
        </span>
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-inkDark tracking-tight">{title}</h2>
      {subtitle && <p className="font-mono text-xs text-inkMuted mt-2 tracking-wide">{subtitle}</p>}
    </div>
  );
}

export default function DissertationPage() {
  const root = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [projectCategory, setProjectCategory] = useState<"ALL" | "AI" | "FULLSTACK" | "CLOUD">("ALL");
  const formId = import.meta.env.VITE_FORMSPREE_ID as string | undefined;
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((window.scrollY / total) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".fade-in").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          },
        );
      });
    }, root);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={root} className="bg-paperBg text-inkDark min-h-screen font-sans selection:bg-crimson selection:text-white">
      {/* Texture Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 15% 25%, #1E1C1A 1px, transparent 1px), radial-gradient(1px 1px at 75% 65%, #1E1C1A 1px, transparent 1px), radial-gradient(1.5px 1.5px at 50% 80%, #9E4733 1px, transparent 1px)",
          backgroundSize: "240px 240px",
        }}
      />

      {/* TOP EDITORIAL NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-paperBg/95 backdrop-blur-md border-b border-paperBorder px-6 py-3.5 transition-all">
        {/* Scroll Progress Line */}
        <div
          className="h-[2px] bg-crimson fixed top-0 left-0 z-50 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 text-left group">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-paperBorder bg-paperSheet shrink-0 shadow-sm">
              <img
                src="/profile.jpg"
                alt={identity.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] text-crimson font-bold block uppercase">
                DISSERTATION N° 042
              </span>
              <span className="font-display text-base font-bold text-inkDark tracking-tight group-hover:text-crimson transition-colors">
                {identity.name}
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 font-mono text-[11px] text-inkMuted">
            <button onClick={() => scrollToSection("ch-00")} className="hover:text-crimson transition-colors">00. ABSTRACT</button>
            <button onClick={() => scrollToSection("ch-01")} className="hover:text-crimson transition-colors">01. METRICS</button>
            <button onClick={() => scrollToSection("ch-02")} className="hover:text-crimson transition-colors">02. SKILLS</button>
            <button onClick={() => scrollToSection("ch-03")} className="hover:text-crimson transition-colors">03. PUBLICATIONS</button>
            <button onClick={() => scrollToSection("ch-04")} className="hover:text-crimson transition-colors">04. CHRONOLOGY</button>
            <button onClick={() => scrollToSection("ch-05")} className="hover:text-crimson transition-colors">05. DEGREES</button>
            <button onClick={() => scrollToSection("ch-06")} className="hover:text-crimson transition-colors">06. SERVICES</button>
            <button onClick={() => scrollToSection("ch-07")} className="hover:text-crimson transition-colors">07. INQUIRY</button>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <a href={identity.resume} download className="btn-ghost text-[10px] px-3.5 py-1.5 hidden sm:inline-flex">
              CV [PDF]
            </a>
            <button onClick={() => scrollToSection("ch-07")} className="btn-red text-[10px] px-4 py-1.5">
              INQUIRE ↗
            </button>
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-inkDark border border-paperBorder bg-paperSheet text-xs font-mono"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? "CLOSE ✕" : "MENU ☰"}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-paperBorder mt-3 pt-3 pb-4 space-y-2 font-mono text-xs text-inkDark bg-paperSheet px-4 rounded-sm shadow-md">
            <button onClick={() => scrollToSection("ch-00")} className="block w-full text-left py-1 hover:text-crimson">00. ABSTRACT & OVERVIEW</button>
            <button onClick={() => scrollToSection("ch-01")} className="block w-full text-left py-1 hover:text-crimson">01. BENCHMARK METRICS</button>
            <button onClick={() => scrollToSection("ch-02")} className="block w-full text-left py-1 hover:text-crimson">02. COMPETENCIES & DOMAINS</button>
            <button onClick={() => scrollToSection("ch-03")} className="block w-full text-left py-1 hover:text-crimson">03. PUBLISHED WORKS & PROJECTS</button>
            <button onClick={() => scrollToSection("ch-04")} className="block w-full text-left py-1 hover:text-crimson">04. FIELD CHRONOLOGY</button>
            <button onClick={() => scrollToSection("ch-05")} className="block w-full text-left py-1 hover:text-crimson">05. ACADEMIC CREDENTIALS</button>
            <button onClick={() => scrollToSection("ch-06")} className="block w-full text-left py-1 hover:text-crimson">06. CONSULTANCY PACKAGES</button>
            <button onClick={() => scrollToSection("ch-07")} className="block w-full text-left py-1 hover:text-crimson">07. MANUSCRIPT SUBMISSION</button>
          </div>
        )}
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-28 relative z-10">
        
        {/* CHAPTER 00: DISSERTATION ABSTRACT & HERO */}
        <section id="ch-00" className="pt-4 relative min-h-[75vh] flex flex-col justify-center">
          <InteractiveHeroCanvas />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
            
            {/* Left 8 Cols — Main Abstract & Hero Header */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-3">
                <div className="fade-in inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-crimson bg-paperSheet/90 backdrop-blur border border-paperBorder px-3 py-1 font-bold">
                  <span>◈ DISSERTATION PORTFOLIO · EDITION 2026</span>
                  <span>·</span>
                  <span>APPLIED AI & SYSTEMS</span>
                </div>

                <h1 className="fade-in font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-inkDark leading-[1.02] tracking-tight">
                  NAG PRATHIK <span className="text-crimson italic font-bold">M G</span>
                </h1>

                <p className="fade-in font-display text-xl sm:text-2xl text-crimson font-bold tracking-tight">
                  Architecting Scalable AI Infrastructure, Agentic RAG & Resilient Systems.
                </p>
              </div>

              <div className="fade-in">
                <Typewriter />
              </div>

              {/* Abstract Quote Block */}
              <div className="fade-in space-panel p-6 sm:p-8 relative">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b border-paperBorder pb-2">
                  <p className="font-mono text-[10px] text-crimson tracking-[0.3em] uppercase font-semibold">
                    ABSTRACT & EXECUTIVE STATEMENT
                  </p>
                  <AudioAbstractPlayer />
                </div>
                <blockquote className="font-sans text-base sm:text-lg text-inkDark leading-relaxed font-normal italic border-l-2 border-crimson pl-4">
                  "This dissertation presents empirical research and production software engineering across neural drift detection, autonomous agentic workflows, multi-platform applications, and resilient cloud architectures authored by {identity.name}."
                </blockquote>
                <div className="mt-4 pt-4 border-t border-paperBorder/60 flex flex-wrap gap-4 text-xs font-mono text-inkMuted">
                  <span>LOCATION: BENGALURU, INDIA</span>
                  <span>·</span>
                  <span>STATUS: AVAILABLE FOR ROLES & CONSULTING</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="fade-in flex flex-wrap gap-4 pt-2">
                <a href={identity.resume} download className="btn-red text-xs px-6 py-3">
                  DOWNLOAD CV [PDF] ▼
                </a>
                <button onClick={() => scrollToSection("ch-03")} className="btn-ghost text-xs px-6 py-3">
                  EXPLORE CASE STUDIES ↘
                </button>
                <a href={identity.github} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs px-5 py-3">
                  GITHUB REPOSITORY ↗
                </a>
              </div>
            </div>

            {/* Right 4 Cols — Marginalia / Margin Notes */}
            <div className="lg:col-span-4 space-y-6 lg:border-l lg:border-paperBorder lg:pl-8">
              <div className="fade-in">
                <CandidateBadge3D />
              </div>

              <div className="fade-in space-panel p-5">
                <p className="font-mono text-[10px] text-crimson uppercase tracking-widest font-bold mb-2">
                  MARGINAL NOTE 01 — RESEARCH FOCUS
                </p>
                <p className="font-sans text-xs text-inkMuted leading-relaxed">
                  Specialized in deploying low-latency LLMs (NVIDIA NIM, Claude, Llama 3.1), transformer drift detection, vector retrieval (RAG), and high-reliability full-stack APIs.
                </p>
              </div>

              <div className="fade-in space-panel p-5">
                <p className="font-mono text-[10px] text-crimson uppercase tracking-widest font-bold mb-2">
                  MARGINAL NOTE 02 — LEADERSHIP
                </p>
                <p className="font-sans text-xs text-inkMuted leading-relaxed">
                  Conducted 5+ Google Cloud & AI workshops for 100+ students, co-organized 2 hackathons, and leads marketing for IEEE Computer Society NMIT.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 01: BENCHMARK METRICS */}
        <section id="ch-01" className="scroll-mt-24">
          <SectionHeading
            chapter="01"
            title="Benchmark Metrics & Empirical Results"
            subtitle="Quantitative performance indicators, academic records, and organizational reach."
          />

          <div className="fade-in font-mono text-[10px] text-inkMuted uppercase tracking-widest mb-4 flex items-center justify-between border-b border-paperBorder pb-2">
            <span>TABLE 1.1 — SYSTEM METRICS & HIGHLIGHTS</span>
            <span>DATASET REVISION 2026.1</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {stats.map((s, idx) => (
              <div key={s.label} className="fade-in space-panel p-6 hover:-translate-y-1 transition-transform duration-300">
                <p className="font-mono text-[10px] text-crimson uppercase tracking-widest font-semibold mb-1">
                  METRIC 0{idx + 1}
                </p>
                <p className="font-display text-4xl sm:text-5xl font-bold text-crimson tracking-tight my-2">
                  {s.prefix}
                  {s.value}
                  {s.suffix}
                </p>
                <p className="font-mono text-xs text-inkDark font-semibold uppercase tracking-wider mt-1">{s.label}</p>
                <p className="font-sans text-[11px] text-inkMuted mt-2 leading-normal">
                  {idx === 0 && "Selected among top global student leaders by Google Developers."}
                  {idx === 1 && "Consistently high academic standing in Information Science & Engineering."}
                  {idx === 2 && "Verified certifications from Google Cloud, AWS, Cisco & Simplilearn."}
                  {idx === 3 && "Attendees mentored across technical workshops, hackathons & events."}
                </p>
              </div>
            ))}
          </div>

          <div className="fade-in">
            <NeuralTopologyWidget />
          </div>
        </section>

        {/* CHAPTER 02: TECHNICAL COMPETENCIES & DOMAINS */}
        <section id="ch-02" className="scroll-mt-24">
          <SectionHeading
            chapter="02"
            title="Technical Methodology & Skill Domains"
            subtitle="Categorized inventory of tools, frameworks, and architectural capabilities."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {(["ai", "fs", "cloud"] as SkillTier[]).map((tier, idx) => (
              <div key={tier} className="fade-in space-panel p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                <div>
                  <div className="flex items-center justify-between border-b border-paperBorder pb-3 mb-4">
                    <span className="font-mono text-[10px] text-crimson uppercase tracking-[0.2em] font-bold">
                      DOMAIN 0{idx + 1}
                    </span>
                    <span className="font-mono text-[9px] text-inkMuted uppercase">SPEC VERIFIED</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-inkDark mb-2">{TIER_LABEL[tier]}</h3>
                  <p className="font-sans text-xs text-inkMuted mb-6 leading-relaxed border-l-2 border-paperBorder pl-3">
                    {TIER_ANNOTATION[tier]}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {skills
                      .filter((s) => s.tier === tier)
                      .map((s) => (
                        <span
                          key={s.name}
                          className="font-mono text-[11px] px-3 py-1.5 border border-paperBorder text-inkDark bg-paperSheet hover:border-crimson hover:text-crimson transition-colors cursor-default"
                        >
                          {s.name}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-paperBorder/60 font-mono text-[10px] text-inkMuted flex justify-between">
                  <span>TOTAL MODULES: {skills.filter((s) => s.tier === tier).length}</span>
                  <span className="text-crimson font-bold">ACTIVE DEPLOYMENT</span>
                </div>
              </div>
            ))}
          </div>

          <div className="fade-in">
            <CodeInspectorWidget />
          </div>
        </section>

        {/* CHAPTER 03: PUBLISHED WORKS & CASE STUDIES */}
        <section id="ch-03" className="scroll-mt-24">
          <SectionHeading
            chapter="03"
            title="Published Works & Case Studies"
            subtitle="Selected production software systems, neural navigation research, and full-stack projects."
          />

          {/* Project Category Filter Tabs */}
          <div className="fade-in flex flex-wrap gap-2 font-mono text-xs mb-8 border-b border-paperBorder pb-4">
            {[
              { id: "ALL", label: "ALL MANUSCRIPTS" },
              { id: "AI", label: "AI & NEURAL MODELS" },
              { id: "FULLSTACK", label: "FULL-STACK & APPS" },
              { id: "CLOUD", label: "RAG & CLOUD SYSTEMS" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setProjectCategory(tab.id as any)}
                className={`px-4 py-2 border transition-all ${
                  projectCategory === tab.id
                    ? "bg-crimson text-white border-crimson font-bold shadow-sm"
                    : "bg-paperSheet text-inkDark border-paperBorder hover:border-crimson hover:text-crimson"
                }`}
              >
                [ {tab.label} ]
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects
              .filter((p) => {
                if (projectCategory === "ALL") return true;
                if (projectCategory === "AI") return p.tech.some((t) => ["Claude 3.5", "Llama 3.1", "PyTorch", "Transformers", "RAG", "Agentic AI", "NLP"].includes(t));
                if (projectCategory === "FULLSTACK") return p.tech.some((t) => ["Node.js", "React", "Express", "Flutter", "TypeScript", "Dart"].includes(t));
                if (projectCategory === "CLOUD") return p.tech.some((t) => ["PostgreSQL", "Redis", "Firebase", "Vercel", "Firestore"].includes(t));
                return true;
              })
              .map((p, idx) => (
              <article key={p.id} className="fade-in space-panel overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
                {/* Project Image Banner */}
                {p.image && (
                  <div className="relative h-48 sm:h-56 bg-paperSheet overflow-hidden border-b border-paperBorder">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-paperBg via-transparent to-transparent opacity-80" />
                    <span className="absolute top-3 left-3 font-mono text-[9px] text-crimson bg-paperBg/90 backdrop-blur border border-paperBorder px-2.5 py-1 font-bold">
                      PUB-2026-0{idx + 1}
                    </span>
                    {p.badge && (
                      <span className="absolute top-3 right-3 font-mono text-[9px] text-crimson bg-paperBg/90 backdrop-blur border border-paperBorder px-2.5 py-1 flex items-center gap-1.5 font-bold">
                        {p.badge === "LIVE" && <span className="live-dot w-1.5 h-1.5 rounded-full" />}
                        {p.badge}
                      </span>
                    )}
                  </div>
                )}

                <div className="p-7">
                  <h3 className="font-display text-2xl font-bold text-inkDark leading-snug mb-2 group-hover:text-crimson transition-colors">
                    {p.title}
                  </h3>
                  
                  <p className="font-mono text-[10px] text-crimson tracking-widest uppercase mb-4 font-semibold">
                    {p.sub}
                  </p>

                  <p className="font-sans text-sm text-inkMuted leading-relaxed mb-6">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] uppercase border border-paperBorder text-inkDark bg-paperSheet px-2.5 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-7 pb-6 pt-2 border-t border-paperBorder/60 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedProject(p)}
                    className="font-mono text-xs text-crimson font-semibold hover:underline"
                  >
                    EXAMINE MANUSCRIPT ↗
                  </button>
                  <div className="flex gap-2">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost text-[10px] px-3 py-1.5"
                    >
                      GITHUB ↗
                    </a>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-red text-[10px] px-3.5 py-1.5"
                      >
                        DEMO ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CHAPTER 04: FIELD CHRONOLOGY & POSITIONS */}
        <section id="ch-04" className="scroll-mt-24">
          <SectionHeading
            chapter="04"
            title="Appointments & Field Chronology"
            subtitle="Professional roles, leadership appointments, and industry research internships."
          />

          <div className="relative border-l-2 border-paperBorder pl-6 md:pl-10 space-y-10 ml-2">
            {experience.map((e, idx) => (
              <div key={e.role} className="fade-in relative group">
                <span className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3 h-3 rounded-full bg-crimson border-2 border-paperBg group-hover:scale-125 transition-transform" />
                <div className="space-panel p-6 hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-paperBorder pb-3 mb-3">
                    <span className="font-mono text-[10px] text-crimson tracking-widest font-bold uppercase">
                      POSITION 0{idx + 1} // {e.duration}
                    </span>
                    <span className="font-mono text-[9px] text-inkMuted uppercase">VERIFIED APPOINTMENT</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-inkDark">{e.role}</h3>
                  <p className="font-mono text-xs text-crimson font-semibold mt-1 mb-3">{e.company}</p>
                  <p className="font-sans text-sm text-inkMuted leading-relaxed">{e.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CHAPTER 05: ACADEMIC CREDENTIALS & CERTIFICATIONS */}
        <section id="ch-05" className="scroll-mt-24">
          <SectionHeading
            chapter="05"
            title="Degrees & Academic Accreditations"
            subtitle="Institutional education history and verified industry certifications."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {education.map((e, idx) => (
              <div key={e.school} className="fade-in space-panel p-6 hover:-translate-y-1 transition-transform duration-300">
                <p className="font-mono text-[10px] text-crimson uppercase tracking-widest font-bold mb-2">
                  DIPLOMA 0{idx + 1}
                </p>
                <h3 className="font-display text-lg font-bold text-inkDark mb-1">{e.school}</h3>
                <p className="font-mono text-xs text-crimson font-medium mb-3">{e.detail}</p>
                <p className="font-mono text-[10px] text-inkMuted border-t border-paperBorder pt-3">{e.years}</p>
              </div>
            ))}
          </div>

          <VisualCertificationsShowcase />
        </section>

        {/* CHAPTER 06: CONSULTANCY & SERVICE PACKAGES */}
        <section id="ch-06" className="scroll-mt-24">
          <SectionHeading
            chapter="06"
            title="Consultancy & Engagement Packages"
            subtitle="Tailored engineering services for startups, research teams, and enterprise clients."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Package A */}
            <div className="fade-in space-panel p-7 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
              <div>
                <div className="flex items-center justify-between border-b border-paperBorder pb-3 mb-4">
                  <span className="font-mono text-[10px] text-crimson uppercase tracking-[0.2em] font-bold">
                    PACKAGE A
                  </span>
                  <span className="font-mono text-[9px] text-inkMuted">AI / RAG ARCHITECTURE</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-inkDark mb-2">AI MVP & RAG Pipeline</h3>
                <p className="font-mono text-xs text-crimson font-semibold mb-4">Custom LLM & Agentic Workflows</p>
                <p className="font-sans text-xs text-inkMuted leading-relaxed mb-6">
                  Design and deployment of custom RAG pipelines, vector retrieval systems, and multi-agent intent architecture tailored to your domain dataset.
                </p>
                <ul className="space-y-2 font-mono text-[11px] text-inkDark mb-8">
                  <li className="flex items-center gap-2">✓ Vector Database & Retrieval Tuning</li>
                  <li className="flex items-center gap-2">✓ NVIDIA NIM / Gemini API Integration</li>
                  <li className="flex items-center gap-2">✓ Interactive Streamlit / React Interface</li>
                  <li className="flex items-center gap-2">✓ Latency & Token Optimization</li>
                </ul>
              </div>
              <button onClick={() => scrollToSection("ch-07")} className="btn-red w-full justify-center text-xs py-3">
                INQUIRE FOR PACKAGE A ↗
              </button>
            </div>

            {/* Package B */}
            <div className="fade-in space-panel p-7 flex flex-col justify-between border-crimson/40 shadow-md hover:-translate-y-1 transition-transform duration-300">
              <div>
                <div className="flex items-center justify-between border-b border-paperBorder pb-3 mb-4">
                  <span className="font-mono text-[10px] text-crimson uppercase tracking-[0.2em] font-bold">
                    PACKAGE B · RECOMMENDED
                  </span>
                  <span className="font-mono text-[9px] text-crimson font-bold">FULL-STACK WEB</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-inkDark mb-2">Full-Stack Application</h3>
                <p className="font-mono text-xs text-crimson font-semibold mb-4">React, Node.js & Cloud Database</p>
                <p className="font-sans text-xs text-inkMuted leading-relaxed mb-6">
                  End-to-end web software development with high-performance responsive frontend, RESTful backend APIs, and scalable PostgreSQL/Redis storage.
                </p>
                <ul className="space-y-2 font-mono text-[11px] text-inkDark mb-8">
                  <li className="flex items-center gap-2">✓ React / TypeScript Modern UI</li>
                  <li className="flex items-center gap-2">✓ Node.js & Express REST Backend</li>
                  <li className="flex items-center gap-2">✓ PostgreSQL / Prisma ORM Integration</li>
                  <li className="flex items-center gap-2">✓ Redis Cache & Automated Testing</li>
                </ul>
              </div>
              <button onClick={() => scrollToSection("ch-07")} className="btn-red w-full justify-center text-xs py-3">
                INQUIRE FOR PACKAGE B ↗
              </button>
            </div>

            {/* Package C */}
            <div className="fade-in space-panel p-7 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
              <div>
                <div className="flex items-center justify-between border-b border-paperBorder pb-3 mb-4">
                  <span className="font-mono text-[10px] text-crimson uppercase tracking-[0.2em] font-bold">
                    PACKAGE C
                  </span>
                  <span className="font-mono text-[9px] text-inkMuted">CLOUD & DEVOPS</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-inkDark mb-2">Cloud Architecture</h3>
                <p className="font-mono text-xs text-crimson font-semibold mb-4">AWS / GCP Infrastructure Audit</p>
                <p className="font-sans text-xs text-inkMuted leading-relaxed mb-6">
                  Infrastructure as Code setup, containerization, CI/CD pipeline automation, and performance auditing for existing cloud workloads.
                </p>
                <ul className="space-y-2 font-mono text-[11px] text-inkDark mb-8">
                  <li className="flex items-center gap-2">✓ Terraform Infrastructure Provisioning</li>
                  <li className="flex items-center gap-2">✓ Docker & Containerization</li>
                  <li className="flex items-center gap-2">✓ CI/CD Pipeline Automation</li>
                  <li className="flex items-center gap-2">✓ Load Balancing & Security Audit</li>
                </ul>
              </div>
              <button onClick={() => scrollToSection("ch-07")} className="btn-ghost w-full justify-center text-xs py-3">
                INQUIRE FOR PACKAGE C ↗
              </button>
            </div>
          </div>
        </section>

        {/* CHAPTER 07: MANUSCRIPT SUBMISSION & CONTACT */}
        <section id="ch-07" className="scroll-mt-24">
          <SectionHeading
            chapter="07"
            title="Manuscript Submission & Formal Inquiry"
            subtitle="Direct communication channel for research collaborations, engineering roles, and engagements."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form Column */}
            <div className="lg:col-span-8 fade-in space-panel p-8">
              {formStatus === "sent" ? (
                <div className="text-center py-12 space-y-4">
                  <p className="font-mono text-xs text-crimson uppercase tracking-[0.3em] font-bold">
                    [ MANUSCRIPT ACKNOWLEDGED ]
                  </p>
                  <h3 className="font-display text-2xl font-bold text-inkDark">Thank you for your inquiry.</h3>
                  <p className="font-sans text-sm text-inkMuted max-w-md mx-auto">
                    Your message has been transmitted successfully. I will review your submission and respond within 24 hours.
                  </p>
                  <button onClick={() => setFormStatus("idle")} className="btn-ghost text-xs px-6 py-2.5 mt-4">
                    SEND ANOTHER INQUIRY ↩
                  </button>
                </div>
              ) : (
                <form
                  className="space-y-5"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!formId || formId === "your_form_id_here") {
                      window.location.href = `mailto:${identity.email}?subject=Portfolio Inquiry from Website`;
                      return;
                    }
                    setFormStatus("sending");
                    try {
                      const res = await fetch(`https://formspree.io/f/${formId}`, {
                        method: "POST",
                        headers: { Accept: "application/json" },
                        body: new FormData(e.currentTarget),
                      });
                      setFormStatus(res.ok ? "sent" : "error");
                    } catch {
                      setFormStatus("error");
                    }
                  }}
                >
                  <div className="border-b border-paperBorder pb-3 mb-4">
                    <p className="font-mono text-[10px] text-crimson uppercase tracking-[0.25em] font-bold">
                      FORMAL TRANSMISSION SPECIFICATION
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] uppercase text-inkMuted mb-1.5 font-bold">
                        SENDER FULL NAME *
                      </label>
                      <input
                        name="name"
                        required
                        placeholder="e.g. Dr. Alex Vance"
                        className="w-full bg-paperSheet border border-paperBorder px-4 py-3 font-mono text-xs text-inkDark placeholder-inkMuted/60 focus:border-crimson focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase text-inkMuted mb-1.5 font-bold">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="e.g. alex@institution.org"
                        className="w-full bg-paperSheet border border-paperBorder px-4 py-3 font-mono text-xs text-inkDark placeholder-inkMuted/60 focus:border-crimson focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-inkMuted mb-1.5 font-bold">
                      INSTITUTION / COMPANY AFFILIATION
                    </label>
                    <input
                      name="organization"
                      placeholder="e.g. Research Lab / Venture Inc."
                      className="w-full bg-paperSheet border border-paperBorder px-4 py-3 font-mono text-xs text-inkDark placeholder-inkMuted/60 focus:border-crimson focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-inkMuted mb-1.5 font-bold">
                      PROJECT SCOPE / INQUIRY DETAILS *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Describe your technical requirements, timeline, or position details..."
                      className="w-full bg-paperSheet border border-paperBorder px-4 py-3 font-mono text-xs text-inkDark placeholder-inkMuted/60 focus:border-crimson focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="btn-red w-full justify-center text-xs py-3.5"
                  >
                    {formStatus === "sending" ? "TRANSMITTING MANUSCRIPT..." : "SUBMIT FORMAL INQUIRY ↗"}
                  </button>

                  {formStatus === "error" && (
                    <p className="font-mono text-[11px] text-crimson text-center pt-2">
                      ✕ Transmission failed. Direct email fallback: <a href={`mailto:${identity.email}`} className="underline font-bold">{identity.email}</a>
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Direct Contact Info Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="fade-in space-panel p-6">
                <p className="font-mono text-[10px] text-crimson uppercase tracking-widest font-bold mb-3">
                  DIRECT CONTACT CHANNELS
                </p>
                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <span className="text-inkMuted block text-[10px] uppercase">ELECTRONIC MAIL:</span>
                    <a href={`mailto:${identity.email}`} className="text-inkDark font-semibold hover:text-crimson transition-colors break-all">
                      {identity.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-inkMuted block text-[10px] uppercase">DIRECT TELEPHONE:</span>
                    <a href={`tel:${identity.phone}`} className="text-inkDark font-semibold hover:text-crimson transition-colors">
                      {identity.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-inkMuted block text-[10px] uppercase">PRIMARY RESIDENCE:</span>
                    <span className="text-inkDark font-semibold">Bengaluru, Karnataka, India</span>
                  </div>
                </div>
              </div>

              <div className="fade-in space-panel p-6">
                <p className="font-mono text-[10px] text-crimson uppercase tracking-widest font-bold mb-3">
                  ACADEMIC & CODE REPOSITORIES
                </p>
                <div className="space-y-2.5 font-mono text-xs">
                  <a
                    href={identity.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 bg-paperSheet border border-paperBorder text-inkDark hover:border-crimson hover:text-crimson transition-colors"
                  >
                    <span>GITHUB PROFILES</span>
                    <span>↗</span>
                  </a>
                  <a
                    href={identity.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 bg-paperSheet border border-paperBorder text-inkDark hover:border-crimson hover:text-crimson transition-colors"
                  >
                    <span>LINKEDIN NETWORK</span>
                    <span>↗</span>
                  </a>
                  <a
                    href={identity.resume}
                    download
                    className="flex items-center justify-between p-2.5 bg-paperSheet border border-paperBorder text-inkDark hover:border-crimson hover:text-crimson transition-colors"
                  >
                    <span>CURRICULUM VITAE (PDF)</span>
                    <span>▼</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER & CITATIONS */}
      <footer className="border-t border-paperBorder py-12 bg-paperSheet relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-[11px] text-inkMuted border-b border-paperBorder/60 pb-8">
            <div>
              <span className="text-crimson font-bold block mb-1">[1] CITATION NOTICE</span>
              <p className="leading-relaxed">
                Authored by {identity.name}. All empirical statistics, project repositories, and academic credentials verified as of 2026.
              </p>
            </div>
            <div>
              <span className="text-crimson font-bold block mb-1">[2] SYSTEM SPECIFICATION</span>
              <p className="leading-relaxed">
                Constructed with React, TypeScript, GSAP, and Tailwind CSS following academic dissertation design specifications.
              </p>
            </div>
            <div>
              <span className="text-crimson font-bold block mb-1">[3] RIGHTS & PERMISSIONS</span>
              <p className="leading-relaxed">
                © 2026 {identity.name}. All rights reserved. Open for full-time engineering appointments & consulting.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] text-inkMuted">
            <span>DISSERTATION EDITION 2026.1 // NAGPRATHIK M G</span>
            <span>BENGALURU, INDIA</span>
          </div>
        </div>
      </footer>

      {/* PROJECT MANUSCRIPT MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inkDark/60 backdrop-blur-sm">
          <div className="space-panel bg-paperBg max-w-3xl w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto border-crimson/40">
            <div className="flex items-center justify-between border-b border-paperBorder pb-4">
              <div>
                <span className="font-mono text-[10px] text-crimson uppercase tracking-[0.2em] font-bold">
                  MANUSCRIPT DOSSIER: {selectedProject.id.toUpperCase()}
                </span>
                <h3 className="font-display text-2xl font-bold text-inkDark mt-1">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="font-mono text-xs px-3 py-1.5 border border-paperBorder bg-paperSheet text-inkDark hover:bg-crimson hover:text-white transition-colors"
              >
                CLOSE ✕
              </button>
            </div>

            {selectedProject.image && (
              <div className="rounded-sm overflow-hidden border border-paperBorder max-h-72">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="space-y-4">
              <div>
                <span className="font-mono text-[10px] uppercase text-crimson font-bold block mb-1">SPECIFICATIONS & BENCHMARKS</span>
                <p className="font-mono text-xs text-inkDark bg-paperSheet border border-paperBorder p-3">
                  {selectedProject.sub}
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase text-crimson font-bold block mb-1">ABSTRACT & ABSTRACT DETAIL</span>
                <p className="font-sans text-sm text-inkMuted leading-relaxed border-l-2 border-crimson pl-4">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase text-crimson font-bold block mb-1">TECHNOLOGY STACK</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="font-mono text-xs border border-paperBorder bg-paperSheet px-3 py-1 text-inkDark">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-paperBorder flex justify-end gap-3 font-mono text-xs">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-xs px-5 py-2"
              >
                VIEW SOURCE ON GITHUB ↗
              </a>
              {selectedProject.live && (
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-red text-xs px-5 py-2"
                >
                  LAUNCH LIVE DEMO ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
