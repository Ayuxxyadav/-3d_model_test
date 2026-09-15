import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./index.css";

import scooterModelUrl from "../public/asset_3d.glb";

// 1. Scooter Model Component
function Scooter() {
  const { scene } = useGLTF(scooterModelUrl);

  return (
    <group>
      <primitive object={scene} scale={4.2} position={[0, -0.1, 0]} />
    </group>
  );
}

useGLTF.preload(scooterModelUrl);

// 2. Main App Component
export function App() {
  const [isDragging, setIsDragging] = useState(false);
  const controlsRef = useRef<any>(null);

  return (
    <div className="w-full min-h-screen flex flex-col font-sans bg-[#F8FAFC] text-[#0F172A] justify-between">
      
      {/* --- NAVBAR --- */}
      <nav className="flex justify-between items-center py-5 px-8 md:px-20 bg-white border-b border-[#E2E8F0] z-50">
        <div className="text-2xl font-black tracking-tight text-[#6A2C91]">
          Steed<span className="text-[#FF6B00]">Go</span>
        </div>
        
        <div className="hidden md:flex space-x-8 font-semibold text-[#475569]">
          <a href="#" className="text-[#6A2C91] hover:text-[#4D1F6D] transition-colors">Home</a>
          <a href="#" className="hover:text-[#6A2C91] transition-colors">For Business</a>
          <a href="#" className="hover:text-[#6A2C91] transition-colors">About Us</a>
          <a href="#" className="hover:text-[#6A2C91] transition-colors">Services</a>
        </div>

        <button className="bg-[#1F2937] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center hover:bg-black transition-all cursor-pointer shadow-sm">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
            alt="Google Play" 
            className="h-6" 
          />
        </button>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 relative my-auto">
        
        {/* Left Side: Brand Details */}
        <div className="w-full md:w-1/2 flex flex-col items-start z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3E8FF] text-[#6A2C91] text-sm font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse"></span>
            Smart Electric Mobility
          </div>

          <h1 className="text-5xl md:text-[3.6rem] font-extrabold leading-[1.1] text-[#0F172A] tracking-tight">
            Electrify Your Ride, <br />
            <span className="text-[#6A2C91]">Save More</span>{" "}
            <span className="text-[#FF6B00]">Every Day</span>
          </h1>

          <p className="text-lg text-[#475569] max-w-lg leading-relaxed font-medium">
            Switch to seamless electric mobility with <strong className="text-[#0F172A]">SteedGo</strong>. Lower running costs, cleaner rides, and high-performance EV access designed for smart commuters.
          </p>

          <div className="flex space-x-4 pt-2">
            <button className="border-2 border-[#E2E8F0] text-[#0F172A] font-bold px-8 py-3.5 rounded-full hover:border-[#6A2C91] hover:text-[#6A2C91] transition-all cursor-pointer bg-white">
              Download App
            </button>
            <button className="bg-[#FF6B00] text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-[#FF6B00]/30 hover:bg-[#E05D00] hover:scale-105 transition-all cursor-pointer">
              Get Started →
            </button>
          </div>
        </div>

        {/* Right Side: Interactive 3D Model Area */}
        <div 
          className="w-full md:w-1/2 h-[55vh] md:h-[68vh] flex items-center justify-center relative cursor-grab active:cursor-grabbing select-none"
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          onPointerLeave={() => setIsDragging(false)}
        >
          {/* SteedGo Purple + Orange Dual Glow Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-gradient-to-tr from-[#F3E8FF] to-[#FFF0E5] rounded-full blur-[100px] -z-10 pointer-events-none"></div>

          <Canvas camera={{ position: [0, 1.2, 7.8], fov: 45 }}>
            <ambientLight intensity={1.7} />
            <directionalLight position={[5, 10, 5]} intensity={2.2} />
            <Environment preset="city" />

            <Suspense fallback={null}>
              <OrbitControls
                ref={controlsRef}
                enableZoom={false}
                enablePan={false}
                autoRotate={!isDragging}
                autoRotateSpeed={2.0}
                target={[0, 0.6, 0]}
                makeDefault
              />

              <Scooter />
              {/* ContactShadows completely removed here */}
            </Suspense>
          </Canvas>
        </div>
      </main>

      {/* --- BOTTOM STATS BAR --- */}
      <div className="mx-8 md:mx-20 mb-8 bg-white rounded-2xl shadow-xl shadow-[#0F172A]/5 flex flex-wrap justify-between items-center py-6 px-10 border border-[#E2E8F0] z-10">
        <div className="flex flex-col">
          <span className="text-3xl font-extrabold text-[#6A2C91]">173.1 K</span>
          <span className="text-[#475569] font-semibold text-sm">Happy Rides</span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-extrabold text-[#FF6B00]">86.5 L</span>
          <span className="text-[#475569] font-semibold text-sm">kg CO₂ Saved</span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-extrabold text-[#6A2C91]">15.0 Cr</span>
          <span className="text-[#475569] font-semibold text-sm">Kms Covered</span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-extrabold text-[#FF6B00]">40.4 Cr</span>
          <span className="text-[#475569] font-semibold text-sm">Money Saved</span>
        </div>
      </div>

    </div>
  );
}

export default App;