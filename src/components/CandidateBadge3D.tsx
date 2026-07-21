import { useState, useRef } from "react";
import { identity } from "@/data/portfolio";

export default function CandidateBadge3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [flipped, setFlipped] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotX(rotateX);
    setRotY(rotateY);
    setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipped(!flipped);
  };

  return (
    <div
      className="perspective-1000 cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={toggleFlip}
    >
      <div
        ref={cardRef}
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY + (flipped ? 180 : 0)}deg)`,
          transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          transformStyle: "preserve-3d",
        }}
        className="space-panel bg-paperBg border border-crimson/40 p-6 rounded-sm shadow-xl relative min-h-[420px] overflow-hidden group"
      >
        {/* Holographic Glare Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15 group-hover:opacity-30 transition-opacity z-20"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(158, 71, 51, 0.35), transparent 60%)`,
          }}
        />

        {/* FRONT SIDE */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="space-y-4 h-full flex flex-col justify-between"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-paperBorder pb-3">
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
          <div className="flex gap-4 items-center">
            <div className="w-22 h-28 rounded-sm overflow-hidden border border-paperBorder bg-paperSheet shadow-sm shrink-0 relative group/photo">
              <img
                src="/profile.jpg"
                alt={identity.name}
                className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-500"
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

          {/* Bio Summary */}
          <div className="font-sans text-xs text-inkMuted leading-relaxed border-l-2 border-crimson pl-3 bg-paperSheet/50 p-2.5 rounded-sm">
            Google Student Ambassador (Top 250 globally) and Information Science undergraduate specializing in PyTorch neural architectures, agentic RAG workflows, resilient full-stack web platforms, and cloud infrastructure.
          </div>

          {/* Academic Highlights */}
          <div className="space-y-1.5 font-mono text-xs text-inkMuted border-t border-paperBorder pt-3">
            <p><span className="text-inkDark font-semibold">DISTINCTION:</span> Top 250 Google Student Ambassador</p>
            <p><span className="text-inkDark font-semibold">ACADEMIC CGPA:</span> 8.5 / 10.0 (Information Science)</p>
            <p><span className="text-inkDark font-semibold">HONORS:</span> 1M1B IBM AI Scholar · AICTE Certified</p>
          </div>

          {/* Card Footer */}
          <div className="pt-3 border-t border-paperBorder/60 flex items-center justify-between font-mono text-[9px] text-inkMuted">
            <span>ID: NPMG-2026-042</span>
            <span className="text-crimson font-bold hover:underline">
              FLIP TO REVEAL QR & LINKS 🔄
            </span>
          </div>
        </div>

        {/* BACK SIDE (Flipped) */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 p-6 space-y-4 flex flex-col justify-between bg-paperBg z-10"
        >
          <div className="flex items-center justify-between border-b border-paperBorder pb-3">
            <span className="font-mono text-[10px] text-crimson font-bold uppercase tracking-[0.2em]">
              [ CANDIDATE VCARD & CONTACT ]
            </span>
            <span className="font-mono text-[9px] text-inkDark bg-paperSheet border border-paperBorder px-2.5 py-0.5 font-bold">
              SCAN / DIRECT
            </span>
          </div>

          <div className="flex items-center gap-4 py-2">
            {/* SVG QR Code Simulation */}
            <div className="w-24 h-24 shrink-0 bg-white border border-paperBorder p-2 rounded-xs shadow-inner flex flex-col items-center justify-center relative">
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="6" height="6" fill="#1E1C1A" />
                <rect x="15" y="3" width="6" height="6" fill="#1E1C1A" />
                <rect x="3" y="15" width="6" height="6" fill="#1E1C1A" />
                <rect x="10" y="10" width="4" height="4" fill="#9E4733" />
                <path d="M14 14h2v2h-2zM18 14h3v3h-3zM14 18h3v3h-3z" fill="#1E1C1A" />
              </svg>
              <span className="font-mono text-[7px] text-inkMuted text-center mt-1">VCARD LINK</span>
            </div>

            <div className="space-y-1 font-mono text-xs text-inkMuted">
              <p className="font-bold text-inkDark text-sm">{identity.name}</p>
              <p className="text-[10px] text-crimson">{identity.email}</p>
              <p className="text-[10px]">{identity.phone}</p>
              <p className="text-[10px] text-inkDark font-semibold">Bengaluru, India</p>
            </div>
          </div>

          <div className="space-y-2 font-mono text-xs pt-2 border-t border-paperBorder">
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between p-2 bg-paperSheet border border-paperBorder text-inkDark hover:border-crimson hover:text-crimson transition-colors"
            >
              <span>CONNECT ON LINKEDIN</span>
              <span>↗</span>
            </a>
            <a
              href={identity.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between p-2 bg-paperSheet border border-paperBorder text-inkDark hover:border-crimson hover:text-crimson transition-colors"
            >
              <span>GITHUB REPOSITORIES</span>
              <span>↗</span>
            </a>
            <a
              href={`mailto:${identity.email}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between p-2 bg-paperSheet border border-paperBorder text-inkDark hover:border-crimson hover:text-crimson transition-colors"
            >
              <span>SEND DIRECT EMAIL</span>
              <span>✉</span>
            </a>
          </div>

          <div className="pt-3 border-t border-paperBorder/60 flex items-center justify-between font-mono text-[9px] text-inkMuted">
            <span>OFFICIAL AUTHOR CREDENTIAL</span>
            <span className="text-crimson font-bold hover:underline">
              FLIP TO FRONT ↺
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
