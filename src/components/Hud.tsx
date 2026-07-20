import { useEffect, useRef, useState } from "react";
import { scrollState, useSpaceStore } from "@/lib/store";
import { SECTIONS, identity } from "@/data/portfolio";

/**
 * Cockpit HUD overlay: corner brackets, live telemetry (Z coordinate,
 * velocity), current-sector readout top-centre, and identity chip top-left.
 * Pure CSS/DOM — zero WebGL cost.
 */
export default function Hud() {
  const zRef = useRef<HTMLSpanElement>(null);
  const vRef = useRef<HTMLSpanElement>(null);
  const section = useSpaceStore((s) => s.section);
  const activeProject = useSpaceStore((s) => s.activeProject);
  const [time, setTime] = useState("");

  useEffect(() => {
    let raf = 0;
    let prevZ = scrollState.cameraZ;
    let prevT = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = Math.max(1, now - prevT);
      const vel = Math.abs((scrollState.cameraZ - prevZ) / dt) * 1000;
      prevZ = scrollState.cameraZ;
      prevT = now;
      if (zRef.current) zRef.current.textContent = scrollState.cameraZ.toFixed(1).padStart(6, " ");
      if (vRef.current) vRef.current.textContent = vel.toFixed(1).padStart(5, " ");
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const clock = setInterval(
      () => setTime(new Date().toLocaleTimeString("en-GB", { hour12: false })),
      1000,
    );
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(clock);
    };
  }, []);

  const sectionIndex = SECTIONS.findIndex((s) => s.id === section);

  return (
    <div
      className={`fixed inset-0 z-20 pointer-events-none hidden md:block transition-opacity duration-500 ${
        activeProject ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      {/* corner brackets */}
      <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 border-primary/20" />
      <div className="absolute top-4 right-4 w-10 h-10 border-r-2 border-t-2 border-primary/20" />
      <div className="absolute bottom-4 left-4 w-10 h-10 border-l-2 border-b-2 border-primary/20" />
      <div className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 border-primary/20" />

      {/* identity chip — top left */}
      <div className="absolute top-7 left-9 font-mono text-[10px] leading-relaxed tracking-[0.2em] text-inkMuted">
        <p className="text-primary">◈ NPMG · PORTFOLIO DISSERTATION</p>
        <p>AUTHOR — {identity.name}</p>
      </div>

      {/* sector readout — top centre */}
      <div className="absolute top-7 left-1/2 -translate-x-1/2 text-center font-mono">
        <p className="text-[9px] tracking-[0.5em] text-inkMuted">CHAPTER {String(sectionIndex + 1).padStart(2, "0")} / 07</p>
        <p className="text-xs tracking-[0.4em] text-primary mt-1">
          {SECTIONS[sectionIndex]?.label ?? "—"}
        </p>
      </div>

      {/* telemetry — top right */}
      <div className="absolute top-7 right-9 text-right font-mono text-[10px] leading-relaxed tracking-[0.15em] text-inkMuted">
        <p>
          COORD-Z <span ref={zRef} className="text-primary whitespace-pre">  12.0</span>
        </p>
        <p>
          VEL <span ref={vRef} className="text-primary whitespace-pre">  0.0</span> U/S
        </p>
        <p className="text-inkMuted/70">{time} IST</p>
      </div>

      {/* bottom-left flight hint */}
      <div className="absolute bottom-7 left-9 font-mono text-[9px] tracking-[0.3em] text-inkMuted/80">
        <p>SCROLL — NAVIGATION · MOUSE — ATTITUDE · CLICK PLANET — EXAMINE</p>
      </div>
    </div>
  );
}
