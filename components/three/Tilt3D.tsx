"use client";

import React, { memo, useRef } from "react";

/**
 * Mouse-driven 3D tilt — tanpa WebGL.
 * Optimasi: transform via ref + rAF (tanpa setState per mousemove),
 * nonaktif di touch / reduced-motion, glare hanya saat hover.
 */
function Tilt3D({
  children,
  className = "",
  max = 12,
  scale = 1.02,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const hovering = useRef(false);

  const canTilt = () => {
    if (typeof window === "undefined") return false;
    // Sentuh: tidak ada hover presisi — skip listener cost
    if (window.matchMedia?.("(hover: none)").matches) return false;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
      return false;
    return true;
  };

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !canTilt()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max * 1.4;
    const ry = (px - 0.5) * max * 1.6;

    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(
          2
        )}deg) scale(${scale})`;
      }
      if (glareRef.current) {
        glareRef.current.style.opacity = "1";
        glareRef.current.style.background = `radial-gradient(circle at ${(px * 100).toFixed(
          1
        )}% ${(py * 100).toFixed(1)}%, rgba(255,255,255,0.22), transparent 62%), linear-gradient(115deg, rgba(201,168,106,0.14), transparent 45%)`;
      }
    });
    hovering.current = true;
  };

  const onLeave = () => {
    cancelAnimationFrame(raf.current);
    hovering.current = false;
    if (ref.current) ref.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div className={`perspective-1200 ${className}`}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="preserve-3d tilt-inner relative"
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
            style={{ opacity: 0 }}
          />
        )}
      </div>
    </div>
  );
}

export default memo(Tilt3D);
