import React, { useEffect, useState } from "react";

/**
 * Small subtle hoofprint trail on desktop mouse movement.
 * Disabled on touch, reduced motion, or saveData.
 */
export function HoofprintCursor() {
  const [prints, setPrints] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Guard: Only enable on fine pointer (desktop mouse), no touch, no reduced-motion, no saveData
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSaveData = Boolean(navigator.connection && navigator.connection.saveData);

    if (!isFinePointer || prefersReducedMotion || isSaveData) {
      return;
    }

    let lastTime = 0;
    const throttleMs = 90; // prevent too many prints

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      const newPrint = {
        id: `${now}-${Math.random()}`,
        x: e.clientX,
        y: e.clientY,
        angle: (Math.random() - 0.5) * 30, // slight natural jitter
      };

      setPrints((prev) => [...prev.slice(-12), newPrint]); // max 12 prints at a time
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const cleanupInterval = setInterval(() => {
      setPrints((prev) => prev.filter((p) => Date.now() - parseInt(p.id, 10) < 1100));
    }, 250);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, []);

  if (prints.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {prints.map((p) => (
        <div
          key={p.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ease-out"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            opacity: 0.35,
          }}
        >
          {/* Subtle cloven hoofprint / bison track SVG */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="#B5472A"
            className="opacity-60"
            aria-hidden="true"
          >
            <path d="M10 3C8 3 6.5 5 6.5 8C6.5 12 8.5 15.5 10.5 16.5C11 15 11 12 11 8C11 5 10.5 3 10 3Z" />
            <path d="M14 3C16 3 17.5 5 17.5 8C17.5 12 15.5 15.5 13.5 16.5C13 15 13 12 13 8C13 5 13.5 3 14 3Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default HoofprintCursor;
