import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { MorphState } from '../types';
import { useSmoothValue } from '../hooks';

interface ZoomSceneProps {
  morphState: MorphState;
}

function ZoomCamera({ zoomProgress }: { zoomProgress: number }) {
  const { camera } = useThree();
  const smoothZoom = useSmoothValue(zoomProgress, 0.04);

  useFrame(() => {
    const startZ = 8;
    const endZ = -12;
    const z = startZ + (endZ - startZ) * smoothZoom;

    const startY = 1.5;
    const endY = 0;
    const y = startY + (endY - startY) * smoothZoom;

    camera.position.set(0, y, z);

    const lookY = 0.2 - smoothZoom * 0.3;
    camera.lookAt(0, lookY, 0);

    const fov = 50 + smoothZoom * 15;
    (camera as THREE.PerspectiveCamera).fov = fov;
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
  });

  return null;
}

function PhoneModel({ zoomProgress }: { zoomProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const smoothZoom = useSmoothValue(zoomProgress, 0.04);

  useFrame(() => {
    if (!meshRef.current) return;

    const targetScale = 0.4 + smoothZoom * 3;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale * 1.7, targetScale * 0.05),
      0.05
    );

    if (glowRef.current) {
      glowRef.current.intensity = 2 + smoothZoom * 8;
    }
  });

  const screenMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uZoom: { value: 0 },
        uColor1: { value: new THREE.Color('#d4a04a') },
        uColor2: { value: new THREE.Color('#8b5cf6') },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uZoom;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec2 vUv;

        void main() {
          float pulse = sin(uTime * 2.0) * 0.15 + 0.85;
          vec3 color = mix(uColor1, uColor2, vUv.y * 0.5 + 0.25);
          float glow = smoothstep(0.0, 0.5, vUv.y) * pulse;

          float textArea = step(0.35, vUv.y) * step(vUv.y, 0.65);
          float line = smoothstep(0.48, 0.5, vUv.y) * smoothstep(0.52, 0.5, vUv.y);
          float btn = smoothstep(0.2, 0.22, vUv.y) * smoothstep(0.28, 0.26, vUv.y);
          btn *= step(0.3, vUv.x) * step(vUv.x, 0.7);

          float brightness = glow * 0.15 + line * 0.4 + btn * 0.3 + textArea * 0.1;

          gl_FragColor = vec4(color * brightness, 1.0);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    screenMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    screenMaterial.uniforms.uZoom.value = smoothZoom;
  });

  return (
    <group position={[0, 0.2, 0]}>
      {/* Phone body */}
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[1, 1.7, 0.05]} />
        <meshStandardMaterial
          color="#1a1a22"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Phone screen */}
      <mesh position={[0, 0, 0.026]}>
        <planeGeometry args={[0.88, 1.55]} />
        <primitive object={screenMaterial} attach="material" />
      </mesh>

      {/* Screen glow */}
      <pointLight
        ref={glowRef}
        position={[0, 0, 0.5]}
        color="#d4a04a"
        intensity={2}
        distance={5}
        decay={2}
      />

      {/* Bezel highlight */}
      <mesh position={[0, 0.87, 0.026]}>
        <capsuleGeometry args={[0.02, 0.3, 4, 8]} />
        <meshStandardMaterial color="#0a0a0c" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function FloatingParticles({ count = 60, zoomProgress }: { count?: number; zoomProgress: number }) {
  const smoothZoom = useSmoothValue(zoomProgress, 0.04);
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 10,
      y: Math.random() * 6 - 1,
      z: (Math.random() - 0.5) * 10,
      scale: Math.random() * 0.03 + 0.01,
      speed: Math.random() * 0.5 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      const x = p.x + Math.sin(t * p.speed + p.phase) * 0.3;
      const y = p.y + Math.cos(t * p.speed * 0.7 + p.phase) * 0.2 - smoothZoom * 3;
      const z = p.z - smoothZoom * 8;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(p.scale * (1 + smoothZoom * 0.5));
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#d4a04a" transparent opacity={0.4} />
    </instancedMesh>
  );
}

function EnvironmentLighting() {
  return (
    <>
      <ambientLight intensity={0.15} color="#1a1a2e" />
      <pointLight position={[0, 4, 2]} intensity={1.5} color="#d4a04a" distance={12} decay={2} />
      <pointLight position={[-3, 2, -2]} intensity={0.6} color="#8b5cf6" distance={8} decay={2} />
      <pointLight position={[3, 1, -3]} intensity={0.4} color="#3b82f6" distance={6} decay={2} />
      <spotLight
        position={[0, 6, 0]}
        angle={0.6}
        penumbra={0.8}
        intensity={2}
        color="#d4a04a"
        distance={15}
        castShadow
      />
    </>
  );
}

export function ZoomScene({ morphState }: ZoomSceneProps) {
  const { zoomProgress } = morphState;

  return (
    <Canvas
      camera={{ position: [0, 1.5, 8], fov: 50, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'transparent',
      }}
      dpr={[1, 1.5]}
    >
      <fog attach="fog" args={['#0a0a0c', 5, 20]} />

      <EnvironmentLighting />
      <ZoomCamera zoomProgress={zoomProgress} />
      <PhoneModel zoomProgress={zoomProgress} />
      <FloatingParticles zoomProgress={zoomProgress} />
    </Canvas>
  );
}
