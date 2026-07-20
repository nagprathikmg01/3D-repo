import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { certifications, education } from "@/data/portfolio";
import { useProximity } from "./useProximity";

const MONO_FONT = "/fonts/JetBrainsMono-Regular.ttf";
const DISPLAY_FONT = "/fonts/SpaceGrotesk-Bold.ttf";
const Z = -130;

/** Orbiting certification badge satellites around the station toroid. */
function CertSatellites() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.18;
  });

  return (
    <group ref={group}>
      {certifications.map((cert, i) => {
        const a = (i / certifications.length) * Math.PI * 2;
        const r = 6.4;
        return (
          <group
            key={cert.issuer}
            position={[Math.cos(a) * r, Math.sin(a * 2.4) * 1.4, Math.sin(a) * r]}
          >
            <mesh>
              <octahedronGeometry args={[0.34, 0]} />
              <meshStandardMaterial
                color="#9C9C94"
                emissive="#9E4733"
                emissiveIntensity={0.6}
                flatShading
              />
            </mesh>
            <Billboard>
              <Text
                font={MONO_FONT}
                fontSize={0.26}
                color="#1E1C1A"
                anchorX="center"
                position={[0, -0.72, 0]}
                letterSpacing={0.1}
                outlineWidth={0.012}
                outlineColor="#FCFAF6"
                renderOrder={2}
              >
                {`${cert.issuer} ×${cert.count}`}
              </Text>
            </Billboard>
          </group>
        );
      })}
    </group>
  );
}

/**
 * Z=-130 — a rotating toroid space station with education data on its face
 * and certification badges orbiting as satellites. Lights up red on approach.
 */
export default function EducationStation() {
  const station = useRef<THREE.Group>(null);
  const torusMat = useRef<THREE.MeshStandardMaterial>(null);
  const coreMat = useRef<THREE.MeshStandardMaterial>(null);

  useProximity(Z, 24, (strength, dt) => {
    if (station.current) {
      station.current.rotation.z += dt * 0.1;
      station.current.rotation.x = Math.PI / 2.4 + Math.sin(performance.now() / 4000) * 0.06;
    }
    if (torusMat.current) torusMat.current.emissiveIntensity = 0.05 + strength * 0.4;
    if (coreMat.current) coreMat.current.emissiveIntensity = 0.05 + strength * 0.5;
  });

  return (
    <group position={[0, 0, Z]}>
      <Billboard position={[0, 7.2, 4]}>
        <Text font={MONO_FONT} fontSize={0.3} color="#9E4733" anchorX="center" letterSpacing={0.35}>
          [ 05 · ACADEMIC CREDENTIALS ]
        </Text>
      </Billboard>

      {/* Station toroid sits above; education data reads clear below */}
      <group position={[0, 2.6, 0]}>
        <group ref={station}>
          <mesh>
            <torusGeometry args={[3.4, 0.45, 18, 90]} />
            <meshStandardMaterial
              ref={torusMat}
              color="#F4F2EE"
              emissive="#9E4733"
              emissiveIntensity={0.1}
              roughness={0.45}
              metalness={0.65}
            />
          </mesh>
          {/* hub + spokes */}
          <mesh>
            <sphereGeometry args={[0.7, 24, 24]} />
            <meshStandardMaterial
              ref={coreMat}
              color="#F4F2EE"
              emissive="#9E4733"
              emissiveIntensity={0.1}
              roughness={0.3}
            />
          </mesh>
          {[0, 1, 2].map((i) => (
            <mesh key={i} rotation={[0, 0, (i / 3) * Math.PI]}>
              <cylinderGeometry args={[0.06, 0.06, 6.8]} />
              <meshStandardMaterial color="#E0DDD9" emissive="#6E6C68" emissiveIntensity={0.1} />
            </mesh>
          ))}
        </group>

        <CertSatellites />
      </group>

      {/* Education data face */}
      <Billboard position={[0, -3.6, 4.5]}>
        {education.map((e, i) => (
          <group key={e.school} position={[0, 1.1 - i * 1.15, 0]}>
            <Text font={DISPLAY_FONT} fontSize={0.36} color="#1E1C1A" anchorX="center" anchorY="middle">
              {e.school}
            </Text>
            <Text
              font={MONO_FONT}
              fontSize={0.22}
              color="#9E4733"
              anchorX="center"
              anchorY="middle"
              position={[0, -0.42, 0]}
              letterSpacing={0.06}
            >
              {`${e.detail}  ·  ${e.years}`}
            </Text>
          </group>
        ))}
      </Billboard>
    </group>
  );
}
