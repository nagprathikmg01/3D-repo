import { useMemo, useRef, useState, type FormEvent } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard, Html } from "@react-three/drei";
import * as THREE from "three";
import { identity } from "@/data/portfolio";
import { useSpaceStore } from "@/lib/store";
import { useProximity } from "./useProximity";

const MONO_FONT = "/fonts/JetBrainsMono-Regular.ttf";
const DISPLAY_FONT = "/fonts/SpaceGrotesk-Bold.ttf";
const Z = -160;
const VORTEX_COUNT = 200;

/** Red particle vortex — particles spiral continuously inward. */
function Vortex() {
  const points = useRef<THREE.Points>(null);
  const seeds = useMemo(
    () =>
      Array.from({ length: VORTEX_COUNT }, (_, i) => ({
        angle: (i / VORTEX_COUNT) * Math.PI * 2 * 5,
        radius: 2 + (i / VORTEX_COUNT) * 12,
        speed: 0.35 + Math.random() * 0.5,
        y: (Math.random() - 0.5) * 1.6,
      })),
    [],
  );
  const positions = useMemo(() => new Float32Array(VORTEX_COUNT * 3), []);

  useFrame((_, dt) => {
    if (!points.current) return;
    const pos = points.current.geometry.attributes.position as THREE.BufferAttribute;
    seeds.forEach((s, i) => {
      s.angle += s.speed * dt * (14 / (s.radius + 2)); // faster near centre
      s.radius -= dt * 1.1;
      if (s.radius < 0.4) {
        s.radius = 12 + Math.random() * 3;
        s.y = (Math.random() - 0.5) * 1.6;
      }
      pos.setXYZ(
        i,
        Math.cos(s.angle) * s.radius,
        s.y * (s.radius / 12),
        Math.sin(s.angle) * s.radius * 0.55 - 3,
      );
    });
    pos.needsUpdate = true;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#9E4733"
        size={0.16}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

/** Floating social orb with label; opens a link on click. */
function SocialOrb({
  label,
  href,
  position,
}: {
  label: string;
  href: string;
  position: [number, number, number];
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const setHover = useSpaceStore((s) => s.setHover);

  useFrame(() => {
    if (mesh.current)
      mesh.current.position.y = Math.sin(performance.now() / 1600 + position[0] * 3) * 0.22;
  });

  return (
    <group position={position}>
      <mesh
        ref={mesh}
        onClick={(e) => {
          e.stopPropagation();
          window.open(href, "_blank", "noopener");
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover("button");
        }}
        onPointerOut={() => setHover(null)}
      >
        <sphereGeometry args={[0.5, 22, 22]} />
        <meshStandardMaterial color="#F4F2EE" emissive="#9E4733" emissiveIntensity={0.5} roughness={0.35} />
      </mesh>
      <Billboard position={[0, -1.05, 0]}>
        <Text font={MONO_FONT} fontSize={0.24} color="#6E6C68" anchorX="center" letterSpacing={0.15}>
          {label}
        </Text>
      </Billboard>
    </group>
  );
}

/** HTML contact form floating at the portal centre. */
function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formId = import.meta.env.VITE_FORMSPREE_ID as string | undefined;
  const setHover = useSpaceStore((s) => s.setHover);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formId || formId === "your_form_id_here") {
      window.location.href = `mailto:${identity.email}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Html position={[0, -0.4, -3]} center zIndexRange={[20, 0]}>
      <div
        className="space-panel w-[340px] p-6"
        onPointerEnter={() => setHover("button")}
        onPointerLeave={() => setHover(null)}
      >
        {status === "sent" ? (
          <p className="font-mono text-sm text-crimson text-center py-8">
            ▸ MANUSCRIPT RECEIVED. I'll read and respond shortly.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <input
              name="name"
              required
              placeholder="NAME"
              className="bg-transparent border border-paperBorder px-3 py-2.5 font-mono text-xs text-inkDark placeholder-inkMuted/60 focus:border-crimson focus:outline-none transition-colors"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="EMAIL"
              className="bg-transparent border border-paperBorder px-3 py-2.5 font-mono text-xs text-inkDark placeholder-inkMuted/60 focus:border-crimson focus:outline-none transition-colors"
            />
            <textarea
              name="message"
              required
              rows={4}
              placeholder="MESSAGE"
              className="bg-transparent border border-paperBorder px-3 py-2.5 font-mono text-xs text-inkDark placeholder-inkMuted/60 focus:border-crimson focus:outline-none transition-colors resize-none"
            />
            <button type="submit" disabled={status === "sending"} className="btn-red justify-center">
              {status === "sending" ? "SUBMITTING..." : "SUBMIT INQUIRY"}
            </button>
            {status === "error" && (
              <p className="font-mono text-[10px] text-crimson">
                ✕ Failed — email me directly: {identity.email}
              </p>
            )}
          </form>
        )}

        <a
          href={identity.resume}
          download
          className="btn-ghost justify-center w-full mt-3 shadow-sm"
        >
          ▼ DOWNLOAD RESUME
        </a>
      </div>
    </Html>
  );
}

/**
 * Z=-160 — journey's end: a red wormhole vortex, 3D heading,
 * social orbs, and the contact form.
 */
export default function ContactPortal() {
  const ringMat = useRef<THREE.MeshStandardMaterial>(null);
  const [near, setNear] = useState(false);
  const wasNear = useRef(false);

  useProximity(Z, 30, (strength) => {
    if (ringMat.current) ringMat.current.emissiveIntensity = 0.05 + strength * 0.4;
    const n = strength > 0.05;
    if (n !== wasNear.current) {
      wasNear.current = n;
      setNear(n);
    }
  });

  return (
    <group position={[0, 0, Z]}>
      <Vortex />

      {/* wormhole ring */}
      <mesh position={[0, 0, -3]} rotation={[Math.PI / 2.15, 0, 0]}>
        <torusGeometry args={[3.6, 0.12, 12, 80]} />
        <meshStandardMaterial ref={ringMat} color="#F4F2EE" emissive="#9E4733" emissiveIntensity={0.1} />
      </mesh>

      <Text
        font={DISPLAY_FONT}
        fontSize={1.05}
        color="#1E1C1A"
        anchorX="center"
        anchorY="middle"
        position={[0, 4.2, 0]}
        letterSpacing={0.04}
      >
        Let's Build Something
      </Text>
      <Text
        font={MONO_FONT}
        fontSize={0.28}
        color="#9E4733"
        anchorX="center"
        position={[0, 3.2, 0]}
        letterSpacing={0.3}
      >
        [ 06 · INITIATE COLLABORATION ]
      </Text>

      <SocialOrb label="GITHUB" href={identity.github} position={[-6.4, 0.6, -1]} />
      <SocialOrb label="LINKEDIN" href={identity.linkedin} position={[6.4, 0.6, -1]} />
      <SocialOrb label="EMAIL" href={`mailto:${identity.email}`} position={[0, -4.6, -1]} />

      {near && <ContactForm />}
    </group>
  );
}
