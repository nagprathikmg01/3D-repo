import { create } from "zustand";
import { CAMERA_START_Z } from "@/data/portfolio";

/**
 * Mutable per-frame scroll state — read inside useFrame without triggering
 * React renders. GSAP ScrollTrigger writes `progress`; the camera rig
 * derives and writes back the smoothed `cameraZ` each frame.
 */
export const scrollState = {
  /** 0 → 1 across the whole journey (scrubbed by ScrollTrigger) */
  progress: 0,
  /** Smoothed camera Z, written by CameraRig every frame */
  cameraZ: CAMERA_START_Z,
  /** Normalized mouse position, -1 → 1 */
  mouseX: 0,
  mouseY: 0,
};

export type HoverKind = "planet" | "button" | null;

interface SpaceStore {
  /** Loading screen lifecycle */
  ready: boolean;
  setReady: (v: boolean) => void;

  /** Set once the WebGL canvas has been created (drives the loading bar) */
  sceneLoaded: boolean;
  setSceneLoaded: (v: boolean) => void;

  /** Which project planet is zoomed in (null = free flight) */
  activeProject: string | null;
  setActiveProject: (id: string | null) => void;

  /** What the cursor is over — drives the custom cursor's shape */
  hover: HoverKind;
  setHover: (h: HoverKind) => void;

  /** Coarse current section id for the minimap highlight */
  section: string;
  setSection: (s: string) => void;
}

export const useSpaceStore = create<SpaceStore>((set) => ({
  ready: false,
  setReady: (ready) => set({ ready }),
  sceneLoaded: false,
  setSceneLoaded: (sceneLoaded) => set({ sceneLoaded }),
  activeProject: null,
  setActiveProject: (activeProject) => set({ activeProject }),
  hover: null,
  setHover: (hover) => set({ hover }),
  section: "name",
  setSection: (section) => set({ section }),
}));

/** Touch/coarse-pointer devices get the 2D fallback — no WebGL at all. */
export const isTouchDevice = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(pointer: coarse)").matches || !window.matchMedia("(pointer: fine)").matches);
