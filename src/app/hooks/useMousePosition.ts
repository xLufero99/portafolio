import { useEffect, useState, useRef } from "react";

export function useMousePosition() {
  const [mouseNorm, setMouseNorm] = useState({ x: 0.5, y: 0.5 });
  const mouseMxRef = useRef(0.5);
  const mouseMyRef = useRef(0.5);
  const cursorTargetRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorTargetRef.current = { x: e.clientX, y: e.clientY };
      const nx = e.clientX / window.innerWidth;
      const ny = e.clientY / window.innerHeight;
      mouseMxRef.current = nx;
      mouseMyRef.current = ny;
      setMouseNorm({ x: nx, y: ny });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return { mouseNorm, mouseMxRef, mouseMyRef, cursorTargetRef };
}