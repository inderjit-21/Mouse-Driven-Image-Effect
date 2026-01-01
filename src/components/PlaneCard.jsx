'use client'
import { useAspect } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
// import Vertex from '@/shaders/Vertex.glsl'
// import Fragment from '@/shaders/Fragment.glsl'

import { Vertex,Fragment } from "@/shaders/OneShader";

import * as THREE from "three";

const PlaneCard = ({texture, index, cardsRef}) => {
  const meshRef = useRef();

  const scale = useAspect(
    texture.image.width,
    texture.image.height,
    0.13
  )

  useEffect(() => {
    cardsRef.current[index] = meshRef.current;
  }, [index, cardsRef]);


  return (
    <mesh ref={meshRef} key={index} scale={scale} cardsRef={cardsRef}>
      <planeGeometry args={[1, 1, 40, 40]} />
      <shaderMaterial 
       vertexShader={Vertex}
       fragmentShader={Fragment}
       uniforms={{
        uTexture:{value:texture},
        uDelta: { value: new THREE.Vector2(0, 0) },
       }}
      />
    </mesh>
  );
};

export default PlaneCard;
