"use client";

import { useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls, Environment, ContactShadows,
  MeshReflectorMaterial, Html, useProgress,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
        gap: 12, color: "#94a3b8", fontFamily: "Inter,sans-serif" }}>
        <div style={{ width: 40, height: 40, border: "3px solid rgba(59,130,246,0.2)",
          borderTop: "3px solid #3b82f6", borderRadius: "50%",
          animation: "spin 0.8s linear infinite" }} />
        <span style={{ fontSize: 11, letterSpacing: "0.1em" }}>LOADING · {Math.round(progress)}%</span>
      </div>
    </Html>
  );
}

function SofaModel({ color, size }: { color: string; size: string }) {
  const is3 = size === "3-seater" || size === "l-shape";
  const cushions = is3 ? 3 : 2;
  const W = is3 ? 4.2 : 3.0;
  const cW = (W - 0.7) / cushions;

  // Create a rounded cushion geometry using sphere-based approach
  const cushionGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.5, 32, 24);
    geo.scale(cW * 0.88, 0.36, 0.86);
    return geo;
  }, [cW]);

  const mat = (brightness: number, r = 0.82) => (
    <meshStandardMaterial
      color={new THREE.Color(color).multiplyScalar(brightness)}
      roughness={r} metalness={0.02} envMapIntensity={0.5}
    />
  );

  return (
    <group position={[0, 0.4, 0]}>
      {/* Legs */}
      {([-W / 2 + 0.24, W / 2 - 0.24] as number[]).flatMap((x) =>
        ([-0.74, 0.74] as number[]).map((z) => (
          <mesh key={`${x}-${z}`} castShadow position={[x, -0.38, z]}>
            <cylinderGeometry args={[0.046, 0.06, 0.34, 12]} />
            <meshStandardMaterial color={new THREE.Color(color).multiplyScalar(0.38)}
              roughness={0.45} metalness={0.12} />
          </mesh>
        ))
      )}

      {/* Base skirt */}
      <mesh castShadow receiveShadow position={[0, -0.16, 0]}>
        <boxGeometry args={[W, 0.24, 1.7]} />
        {mat(0.68)}
      </mesh>
      {/* Base front bevel */}
      <mesh position={[0, -0.16, 0.86]}>
        <cylinderGeometry args={[0.12, 0.12, 0.24, 16, 1, false, 0, Math.PI]} />
        {mat(0.65)}
      </mesh>

      {/* Seat cushions — sphere-scaled for softness */}
      {Array.from({ length: cushions }).map((_, i) => {
        const x = -W / 2 + 0.35 + cW / 2 + i * cW;
        return (
          <group key={i}>
            <mesh castShadow geometry={cushionGeo} position={[x, 0.1, 0]}>
              {mat(0.87, 0.78)}
            </mesh>
            {/* Cushion piping (seam) */}
            <mesh position={[x, 0.08, 0]}>
              <torusGeometry args={[cW * 0.42, 0.015, 8, 48, Math.PI * 2]} />
              <meshStandardMaterial color={new THREE.Color(color).multiplyScalar(0.6)}
                roughness={0.9} metalness={0} />
            </mesh>
          </group>
        );
      })}

      {/* Back cushions */}
      {Array.from({ length: cushions }).map((_, i) => {
        const x = -W / 2 + 0.35 + cW / 2 + i * cW;
        return (
          <mesh key={i} castShadow position={[x, 0.5, -0.72]} rotation={[-0.12, 0, 0]}>
            <sphereGeometry args={[0.5, 32, 24]} />
            <meshStandardMaterial
              color={new THREE.Color(color).multiplyScalar(0.84)}
              roughness={0.8} metalness={0.02} />
          </mesh>
        );
      })}

      {/* Backrest frame */}
      <mesh castShadow position={[0, 0.46, -0.76]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[W, 0.7, 0.32]} />
        {mat(0.8)}
      </mesh>
      {/* Backrest top rail */}
      <mesh castShadow position={[0, 0.86, -0.74]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[W, 0.14, 0.22]} />
        {mat(0.88)}
      </mesh>

      {/* Armrests */}
      {([-1, 1] as number[]).map((s) => (
        <group key={s} position={[(W / 2 - 0.22) * s, 0.22, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.68, 1.74]} />
            {mat(0.72)}
          </mesh>
          {/* Armrest top — rounded */}
          <mesh castShadow position={[0, 0.38, 0]}>
            <sphereGeometry args={[0.5, 24, 16]} />
            <meshStandardMaterial
              color={new THREE.Color(color).multiplyScalar(0.9)}
              roughness={0.72} metalness={0.02} />
          </mesh>
        </group>
      ))}

      {/* Throw pillows */}
      {([[is3 ? -1.25 : -0.62, 0.4, -0.5], [is3 ? 1.25 : 0.62, 0.4, -0.5]] as number[][]).map(([x, y, z], i) => (
        <mesh key={i} castShadow
          position={[x, y, z]}
          rotation={[0.15 * (i === 0 ? 1 : -1), i === 0 ? 0.18 : -0.18, 0.18 * (i === 0 ? 1 : -1)]}>
          <sphereGeometry args={[0.32, 24, 18]} />
          <meshStandardMaterial
            color={new THREE.Color(color).multiplyScalar(1.22)}
            roughness={0.72} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}

function LivingRoomFloor() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <MeshReflectorMaterial blur={[400, 100]} resolution={512}
          mixBlur={1} mixStrength={45} roughness={0.94}
          depthScale={1} minDepthThreshold={0.4} maxDepthThreshold={1.4}
          color="#0c0f1a" metalness={0.35} mirror={0} />
      </mesh>
      {/* Area rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]} receiveShadow>
        <planeGeometry args={[7.2, 3.8]} />
        <meshStandardMaterial color="#151c2e" roughness={1.0} metalness={0} />
      </mesh>
    </>
  );
}

export default function Sofa3DScene({ color, size }: { color: string; size: string }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      cursor: "grab",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        shadows dpr={[1, 2]}
        camera={{ position: [5, 3.0, 5], fov: 40, near: 0.1, far: 100 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.38} />
          <directionalLight castShadow position={[6, 14, 6]} intensity={2.2}
            shadow-mapSize={[2048, 2048]} shadow-camera-far={30}
            shadow-camera-left={-7} shadow-camera-right={7}
            shadow-camera-top={7} shadow-camera-bottom={-7} />
          <directionalLight position={[-5, 7, -4]} intensity={0.7} color="#6080ff" />
          <pointLight position={[0, 5, 2]} intensity={0.8} />

          <Environment preset="apartment" background={false} />
          <LivingRoomFloor />
          <ContactShadows position={[0, 0.01, 0]} opacity={0.65}
            scale={14} blur={2.5} far={4} color="#000306" />

          <SofaModel color={color} size={size} />

          <OrbitControls enablePan={false} minDistance={3.5} maxDistance={12}
            minPolarAngle={Math.PI / 10} maxPolarAngle={Math.PI / 2.1}
            autoRotate autoRotateSpeed={0.5} makeDefault />

          <EffectComposer>
            <Bloom luminanceThreshold={0.7} intensity={0.4} mipmapBlur />
            <Vignette darkness={0.4} offset={0.28} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
