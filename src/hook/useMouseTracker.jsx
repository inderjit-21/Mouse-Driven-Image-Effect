"use client";
import { useEffect, useState } from "react";

const useMouseTracker = () => {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const MouseTracker = (e) => {
      const { clientX, clientY } = e;
      setMouse({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", MouseTracker);
    return () => window.removeEventListener("mousemove", MouseTracker);
  }, []);

  return mouse;
};

export default useMouseTracker;
