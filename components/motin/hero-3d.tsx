"use client"

import { Suspense, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  ContactShadows,
  Float,
  useTexture,
} from "@react-three/drei"
import type { Mesh, ShaderMaterial } from "three"
import * as THREE from "three"

function ScenesSphere() {
  const meshRef = useRef<Mesh>(null!)
  const matRef = useRef<ShaderMaterial>(null!)

  const [t1, t2, t3] = useTexture([
    "/orb-scene-1.jpg",
    "/orb-scene-2.jpg",
    "/orb-scene-3.jpg",
  ])
  ;[t1, t2, t3].forEach((t) => {
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 2
  })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      tex1: { value: t1 },
      tex2: { value: t2 },
      tex3: { value: t3 },
      uGold: { value: new THREE.Color("#d4b46a") },
    }),
    [t1, t2, t3],
  )

  useFrame((state, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta
      matRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(state.mouse.x, state.mouse.y),
        0.05,
      )
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.25) * 0.08
    }
  })

  const vertexShader = /* glsl */ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    uniform float uTime;
    uniform vec2 uMouse;

    float hash(vec3 p) {
      p = fract(p * 0.3183099 + 0.1);
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }
    float noise(vec3 x) {
      vec3 i = floor(x);
      vec3 f = fract(x);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
            mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
        mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
            mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
        f.z);
    }

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);

      float n = noise(position * 1.8 + uTime * 0.35);
      float bulge = (n - 0.5) * 0.12;
      bulge += (uMouse.x * normal.x + uMouse.y * normal.y) * 0.04;

      vec3 displaced = position + normal * bulge;

      vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
      vViewDir = normalize(-mvPosition.xyz);
      gl_Position = projectionMatrix * mvPosition;
    }
  `

  const fragmentShader = /* glsl */ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    uniform float uTime;
    uniform sampler2D tex1;
    uniform sampler2D tex2;
    uniform sampler2D tex3;
    uniform vec3 uGold;

    void main() {
      float t = uTime / 5.0;
      float cycle = mod(t, 3.0);
      float idx = floor(cycle);
      float f = fract(cycle);
      float mixF = smoothstep(0.75, 1.0, f);

      vec2 center = vec2(0.5);
      float breath = 1.0 + sin(uTime * 0.4) * 0.02;
      vec2 uv = (vUv - center) / breath + center;

      vec3 aCol, bCol;
      if (idx < 0.5) {
        aCol = texture2D(tex1, uv).rgb;
        bCol = texture2D(tex2, uv).rgb;
      } else if (idx < 1.5) {
        aCol = texture2D(tex2, uv).rgb;
        bCol = texture2D(tex3, uv).rgb;
      } else {
        aCol = texture2D(tex3, uv).rgb;
        bCol = texture2D(tex1, uv).rgb;
      }
      vec3 scene = mix(aCol, bCol, mixF);

      scene = mix(scene, scene * vec3(1.25, 1.08, 0.78), 0.25);

      float fres = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 2.2);
      vec3 rim = uGold * fres * 1.1;

      float vig = smoothstep(0.95, 0.35, distance(vUv, vec2(0.5)));
      scene *= mix(0.75, 1.0, vig);

      vec3 finalCol = scene + rim;

      gl_FragColor = vec4(finalCol, 1.0);
    }
  `

  return (
    <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.55}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.3, 40, 40]} />
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </Float>
  )
}

function OrbitingRing({
  radius = 2.2,
  speed = 0.35,
  tilt = 0.4,
  opacity = 0.25,
}: {
  radius?: number
  speed?: number
  tilt?: number
  opacity?: number
}) {
  const ref = useRef<Mesh>(null!)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed
  })
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.004, 12, 120]} />
      <meshBasicMaterial color="#d4b46a" transparent opacity={opacity} />
    </mesh>
  )
}

export function Hero3D() {
  return (
    <Canvas
      dpr={[0.75, 1.15]}
      camera={{ position: [0, 0, 4.5], fov: 42 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "default",
      }}
      performance={{ min: 0.5 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#fff3d4" />
      <directionalLight
        position={[-4, -2, -3]}
        intensity={0.45}
        color="#7a6535"
      />

      <Suspense fallback={null}>
        <ScenesSphere />
        <OrbitingRing radius={2.05} speed={0.25} tilt={0.35} opacity={0.28} />
        <OrbitingRing radius={2.45} speed={-0.18} tilt={-0.25} opacity={0.18} />
        <OrbitingRing radius={2.85} speed={0.12} tilt={0.6} opacity={0.12} />
        <ContactShadows position={[0, -1.8, 0]} opacity={0.22} scale={7} blur={1.8} far={2.5} color="#000000" />
      </Suspense>
    </Canvas>
  )
}

export default Hero3D
