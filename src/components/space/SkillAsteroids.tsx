import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { skills, type SkillTier } from "@/data/portfolio";
import { scrollState } from "@/lib/store";
import { useProximity } from "./useProximity";

const MONO_FONT = "/fonts/JetBrainsMono-Regular.ttf";
const Z_CENTER = -40;
const FIELD_DEPTH = 26; // asteroids spread from -28 to -54 — camera flies through

const TIER_CONFIG: Record<SkillTier, { size: number; color: string; emissive: number }> = {
  ai: { size: 0.78, color: "#9E4733", emissive: 0.8 },
  fs: { size: 0.55, color: "#6E6C68", emissive: 0.4 },
  cloud: { size: 0.42, color: "#9C9C94", emissive: 0.2 },
};

/** Deterministic pseudo-random from an index so layout is stable across renders. */
function rand(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

interface AsteroidSpec {
  name: string;
  tier: SkillTier;
  pos: [number, number, number];
  axis: THREE.Vector3;
  speed: number;
  lightUpAt: number; // camera Z at which this asteroid ignites
}

/**
 * Z=-40 — a field of skill dodecahedrons the camera flies through.
 * AI skills are large and bright, cloud skills small and dark.
 * Each ignites (emissive ramps up) as the camera approaches its Z.
 */
export default function SkillAsteroids() {
  const specs = useMemo<AsteroidSpec[]>(
    () =>
      skills.map((s, i) => {
        // ring-ish scatter around the flight axis, keeping a clear corridor
        const angle = rand(i, 1) * Math.PI * 2;
        const radius = 3.2 + rand(i, 2) * 6.5;
        const z = Z_CENTER + (rand(i, 3) - 0.5) * FIELD_DEPTH;
        return {
          name: s.name,
          tier: s.tier,
          pos: [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.62, z],
          axis: new THREE.Vector3(rand(i, 4) - 0.5, rand(i, 5) - 0.5, rand(i, 6) - 0.5).normalize(),
          speed: 0.2 + rand(i, 7) * 0.5,
          lightUpAt: z + 14 + rand(i, 8) * 6, // staggered ignition
        };
      }),
    [],
  );

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const matRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const q = useMemo(() => new THREE.Quaternion(), []);

  useFrame((_, dt) => {
    const camZ = scrollState.cameraZ;
    specs.forEach((spec, i) => {
      const mesh = meshRefs.current[i];
      const mat = matRefs.current[i];
      if (mesh) {
        q.setFromAxisAngle(spec.axis, spec.speed * dt);
        mesh.quaternion.multiply(q);
      }
      if (mat) {
        // ignite as the camera crosses each asteroid's trigger line
        const lit = THREE.MathUtils.clamp((spec.lightUpAt - camZ) / -1 + 1, 0, 1);
        const base = TIER_CONFIG[spec.tier].emissive;
        const target = camZ < spec.lightUpAt ? base : base * 0.12;
        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, target, 4 * dt);
        void lit;
      }
    });
  });

  useProximity(Z_CENTER, 22, () => {});

  return (
    <group>
      <Billboard position={[0, 6.8, Z_CENTER + FIELD_DEPTH / 2 + 2]}>
        <Text font={MONO_FONT} fontSize={0.3} color="#9E4733" anchorX="center" letterSpacing={0.35}>
          [ 02 · AREAS OF EXPERTISE ]
        </Text>
      </Billboard>

      {specs.map((spec, i) => {
        const cfg = TIER_CONFIG[spec.tier];
        return (
          <group key={spec.name} position={spec.pos}>
            <mesh ref={(m) => (meshRefs.current[i] = m)}>
              <dodecahedronGeometry args={[cfg.size, 0]} />
              <meshStandardMaterial
                ref={(m) => (matRefs.current[i] = m)}
                color="#F4F2EE"
                emissive={cfg.color}
                emissiveIntensity={0.1}
                roughness={0.55}
                metalness={0.35}
                flatShading
              />
            </mesh>
            <Billboard>
              <Text
                font={MONO_FONT}
                fontSize={spec.tier === "ai" ? 0.3 : 0.24}
                color={spec.tier === "cloud" ? "#6E6C68" : "#1E1C1A"}
                anchorX="center"
                anchorY="middle"
                position={[0, -cfg.size - 0.4, 0]}
                letterSpacing={0.1}
                outlineWidth={0.012}
                outlineColor="#FCFAF6"
              >
                {spec.name}
              </Text>
            </Billboard>
          </group>
        );
      })}
    </group>
  );
}
