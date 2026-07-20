import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { projects } from "@/data/portfolio";
import { useSpaceStore } from "@/lib/store";

/**
 * HTML overlay shown when a project planet is clicked. The camera flies
 * to the planet (CameraRig); this panel slides in from the right.
 * ESC or ✕ flies back out.
 */
export default function ProjectPanel() {
  const activeProject = useSpaceStore((s) => s.activeProject);
  const setActiveProject = useSpaceStore((s) => s.setActiveProject);
  const panel = useRef<HTMLDivElement>(null);
  const project = projects.find((p) => p.id === activeProject);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setActiveProject]);

  useEffect(() => {
    if (!panel.current) return;
    if (activeProject) {
      // lock scroll while inspecting a planet
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        panel.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, delay: 0.5, ease: "power3.out" },
      );
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-30 pointer-events-none">
      <div
        ref={panel}
        className="space-panel pointer-events-auto absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-[min(440px,calc(100vw-3rem))] p-8"
      >
        <button
          onClick={() => setActiveProject(null)}
          aria-label="Close project"
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center border border-paperBorder text-crimson font-mono hover:bg-primary hover:text-white transition-colors"
        >
          ✕
        </button>

        <p className="mono-label mb-3">◈ BIBLIOGRAPHIC SUMMARY</p>
        <h2 className="font-display text-2xl font-bold text-inkDark leading-tight mb-1">
          {project.title}
        </h2>
        <p className="font-mono text-xs text-crimson tracking-widest uppercase mb-5">{project.sub}</p>

        <p className="text-sm text-inkMuted leading-relaxed mb-6">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-7">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] uppercase tracking-wider border border-paperBorder text-inkMuted px-2.5 py-1 bg-paperSheet"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-red flex-1 justify-center">
            GITHUB ↗
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1 justify-center">
              <span className="live-dot inline-block w-2 h-2 rounded-full bg-crimson" />
              LIVE ↗
            </a>
          )}
        </div>

        <p className="font-mono text-[10px] text-inkMuted mt-5 text-center">ESC TO CONTINUE READING</p>
      </div>
    </div>
  );
}
