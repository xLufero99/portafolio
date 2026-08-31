import { useEffect, type RefObject } from "react";

export function useWaveCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  mouseMxRef: RefObject<number>,
  mouseMyRef: RefObject<number>
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;
    let raf = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseMxRef.current;
      const my = mouseMyRef.current;

      ctx.beginPath();
      ctx.moveTo(0, h * 0.45);
      for (let x = 0; x <= w; x += 2) {
        const y =
          h * 0.45 +
          Math.sin((x / w) * Math.PI * 5 + t + mx * 2.5) * (28 + my * 18);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = "rgba(29,168,158,0.45)";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, h * 0.6);
      for (let x = 0; x <= w; x += 2) {
        const y =
          h * 0.6 +
          Math.sin((x / w) * Math.PI * 4 + t * 1.4 + mx) * (20 + my * 12);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = "rgba(10,10,10,0.65)";
      ctx.fill();

      t += 0.014;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, mouseMxRef, mouseMyRef]);
}