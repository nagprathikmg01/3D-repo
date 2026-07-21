import { useRef, useState } from "react";
import { identity } from "@/data/portfolio";

export default function CandidateBadge3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setRotX(rotateX);
    setRotY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  return (
    <div
      className="perspective-1000 select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transition: "transform 0.3s ease-out",
        }}
        className="space-panel bg-paperBg border border-crimson/40 p-4 sm:p-6 rounded-sm shadow-xl relative flex flex-col justify-between group"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-paperBorder pb-3 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-crimson animate-pulse shrink-0" />
            <span className="font-mono text-[9px] sm:text-[10px] text-crimson font-bold uppercase tracking-wider truncate">
              OFFICIAL CANDIDATE DOSSIER
            </span>
          </div>
          <span className="font-mono text-[8px] sm:text-[9px] text-crimson bg-paperSheet border border-paperBorder px-2 py-0.5 font-bold shrink-0">
            VERIFIED AUTHOR
          </span>
        </div>

        {/* Candidate Profile Photo & Info */}
        <div className="flex gap-3 sm:gap-4 items-center my-3">
          <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-sm overflow-hidden border border-paperBorder bg-paperSheet shadow-sm shrink-0 relative group/photo">
            <img
              src="/profile.jpg"
              alt={identity.name}
              className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
          </div>

          <div className="space-y-1 font-mono text-xs min-w-0">
            <h3 className="font-display font-bold text-inkDark text-base sm:text-xl leading-tight truncate">{identity.name}</h3>
            <p className="text-crimson font-bold text-[10px] sm:text-[11px] uppercase tracking-wider">{identity.subtitle}</p>
            <p className="text-inkMuted text-[9px] sm:text-[10px]">NMIT BENGALURU · 2023–2027</p>
            <p className="text-inkMuted text-[9px] sm:text-[10px] truncate">
              <span className="text-inkDark font-semibold">LOCATION:</span> Bengaluru, India
            </p>
          </div>
        </div>

        {/* Executive Bio */}
        <div className="font-sans text-xs text-inkMuted leading-relaxed border-l-2 border-crimson pl-3 bg-paperSheet/50 p-2.5 sm:p-3 rounded-sm my-2">
          Google Student Ambassador (Top 250 globally) and Information Science undergraduate specializing in PyTorch neural architectures, agentic RAG workflows, resilient full-stack web platforms, and cloud infrastructure.
        </div>

        {/* Verified Accreditations */}
        <div className="space-y-1 font-mono text-[11px] sm:text-xs text-inkMuted border-t border-paperBorder pt-3 my-1">
          <p><span className="text-inkDark font-semibold">DISTINCTION:</span> Top 250 Google Ambassador</p>
          <p><span className="text-inkDark font-semibold">ACADEMIC CGPA:</span> 8.5 / 10.0 (Info Science)</p>
          <p><span className="text-inkDark font-semibold">HONORS:</span> IBM AI Scholar · AICTE</p>
        </div>

        {/* Social Buttons & Direct Contact Channels */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[10px] pt-3 border-t border-paperBorder">
          <a
            href={identity.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-paperSheet border border-paperBorder text-inkDark font-bold text-center hover:border-crimson hover:text-crimson transition-colors flex items-center justify-center gap-0.5 truncate"
          >
            <span>LINKEDIN</span>
            <span>↗</span>
          </a>
          <a
            href={identity.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-paperSheet border border-paperBorder text-inkDark font-bold text-center hover:border-crimson hover:text-crimson transition-colors flex items-center justify-center gap-0.5 truncate"
          >
            <span>GITHUB</span>
            <span>↗</span>
          </a>
          <a
            href={`mailto:${identity.email}`}
            className="p-2 bg-paperSheet border border-paperBorder text-inkDark font-bold text-center hover:border-crimson hover:text-crimson transition-colors flex items-center justify-center gap-0.5 truncate"
          >
            <span>EMAIL</span>
            <span>✉</span>
          </a>
        </div>

        {/* Footer Identifier */}
        <div className="pt-3 border-t border-paperBorder/60 flex items-center justify-between font-mono text-[9px] text-inkMuted">
          <span>ID: NPMG-2026-042</span>
          <span className="text-crimson font-bold">VERIFIED DOSSIER</span>
        </div>
      </div>
    </div>
  );
}
