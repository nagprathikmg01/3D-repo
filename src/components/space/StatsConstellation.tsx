import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { stats } from "@/data/portfolio";
import { useProximity, useApproachOnce } from "./useProximity";

const MONO_FONT = "/fonts/JetBrainsMono-Regular.ttf";
const DISPLAY_FONT = "/fonts/SpaceGrotesk-Bold.ttf";
const Z = -20;

const NODE_POSITIONS: [number, number, number][] = [
  [-6.5, 2.5, 0],
  [6.5, 3, -1],
  [-5.5, -2.8, -0.5],
  [5.8, -2.5, 0.5],
];

function CountUpText({
  value,
  prefix,
  suffix,
  started,
}: {
  value: number;
  prefix: string;
  suffix: string;
  started: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const t = useRef(0);
  const isFloat = value % 1 !== 0;

  useFrame((_, dt) => {
    if (!started || t.current >= 1) return;
    t.current = Math.min(1, t.current + dt / 1.8);
    const eased = 1 - Math.pow(1 - t.current, 3);
    setDisplay(isFloat ? +(value * eased).toFixed(1) : Math.round(value * eased));
  });

  return (
    <Text font={DISPLAY_FONT} fontSize={0.62} color="#9E4733" anchorX="center" anchorY="middle">
      {`${prefix}${display}${suffix}`}
    </Text>
  );
}

/**
 * Z=-20 — four stat nodes orbiting a centre point, joined by pulsing red lines.
 */
export default function StatsConstellation() {
  const group = useRef<THREE.Group>(null);
  const linesMat = useRef<THREE.LineBasicMaterial>(null);
  const [counting, setCounting] = useState(false);

  useApproachOnce(Z, 14, () => setCounting(true));

  // Line segments connecting all nodes to each other (constellation web)
  const lineGeo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_POSITIONS.length; i++)
      for (let j = i + 1; j < NODE_POSITIONS.length; j++) {
        pts.push(new THREE.Vector3(...NODE_POSITIONS[i]), new THREE.Vector3(...NODE_POSITIONS[j]));
      }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useProximity(Z, 18, (strength, dt) => {
    if (group.current) {
      group.current.rotation.y += dt * 0.06; // slow orbit around centre
      group.current.rotation.z = Math.sin(group.current.rotation.y * 0.5) * 0.04;
    }
    if (linesMat.current) {
      const pulse = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(performance.now() / 400));
      linesMat.current.opacity = strength * pulse;
    }
  });

  return (
    <group position={[0, 0, Z]}>
      <group ref={group}>
        <lineSegments geometry={lineGeo}>
          <lineBasicMaterial ref={linesMat} color="#E0DDD9" transparent opacity={0.3} />
        </lineSegments>

        {stats.map((s, i) => (
          <group key={s.label} position={NODE_POSITIONS[i]}>
            <mesh>
              <sphereGeometry args={[0.28, 20, 20]} />
              <meshStandardMaterial
                color="#9C9C94"
                emissive="#9E4733"
                emissiveIntensity={0.6}
                roughness={0.3}
              />
            </mesh>
            <Billboard>
              <group position={[0, 0.95, 0]}>
                <CountUpText value={s.value} prefix={s.prefix} suffix={s.suffix} started={counting} />
              </group>
              <Text
                font={MONO_FONT}
                fontSize={0.26}
                color="#6E6C68"
                anchorX="center"
                anchorY="middle"
                position={[0, -0.85, 0]}
                letterSpacing={0.15}
              >
                {s.label.toUpperCase()}
              </Text>
            </Billboard>
          </group>
        ))}
      </group>

      <Billboard position={[0, 5.6, 0]}>
        <Text
          font={MONO_FONT}
          fontSize={0.3}
          color="#9E4733"
          anchorX="center"
          letterSpacing={0.35}
        >
          [ 01 · KEY METRICS ]
        </Text>
      </Billboard>
    </group>
  );
}
