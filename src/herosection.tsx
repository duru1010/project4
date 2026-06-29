
"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

/* =========================================================
   MOUSE-SENSITIVE CUBE
========================================================= */
function FloatingCube({
  position,
  rotation,
  scale = 1,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const hovered = useRef(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      position[1] + Math.sin(time * 1.5 + position[0]) * 0.2,
      0.05
    );

    if (hovered.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, position[0] + state.mouse.x * 2, 0.08);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, position[2] + 1, 0.08);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, rotation[0] + state.mouse.y, 0.08);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, rotation[1] + state.mouse.x, 0.08);
      meshRef.current.scale.lerp(new THREE.Vector3(scale * 1.3, scale * 1.3, scale * 1.3), 0.08);
    } else {
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, position[0], 0.08);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, position[2], 0.08);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, rotation[0], 0.08);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, rotation[1], 0.08);
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.08);
    }
    meshRef.current.rotation.z += 0.002;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow
      onPointerOver={() => { hovered.current = true; document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { hovered.current = false; document.body.style.cursor = "default"; }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={1} emissive="#a855f7" emissiveIntensity={0.2} />
    </mesh>
  );
}

/* =========================================================
   3D SCENE
========================================================= */
function CubesScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, isMobile ? 14 : 10], fov: isMobile ? 65 : 50 }}>
        <PerspectiveCamera makeDefault position={[0, 0, isMobile ? 14 : 10]} fov={isMobile ? 65 : 50} />
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#d8b4fe" castShadow />
        <spotLight position={[-10, 10, 10]} angle={0.2} penumbra={1} intensity={1.2} color="#ffffff" castShadow />

        <Suspense fallback={null}>
          {!isMobile ? (
            <>
              <FloatingCube position={[4, 2, 0]} rotation={[0.4, 0.2, 0.5]} scale={1.4} />
              <FloatingCube position={[6, 0, -2]} rotation={[1.1, 0.4, 0.2]} scale={1.1} />
              <FloatingCube position={[3, -2.5, 1]} rotation={[0.2, 1.2, 0.8]} scale={1.3} />
              <FloatingCube position={[7, 3, -3]} rotation={[0, 0, 0]} scale={0.8} />
              <FloatingCube position={[8, -2, -1]} rotation={[0.5, 0.5, 0.5]} scale={0.9} />
              <FloatingCube position={[2, 0.5, -2]} rotation={[0.8, 0.1, 0.4]} scale={0.6} />
            </>
          ) : (
           <>
  <FloatingCube
    position={[1.5, 2.5, 0]}
    rotation={[0.4, 0.2, 0.5]}
    scale={0.9}
  />

  <FloatingCube
    position={[3.5, 1, -2]}
    rotation={[1.1, 0.4, 0.2]}
    scale={0.8}
  />

  <FloatingCube
    position={[-2.5, 0, 1]}
    rotation={[0.2, 1.2, 0.8]}
    scale={0.8}
  />

  <FloatingCube
    position={[2.5, 3.5, -3]}
    rotation={[0, 0, 0]}
    scale={0.7}
  />

  <FloatingCube
    position={[-3, 2, -1]}
    rotation={[0.5, 0.5, 0.5]}
    scale={0.75}
  />

  <FloatingCube
    position={[0, -1, -2]}
    rotation={[0.8, 0.1, 0.4]}
    scale={0.65}
  />
</>
          )}
          <Environment preset="city" />
          <ContactShadows position={[0, -4, 0]} opacity={0.2} scale={20} blur={2.5} far={5} color="#7e22ce" />
        </Suspense>
      </Canvas>
    </div>
  );
}

/* =========================================================
   LANDING PAGE
========================================================= */
export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover">
        <source src="/WhatsApp Video 2026-06-29 at 1.38.20 PM.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 h-[500px] w-[500px] md:h-[900px] md:w-[900px] rounded-full bg-purple-500/20 blur-[180px]" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-blue-400/20 blur-[150px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:45px_45px]" />

      {/* NAVBAR */}
      <nav className="fixed top-6 left-1/2 z-50 flex w-[95%] md:w-[90%] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-xl">
        <div className="text-lg font-bold text-white">JMKC</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-white">
          <a href="#" className="transition hover:text-purple-300">About Us</a>
          <a href="#" className="transition hover:text-purple-300">Career</a>
          <a href="#" className="transition hover:text-purple-300">Contact Us</a>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-2xl">☰</button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-24 left-1/2 z-50 w-[90%] -translate-x-1/2 rounded-3xl border border-white/20 bg-black/70 p-6 backdrop-blur-xl md:hidden">
          <div className="flex flex-col items-center gap-5 text-white">
            <a href="#" onClick={() => setMenuOpen(false)} className="hover:text-purple-300">About Us</a>
            <a href="#" onClick={() => setMenuOpen(false)} className="hover:text-purple-300">Career</a>
            <a href="#" onClick={() => setMenuOpen(false)} className="hover:text-purple-300">Contact Us</a>
          </div>
        </div>
      )}

      <CubesScene />

      {/* HERO CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 md:pt-40">
  <div className="max-w-2xl">
    <h1 className="mb-6 text-4xl sm:text-6xl md:text-8xl font-extrabold leading-[1.1] tracking-tight text-white">
      Future{" "}
      <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
        Design Lab
      </span>
    </h1>

    <p className="mb-8 text-base md:text-lg text-gray-200">
      Crafting next-generation digital experiences with 3D design,
      innovation, and creativity.
    </p>

    {/* Buttons */}
    <div className="mt-100 md:mt-0 flex flex-col sm:flex-row gap-4">
      <button className="rounded-full bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700">
        Contact Us
      </button>

      <button className="rounded-full border border-white px-6 py-3 font-medium text-white transition hover:bg-white/10">
        Know More
      </button>
    </div>
  </div>
</div>
    </main>
  );
}
