import * as THREE from "three";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, OrbitControls } from "@react-three/drei";

function Crystal() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Automatic smooth rotation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      
      // Slight floating animation
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.15;
      
      // Mouse movement reaction (lerp position towards pointer coordinates)
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, state.pointer.x * 0.6, 0.1);
      meshRef.current.position.y += THREE.MathUtils.lerp(0, state.pointer.y * 0.6, 0.1);
    }
  });

  return (
    <group>
      {/* Central Morphing Core */}
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshPhysicalMaterial
          color="#3b82f6"
          emissive="#7c3aed"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.6}
          thickness={1.5}
        />
      </mesh>

      {/* Outer Glow Wireframe Ring */}
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[1.54, 0]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
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
          
          <Crystal />
          
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
