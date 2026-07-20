import { useEffect, useRef } from "react";
import { useSpaceStore } from "@/lib/store";

const TRAIL_COUNT = 6;

/**
 * Three-layer custom cursor:
 *  1. 6px solid red dot — snaps instantly
 *  2. 36px ring — lerps behind (0.1); expands + rotates on planet hover,
 *     fills red on button hover, becomes a crosshair over planets
 *  3. 6 ghost trail dots fading out behind the pointer
 * Rendered only on fine-pointer devices.
 */
export default function CursorSystem() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const cross = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    document.body.classList.add("custom-cursor-active");
    const mouse = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    const trail = Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }));
    let raf = 0;
    let rotation = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      const hover = useSpaceStore.getState().hover;

      // layer 1 — instant dot
      if (dot.current)
        dot.current.style.transform = `translate(${mouse.x - 3}px, ${mouse.y - 3}px)`;

      // layer 2 — lagging ring
      ringPos.x += (mouse.x - ringPos.x) * 0.1;
      ringPos.y += (mouse.y - ringPos.y) * 0.1;
      if (ring.current) {
        const isPlanet = hover === "planet";
        const isButton = hover === "button";
        const scale = isPlanet ? 3 : isButton ? 1.4 : 1;
        if (isPlanet) rotation += 1.6;
        ring.current.style.transform = `translate(${ringPos.x - 18}px, ${ringPos.y - 18}px) scale(${scale}) rotate(${rotation}deg)`;
        ring.current.style.background = isButton ? "rgba(158,71,51,0.25)" : "transparent";
        ring.current.style.boxShadow = isButton ? "0 1px 4px rgba(158,71,51,0.1)" : "none";
        ring.current.style.borderStyle = isPlanet ? "dashed" : "solid";
      }
      if (cross.current) {
        cross.current.style.opacity = hover === "planet" ? "1" : "0";
        cross.current.style.transform = `translate(${ringPos.x - 10}px, ${ringPos.y - 10}px)`;
      }

      // layer 3 — ghost trail
      let px = mouse.x;
      let py = mouse.y;
      trail.forEach((t, i) => {
        t.x += (px - t.x) * 0.35;
        t.y += (py - t.y) * 0.35;
        px = t.x;
        py = t.y;
        const el = trailRefs.current[i];
        if (el) el.style.transform = `translate(${t.x - 2}px, ${t.y - 2}px)`;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none hidden [@media(pointer:fine)]:block" aria-hidden>
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="absolute w-1 h-1 rounded-full bg-crimson"
          style={{ opacity: 0.5 - i * 0.07 }}
        />
      ))}
      <div
        ref={ring}
        className="absolute w-9 h-9 rounded-full border border-crimson transition-[background,box-shadow] duration-200 will-change-transform"
      />
      <div ref={cross} className="absolute w-5 h-5 opacity-0 transition-opacity duration-150 will-change-transform">
        <div className="absolute left-1/2 top-0 w-px h-full bg-crimson -translate-x-1/2" />
        <div className="absolute top-1/2 left-0 h-px w-full bg-crimson -translate-y-1/2" />
      </div>
      <div ref={dot} className="absolute w-1.5 h-1.5 rounded-full bg-crimson will-change-transform" />
    </div>
  );
}
