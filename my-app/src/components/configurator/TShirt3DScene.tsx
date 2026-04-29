"use client";

import { useMemo, Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html, useProgress } from "@react-three/drei";
import { EffectComposer, Vignette, Noise } from "@react-three/postprocessing";
import * as THREE from "three";

/* ── Force camera to correct position on first mount ── */
function CameraRig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, 5.5);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
}

/* ── Loader ── */
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
        gap:10, color:"#8090a8", fontFamily:"Inter,sans-serif" }}>
        <div style={{ width:34, height:34, border:"2px solid rgba(255,255,255,0.07)",
          borderTop:"2px solid #94a3b8", borderRadius:"50%",
          animation:"spin 0.9s linear infinite" }} />
        <span style={{ fontSize:10, letterSpacing:"0.1em" }}>{Math.round(progress)}%</span>
      </div>
    </Html>
  );
}

/* ── Procedural woven normal map ── */
function makeFabricNormalMap() {
  const S = 512;
  const canvas = document.createElement("canvas");
  canvas.width = S; canvas.height = S;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgb(128,128,255)";
  ctx.fillRect(0, 0, S, S);
  const sp = 9;
  for (let i = 0; i < S; i += sp) {
    ctx.fillStyle = `rgba(128,${128+20},255,0.5)`;
    ctx.fillRect(0, i, S, 4);
    ctx.fillStyle = `rgba(${128+20},128,255,0.4)`;
    ctx.fillRect(i, 0, 4, S);
  }
  // Use deterministic pseudo-noise instead of Math.random()
  for (let k = 0; k < 3500; k++) {
    const nx = (Math.sin(k * 127.1) * 0.5 + 0.5) * S;
    const ny = (Math.cos(k * 311.7) * 0.5 + 0.5) * S;
    const v = 128 + (Math.sin(k * 43.7) * 14) | 0;
    ctx.fillStyle = `rgba(${v},${v},255,0.1)`;
    ctx.fillRect(nx, ny, 1, 1);
  }
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(9, 14);
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.magFilter = THREE.LinearFilter;
  t.generateMipmaps = true;
  t.needsUpdate = true;
  return t;
}

/* ── World-position stripe shader material ──
 * Uses vWorldPos in GLSL to draw perfectly straight horizontal or vertical
 * stripes regardless of UV mapping. Base color = user's selected color,
 * alternate color = white. No canvas, no texture, no UV distortion.
 */
function createStripesMaterial(
  hex: string,
  direction: "horizontal" | "vertical",
  normalMap: THREE.Texture
): THREE.MeshPhysicalMaterial {
  const baseCol = toFabric(hex);

  const mat = new THREE.MeshPhysicalMaterial({
    roughness: 0.9,
    metalness: 0,
    normalMap,
    normalScale: new THREE.Vector2(0.72, 0.72),
    sheen: 0.82,
    sheenRoughness: 0.80,
    sheenColor: new THREE.Color("#ffffff"),
    envMapIntensity: 0.06,
    side: THREE.DoubleSide,
    flatShading: false,
    dithering: true,
  });

  const isHorizontal = direction === "horizontal";

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uBaseColor = { value: baseCol };
    shader.uniforms.uFreq     = { value: 9.0 };  // number of stripe pairs
    shader.uniforms.uHoriz    = { value: isHorizontal ? 1.0 : 0.0 };

    // Pass world position from vertex to fragment shader
    shader.vertexShader = `varying vec3 vWPos;\n` + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      `#include <begin_vertex>`,
      `#include <begin_vertex>\n  vWPos = (modelMatrix * vec4(position, 1.0)).xyz;`
    );

    shader.fragmentShader =
      `varying vec3 vWPos;\n` +
      `uniform vec3 uBaseColor;\n` +
      `uniform float uFreq;\n` +
      `uniform float uHoriz;\n` +
      shader.fragmentShader;

    shader.fragmentShader = shader.fragmentShader.replace(
      `#include <color_fragment>`,
      `#include <color_fragment>
        // Use Y for horizontal stripes, X for vertical stripes
        float coord = mix(vWPos.x, vWPos.y, uHoriz);
        // sharp step: 0 = base color, 1 = white
        float stripe = step(0.5, fract(coord * uFreq));
        diffuseColor.rgb = mix(uBaseColor, vec3(1.0), stripe);`
    );
  };

  // Ensure shader recompiles for each unique color+direction combo
  mat.customProgramCacheKey = () => `stripe_${hex}_${direction}`;

  return mat;
}

/* ── Mute color to realistic fabric tone ── */
function toFabric(hex: string) {
  const c = new THREE.Color(hex);
  const hsl = {h:0,s:0,l:0};
  c.getHSL(hsl);
  return new THREE.Color().setHSL(hsl.h, hsl.s * 0.68, Math.min(hsl.l * 0.82, 0.68));
}

/* ── Shirt body geometry — physics-inspired drape ── */
function makeBodyGeo() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.74, -0.86);
  shape.lineTo(0.74, -0.86);
  shape.lineTo(0.76, 0.14);
  shape.bezierCurveTo(0.77, 0.30, 0.70, 0.46, 0.57, 0.56);
  shape.lineTo(0.40, 0.62);
  shape.bezierCurveTo(0.27, 0.68, 0.13, 0.73, 0.0, 0.73);
  shape.bezierCurveTo(-0.13, 0.73, -0.27, 0.68, -0.40, 0.62);
  shape.lineTo(-0.57, 0.56);
  shape.bezierCurveTo(-0.70, 0.46, -0.77, 0.30, -0.76, 0.14);
  shape.lineTo(-0.74, -0.86);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.13, steps: 22,
    bevelEnabled: true, bevelSegments: 5,
    bevelSize: 0.01, bevelThickness: 0.01,
  });

  const pos = geo.attributes.position as THREE.BufferAttribute;
  // Hanger attachment points
  const hLx = -0.40, hLy = 0.62, hRx = 0.40, hRy = 0.62;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    // Normalised height: 0=hem, 1=collar
    const t = Math.min(1, Math.max(0, (y + 0.86) / 1.58));

    // Distance from each hanger attachment — fabric taut near hangers
    const dL = Math.hypot(x - hLx, y - hLy);
    const dR = Math.hypot(x - hRx, y - hRy);
    const taut = Math.exp(-Math.min(dL, dR) * 2.8) * 0.03;

    // Gravity drape — hem swings forward
    const drape = Math.pow(1 - t, 1.8) * 0.044 - taut;

    // Primary crease from shoulder to mid-chest
    const crease1 = Math.sin(x * Math.PI * 1.1 + 0.3) * 0.036 * (1 - t * 0.6);
    // Secondary tighter folds
    const crease2 = Math.sin(x * Math.PI * 3.5 + 0.9) * 0.014 * (1 - t * 0.7);
    // Horizontal tension bands
    const bands   = Math.sin(t * Math.PI * 5.2 + 0.2) * 0.010;
    // Micro surface noise
    const noise   = Math.sin(x * 21.4 + 0.5) * Math.cos(y * 15.8 + 0.3) * 0.005;
    // Slight hem flare outward
    const hemFlare = Math.pow(Math.max(0, 0.15 - t), 2) * Math.sign(x) * x * 0.055;

    pos.setX(i, x + hemFlare);
    pos.setZ(i, z + drape + crease1 + crease2 + bands + noise);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  geo.center();
  return geo;
}

/* ── Sleeve geometry with fold ── */
function makeSleeveGeo() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.1, -0.02, 0.38, -0.02, 0.49, 0.04);
  shape.bezierCurveTo(0.53, 0.14, 0.49, 0.38, 0.44, 0.45);
  shape.bezierCurveTo(0.28, 0.48, 0.04, 0.44, -0.04, 0.41);
  shape.bezierCurveTo(-0.04, 0.26, -0.02, 0.1, 0, 0);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.10, steps: 7,
    bevelEnabled: true, bevelSegments: 3, bevelSize: 0.01, bevelThickness: 0.01,
  });
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const u = (pos.getX(i) + 0.04) / 0.53;
    const v = Math.max(0, pos.getY(i)) / 0.45;
    // Use deterministic noise: sin/cos of index instead of Math.random()
    const deterministicNoise = Math.sin(i * 17.3 + 2.1) * 0.003;
    pos.setZ(i, pos.getZ(i)
      + Math.sin(v * Math.PI) * 0.022
      + Math.sin(u * Math.PI * 2.2) * 0.009
      + deterministicNoise);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  geo.center();
  return geo;
}

/* ── Wooden hanger ── */
function WoodenHanger() {
  const wood = "#5C3317";
  const woodDark = "#3d2210";

  const armGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.88, -0.26, 0),
      new THREE.Vector3(-0.44, 0.00, 0),
      new THREE.Vector3(0, 0.20, 0),
      new THREE.Vector3(0.44, 0.00, 0),
      new THREE.Vector3(0.88, -0.26, 0),
    ]);
    return new THREE.TubeGeometry(curve, 48, 0.028, 12, false);
  }, []);

  const hookGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.20, 0),
      new THREE.Vector3(0.04, 0.34, 0),
      new THREE.Vector3(0.10, 0.41, 0.01),
      new THREE.Vector3(0.09, 0.49, 0.02),
      new THREE.Vector3(0.03, 0.53, 0.015),
      new THREE.Vector3(-0.02, 0.51, 0),
    ]);
    return new THREE.TubeGeometry(curve, 28, 0.014, 10, false);
  }, []);

  // Small end caps
  const woodMat = <meshStandardMaterial color={wood} roughness={0.72} metalness={0.04} />;

  return (
    <group position={[0, 0.66, 0]}>
      {/* Main arm */}
      <mesh geometry={armGeo} castShadow>{woodMat}</mesh>
      {/* Darker wood grain lines (thin tubes) */}
      {([-0.55, -0.22, 0.14, 0.48] as number[]).map((x) => (
        <mesh key={x} position={[x, x * -0.14, 0.025]}>
          <sphereGeometry args={[0.006, 6, 6]} />
          <meshStandardMaterial color={woodDark} roughness={0.85} metalness={0} />
        </mesh>
      ))}
      {/* Chrome hook */}
      <mesh geometry={hookGeo} castShadow>
        <meshStandardMaterial color="#8898aa" metalness={0.86} roughness={0.16} />
      </mesh>
      {/* Hook tip cap */}
      <mesh position={[-0.02, 0.51, 0]}>
        <sphereGeometry args={[0.015, 10, 10]} />
        <meshStandardMaterial color="#8898aa" metalness={0.86} roughness={0.16} />
      </mesh>
    </group>
  );
}

/* ── T-Shirt model ── */
function TShirtModel({ color, pattern, addons }: {
  color: string; pattern: "plain" | "h-stripes" | "v-stripes"; addons: string[];
}) {
  const bodyGeo  = useMemo(() => makeBodyGeo(), []);
  const slvGeo   = useMemo(() => makeSleeveGeo(), []);
  const normalMap = useMemo(() => makeFabricNormalMap(), []);
  const hasLogo  = addons.includes("logo");
  const fabric   = toFabric(color);

  // Plain fabric material — imperative so we can swap with stripes
  const plainMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: toFabric(color),
    roughness: 0.9,
    metalness: 0,
    normalMap,
    normalScale: new THREE.Vector2(0.72, 0.72),
    sheen: 0.82,
    sheenRoughness: 0.80,
    sheenColor: new THREE.Color(toFabric(color)).multiplyScalar(1.5),
    envMapIntensity: 0.06,
    side: THREE.DoubleSide,
    flatShading: false,
    dithering: true,
  }), [color, normalMap]);

  // Stripe material via world-position shader — only built when stripes active
  const stripesMat = useMemo(() => {
    if (pattern === "h-stripes") return createStripesMaterial(color, "horizontal", normalMap);
    if (pattern === "v-stripes") return createStripesMaterial(color, "vertical",   normalMap);
    return null;
  }, [pattern, color, normalMap]);

  // Active material shared by body + sleeves
  const bodyMat = stripesMat ?? plainMat;

  return (
    <group position={[0, -0.18, 0]}>
      <WoodenHanger />

      {/* Body */}
      <mesh castShadow receiveShadow geometry={bodyGeo} position={[0, -0.04, 0]} material={bodyMat} />
      {/* Left sleeve */}
      <mesh castShadow geometry={slvGeo} position={[-0.65, 0.35, 0]} rotation={[0, 0.15, 0.28]} material={bodyMat} />
      {/* Right sleeve */}
      <mesh castShadow geometry={slvGeo} position={[0.65, 0.35, 0]} rotation={[0, -0.15, -0.28]} scale={[-1, 1, 1]} material={bodyMat} />

      {/* Collar band — always uses plain fabric tone */}
      <mesh castShadow position={[0, 0.68, 0.04]}>
        <torusGeometry args={[0.246, 0.04, 16, 40, Math.PI * 1.65]} />
        <meshPhysicalMaterial
          color={new THREE.Color(fabric).multiplyScalar(0.70)}
          roughness={0.96} metalness={0}
          sheen={0.25} sheenRoughness={0.9}
          sheenColor={new THREE.Color(fabric).multiplyScalar(0.85)}
        />
      </mesh>

      {/* Logo addon */}
      {hasLogo && (
        <mesh position={[0, 0.14, 0.084]}>
          <circleGeometry args={[0.16, 32]} />
          <meshStandardMaterial color="white" roughness={0.65} transparent opacity={0.4} />
        </mesh>
      )}
      {/* Hem stitch */}
      <mesh position={[0, -0.47, 0.08]}>
        <planeGeometry args={[1.38, 0.014]} />
        <meshStandardMaterial
          color={new THREE.Color(fabric).multiplyScalar(0.52)}
          roughness={0.97} transparent opacity={0.48} side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* ── Studio — clean, minimal ── */
function Studio() {
  return (
    <>
      {/* Seamless backdrop */}
      <mesh position={[0, 1.5, -2.4]} receiveShadow>
        <planeGeometry args={[22, 14]} />
        <meshStandardMaterial color="#111318" roughness={1} metalness={0} />
      </mesh>
      {/* Floor — clean, no distracting discs */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -1.68, 0]} receiveShadow>
        <planeGeometry args={[22, 18]} />
        <meshStandardMaterial color="#0e1016" roughness={0.97} metalness={0} />
      </mesh>
    </>
  );
}

/* ── Main Export ── */
export default function TShirt3DScene({ color, pattern, addons }: {
  color: string;
  pattern: "plain" | "h-stripes" | "v-stripes";
  addons: string[];
}) {
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
        camera={{ position: [0, 0, 5.5], fov: 50, near: 0.1, far: 100 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.18, outputColorSpace: THREE.SRGBColorSpace, precision: "highp" }}>
        <Suspense fallback={<Loader />}>
          {/* Balanced ambient light for base illumination */}
          <ambientLight intensity={1.2} color="#ffffff" />
          {/* Directional light for highlights, avoiding harshness */}
          <directionalLight castShadow
            position={[-3, 5, 4]} intensity={1.8} color="#ffffff"
            shadow-mapSize={[1024, 1024]} shadow-camera-far={20}
            shadow-camera-left={-3} shadow-camera-right={3}
            shadow-camera-top={4.5} shadow-camera-bottom={-4} />
          {/* Soft fill light to ensure uniform lighting */}
          <directionalLight position={[3, 3, 2]} intensity={0.8} color="#f4f6ff" />
          {/* Rim light from behind to add depth and eliminate banding */}
          <directionalLight position={[-1, 4, -4]} intensity={0.5} color="#e0e8ff" />

          {/* Very low env intensity — fabric doesn't reflect chrome-like */}
          <Environment preset="warehouse" background={false} environmentIntensity={0.04} />

          <Studio />
          <ContactShadows
            position={[0, -1.66, 0]} opacity={0.5}
            scale={6} blur={4.5} far={2.2} color="#010208"
          />

          <CameraRig />
          <TShirtModel color={color} pattern={pattern} addons={addons} />

          <OrbitControls
            enablePan={false} minDistance={2.5} maxDistance={12}
            minPolarAngle={Math.PI/9} maxPolarAngle={Math.PI/1.75}
            autoRotate autoRotateSpeed={0.38}
            target={[0, 0, 0]}
          />

          <EffectComposer multisampling={8}>
            {/* Very subtle noise acts as a manual dither to break up 8-bit gradient banding */}
            <Noise opacity={0.025} />
            <Vignette darkness={0.32} offset={0.35} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
