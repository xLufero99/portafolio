import { useEffect, useRef } from "react";

export function useMousePosition() {
  const mouseMxRef = useRef(0.5);
  const mouseMyRef = useRef(0.5);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseMxRef.current = e.clientX / window.innerWidth;
      mouseMyRef.current = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return { mouseMxRef, mouseMyRef };
}
