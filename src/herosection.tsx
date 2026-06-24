"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";

/**
 * 3D Cube Component
 */
function FloatingCube({
  position,
  rotation,
  scale = 1,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}) {
  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.9}
          emissive="#a855f7"
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

function CubesScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <Canvas shadows gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />

        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#d8b4fe" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" />

        <Suspense fallback={null}>
          <FloatingCube position={[4, 2, 0]} rotation={[0.4, 0.2, 0.5]} scale={1.4} />
          <FloatingCube position={[6, 0, -2]} rotation={[1.1, 0.4, 0.2]} scale={1.1} />
          <FloatingCube position={[3, -2.5, 1]} rotation={[0.2, 1.2, 0.8]} scale={1.3} />
          <FloatingCube position={[7, 3, -3]} rotation={[0, 0, 0]} scale={0.8} />
          <FloatingCube position={[8, -2, -1]} rotation={[0.5, 0.5, 0.5]} scale={0.9} />
          <FloatingCube position={[2, 0.5, -2]} rotation={[0.8, 0.1, 0.4]} scale={0.6} />

          <Environment preset="city" />
          <ContactShadows
            position={[0, -4, 0]}
            opacity={0.18}
            scale={20}
            blur={2.5}
            far={4.5}
            color="#7e22ce"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="relative h-[800px] w-full text-[#1a1a1a] selection:bg-purple-200 overflow-hidden">

      {/* NEW BACKGROUND (soft purple + blue gradient) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7f2ff] via-[#eef6ff] to-[#ffffff]" />

      {/* subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#7e22ce10_1px,transparent_1px),linear-gradient(to_bottom,#7e22ce10_1px,transparent_1px)] bg-[size:45px_45px] opacity-60" />

      {/* FLOATING NAVBAR */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 
                      flex items-center justify-between 
                      w-[90%] max-w-6xl px-6 py-4 
                      rounded-full 
                      bg-white/60 backdrop-blur-xl 
                      border border-purple-100 
                      shadow-lg">
        
        <div className="font-bold text-lg text-purple-700">
          JMKC
        </div>

        <div className="flex gap-8 text-sm font-medium text-gray-700">
          <a href="#" className="hover:text-purple-600 transition">About Us</a>
          <a href="#" className="hover:text-purple-600 transition">Career</a>
          <a href="#" className="hover:text-purple-600 transition">Contact Us</a>
        </div>
      </div>

      {/* 3D LAYER */}
      <CubesScene />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-40 pb-20">
        <div className="max-w-2xl">

          <h1 className="mb-6 text-6xl font-extrabold leading-[1.1] tracking-tight text-gray-900 md:text-8xl">
            Future{" "}
            <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              Design Lab
            </span>
          </h1>

          {/* SUBTITLE */}
          <p className="mb-8 text-lg text-gray-600">
            Crafting next-generation digital experiences with 3D design, innovation, and creativity.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition">
              Contact Us
            </button>

            <button className="px-6 py-3 rounded-full border border-purple-400 text-purple-700 font-medium hover:bg-purple-50 transition">
              Know More
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}


