import * as THREE from "three";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, OrbitControls } from "@react-three/drei";

// Neural network wireframe: outer icosahedron shell + dim solid inner core
function NeuralMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.15;
      wireRef.current.rotation.y = t * 0.2;
    }

    if (groupRef.current) {
      // Slight floating animation
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.15;
      // Mouse parallax tracking (lerp toward pointer)
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, state.pointer.x * 0.6, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.pointer.x * 0.4, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -state.pointer.y * 0.4, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer neural network wireframe shell */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.8, 4]} />
        <meshStandardMaterial
          color={0x3b82f6}
          wireframe
          emissive={0x7c3aed}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Inner solid core with lower opacity */}
      <mesh scale={0.62}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshPhysicalMaterial
          color="#3b82f6"
          emissive="#7c3aed"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

// Purple + blue point lights orbiting the mesh
function OrbitingLights() {
  const purpleRef = useRef<THREE.PointLight>(null);
  const blueRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (purpleRef.current) {
      purpleRef.current.position.set(Math.cos(t * 0.7) * 3, Math.sin(t * 0.5) * 2, Math.sin(t * 0.7) * 3);
    }
    if (blueRef.current) {
      blueRef.current.position.set(Math.cos(t * 0.7 + Math.PI) * 3, Math.cos(t * 0.5) * 2, Math.sin(t * 0.7 + Math.PI) * 3);
    }
  });

  return (
    <>
      <pointLight ref={purpleRef} intensity={12} color="#7c3aed" distance={10} />
      <pointLight ref={blueRef} intensity={12} color="#3b82f6" distance={10} />
    </>
  );
}

export default function HeroThree() {
  return (
    <div className="w-full h-[400px] md:h-[450px] relative">
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-dashed border-primaryBlue animate-spin" />
        </div>
      }>
        <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#3b82f6" />
          <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#7c3aed" />
          <pointLight position={[0, 0, 2]} intensity={1} color="#06b6d4" />

          <NeuralMesh />
          <OrbitingLights />

          {/* Neural Network Sparkles Swarm */}
          <Sparkles
            count={120}
            scale={4.5}
            size={3.5}
            speed={0.4}
            color="#06b6d4"
          />
          <Sparkles
            count={60}
            scale={5}
            size={2}
            speed={0.2}
            color="#7c3aed"
          />

          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </Suspense>
    </div>
  );
}
