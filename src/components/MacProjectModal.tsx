import { useState } from "react";
import { type Project } from "@/data/portfolio";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function MacProjectModal({ project, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<"preview" | "features" | "tech">("preview");

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inkDark/75 backdrop-blur-md animate-fade-in">
      {/* Mac Window Frame Container */}
      <div className="space-panel bg-paperBg max-w-4xl w-full rounded-md shadow-2xl border-paperBorder overflow-hidden max-h-[90vh] flex flex-col relative">
        
        {/* Mac OS Window Header */}
        <div className="bg-paperSheet border-b border-paperBorder px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center text-[8px] text-red-900 font-bold"
              title="Close window"
            >
              ✕
            </button>
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>

          <div className="font-mono text-xs text-inkDark font-bold flex items-center gap-2">
            <span className="text-crimson">macOS //</span>
            <span>{project.id}.app</span>
            <span className="text-inkMuted text-[10px]"> — {project.title}</span>
          </div>

          <button
            onClick={onClose}
            className="font-mono text-[10px] text-inkMuted hover:text-crimson px-2 py-0.5 border border-paperBorder bg-paperBg"
          >
            ESC / CLOSE ✕
          </button>
        </div>

        {/* Tab Bar inside Mac Frame */}
        <div className="bg-paperSheet/70 border-b border-paperBorder/80 px-4 py-2 flex items-center justify-between font-mono text-xs shrink-0">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1 border transition-colors ${
                activeTab === "preview"
                  ? "bg-crimson text-white border-crimson font-bold"
                  : "bg-paperBg text-inkDark border-paperBorder hover:border-crimson"
              }`}
            >
              🖥️ LIVE PREVIEW
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`px-3 py-1 border transition-colors ${
                activeTab === "features"
                  ? "bg-crimson text-white border-crimson font-bold"
                  : "bg-paperBg text-inkDark border-paperBorder hover:border-crimson"
              }`}
            >
              ⚡ SPECIFICATIONS
            </button>
            <button
              onClick={() => setActiveTab("tech")}
              className={`px-3 py-1 border transition-colors ${
                activeTab === "tech"
                  ? "bg-crimson text-white border-crimson font-bold"
                  : "bg-paperBg text-inkDark border-paperBorder hover:border-crimson"
              }`}
            >
              🛠️ TECH STACK ({project.tech.length})
            </button>
          </div>

          {project.badge && (
            <span className="font-mono text-[10px] text-crimson bg-paperBg border border-paperBorder px-2.5 py-0.5 font-bold">
              {project.badge}
            </span>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === "preview" && (
            <div className="space-y-4">
              {project.image ? (
                <div className="rounded-sm overflow-hidden border border-paperBorder shadow-md relative group bg-paperSheet">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full max-h-[420px] object-cover object-top group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-inkDark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end justify-between">
                    <span className="font-mono text-xs text-white font-bold">{project.title}</span>
                    <span className="font-mono text-[10px] text-white/80 bg-crimson px-2 py-1 font-bold">HIGH RES MOCKUP</span>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center border border-paperBorder bg-paperSheet space-y-2">
                  <p className="font-mono text-xs text-crimson uppercase font-bold">[ NO IMAGE PREVIEW ]</p>
                  <p className="font-sans text-xs text-inkMuted">Inspect source repository or live link below.</p>
                </div>
              )}

              <p className="font-sans text-sm text-inkDark leading-relaxed border-l-2 border-crimson pl-4 py-1">
                {project.description}
              </p>
            </div>
          )}

          {activeTab === "features" && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 bg-paperSheet border border-paperBorder space-y-2">
                <p className="text-crimson font-bold uppercase text-[10px]">PROJECT ARCHITECTURE & PURPOSE</p>
                <p className="text-inkDark leading-relaxed">{project.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-paperSheet border border-paperBorder space-y-1">
                  <p className="text-[10px] text-inkMuted uppercase">SYSTEM METRIC / IMPACT</p>
                  <p className="text-xl font-bold text-crimson font-display">{project.stat || "100% Verified"}</p>
                </div>
                <div className="p-4 bg-paperSheet border border-paperBorder space-y-1">
                  <p className="text-[10px] text-inkMuted uppercase">PRIMARY FOCUS</p>
                  <p className="text-xs font-bold text-inkDark uppercase">{project.sub}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "tech" && (
            <div className="space-y-4 font-mono text-xs">
              <p className="text-crimson font-bold uppercase text-[10px]">VERIFIED MODULE DEPENDENCIES</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.tech.map((t) => (
                  <div key={t} className="p-3 bg-paperSheet border border-paperBorder text-inkDark font-bold flex items-center justify-between">
                    <span>{t}</span>
                    <span className="text-crimson text-[10px]">✓</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mac Window Footer */}
        <div className="bg-paperSheet border-t border-paperBorder p-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] text-inkMuted">SYSTEM STATUS: PRODUCTION READY</span>
          </div>

          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-xs px-4 py-2"
            >
              VIEW CODE ON GITHUB ↗
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red text-xs px-4 py-2"
              >
                LAUNCH LIVE DEMO ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
