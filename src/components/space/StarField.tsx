import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/store";
import { CAMERA_START_Z, CAMERA_END_Z } from "@/data/portfolio";

const COUNT = 420;
const SPREAD_X = 80;
const SPREAD_Y = 50;
const DEPTH_PAD = 30;
const RED_COUNT = Math.floor(COUNT * 0.25);

/**
 * Layered star field spanning the whole flight path, single draw call.
 * Custom shader: per-star size + twinkle phase, round soft-edged sprites.
 * The red engine-trail stars stream past the camera scaled by scroll speed.
 */
export default function StarField() {
  const points = useRef<THREE.Points>(null);

  const { positions, colors, sizes, phases } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);
    const dim = new THREE.Color("#E0DDD9");
    const bright = new THREE.Color("#9C9C94");
    const hot = new THREE.Color("#1E1C1A");
    const red = new THREE.Color("#9E4733");
    const ember = new THREE.Color("#C0887A");

    const zMin = CAMERA_END_Z - DEPTH_PAD;
    const zMax = CAMERA_START_Z + DEPTH_PAD;

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SPREAD_X;
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y;
      positions[i * 3 + 2] = zMin + Math.random() * (zMax - zMin);
      phases[i] = Math.random() * Math.PI * 2;

      const isRed = i < RED_COUNT;
      let c: THREE.Color;
      let s: number;
      if (isRed) {
        c = Math.random() > 0.5 ? red : ember;
        s = 2.4 + Math.random() * 2.2;
      } else {
        const r = Math.random();
        if (r > 0.94) {
          c = hot;
          s = 4.5 + Math.random() * 2.5;
        } else if (r > 0.6) {
          c = bright;
          s = 2.0 + Math.random() * 1.4;
        } else {
          c = dim;
          s = 1.1 + Math.random() * 1.0;
        }
      }
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = s;
    }
    return { positions, colors, sizes, phases };
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
        uniforms: { uTime: { value: 0 } },
        vertexShader: /* glsl */ `
          attribute float size;
          attribute float phase;
          varying vec3 vColor;
          varying float vTwinkle;
          uniform float uTime;
          void main() {
            vColor = color;
            vTwinkle = 0.65 + 0.35 * sin(uTime * 1.6 + phase);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (140.0 / -mv.z) * vTwinkle;
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vColor;
          varying float vTwinkle;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            float alpha = smoothstep(0.5, 0.08, d);
            gl_FragColor = vec4(vColor, alpha * vTwinkle);
          }
        `,
        vertexColors: true,
      }),
    [],
  );

  const prevZ = useRef(CAMERA_START_Z);

  useFrame(({ clock }, delta) => {
    material.uniforms.uTime.value = clock.elapsedTime;
    if (!points.current) return;
    const geo = points.current.geometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const camZ = scrollState.cameraZ;
    const dz = camZ - prevZ.current;
    prevZ.current = camZ;

    // Red engine-trail particles drift back past the camera; amplify with speed
    const drift = delta * 1.5 + Math.abs(dz) * 0.6;
    for (let i = 0; i < RED_COUNT; i++) {
      let z = pos.getZ(i) + drift;
      if (z > camZ + DEPTH_PAD) z = camZ - (CAMERA_START_Z - CAMERA_END_Z) * 0.35 - Math.random() * 20;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={points} frustumCulled={false} material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-phase" args={[phases, 1]} />
      </bufferGeometry>
    </points>
  );
}
