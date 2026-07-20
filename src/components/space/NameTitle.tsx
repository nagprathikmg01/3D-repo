import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import { useSpaceStore } from "@/lib/store";
import { identity } from "@/data/portfolio";

const DISPLAY_FONT = "/fonts/SpaceGrotesk-Bold.ttf";
const MONO_FONT = "/fonts/JetBrainsMono-Regular.ttf";
const LETTER_SIZE = 2.1;
// Approximate uppercase advances for Space Grotesk Bold (em fraction)
const ADVANCE = 0.68;
const NARROW: Record<string, number> = { I: 0.34, J: 0.5, L: 0.56, T: 0.62 };
const SPACE_ADVANCE = 0.42;

interface LetterSpec {
  ch: string;
  x: number;
}

function layoutLetters(text: string): { letters: LetterSpec[]; width: number } {
  let x = 0;
  const letters: LetterSpec[] = [];
  for (const ch of text) {
    if (ch === " ") {
      x += SPACE_ADVANCE * LETTER_SIZE;
      continue;
    }
    const adv = (NARROW[ch] ?? ADVANCE) * LETTER_SIZE;
    letters.push({ ch, x: x + adv / 2 });
    x += adv;
  }
  return { letters, width: x };
}

/** Small red particle burst played when the letters land. */
function Burst({ trigger }: { trigger: boolean }) {
  const points = useRef<THREE.Points>(null);
  const life = useRef(-1);
  const COUNT = 80;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 2 + Math.random() * 5;
      velocities[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      velocities[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      velocities[i * 3 + 2] = Math.cos(phi) * speed * 0.4;
    }
    return { positions, velocities };
  }, []);

  useEffect(() => {
    if (trigger) life.current = 0;
  }, [trigger]);

  useFrame((_, dt) => {
    if (life.current < 0 || !points.current) return;
    life.current += dt;
    const t = life.current;
    const pos = points.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      pos.setXYZ(i, velocities[i * 3] * t, velocities[i * 3 + 1] * t - 1.5 * t * t, velocities[i * 3 + 2] * t);
    }
    pos.needsUpdate = true;
    const mat = points.current.material as THREE.PointsMaterial;
    mat.opacity = Math.max(0, 1 - t / 1.4);
    if (t > 1.5) life.current = -1;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#9E4733"
        size={0.09}
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

/** Typewriter cycling through roles, rendered as SDF text. */
function RoleTypewriter({ position }: { position: [number, number, number] }) {
  const [text, setText] = useState("");
  const state = useRef({ word: 0, len: 0, deleting: false, wait: 0 });

  useEffect(() => {
    const id = setInterval(() => {
      const s = state.current;
      const word = identity.roles[s.word];
      if (s.wait > 0) {
        s.wait -= 1;
        return;
      }
      if (!s.deleting) {
        s.len += 1;
        if (s.len >= word.length) {
          s.len = word.length;
          s.deleting = true;
          s.wait = 22; // hold the full word
        }
      } else {
        s.len -= 1;
        if (s.len <= 0) {
          s.len = 0;
          s.deleting = false;
          s.word = (s.word + 1) % identity.roles.length;
          s.wait = 4;
        }
      }
      setText(word.slice(0, s.len));
    }, 85);
    return () => clearInterval(id);
  }, []);

  return (
    <Text
      font={MONO_FONT}
      fontSize={0.55}
      color="#9E4733"
      anchorX="center"
      anchorY="middle"
      position={position}
      letterSpacing={0.08}
    >
      {`> ${text}_`}
    </Text>
  );
}

/** Slow decorative orbit rings behind the hero name. */
function HeroRings() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (a.current) a.current.rotation.z += dt * 0.05;
    if (b.current) b.current.rotation.z -= dt * 0.035;
  });
  return (
    <group position={[0, -0.6, -6]}>
      <mesh ref={a} rotation={[Math.PI / 2.6, 0.4, 0]}>
        <torusGeometry args={[11, 0.015, 2, 128]} />
        <meshBasicMaterial color="#9E4733" transparent opacity={0.28} />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 2.2, -0.5, 0.7]}>
        <torusGeometry args={[14, 0.01, 2, 128]} />
        <meshBasicMaterial color="#6E6C68" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

/**
 * Z=0 — the visitor's arrival point. The name falls in letter by letter,
 * lands with a crimson particle burst, subtitle + typewriter below.
 */
export default function NameTitle() {
  const ready = useSpaceStore((s) => s.ready);
  const group = useRef<THREE.Group>(null);
  const [landed, setLanded] = useState(false);
  const { letters, width } = useMemo(() => layoutLetters(identity.name), []);

  // Per-letter animated offsets driven by GSAP, applied in useFrame
  const offsets = useMemo(
    () => letters.map(() => ({ y: 14, opacity: 0 })),
    [letters],
  );
  const letterRefs = useRef<(THREE.Mesh | null)[]>([]);

  useEffect(() => {
    if (!ready) return;
    const tl = gsap.timeline({ delay: 0.35, onComplete: () => setLanded(true) });
    offsets.forEach((o, i) => {
      tl.to(o, { y: 0, opacity: 1, duration: 0.7, ease: "bounce.out" }, i * 0.08);
    });
    return () => {
      tl.kill();
    };
  }, [ready, offsets]);

  useFrame(() => {
    letterRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.position.y = offsets[i].y;
      const mat = (mesh as unknown as { material: THREE.Material }).material;
      if (mat) mat.opacity = offsets[i].opacity;
    });
  });

  return (
    <group ref={group} position={[0, 0.8, 0]}>
      <HeroRings />
      <group position={[-width / 2, 0, 0]}>
        {letters.map((l, i) => (
          <Text
            key={`${l.ch}-${i}`}
            ref={(m: THREE.Mesh) => (letterRefs.current[i] = m)}
            font={DISPLAY_FONT}
            fontSize={LETTER_SIZE}
            color={landed ? "#1E1C1A" : "#9E4733"}
            anchorX="center"
            anchorY="middle"
            position={[l.x, 0, 0]}
            fillOpacity={1}
            transparent
          >
            {l.ch}
          </Text>
        ))}
      </group>

      <Burst trigger={landed} />

      <Text
        font={MONO_FONT}
        fontSize={0.42}
        color="#1E1C1A"
        anchorX="center"
        anchorY="middle"
        position={[0, -2.1, 0]}
        letterSpacing={0.28}
        fillOpacity={0.85}
      >
        {identity.subtitle}
      </Text>

      <RoleTypewriter position={[0, -3.3, 0]} />

      <Text
        font={MONO_FONT}
        fontSize={0.26}
        color="#6E6C68"
        anchorX="center"
        anchorY="middle"
        position={[0, -5.4, 0]}
        letterSpacing={0.2}
      >
        SCROLL TO EXPLORE ↓
      </Text>
    </group>
  );
}
