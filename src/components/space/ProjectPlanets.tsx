import { useMemo, useRef, type ComponentType } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { projects } from "@/data/portfolio";
import { useSpaceStore } from "@/lib/store";
import { PLANET_POS, PLANET_RADIUS } from "./planetPositions";
import Atmosphere from "./Atmosphere";

const MONO_FONT = "/fonts/JetBrainsMono-Regular.ttf";
const DISPLAY_FONT = "/fonts/SpaceGrotesk-Bold.ttf";

/* ── Surface builders — each planet gets a distinct look ────────────── */

/** GeoQuest — cream sphere wrapped in a crimson wireframe lat/long grid + rings. */
function GeoQuestSurface({ r }: { r: number }) {
  return (
    <>
      <mesh>
        <sphereGeometry args={[r, 40, 40]} />
        <meshStandardMaterial color="#F4F2EE" roughness={0.7} metalness={0.25} />
      </mesh>
      <mesh scale={1.012}>
        <sphereGeometry args={[r, 20, 14]} />
        <meshBasicMaterial color="#9E4733" wireframe transparent opacity={0.38} />
      </mesh>
      <Atmosphere radius={r} intensity={0.25} color="#9E4733" />
      <mesh rotation={[Math.PI / 2.35, 0, 0.25]}>
        <torusGeometry args={[r * 1.65, r * 0.055, 2, 90]} />
        <meshStandardMaterial color="#6E6C68" emissive="#9E4733" emissiveIntensity={0.5} roughness={0.4} />
      </mesh>
      {/* thin outer companion ring */}
      <mesh rotation={[Math.PI / 2.35, 0, 0.25]}>
        <torusGeometry args={[r * 1.92, r * 0.012, 2, 90]} />
        <meshBasicMaterial color="#C0887A" transparent opacity={0.4} />
      </mesh>
    </>
  );
}

/** Drone — neural-net line texture (wireframe icosphere) + counter-rotating double ring. */
function DroneSurface({ r }: { r: number }) {
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ringA.current) ringA.current.rotation.z += dt * 0.5;
    if (ringB.current) ringB.current.rotation.z -= dt * 0.7;
  });
  return (
    <>
      <mesh>
        <icosahedronGeometry args={[r, 2]} />
        <meshStandardMaterial color="#F4F2EE" roughness={0.6} flatShading />
      </mesh>
      <mesh scale={1.015}>
        <icosahedronGeometry args={[r, 2]} />
        <meshBasicMaterial color="#9E4733" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh ref={ringA} rotation={[Math.PI / 2.6, 0.2, 0]}>
        <torusGeometry args={[r * 1.5, r * 0.03, 2, 80]} />
        <meshBasicMaterial color="#9E4733" transparent opacity={0.8} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2.1, -0.3, 0]}>
        <torusGeometry args={[r * 1.75, r * 0.02, 2, 80]} />
        <meshBasicMaterial color="#6E6C68" transparent opacity={0.7} />
      </mesh>
      <Atmosphere radius={r} color="#9E4733" intensity={0.25} power={3.0} />
    </>
  );
}

/** GreenCart — smooth glowing sphere with a tiny orbiting moon. */
function GreenCartSurface({ r }: { r: number }) {
  const moon = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!moon.current) return;
    const t = clock.elapsedTime * 0.7;
    moon.current.position.set(Math.cos(t) * r * 1.9, Math.sin(t * 0.8) * r * 0.35, Math.sin(t) * r * 1.9);
  });
  return (
    <>
      <mesh>
        <sphereGeometry args={[r, 44, 44]} />
        <meshStandardMaterial color="#F4F2EE" emissive="#9E4733" emissiveIntensity={0.2} roughness={0.35} />
      </mesh>
      <Atmosphere radius={r} intensity={0.25} color="#C0887A" power={2.2} />
      <group ref={moon}>
        <mesh>
          <coneGeometry args={[r * 0.14, r * 0.22, 3]} />
          <meshStandardMaterial color="#6E6C68" emissive="#6E6C68" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </>
  );
}

/** ClubOS — geometric icosahedron with 5 platform satellites. */
function ClubOSSurface({ r }: { r: number }) {
  const sats = useRef<THREE.Group>(null);
  const platforms = ["AND", "IOS", "WEB", "WIN", "LNX"];
  useFrame((_, dt) => {
    if (sats.current) sats.current.rotation.y += dt * 0.4;
  });
  return (
    <>
      <mesh>
        <icosahedronGeometry args={[r, 0]} />
        <meshStandardMaterial color="#F4F2EE" emissive="#9E4733" emissiveIntensity={0.25} roughness={0.4} metalness={0.5} flatShading />
      </mesh>
      <Atmosphere radius={r} color="#C0887A" intensity={0.25} power={2.8} />
      <group ref={sats}>
        {platforms.map((p, i) => {
          const a = (i / platforms.length) * Math.PI * 2;
          return (
            <group key={p} position={[Math.cos(a) * r * 1.75, Math.sin(a * 2) * 0.35, Math.sin(a) * r * 1.75]}>
              <mesh>
                <boxGeometry args={[0.16, 0.16, 0.16]} />
                <meshStandardMaterial color="#9E4733" emissive="#9E4733" emissiveIntensity={1.4} />
              </mesh>
            </group>
          );
        })}
      </group>
    </>
  );
}

const SURFACES: Record<string, ComponentType<{ r: number }>> = {
  geoquest: GeoQuestSurface,
  drone: DroneSurface,
  greencart: GreenCartSurface,
  clubos: ClubOSSurface,
};

/* ── Planet wrapper: label, badges, hover pulse, click-to-zoom ──────── */

function Planet({ id }: { id: string }) {
  const project = projects.find((p) => p.id === id)!;
  const pos = PLANET_POS[id];
  const r = PLANET_RADIUS[id];
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const hoverT = useRef(0);
  const hovered = useRef(false);

  const { setActiveProject, setHover } = useSpaceStore.getState();
  const Surface = SURFACES[id];

  useFrame((_, dt) => {
    if (inner.current) inner.current.rotation.y += dt * 0.12;
    // hover pulse
    hoverT.current = THREE.MathUtils.lerp(hoverT.current, hovered.current ? 1 : 0, 6 * dt);
    if (group.current) {
      const pulse = 1 + hoverT.current * 0.05 * (1 + Math.sin(performance.now() / 180) * 0.4);
      group.current.scale.setScalar(pulse);
      // gentle float
      group.current.position.y = pos.y + Math.sin(performance.now() / 2400 + pos.x) * 0.25;
    }
  });

  return (
    <group ref={group} position={pos}>
      {/* Invisible larger hit-sphere for comfortable clicking */}
      <mesh
        visible={false}
        onClick={(e) => {
          e.stopPropagation();
          setActiveProject(id);
          useSpaceStore.getState().setHover(null);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          hovered.current = true;
          setHover("planet");
        }}
        onPointerOut={() => {
          hovered.current = false;
          setHover(null);
        }}
      >
        <sphereGeometry args={[r * 1.35, 12, 12]} />
      </mesh>

      <group ref={inner}>
        <Surface r={r} />
      </group>

      {/* Label above the planet */}
      <Billboard position={[0, r + 1.35, 0]}>
        <Text font={DISPLAY_FONT} fontSize={0.62} color="#1E1C1A" anchorX="center" letterSpacing={0.14}>
          {project.label}
        </Text>
        <Text
          font={MONO_FONT}
          fontSize={0.24}
          color="#9E4733"
          anchorX="center"
          position={[0, -0.62, 0]}
          letterSpacing={0.12}
        >
          {project.sub}
        </Text>
      </Billboard>

      {/* Floating badge (FINAL YEAR / LIVE) */}
      {project.badge && (
        <Billboard position={[r * 0.9, r + 0.45, 0]}>
          <Text font={MONO_FONT} fontSize={0.26} color="#9E4733" anchorX="center" letterSpacing={0.25}>
            {`● ${project.badge}`}
          </Text>
        </Billboard>
      )}

      {/* Key stat floating near the surface */}
      {project.stat && (
        <Billboard position={[0, -r - 0.75, 0]}>
          <Text font={MONO_FONT} fontSize={0.3} color="#6E6C68" anchorX="center" letterSpacing={0.1}>
            {project.stat}
          </Text>
        </Billboard>
      )}
    </group>
  );
}

/**
 * Z=-70 — four project planets. Click one → camera flies in (CameraRig)
 * and the HTML detail panel slides over (ProjectPanel, outside the canvas).
 */
export default function ProjectPlanets() {
  const ids = useMemo(() => Object.keys(PLANET_POS), []);
  return (
    <group>
      <Billboard position={[0, 9, -60]}>
        <Text font={MONO_FONT} fontSize={0.3} color="#9E4733" anchorX="center" letterSpacing={0.35}>
          [ 03 · PUBLISHED WORKS — SELECT A MESH ]
        </Text>
      </Billboard>
      {ids.map((id) => (
        <Planet key={id} id={id} />
      ))}
    </group>
  );
}
