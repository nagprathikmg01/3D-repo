import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

const techStack = [
  { name: "PyTorch", icon: "https://cdn.simpleicons.org/pytorch/EE4C2C", color: "#EE4C2C" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB", color: "#3776AB" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", color: "#61DAFB" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6", color: "#3178C6" },
  { name: "GCP", icon: "https://cdn.simpleicons.org/googlecloud/4285F4", color: "#4285F4" },
  { name: "AWS", icon: "https://cdn.simpleicons.org/amazonwebservices/232F3E", color: "#232F3E" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED", color: "#2496ED" },
  { name: "Terraform", icon: "https://cdn.simpleicons.org/terraform/7B42BC", color: "#7B42BC" },
  { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi/009688", color: "#009688" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1", color: "#4169E1" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248", color: "#47A248" },
  { name: "Redis", icon: "https://cdn.simpleicons.org/redis/DC382D", color: "#DC382D" },
  { name: "Flutter", icon: "https://cdn.simpleicons.org/flutter/02569B", color: "#02569B" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933", color: "#339933" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF", color: "#FFFFFF" }
];

const projects = [
  {
    title: "3D-repo",
    tech: "React + Three.js + TypeScript",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/nagprathikmg01/3D-repo",
  },
  {
    title: "Adaptive Drone Navigation",
    tech: "Python + PyTorch + Streamlit",
    thumbnail: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/nagprathikmg01/drone-drift-detection",
  },
  {
    title: "GeoQuest AI Travel Planner",
    tech: "Next.js + Node.js + PostgreSQL",
    thumbnail: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/nagprathikmg01/GeoQuest",
  },
  {
    title: "GreenCart Sustainable Shopping",
    tech: "Python + React + LangChain",
    thumbnail: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/nagprathikmg01/GreenCart",
  },
  {
    title: "ClubOS Flutter Application",
    tech: "Flutter + Dart + Firebase",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/nagprathikmg01/ClubOS",
  },
  {
    title: "Karnataka Agricultural Analytics",
    tech: "React + TypeScript + Gemini API",
    thumbnail: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/nagprathikmg01/karnataka-agri-app",
  }
];

const certificates = [
  {
    title: "Google Cloud Engineering Certificate",
    tech: "GCP / Cloud Engineering",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "AWS Cloud Foundations Certificate",
    tech: "AWS / Cloud Infrastructure",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Develop GenAI Apps with Gemini & Streamlit",
    tech: "GCP / Generative AI",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  }
];

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 16l4-5h-3V4h-2v7H8l4 5zm-8 4h16v-2H4v2z" />
  </svg>
);

const Spinner = () => (
  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <path d="M12 2v4m0 12v4m10-10h-4M6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

function ProjectCard({ item }: { item: typeof projects[0] }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-slate-950/40 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2.5 hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] backdrop-blur-xl" style={{ backdropFilter: "blur(20px)" }} >
      <div className="absolute -inset-px bg-gradient-to-r from-indigo-500 via-cyan-500 to-pink-500 rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative h-48 overflow-hidden bg-white/5">
        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
      </div>
      <div className="p-5 flex flex-col gap-3 relative z-10">
        <h3 className="text-white font-bold text-base tracking-tight leading-snug group-hover:text-white transition-colors duration-300 line-clamp-1">
          {item.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mt-1">
          {item.tech.split(/[+\/]/).map((techName) => {
            const name = techName.trim();
            let color = "border-white/10 text-white/50 bg-white/5";
            if (name.toLowerCase().includes("python")) color = "border-green-500/20 text-green-400 bg-green-500/5 shadow-[0_0_15px_rgba(34,197,94,0.1)]";
            else if (name.toLowerCase().includes("pytorch")) color = "border-red-500/20 text-red-400 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.1)]";
            else if (name.toLowerCase().includes("react")) color = "border-cyan-500/20 text-cyan-400 bg-cyan-500/5 shadow-[0_0_15px_rgba(6,182,212,0.1)]";
            else if (name.toLowerCase().includes("typescript")) color = "border-blue-500/20 text-blue-400 bg-blue-500/5 shadow-[0_0_15px_rgba(59,130,246,0.1)]";
            else if (name.toLowerCase().includes("three.js")) color = "border-orange-500/20 text-orange-400 bg-orange-500/5 shadow-[0_0_15px_rgba(249,115,22,0.1)]";
            else if (name.toLowerCase().includes("tailwind")) color = "border-teal-500/20 text-teal-400 bg-teal-500/5 shadow-[0_0_15px_rgba(20,184,166,0.1)]";
            else if (name.toLowerCase().includes("gemini")) color = "border-purple-500/20 text-purple-400 bg-purple-500/5 shadow-[0_0_15px_rgba(168,85,247,0.1)]";
            else if (name.toLowerCase().includes("flutter")) color = "border-sky-500/20 text-sky-400 bg-sky-500/5 shadow-[0_0_15px_rgba(14,165,233,0.1)]";
            return (
              <span key={name} className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono border tracking-wider uppercase ${color}`}>
                {name}
              </span>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-mono">
            Source Code
          </span>
          <a 
            href={item.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            onMouseEnter={() => { if (typeof window !== 'undefined' && (window as any).playClickSound) (window as any).playClickSound(); }}
            onClick={() => { if (typeof window !== 'undefined' && (window as any).playClickSound) (window as any).playClickSound(); }}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-200 active:scale-95 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <GithubIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

function CertCard({ item }: { item: typeof certificates[0] }) {
  const [downloading, setDownloading] = useState(false);
  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(item.thumbnail, { mode: "cors" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${item.title.replace(/\s+/g, "_")}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      window.open(item.thumbnail, "_blank");
    }
    setTimeout(() => setDownloading(false), 500);
  };
  return (
    <div className="group relative rounded-2xl border border-white/15 overflow-hidden bg-white/[0.06] hover:border-white/25 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10 backdrop-blur-md" style={{ backdropFilter: "blur(20px)" }} >
      <div className="relative h-48 overflow-hidden bg-white/5">
        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white font-semibold text-sm leading-snug line-clamp-2">{item.title}</p>
        </div>
      </div>
      <div className="px-5 py-4 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono"> {item.tech} </span>
        <button 
          onMouseEnter={() => { if (typeof window !== 'undefined' && (window as any).playClickSound) (window as any).playClickSound(); }} 
          onClick={() => { if (typeof window !== 'undefined' && (window as any).playClickSound) (window as any).playClickSound(); handleDownload(); }} 
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/15 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-200 active:scale-95"
        >
          {downloading ? <Spinner /> : <DownloadIcon />}
        </button>
      </div>
    </div>
  );
}

function TechGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const rotX = useRef(0.3);
  const rotY = useRef(0);
  const velX = useRef(0);
  const velY = useRef(0.004);
  const isDragging = useRef(false);
  const lastMX = useRef(0);
  const lastMY = useRef(0);
  const dragVX = useRef(0);
  const dragVY = useRef(0);
  const rafId = useRef<number>();
  const itemEls = useRef<HTMLDivElement[]>([]);
  const RADIUS = 160;
  const n = techStack.length;
  const positions = useRef<{ x: number; y: number; z: number }[]>([]);

  useEffect(() => {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    positions.current = Array.from({ length: n }, (_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });
  }, []);

  function project(pos: { x: number; y: number; z: number }, rx: number, ry: number) {
    const cosY = Math.cos(ry), sinY = Math.sin(ry);
    const x1 = pos.x * cosY - pos.z * sinY;
    const z1 = pos.x * sinY + pos.z * cosY;
    const cosX = Math.cos(rx), sinX = Math.sin(rx);
    const y2 = pos.y * cosX - z1 * sinX;
    const z2 = pos.y * sinX + z1 * cosX;
    return { x: x1, y: y2, z: z2 };
  }

  useEffect(() => {
    const els = itemEls.current;
    function render() {
      if (!isDragging.current) {
        rotY.current += velY.current;
        rotX.current += velX.current;
        velX.current *= 0.97;
        velY.current = velY.current * 0.99 + 0.004 * 0.01;
        if (rotX.current > 0.6) velX.current -= 0.0005;
        if (rotX.current < -0.1) velX.current += 0.0005;
      }
      const projected = positions.current.map((pos, i) => ({
        el: els[i],
        p: project(pos, rotX.current, rotY.current),
      }));
      projected
        .slice()
        .sort((a, b) => a.p.z - b.p.z)
        .forEach(({ el, p }, idx) => {
          if (!el) return;
          const x = p.x * RADIUS + 210 - 36;
          const y = p.y * RADIUS + 210 - 36;
          const depth = (p.z + 1) / 2;
          const opacity = 0.25 + depth * 0.75;
          const scale = 0.55 + depth * 0.55;
          el.style.cssText = `position:absolute;left:${x}px;top:${y}px;opacity:${opacity};transform:scale(${scale});z-index:${idx};width:72px;height:72px;`;
        });
      rafId.current = requestAnimationFrame(render);
    }
    rafId.current = requestAnimationFrame(render);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMX.current = e.clientX;
    lastMY.current = e.clientY;
    dragVX.current = 0;
    dragVY.current = 0;
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMX.current;
      const dy = e.clientY - lastMY.current;
      dragVX.current = dy * 0.005;
      dragVY.current = dx * 0.005;
      rotX.current += dragVX.current;
      rotY.current += dragVY.current;
      lastMX.current = e.clientX;
      lastMY.current = e.clientY;
    };
    const onMouseUp = () => {
      if (isDragging.current) {
        velX.current = dragVX.current;
        velY.current = dragVY.current || 0.004;
        isDragging.current = false;
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    lastMX.current = e.touches[0].clientX;
    lastMY.current = e.touches[0].clientY;
    dragVX.current = 0;
    dragVY.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - lastMX.current;
    const dy = e.touches[0].clientY - lastMY.current;
    dragVX.current = dy * 0.005;
    dragVY.current = dx * 0.005;
    rotX.current += dragVX.current;
    rotY.current += dragVY.current;
    lastMX.current = e.touches[0].clientX;
    lastMY.current = e.touches[0].clientY;
  };

  const onTouchEnd = () => {
    velX.current = dragVX.current;
    velY.current = dragVY.current || 0.004;
    isDragging.current = false;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-3 text-white/40">
        <div className="h-px w-10 bg-gradient-to-r from-transparent to-white/30" />
        <span className="text-[10px] uppercase tracking-[0.4em] font-mono"> {techStack.length} SKILLS TAG CANVAS </span>
        <div className="h-px w-10 bg-gradient-to-l from-transparent to-white/30" />
      </div>
      <div 
        ref={containerRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative w-full max-w-[420px] h-[420px] mx-auto overflow-hidden select-none cursor-grab active:cursor-grabbing"
      >
        <div ref={sceneRef} className="absolute inset-0 w-full h-full">
          {techStack.map((tech, i) => (
            <div
              key={i}
              ref={(el) => { if (el) itemEls.current[i] = el; }}
              className="flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-xl select-none"
              style={{
                width: '72px',
                height: '72px',
                padding: '12px',
              }}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-full h-full object-contain pointer-events-none select-none"
                style={{
                  filter: tech.name === 'Next.js' || tech.name === 'GitHub' || tech.name === 'Vercel' ? 'brightness(0) invert(1)' : 'none'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type TabId = "projects" | "certificates" | "tech";
const tabs: { id: TabId; label: string }[] = [
  { id: "projects", label: "Projects Shelf" },
  { id: "certificates", label: "Certifications" },
  { id: "tech", label: "Skills Matrix" },
];

export default function ShowcaseSection() {
  const [active, setActive] = useState<TabId>("projects");
  const [animKey, setAnimKey] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const switchTab = useCallback(
    (id: TabId) => {
      if (id === active) return;
      if (typeof window !== 'undefined' && (window as any).playClickSound) (window as any).playClickSound();
      setActive(id);
      setAnimKey((k) => k + 1);
    },
    [active]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 50) return;
    const order = tabs.map((t) => t.id);
    const idx = order.indexOf(active);
    if (dx < 0 && idx < order.length - 1) switchTab(order[idx + 1]);
    if (dx > 0 && idx > 0) switchTab(order[idx - 1]);
    touchStartX.current = null;
  };

  const activePillLeft = active === "projects" ? "8px" : active === "certificates" ? "calc(33.333% + 4px)" : "calc(66.666% + 0px)";

  return (
    <section className="relative w-full min-h-[85vh] md:min-h-screen bg-[#020617] overflow-hidden text-white px-4 sm:px-8 md:px-16 lg:px-24 py-0 md:py-12 -mt-16 sm:mt-0 md:mt-12">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-15%] w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[-15%] w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: "3s" }} />
        <div className="absolute top-[50%] left-[40%] w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto">
        {/* Label */}
        <div className="relative flex items-center justify-center gap-4 mb-5 opacity-0 animate-[fadeSlideDown_0.8s_ease_forwards]">
          <div className="relative overflow-hidden">
            <div className="w-10 h-px bg-white/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[lineMove_2s_linear_infinite]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.45em] text-white/35 font-mono"> Showcase </span>
          <div className="relative overflow-hidden">
            <div className="w-10 h-px bg-white/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[lineMove_2s_linear_infinite]" />
          </div>
        </div>

        {/* Heading */}
        <div className="relative overflow-hidden mb-12">
          <h1 className="text-center font-black tracking-tight leading-none drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] text-white opacity-0 whitespace-nowrap animate-[headingReveal_1s_cubic-bezier(0.22,1,0.36,1)_0.15s_forwards]" style={{ fontSize: "clamp(32px,6vw,80px)" }} >
            <span className="inline-block bg-gradient-to-b from-white via-white to-white/45 bg-clip-text text-transparent"> Portfolio Showcase </span>
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="relative flex items-center p-1.5 rounded-full border border-white/20 bg-white/[0.08] mb-14 w-full max-w-md opacity-0 animate-[fadeSlideUp_0.6s_ease_0.3s_forwards] shadow-2xl shadow-black/40" style={{ backdropFilter: "blur(30px)" }} >
          <div className="absolute top-1.5 bottom-1.5 rounded-full bg-white/20 border border-white/40 transition-[left] duration-300 ease-out shadow-xl shadow-white/10" style={{ width: "calc(33.333% - 4px)", left: activePillLeft, backdropFilter: "blur(15px)" }} />
          {tabs.map((tab) => (
            <button key={tab.id} onMouseEnter={() => { if (typeof window !== 'undefined' && (window as any).playClickSound) (window as any).playClickSound(); }} onClick={() => switchTab(tab.id)} className="relative z-10 flex-1 h-12 rounded-full text-xs font-medium tracking-wide transition-colors duration-200" >
              <span className={active === tab.id ? "text-white font-semibold" : "text-white/35 hover:text-white/60"} >
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Content area */}
        <div key={animKey} className="w-full opacity-0 animate-[contentIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} >
          {active === "projects" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {projects.map((item, i) => (
                <div key={i} className="opacity-0" style={{ animation: `fadeSlideUp 0.5s ease ${i * 0.08}s forwards` }} >
                  <ProjectCard item={item} />
                </div>
              ))}
            </div>
          )}
          {active === "certificates" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {certificates.map((item, i) => (
                <div key={i} className="opacity-0" style={{ animation: `fadeSlideUp 0.5s ease ${i * 0.08}s forwards` }} >
                  <CertCard item={item} />
                </div>
              ))}
            </div>
          )}
          {active === "tech" && (
            <div className="opacity-0" style={{ animation: "fadeSlideUp 0.5s ease forwards" }} >
              <TechGrid />
            </div>
          )}
        </div>

        {/* Explore More on GitHub Button */}
        {active === "projects" && (
          <div className="flex justify-center mt-12 mb-6">
            <a 
              href="https://github.com/nagprathikmg01" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={() => { if (typeof window !== 'undefined' && (window as any).playClickSound) (window as any).playClickSound(); }}
              onClick={() => { if (typeof window !== 'undefined' && (window as any).playClickSound) (window as any).playClickSound(); }}
            >
              <button className="inline-flex items-center gap-3 border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 px-8 py-4 text-xs tracking-[0.25em] uppercase font-bold hover:bg-indigo-500 hover:text-white hover:border-indigo-400 transition-all duration-300 rounded-full hover:shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:scale-105 active:scale-98">
                Explore More on GitHub <ArrowUpRight size={16} />
              </button>
            </a>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes contentIn {
          from { opacity: 0; transform: translateY(32px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes headingReveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineMove {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}