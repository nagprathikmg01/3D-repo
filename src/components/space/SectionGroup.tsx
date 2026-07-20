import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/store";

/**
 * Visibility culling for a station: the wrapped content is only rendered
 * while the camera is within `range` world units of `z`. Keeps distant
 * stations' text/glow from bleeding through the fog, and skips their
 * draw calls entirely.
 */
export default function SectionGroup({
  z,
  range = 48,
  children,
}: {
  z: number;
  range?: number;
  children: ReactNode;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    group.current.visible = Math.abs(scrollState.cameraZ - z) < range;
  });

  return <group ref={group}>{children}</group>;
}
