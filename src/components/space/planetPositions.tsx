import * as THREE from "three";

/**
 * World positions of the four project planets (section centre Z = -70),
 * plus the camera focus point used when zooming into each one.
 */
export const PLANET_POS: Record<string, THREE.Vector3> = {
  geoquest: new THREE.Vector3(0, 0, -72),
  drone: new THREE.Vector3(9, 4.5, -66),
  greencart: new THREE.Vector3(-9, 4, -64),
  clubos: new THREE.Vector3(-6, -4.5, -78),
};

export const PLANET_RADIUS: Record<string, number> = {
  geoquest: 3.2,
  drone: 2.2,
  greencart: 2.0,
  clubos: 2.1,
};

/** Camera parks slightly off-planet so the sphere fills ~60% of the frame. */
export const PLANET_FOCUS: Record<string, THREE.Vector3> = Object.fromEntries(
  Object.entries(PLANET_POS).map(([id, p]) => {
    const r = PLANET_RADIUS[id];
    // sit in front of and slightly left of the planet — the detail panel
    // occupies the right side of the screen
    return [id, new THREE.Vector3(p.x + r * 1.1, p.y + r * 0.15, p.z + r * 2.6)];
  }),
);
