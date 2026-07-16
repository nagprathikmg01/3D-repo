import * as THREE from "three";
import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, OrbitControls } from "@react-three/drei";

// ── CONFIG ──────────────────────────────────────────────────
const LAYERS = [4, 6, 6, 5, 3];   // neurons per layer
const LAYER_GAP = 2.2;             // horizontal spacing (was 1.4)
const NEURON_RADIUS = 0.15;        // scaled up slightly (was 0.12)
const COLORS = {
  neuron_idle:   0x0d2137,   /* dark navy */
  neuron_active: 0x0ea5e9,   /* sky blue */
  neuron_fired:  0xf59e0b,   /* gold flash */
  connection:    0x0a1929,   /* very dark blue */
  signal:        0x0d9488,   /* teal signal */
  output:        0xf59e0b,   /* gold output */
};

interface Neuron {
  mesh: THREE.Mesh;
  ring: THREE.Mesh;
  mat: THREE.MeshStandardMaterial;
  layer: number;
  index: number;
  position: THREE.Vector3;
  firing: boolean;
  fireTimer: number;
}

interface Connection {
  line: THREE.Line;
  lineMat: THREE.LineBasicMaterial;
  from: Neuron;
  to: Neuron;
}

interface SignalParticle {
  mesh: THREE.Mesh;
  mat: THREE.MeshBasicMaterial;
  from: THREE.Vector3;
  to: THREE.Vector3;
  progress: number;
  speed: number;
  connection: Connection;
}

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const neuronsRef = useRef<Neuron[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const signalParticlesRef = useRef<SignalParticle[]>([]);
  
  const waveTimerRef = useRef<number>(0);
  const currentWaveLayerRef = useRef<number>(0);

  // Build the network once on mount
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    // Clear any existing children
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const neurons: Neuron[] = [];
    const connections: Connection[] = [];

    // Create neurons per layer
    LAYERS.forEach((count, layerIdx) => {
      const layerNeurons: Neuron[] = [];
      const totalHeight = (count - 1) * 1.0;

      for (let i = 0; i < count; i++) {
        const geo = new THREE.SphereGeometry(NEURON_RADIUS, 16, 16);
        const mat = new THREE.MeshStandardMaterial({
          color: layerIdx === LAYERS.length - 1 ? COLORS.output : COLORS.neuron_idle,
          emissive: new THREE.Color(0x000000),
          emissiveIntensity: 0,
          roughness: 0.3,
          metalness: 0.7,
          transparent: true,
          opacity: 0.7,
        });
        const mesh = new THREE.Mesh(geo, mat);

        // Position: center the network
        const x = (layerIdx - (LAYERS.length - 1) / 2) * LAYER_GAP;
        const y = i * 1.0 - totalHeight / 2;
        const z = (Math.random() - 0.5) * 0.3; // slight z depth
        mesh.position.set(x, y, z);

        group.add(mesh);

        // Glow ring around each neuron
        const ringGeo = new THREE.TorusGeometry(NEURON_RADIUS * 1.8, 0.008, 8, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x0ea5e9,
          transparent: true,
          opacity: 0.0,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(mesh.position);
        group.add(ring);

        const neuron: Neuron = {
          mesh,
          ring,
          mat,
          layer: layerIdx,
          index: i,
          position: mesh.position.clone(),
          firing: false,
          fireTimer: 0,
        };
        layerNeurons.push(neuron);
        neurons.push(neuron);
      }

      // Connect to previous layer
      if (layerIdx > 0) {
        const prevLayer = neurons.filter((n) => n.layer === layerIdx - 1);
        layerNeurons.forEach((to) => {
          prevLayer.forEach((from) => {
            const points = [from.position, to.position];
            const geo = new THREE.BufferGeometry().setFromPoints(points);
            const mat = new THREE.LineBasicMaterial({
              color: COLORS.connection,
              transparent: true,
              opacity: 0.15,
            });
            const line = new THREE.Line(geo, mat);
            group.add(line);
            connections.push({
              line,
              lineMat: mat,
              from,
              to,
            });
          });
        });
      }
    });

    neuronsRef.current = neurons;
    connectionsRef.current = connections;

    // Cleanup on unmount
    return () => {
      signalParticlesRef.current.forEach((s) => {
        if (group) group.remove(s.mesh);
      });
      signalParticlesRef.current = [];
    };
  }, []);

  // Firing wave function
  const triggerWave = () => {
    const group = groupRef.current;
    if (!group) return;

    const currentWaveLayer = currentWaveLayerRef.current;
    const layerNeurons = neuronsRef.current.filter((n) => n.layer === currentWaveLayer);
    layerNeurons.forEach((n) => {
      n.firing = true;
      n.fireTimer = 0;
    });

    // Create signals on connections from this layer
    connectionsRef.current
      .filter((c) => c.from.layer === currentWaveLayer)
      .forEach((c) => {
        const geo = new THREE.SphereGeometry(0.05, 8, 8);
        const mat = new THREE.MeshBasicMaterial({
          color: COLORS.signal,
          transparent: true,
          opacity: 0.9,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(c.from.position);
        group.add(mesh);

        signalParticlesRef.current.push({
          mesh,
          mat,
          from: c.from.position,
          to: c.to.position,
          progress: 0,
          speed: 0.008 + Math.random() * 0.006,
          connection: c,
        });
      });

    currentWaveLayerRef.current = (currentWaveLayer + 1) % LAYERS.length;
  };

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const d = Math.min(delta, 0.1); // prevent giant jumps on tab blur
    waveTimerRef.current += d;
    if (waveTimerRef.current > 0.35) {
      waveTimerRef.current = 0;
      triggerWave();
    }

    // Rotate entire network slowly
    group.rotation.y += 0.003;
    group.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;

    // Mouse parallax tracking
    group.rotation.y += state.pointer.x * 0.01;
    group.rotation.x += -state.pointer.y * 0.01;

    // Update neuron fire states
    neuronsRef.current.forEach((n) => {
      if (n.firing) {
        n.fireTimer += d;
        const t = Math.min(n.fireTimer / 0.5, 1);

        // Pulse color sky blue → gold → back
        n.mat.emissive.setHex(0x0ea5e9);
        n.mat.emissiveIntensity = t < 0.5 ? t * 2 : (1 - t) * 2;
        n.mat.color.setHex(t < 0.5 ? 0x0ea5e9 : 0xf59e0b);

        // Ring glow
        const ringMat = n.ring.material as THREE.MeshBasicMaterial;
        ringMat.opacity = (1 - t) * 0.8;

        if (n.fireTimer > 0.6) {
          n.firing = false;
          n.mat.emissiveIntensity = 0;
          n.mat.color.setHex(
            n.layer === LAYERS.length - 1 ? COLORS.output : COLORS.neuron_idle
          );
          ringMat.opacity = 0;
        }
      }
    });

    // Update signal particles
    const signalParticles = signalParticlesRef.current;
    for (let i = signalParticles.length - 1; i >= 0; i--) {
      const s = signalParticles[i];
      s.progress += s.speed;

      // Lerp position from → to
      s.mesh.position.lerpVectors(s.from, s.to, s.progress);

      // Fade out near end
      s.mat.opacity = s.progress > 0.8 ? (1 - s.progress) * 5 : 0.9;

      if (s.progress >= 1) {
        // Trigger target neuron to fire
        s.connection.to.firing = true;
        s.connection.to.fireTimer = 0;
        group.remove(s.mesh);
        signalParticles.splice(i, 1);
      }
    }
  });

  return <group ref={groupRef} />;
}

function NetworkLights() {
  const blueLightRef = useRef<THREE.PointLight>(null);
  const purpleLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (blueLightRef.current) {
      blueLightRef.current.position.x = Math.cos(t * 0.7) * 4;
      blueLightRef.current.position.z = Math.sin(t * 0.7) * 4;
    }
    if (purpleLightRef.current) {
      purpleLightRef.current.position.x = Math.cos(t * 0.5 + Math.PI) * 4;
      purpleLightRef.current.position.z = Math.sin(t * 0.5 + Math.PI) * 3;
    }
  });

  return (
    <>
      <ambientLight color="#0a0a1a" intensity={1} />
      <pointLight ref={blueLightRef} position={[3, 2, 3]} intensity={3} color="#0ea5e9" distance={10} />
      <pointLight ref={purpleLightRef} position={[-3, -2, -2]} intensity={2} color="#0d9488" distance={10} />
      <pointLight position={[0, 3, 1]} intensity={1.5} color="#f59e0b" distance={8} />
    </>
  );
}

export default function HeroThree({ className = "w-full h-full" }: { className?: string }) {
  return (
    <div className={`${className} relative`}>
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-dashed border-primaryBlue animate-spin" />
        </div>
      }>
        <Canvas camera={{ position: [0, 0, 7], fov: 65 }}>
          <NetworkLights />
          <NeuralNetwork />

          {/* Neural Network Sparkles Swarm */}
          <Sparkles
            count={120}
            scale={4.5}
            size={3.5}
            speed={0.4}
            color="#38bdf8"
          />
          <Sparkles
            count={60}
            scale={5}
            size={2}
            speed={0.2}
            color="#f59e0b"
          />

          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </Suspense>
    </div>
  );
}
