import { useMemo } from "react";
import * as THREE from "three";

const vertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, vView)), uPower);
    gl_FragColor = vec4(uColor, fresnel * uIntensity);
  }
`;

/**
 * Fresnel rim-glow shell — wraps a planet in a soft red atmosphere that
 * brightens at the silhouette. BackSide so the halo renders around the limb.
 */
export default function Atmosphere({
  radius,
  color = "#dc2626",
  power = 2.6,
  intensity = 0.9,
  scale = 1.18,
}: {
  radius: number;
  color?: string;
  power?: number;
  intensity?: number;
  scale?: number;
}) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uPower: { value: power },
          uIntensity: { value: intensity },
        },
        transparent: true,
        blending: THREE.NormalBlending,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    [color, power, intensity],
  );

  return (
    <mesh scale={scale} material={material}>
      <sphereGeometry args={[radius, 32, 32]} />
    </mesh>
  );
}
