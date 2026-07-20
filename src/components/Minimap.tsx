import { useEffect, useRef } from "react";
import { scrollState, useSpaceStore } from "@/lib/store";
import { SECTIONS, CAMERA_START_Z, CAMERA_END_Z, SCROLL_PER_UNIT, VIEW_OFFSET } from "@/data/portfolio";
import { gsap } from "@/lib/gsap";

/**
 * Radar minimap, fixed bottom-right: overhead view of the Z-axis journey.
 * Red dot = camera. Click a section marker to fly there.
 */
export default function Minimap() {
  const dotRef = useRef<HTMLDivElement>(null);
  const section = useSpaceStore((s) => s.section);
  const setHover = useSpaceStore((s) => s.setHover);

  const SPAN = CAMERA_START_Z - CAMERA_END_Z;

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (dotRef.current) {
        const t = (CAMERA_START_Z - scrollState.cameraZ) / SPAN; // 0 → 1 along the journey
        dotRef.current.style.left = `${8 + t * 84}%`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [SPAN]);

  const flyTo = (z: number) => {
    if (useSpaceStore.getState().activeProject) useSpaceStore.getState().setActiveProject(null);
    const px = (CAMERA_START_Z - (z + VIEW_OFFSET)) * SCROLL_PER_UNIT;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const proxy = { y: window.scrollY };
    gsap.to(proxy, {
      y: Math.min(Math.max(px, 0), max),
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => window.scrollTo(0, proxy.y),
    });
  };

  return (
    <nav
      className="space-panel fixed bottom-5 right-5 z-40 w-[170px] px-3 pt-2.5 pb-2 hidden md:block select-none"
      aria-label="Flight radar"
      onPointerEnter={() => setHover("button")}
      onPointerLeave={() => setHover(null)}
    >
      <p className="font-mono text-[8px] tracking-[0.35em] text-inkMuted mb-1.5">INDEX RADAR</p>

      {/* track */}
      <div className="relative h-[34px]">
        <div className="absolute top-1/2 left-[8%] right-[8%] h-px bg-paperBorder" />
        {/* radar sweep grid */}
        <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(90deg,transparent,transparent_11px,#E0DDD9_12px)]" />

        {SECTIONS.map((s) => {
          const t = (CAMERA_START_Z - s.z) / SPAN;
          const active = section === s.id;
          return (
            <button
              key={s.id}
              onClick={() => flyTo(s.z)}
              aria-label={`Fly to ${s.label}`}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 flex items-center justify-center group"
              style={{ left: `${8 + t * 84}%` }}
            >
              <span
                className={`block w-1.5 h-1.5 rotate-45 transition-all duration-300 ${
                  active ? "bg-crimson scale-125" : "bg-paperBorder group-hover:bg-crimson"
                }`}
              />
            </button>
          );
        })}

        {/* camera dot */}
        <div
          ref={dotRef}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-crimson pointer-events-none"
          style={{ left: "8%" }}
        />
      </div>

      {/* current section label */}
      <p className="font-mono text-[9px] tracking-[0.25em] text-crimson text-center mt-1">
        {SECTIONS.find((s) => s.id === section)?.label ?? "—"}
      </p>
    </nav>
  );
}
