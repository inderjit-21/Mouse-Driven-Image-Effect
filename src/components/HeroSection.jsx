"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";
import useDisFov from "@/hook/useDisFov";
import { PerspectiveCamera } from "@react-three/drei";
import SceneSection from "./SceneSection";

const HeroSection = () => {
  const [fov, distance] = useDisFov();

  return (
    <div className="w-full h-screen relative">
      <div className=" absolute top-0 left-0 text-[5vw] text-[#c29a70] leading-[5vw] tracking-tight  z-[-1] flex flex-col justify-center items-center w-full h-screen">
        <p>Mouse Driven</p>
        <p>Image Effect</p>
      </div>
      <Canvas
        className="w-full h-full"
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // transparent
        }}
      >
        <PerspectiveCamera makeDefault fov={fov} position={[0, 0, distance]} />
        <SceneSection />
      </Canvas>
    </div>
  );
};

export default HeroSection;
