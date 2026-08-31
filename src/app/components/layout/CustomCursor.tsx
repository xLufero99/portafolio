import { useRef } from "react";
import type { RefObject } from "react";
import { useCustomCursor } from "../../hooks/useCustomCursor";

interface CustomCursorProps {
  isOnProject: boolean;
  isOnProjectRef: RefObject<boolean>;
  cursorTargetRef: RefObject<{ x: number; y: number }>;
}

export default function CustomCursor({
  isOnProject,
  isOnProjectRef,
  cursorTargetRef,
}: CustomCursorProps) {
  const cursorDivRef = useRef<HTMLDivElement>(null);
  useCustomCursor(cursorDivRef, isOnProjectRef, cursorTargetRef);

  return (
    <div
      ref={cursorDivRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ willChange: "transform" }}
    >
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
          isOnProject
            ? "w-20 h-20 border border-white/50 bg-black/10 backdrop-blur-[2px]"
            : "w-2 h-2 bg-white"
        }`}
      >
        {isOnProject && (
          <span
            className="text-white font-semibold"
            style={{ fontSize: "9px", letterSpacing: "0.2em" }}
          >
            VIEW
          </span>
        )}
      </div>
    </div>
  );
}