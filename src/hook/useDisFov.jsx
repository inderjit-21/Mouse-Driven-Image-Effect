"use client";
import { useEffect, useState } from "react";

const useDisFov = () => {
  const distance = 200;
  const [fov, setFov] = useState(75);

  useEffect(() => {
    const FovCalculator = () => {
      setFov(
        2 * Math.atan(window.innerHeight / 2 / distance) * (180 / Math.PI)
      );
    };
    FovCalculator();
    window.addEventListener("resize", FovCalculator);
    return () => window.removeEventListener("resize", FovCalculator);
  }, []);

  return [fov, distance];
};

export default useDisFov;
