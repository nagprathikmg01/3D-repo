import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useSpaceStore } from "@/lib/store";
import { identity } from "@/data/portfolio";

const TYPE_NAME = "NAG PRATHIK MG";

/**
 * Editorial loading screen: name types out in crimson, progress bar
 * smoothly animates to 100%, then fades out into the dissertation page.
 */
export default function LoadingScreen() {
  const setReady = useSpaceStore((s) => s.setReady);
  const skip = useRef(new URLSearchParams(window.location.search).has("fly"));
  const [typed, setTyped] = useState(skip.current ? TYPE_NAME.length : 0);
  const [display, setDisplay] = useState(skip.current ? 100 : 0);
  const [shattering, setShattering] = useState(false);
  const [gone, setGone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  // Typewriter for the name
  useEffect(() => {
    if (skip.current) return;
    const id = setInterval(() => {
      setTyped((t) => {
        if (t >= TYPE_NAME.length) {
          clearInterval(id);
          return t;
        }
        return t + 1;
      });
    }, 45);
    return () => clearInterval(id);
  }, []);

  // Fast smooth progress from 0 to 100%
  useEffect(() => {
    if (skip.current) return;
    const id = setInterval(() => {
      setDisplay((d) => {
        if (d >= 100) {
          clearInterval(id);
          return 100;
        }
        return Math.min(100, d + 8);
      });
    }, 40);
    return () => clearInterval(id);
  }, []);

  // Lock scroll + pin to top while loading screen is active
  useEffect(() => {
    if (gone) return;
    if (!skip.current) window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gone]);

  const complete = typed >= TYPE_NAME.length && display >= 100;

  useEffect(() => {
    if (!complete || shattering) return;
    const t = setTimeout(() => setShattering(true), 200);
    return () => clearTimeout(t);
  }, [complete, shattering]);

  // Particle shatter effect and smooth fade out
  useEffect(() => {
    if (!shattering) return;
    const cv = canvas.current;
    const el = root.current;
    if (!cv || !el) {
      setGone(true);
      setReady(true);
      return;
    }

    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
    const ctx = cv.getContext("2d")!;
    const parts = Array.from({ length: 180 }, () => ({
      x: cv.width / 2 + (Math.random() - 0.5) * 280,
      y: cv.height / 2 + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.5) * 18,
      r: 1 + Math.random() * 2,
      life: 1,
    }));

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      let alive = false;
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= 0.025;
        if (p.life <= 0) continue;
        alive = true;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = Math.random() > 0.35 ? "#9E4733" : "#6E6C68";
        ctx.fillRect(p.x, p.y, p.r, p.r);
      }
      ctx.globalAlpha = 1;
      if (alive) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    gsap.to(el.querySelector(".loading-content"), { opacity: 0, scale: 1.04, duration: 0.25 });
    gsap.to(el, {
      opacity: 0,
      duration: 0.45,
      delay: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        setGone(true);
        setReady(true);
      },
    });

    return () => cancelAnimationFrame(raf);
  }, [shattering, setReady]);

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-50 bg-paperBg flex items-center justify-center">
      <canvas ref={canvas} className="absolute inset-0 pointer-events-none" />
      <div className="loading-content flex flex-col items-center gap-6 px-6">
        <h1 className="font-display font-bold text-3xl md:text-5xl tracking-[0.12em] text-inkDark">
          {TYPE_NAME.slice(0, typed)}
          <span className="caret text-primary">▌</span>
        </h1>
        <p className="font-mono text-xs text-inkMuted tracking-[0.4em] uppercase">
          {complete ? "Manuscript loaded" : "Initializing..."}
        </p>
        <div className="w-64 md:w-96 h-[2px] bg-paperBorder overflow-hidden">
          <div
            className="h-full bg-crimson transition-[width] duration-150 ease-out"
            style={{ width: `${display}%` }}
          />
        </div>
        <p className="font-mono text-[10px] text-crimson font-bold">{display}%</p>
        <p className="sr-only">{identity.name} — portfolio loading</p>
      </div>
    </div>
  );
}
