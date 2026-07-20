import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState, useSpaceStore } from "@/lib/store";
import { CAMERA_START_Z, CAMERA_END_Z } from "@/data/portfolio";
import { PLANET_FOCUS } from "./planetPositions";

const MAX_YAW = THREE.MathUtils.degToRad(15);
const MAX_PITCH = THREE.MathUtils.degToRad(8);
const LOOK_LERP = 0.05;
const Z_LERP = 0.075;
const ZOOM_LERP = 0.045;

/**
 * Drives the camera every frame:
 *  - scroll progress → Z position (smoothed)
 *  - mouse → yaw/pitch look-around
 *  - active project → fly to the planet's focus point and back
 */
export default function CameraRig() {
  const camera = useThree((s) => s.camera);
  const zoomT = useRef(0); // 0 = free flight, 1 = locked on planet
  const focus = useRef(new THREE.Vector3());
  const flightPos = useRef(new THREE.Vector3(0, 0, CAMERA_START_Z));
  const snapped = useRef(false);

  useFrame(() => {
    const { activeProject } = useSpaceStore.getState();

    // ── Free-flight position from scroll ──
    const targetZ = CAMERA_START_Z + scrollState.progress * (CAMERA_END_Z - CAMERA_START_Z);
    if (!snapped.current || Math.abs(targetZ - flightPos.current.z) > 40) {
      // first frame or an instant scroll jump (deep link / reload): adopt directly
      flightPos.current.z = targetZ;
      snapped.current = true;
    }
    flightPos.current.z = THREE.MathUtils.lerp(flightPos.current.z, targetZ, Z_LERP);
    scrollState.cameraZ = flightPos.current.z;

    // ── Planet zoom blend ──
    const zoomTarget = activeProject ? 1 : 0;
    zoomT.current = THREE.MathUtils.lerp(zoomT.current, zoomTarget, ZOOM_LERP);
    if (activeProject) {
      const f = PLANET_FOCUS[activeProject];
      if (f) focus.current.copy(f);
    }

    camera.position.lerpVectors(flightPos.current, focus.current, zoomT.current);

    // ── Mouse look (suppressed while zoomed onto a planet) ──
    const lookScale = 1 - zoomT.current;
    const targetYaw = -scrollState.mouseX * MAX_YAW * lookScale;
    const targetPitch = -scrollState.mouseY * MAX_PITCH * lookScale;
    camera.rotation.order = "YXZ";
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetYaw, LOOK_LERP);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetPitch, LOOK_LERP);
  });

  return null;
}
