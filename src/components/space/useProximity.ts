import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { scrollState } from "@/lib/store";

/**
 * Calls `onFrame(strength, dt)` every frame with a 0→1 "approach" value:
 * 0 when the camera is far from `z`, ramping to 1 as it arrives.
 * `range` = distance over which the ramp happens.
 */
export function useProximity(
  z: number,
  range: number,
  onFrame: (strength: number, dt: number) => void,
) {
  useFrame((_, dt) => {
    const d = Math.abs(scrollState.cameraZ - z);
    const strength = Math.max(0, Math.min(1, 1 - (d - 4) / range));
    onFrame(strength, dt);
  });
}

/** One-shot latch: fires `cb` the first time the camera comes within `range` of `z`. */
export function useApproachOnce(z: number, range: number, cb: () => void) {
  const fired = useRef(false);
  useFrame(() => {
    if (fired.current) return;
    if (Math.abs(scrollState.cameraZ - z) < range) {
      fired.current = true;
      cb();
    }
  });
}
