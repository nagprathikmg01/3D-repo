import { useMemo } from "react";
import * as THREE from "three";

/** Soft radial-gradient sprite texture generated once on a canvas. */
function makeGlowTexture(inner: string, outer: string): THREE.CanvasTexture {
  const size = 256;
  const cv = document.createElement("canvas");
  cv.width = cv.height = size;
  const ctx = cv.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(0.4, outer);
  g.addColorStop(1, "rgba(252,250,246,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

interface Cloud {
  pos: [number, number, number];
  scale: number;
  opacity: number;
}

// hand-placed nebula clouds giving each stretch of the journey its own mood
const CLOUDS: Cloud[] = [
  { pos: [-18, 8, -14], scale: 42, opacity: 0.16 },
  { pos: [20, -10, -32], scale: 50, opacity: 0.13 },
  { pos: [-14, -6, -55], scale: 44, opacity: 0.15 },
  { pos: [16, 9, -80], scale: 55, opacity: 0.17 },
  { pos: [-20, 4, -108], scale: 48, opacity: 0.16 },
  { pos: [18, -8, -128], scale: 42, opacity: 0.13 },
  { pos: [0, 6, -152], scale: 52, opacity: 0.18 },
  { pos: [-16, -9, -170], scale: 46, opacity: 0.15 },
];

/**
 * Distant nebula glow sprites — pure depth dressing behind every station.
 * Sprites always face the camera; normal blending melts them into cream.
 */
export default function DeepSpace() {
  const texture = useMemo(
    () => makeGlowTexture("rgba(158,71,51,0.12)", "rgba(224,221,217,0.05)"),
    [],
  );

  return (
    <group>
      {CLOUDS.map((c, i) => (
        <sprite key={i} position={c.pos} scale={[c.scale, c.scale * 0.62, 1]}>
          <spriteMaterial
            map={texture}
            transparent
            opacity={c.opacity}
            depthWrite={false}
            blending={THREE.NormalBlending}
          />
        </sprite>
      ))}
    </group>
  );
}
