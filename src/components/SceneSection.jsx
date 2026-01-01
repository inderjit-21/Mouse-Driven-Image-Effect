import { useTexture } from "@react-three/drei"
import PlaneCard from "./PlaneCard"
import { useRef } from "react";
import useMouseTracker from "@/hook/useMouseTracker";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const imgs = [
    `/img1.jpg`,
    `/img2.jpg`,
    `/img3.jpg`,
    `/img4.jpg`,
]

const SceneSection = () => {
  const cardsRef = useRef([]);
  const textures = useTexture(imgs);

  const {x, y} = useMouseTracker();
  const { viewport, size } = useThree();
  // const target = useRef(new THREE.Vector3());
  const mouseTarget = useRef(new THREE.Vector3());

  const prevMouse = useRef({ x: 0, y: 0 });
const delta = useRef(new THREE.Vector2());



  useFrame(()=>{

    // 🧠 mouse velocity (MOST IMPORTANT)
    const dx = x - prevMouse.current.x;
    const dy = y - prevMouse.current.y;

    prevMouse.current.x = x;
    prevMouse.current.y = y;

    // 🔥 shader delta (velocity based)
    delta.current.set(dx * 0.002, -dy * 0.002);
    delta.current.clampScalar(-0.25, 0.25);


    // 👉 screen (px) → normalized (-1 to 1)
    const nx = (x / size.width) * 2 - 1;
    const ny = -(y / size.height) * 2 + 1;
    

    // normalized → world
    mouseTarget.current.set(
      nx * viewport.width * 0.5,
      ny * viewport.height * 0.5,
      0
    );

    // 🔥 reverse chain (upper mesh leads)
    for (let i = cardsRef.current.length - 1; i >= 0; i--) {
      const mesh = cardsRef.current[i];
      if (!mesh) continue;

      const followTarget =
        i === cardsRef.current.length - 1
          ? mouseTarget.current
          : cardsRef.current[i + 1].position;

      mesh.position.lerp(followTarget, 0.09);

      // ✅ SEND delta to shader
      if (mesh.material?.uniforms?.uDelta) {
        mesh.material.uniforms.uDelta.value.lerp(delta.current, 0.15);
      }
    }
  })




  return (
    <>
      {
        textures.map((texture, index)=>{
            return(
                <PlaneCard texture={texture} index={index} key={index} cardsRef={cardsRef}  />
            )
        })
      }
    </>
  )
}

export default SceneSection
