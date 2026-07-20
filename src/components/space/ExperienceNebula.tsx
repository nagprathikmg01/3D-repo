import { useMemo, useRef } from "react";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { experience } from "@/data/portfolio";
import { useProximity } from "./useProximity";

const MONO_FONT = "/fonts/JetBrainsMono-Regular.ttf";
const DISPLAY_FONT = "/fonts/SpaceGrotesk-Bold.ttf";
const Z = -100;
const NEBULA_COUNT = 240;

const CARD_POSITIONS: [number, number, number][] = [
  [-5.6, 3.0, 4],
  [5.6, 2.5, 0],
  [-5.4, -2.9, -4],
  [5.4, -3.0, -8],
];

/** Soft red particle cloud behind the experience cards. */
function NebulaCloud() {
  const mat = useRef<THREE.PointsMaterial>(null);
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(NEBULA_COUNT * 3);
    for (let i = 0; i < NEBULA_COUNT; i++) {
      // clustered gaussian-ish blob
      const r = Math.pow(Math.random(), 0.6) * 16;
      const theta = Math.random() * Math.PI * 2;
      arr[i * 3] = Math.cos(theta) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = Math.sin(theta) * r * 0.6 - 6;
    }
    return arr;
  }, []);

  useProximity(Z, 26, (strength) => {
    if (mat.current) mat.current.opacity = 0.14 + strength * 0.3;
    if (points.current) points.current.rotation.y = performance.now() / 40000;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
        color="#9C9C94"
        size={0.32}
        sizeAttenuation
        transparent
        opacity={0.15}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

/** A glassmorphism-style card built from 3D planes + SDF text. */
function ExpCard({ index }: { index: number }) {
  const exp = experience[index];
  const group = useRef<THREE.Group>(null);
  const bgMat = useRef<THREE.MeshStandardMaterial>(null);
  const pos = CARD_POSITIONS[index];
  const W = 6.4;
  const H = 3.4;

  useProximity(Z + pos[2], 20, (strength) => {
    if (group.current) {
      group.current.visible = strength > 0.01;
      group.current.position.y = pos[1] + Math.sin(performance.now() / 2600 + index * 2) * 0.18;
    }
    if (bgMat.current) bgMat.current.opacity = strength * 0.72;
  });

  // wrap description to ~46 chars/line
  const desc = useMemo(() => {
    const words = exp.description.split(" ");
    const lines: string[] = [];
    let line = "";
    for (const w of words) {
      if ((line + " " + w).trim().length > 46) {
        lines.push(line.trim());
        line = w;
      } else line += " " + w;
    }
    if (line.trim()) lines.push(line.trim());
    return lines.join("\n");
  }, [exp.description]);

  return (
    <group position={pos}>
      <Billboard ref={group}>
        {/* card backdrop */}
        <mesh>
          <planeGeometry args={[W, H]} />
          <meshStandardMaterial ref={bgMat} color="#F4F2EE" transparent opacity={0} roughness={0.9} />
        </mesh>
        {/* card border frame */}
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(W, H)]} />
          <lineBasicMaterial color="#E0DDD9" transparent opacity={0.5} />
        </lineSegments>

        <Text
          font={MONO_FONT}
          fontSize={0.2}
          color="#9E4733"
          anchorX="left"
          anchorY="top"
          position={[-W / 2 + 0.4, H / 2 - 0.35, 0.01]}
          letterSpacing={0.15}
        >
          {exp.duration.toUpperCase()}
        </Text>
        <Text
          font={DISPLAY_FONT}
          fontSize={0.34}
          color="#1E1C1A"
          anchorX="left"
          anchorY="top"
          position={[-W / 2 + 0.4, H / 2 - 0.78, 0.01]}
          maxWidth={W - 0.8}
        >
          {exp.role}
        </Text>
        <Text
          font={MONO_FONT}
          fontSize={0.22}
          color="#9E4733"
          anchorX="left"
          anchorY="top"
          position={[-W / 2 + 0.4, H / 2 - 1.55, 0.01]}
          maxWidth={W - 0.8}
        >
          {exp.company}
        </Text>
        <Text
          font={MONO_FONT}
          fontSize={0.19}
          color="#6E6C68"
          anchorX="left"
          anchorY="top"
          position={[-W / 2 + 0.4, H / 2 - 2.05, 0.01]}
          lineHeight={1.45}
        >
          {desc}
        </Text>
      </Billboard>
    </group>
  );
}

/** Glowing timeline line threading the four cards together. */
function TimelineLine() {
  const line = useMemo(() => {
    const pts = CARD_POSITIONS.map((p) => new THREE.Vector3(...p));
    const curve = new THREE.CatmullRomCurve3(pts);
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(60));
    const mat = new THREE.LineBasicMaterial({ color: "#E0DDD9", transparent: true, opacity: 0 });
    return new THREE.Line(geo, mat);
  }, []);

  useProximity(Z, 24, (strength) => {
    const pulse = 0.5 + 0.5 * Math.sin(performance.now() / 500);
    (line.material as THREE.LineBasicMaterial).opacity = strength * (0.3 + pulse * 0.4);
  });

  return <primitive object={line} />;
}

/**
 * Z=-100 — the experience nebula: red particle cloud, four floating
 * glass cards linked by a pulsing timeline.
 */
export default function ExperienceNebula() {
  return (
    <group position={[0, 0, Z]}>
      <Billboard position={[0, 6.6, 6]}>
        <Text font={MONO_FONT} fontSize={0.3} color="#9E4733" anchorX="center" letterSpacing={0.35}>
          [ 04 · PROFESSIONAL CHRONOLOGY ]
        </Text>
      </Billboard>
      <NebulaCloud />
      <TimelineLine />
      {experience.map((_, i) => (
        <ExpCard key={i} index={i} />
      ))}
    </group>
  );
}
