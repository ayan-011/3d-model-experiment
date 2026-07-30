"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { ScrollRig } from "./ScrollRig";

function Loader() {
  return null;
}

export function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 32, near: 0.1, far: 100, position: [0, 0, 7.5] }}
      className="!fixed !inset-0 !h-screen !w-screen"
    >
      <color attach="background" args={["#0a0b0d"]} />
      <fog attach="fog" args={["#0a0b0d", 6, 14]} />

      <ambientLight intensity={0.15} color="#3a4048" />

      {/* warm key light, raking across the barrel */}
      <spotLight
        position={[3.5, 4, 4]}
        angle={0.35}
        penumbra={0.6}
        intensity={4.5}
        color="#e0ac5f"
        castShadow
      />

      {/* cold rim light for the steel edge */}
      <pointLight position={[-4, -1, -3]} intensity={3} color="#5c7a94" />

      {/* subtle fill from below so the underside isn't pure black */}
      <pointLight position={[0, -3, 2]} intensity={0.6} color="#b8863f" />

      <Suspense fallback={<Loader />}>
        <ScrollRig />
        <Environment preset="city" environmentIntensity={0.35} />
        <ContactShadows
          position={[0, -2.4, 0]}
          opacity={0.5}
          scale={12}
          blur={2.4}
          far={4}
          color="#000000"
        />
      </Suspense>
    </Canvas>
  );
}
