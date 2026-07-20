import { useState, useRef } from "react";
import { identity } from "@/data/portfolio";

export default function CandidateBadge3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotX(rotateX);
    setRotY(rotateY);
    setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  return (
    <div
      className="perspective-1000 cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        className="space-panel bg-paperBg border border-crimson/30 p-6 rounded-sm shadow-xl relative overflow-hidden group"
      >
        {/* Holographic Glare Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15 group-hover:opacity-30 transition-opacity"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(158, 71, 51, 0.35), transparent 60%)`,
          }}
        />

        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-paperBorder pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
            <span className="font-mono text-[10px] text-crimson font-bold uppercase tracking-[0.2em]">
              [ FIG. 1.0 — CANDIDATE DOSSIER ]
            </span>
          </div>
          <span className="font-mono text-[9px] text-crimson bg-paperSheet border border-paperBorder px-2.5 py-0.5 font-bold">
            VERIFIED AUTHOR
          </span>
        </div>

        {/* Candidate Profile Photo & Core Meta */}
        <div className="flex gap-4 items-center mb-5">
          <div className="w-22 h-28 rounded-sm overflow-hidden border border-paperBorder bg-paperSheet shadow-sm shrink-0 relative group">
            <img
              src="/profile.jpg"
              alt={identity.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            <h3 className="font-display font-bold text-inkDark text-lg leading-snug">{identity.name}</h3>
            <p className="text-crimson font-bold text-[11px] uppercase tracking-wider">{identity.subtitle}</p>
            <p className="text-inkMuted text-[10px]">NMIT BENGALURU · 2023–2027</p>
            <p className="text-inkMuted text-[10px]"><span className="text-inkDark font-semibold">LOCATION:</span> Bengaluru, India</p>
          </div>
        </div>

        {/* Concise Bio Summary */}
        <div className="font-sans text-xs text-inkMuted leading-relaxed mb-4 border-l-2 border-crimson pl-3 bg-paperSheet/50 p-2.5 rounded-sm">
          Google Student Ambassador (Top 250 globally) and Information Science undergraduate specializing in PyTorch neural architectures, agentic RAG workflows, resilient full-stack web platforms, and cloud infrastructure.
        </div>

        {/* Academic Highlights */}
        <div className="space-y-2 font-mono text-xs text-inkMuted border-t border-paperBorder pt-3">
          <p><span className="text-inkDark font-semibold">DISTINCTION:</span> Top 250 Google Student Ambassador Globally</p>
          <p><span className="text-inkDark font-semibold">ACADEMIC CGPA:</span> 8.5 / 10.0 (Information Science & Eng)</p>
          <p><span className="text-inkDark font-semibold">HONORS:</span> 1M1B IBM AI Sustainability Scholar · AICTE Co-certified</p>
        </div>

        {/* Card Footer */}
        <div className="mt-4 pt-3 border-t border-paperBorder/60 flex items-center justify-between font-mono text-[9px] text-inkMuted">
          <span>ID: NPMG-2026-042</span>
          <span className="text-crimson font-bold">HOVER TO TILT 3D ↺</span>
        </div>
      </div>
    </div>
  );
}
