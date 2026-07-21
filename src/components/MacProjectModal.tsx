import { useState } from "react";
import { type Project } from "@/data/portfolio";
import { SKILL_ICON_MAP } from "./TechLogoMarquee";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function MacProjectModal({ project, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<"preview" | "features" | "tech">("preview");

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-inkDark/75 backdrop-blur-md animate-fade-in">
      {/* Mac Window Frame Container */}
      <div className="space-panel bg-paperBg max-w-4xl w-full rounded-md shadow-2xl border-paperBorder overflow-hidden max-h-[92vh] flex flex-col relative">
        
        {/* Mac OS Window Header */}
        <div className="bg-paperSheet border-b border-paperBorder px-3 sm:px-4 py-2.5 flex items-center justify-between shrink-0">
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

          <div className="font-mono text-[11px] sm:text-xs text-inkDark font-bold flex items-center gap-1.5 truncate max-w-[60%] sm:max-w-none">
            <span className="text-crimson shrink-0">macOS //</span>
            <span className="truncate">{project.id}.app</span>
          </div>

          <button
            onClick={onClose}
            className="font-mono text-[10px] text-inkMuted hover:text-crimson px-2 py-0.5 border border-paperBorder bg-paperBg"
          >
            CLOSE ✕
          </button>
        </div>

        {/* Tab Bar inside Mac Frame */}
        <div className="bg-paperSheet/70 border-b border-paperBorder/80 px-3 sm:px-4 py-2 flex items-center justify-between font-mono text-xs shrink-0 overflow-x-auto">
          <div className="flex gap-1.5 sm:gap-2 min-w-max">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-2.5 sm:px-3 py-1 border text-[10px] sm:text-xs transition-colors ${
                activeTab === "preview"
                  ? "bg-crimson text-white border-crimson font-bold"
                  : "bg-paperBg text-inkDark border-paperBorder hover:border-crimson"
              }`}
            >
              🖥️ OVERVIEW & SCREENSHOT
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`px-2.5 sm:px-3 py-1 border text-[10px] sm:text-xs transition-colors ${
                activeTab === "features"
                  ? "bg-crimson text-white border-crimson font-bold"
                  : "bg-paperBg text-inkDark border-paperBorder hover:border-crimson"
              }`}
            >
              ⚡ ARCHITECTURE & HIGHLIGHTS
            </button>
            <button
              onClick={() => setActiveTab("tech")}
              className={`px-2.5 sm:px-3 py-1 border text-[10px] sm:text-xs transition-colors ${
                activeTab === "tech"
                  ? "bg-crimson text-white border-crimson font-bold"
                  : "bg-paperBg text-inkDark border-paperBorder hover:border-crimson"
              }`}
            >
              🛠️ TECH STACK ({project.tech.length})
            </button>
          </div>

          {project.badge && (
            <span className="font-mono text-[9px] sm:text-[10px] text-crimson bg-paperBg border border-paperBorder px-2 py-0.5 font-bold shrink-0 ml-2">
              {project.badge}
            </span>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === "preview" && (
            <div className="space-y-4">
              {project.image ? (
                <div className="rounded-sm overflow-hidden border border-paperBorder shadow-md relative group bg-paperSheet">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full max-h-[340px] sm:max-h-[380px] object-cover object-top group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-inkDark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 sm:p-4 flex items-end justify-between">
                    <span className="font-mono text-xs text-white font-bold truncate">{project.title}</span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-white/90 bg-crimson px-2 py-0.5 font-bold shrink-0">
                      VERIFIED REPOSITORY
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center border border-paperBorder bg-paperSheet space-y-1">
                  <p className="font-mono text-xs text-crimson uppercase font-bold">[ NO IMAGE PREVIEW ]</p>
                  <p className="font-sans text-xs text-inkMuted">Inspect source repository or live link below.</p>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-paperBorder pb-2 font-mono text-[10px]">
                  <span className="text-crimson font-bold uppercase tracking-wider">PROJECT OVERVIEW & REPOSITORY</span>
                  <span className="text-inkMuted truncate max-w-[180px] sm:max-w-none">{project.repoName || "nagprathikmg01"}</span>
                </div>
                
                <p className="font-sans text-xs sm:text-sm text-inkDark leading-relaxed border-l-2 border-crimson pl-3 sm:pl-4 py-1 font-medium">
                  {project.description}
                </p>

                {project.overviewDetails && project.overviewDetails.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-paperBorder/60">
                    <p className="font-mono text-[10px] text-crimson font-bold uppercase tracking-wider">IN-DEPTH REPOSITORY ANALYSIS</p>
                    {project.overviewDetails.map((detail, dIdx) => (
                      <p key={dIdx} className="font-sans text-xs text-inkMuted leading-relaxed pl-3 border-l border-paperBorder">
                        {detail}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Key Quick Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs pt-2">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-2.5 sm:p-3 bg-paperSheet border border-paperBorder">
                      <span className="text-[9px] text-crimson font-bold block uppercase">KEY BENCHMARK</span>
                      <span className="font-bold text-inkDark mt-0.5 block text-xs">{m}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "features" && (
            <div className="space-y-4 font-mono text-xs">
              {/* Architecture overview */}
              <div className="p-3.5 sm:p-4 bg-paperSheet border border-paperBorder space-y-1.5">
                <p className="text-crimson font-bold uppercase text-[10px] tracking-wider">
                  SYSTEM ARCHITECTURE & PIPELINE
                </p>
                <p className="text-inkDark leading-relaxed font-sans text-xs">
                  {project.architecture || project.description}
                </p>
              </div>

              {/* Technical Highlights list */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="space-y-2.5">
                  <p className="text-crimson font-bold uppercase text-[10px] tracking-wider">
                    ENGINEERING HIGHLIGHTS & CODE FEATURES
                  </p>
                  <div className="space-y-2">
                    {project.highlights.map((h, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-paperSheet border border-paperBorder flex items-start gap-2.5 text-inkDark"
                      >
                        <span className="text-crimson font-bold shrink-0">0{idx + 1}.</span>
                        <span className="font-sans text-xs leading-relaxed text-inkDark">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "tech" && (
            <div className="space-y-3 font-mono text-xs">
              <p className="text-crimson font-bold uppercase text-[10px] tracking-wider">
                VERIFIED MODULE DEPENDENCIES & TECH STACK
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {project.tech.map((t) => {
                  const iconUrl = SKILL_ICON_MAP[t];
                  return (
                    <div key={t} className="p-2.5 sm:p-3 bg-paperSheet border border-paperBorder text-inkDark font-bold flex items-center justify-between gap-2 rounded-xs hover:border-crimson transition-all">
                      <div className="flex items-center gap-2">
                        {iconUrl ? (
                          <img
                            src={iconUrl}
                            alt={t}
                            className="w-4 h-4 object-contain shrink-0"
                            onError={(e) => {
                              (e.currentTarget as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-crimson" />
                        )}
                        <span className="text-xs truncate">{t}</span>
                      </div>
                      <span className="text-crimson text-[9px] shrink-0 font-mono">✓ VERIFIED</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Mac Window Footer */}
        <div className="bg-paperSheet border-t border-paperBorder p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-[10px] text-inkMuted truncate">REPO: {project.repoName || "nagprathikmg01"}</span>
          </div>

          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-[10px] sm:text-xs px-3 sm:px-4 py-2 flex-1 sm:flex-initial text-center justify-center"
            >
              GITHUB ↗
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red text-[10px] sm:text-xs px-3 sm:px-4 py-2 flex-1 sm:flex-initial text-center justify-center"
              >
                LIVE DEMO ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
