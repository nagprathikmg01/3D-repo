import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { ScrollTrigger } from "@/lib/gsap";
import { scrollState, useSpaceStore } from "@/lib/store";
import { CAMERA_START_Z, CAMERA_END_Z, SECTIONS, SCROLL_PER_UNIT, VIEW_OFFSET } from "@/data/portfolio";

import CameraRig from "./CameraRig";
import StarField from "./StarField";
import DeepSpace from "./DeepSpace";
import SectionGroup from "./SectionGroup";
import NameTitle from "./NameTitle";
import StatsConstellation from "./StatsConstellation";
import SkillAsteroids from "./SkillAsteroids";
import ProjectPlanets from "./ProjectPlanets";
import ExperienceNebula from "./ExperienceNebula";
import EducationStation from "./EducationStation";
import ContactPortal from "./ContactPortal";

/** Wires window scroll + mouse into the mutable scrollState (no re-renders). */
function useFlightControls() {
  const setSection = useSpaceStore((s) => s.setSection);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      scrub: true,
      onUpdate: (self) => {
        scrollState.progress = self.progress;
        // nearest station (camera parks VIEW_OFFSET in front of each) → minimap highlight
        const z = CAMERA_START_Z + self.progress * (CAMERA_END_Z - CAMERA_START_Z);
        let current = SECTIONS[0].id as string;
        let best = Infinity;
        for (const s of SECTIONS) {
          const d = Math.abs(z - (s.z + VIEW_OFFSET));
          if (d < best) {
            best = d;
            current = s.id;
          }
        }
        setSection(current);
      },
    });

    const onMouse = (e: MouseEvent) => {
      scrollState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouse);

    // deep-link: ?fly=<section id> jumps straight to that station
    const fly = new URLSearchParams(window.location.search).get("fly");
    const target = SECTIONS.find((s) => s.id === fly);
    if (target) {
      requestAnimationFrame(() => {
        window.scrollTo(0, Math.max(0, (CAMERA_START_Z - (target.z + VIEW_OFFSET)) * SCROLL_PER_UNIT));
        ScrollTrigger.refresh();
      });
    }

    return () => {
      st.kill();
      window.removeEventListener("mousemove", onMouse);
    };
  }, [setSection]);
}

export default function SpaceScene() {
  useFlightControls();
  // escape hatch for weak GPUs / software rendering: ?nofx disables postprocessing
  const fx = !new URLSearchParams(window.location.search).has("nofx");

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ fov: 75, near: 0.1, far: 120, position: [0, 0, CAMERA_START_Z] }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor("#FCFAF6");
          scene.fog = new THREE.FogExp2("#FCFAF6", 0.008);
          useSpaceStore.getState().setSceneLoaded(true);
        }}
      >
        <CameraRig />
        <ambientLight intensity={0.6} />
        {/* terracotta key light raking across surfaces for definition */}
        <directionalLight position={[6, 8, 4]} intensity={0.4} color="#9E4733" />
        <directionalLight position={[-8, -4, -6]} intensity={0.2} color="#E0DDD9" />

        <Suspense fallback={null}>
          <StarField />
          <DeepSpace />
          <SectionGroup z={0} range={40}>
            <NameTitle />
          </SectionGroup>
          <SectionGroup z={-20} range={26}>
            <StatsConstellation />
          </SectionGroup>
          <SectionGroup z={-40} range={36}>
            <SkillAsteroids />
          </SectionGroup>
          <SectionGroup z={-70} range={50}>
            <ProjectPlanets />
          </SectionGroup>
          <SectionGroup z={-100} range={44}>
            <ExperienceNebula />
          </SectionGroup>
          <SectionGroup z={-130} range={40}>
            <EducationStation />
          </SectionGroup>
          <SectionGroup z={-160} range={34}>
            <ContactPortal />
          </SectionGroup>
        </Suspense>

        {fx && (
          <EffectComposer multisampling={0}>
            <Bloom luminanceThreshold={0.18} intensity={1.15} radius={0.55} mipmapBlur />
            <ChromaticAberration offset={[0.0007, 0.0007]} radialModulation modulationOffset={0.35} />
            <Vignette darkness={0.62} offset={0.28} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
