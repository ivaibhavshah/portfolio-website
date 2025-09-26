"use client";

import { useRef, useEffect } from "react";

export default function Tilt({
  children,
  max = 6, // degrees
  scale = 1.008,
  className = "",
  disabled = false,
}) {
  const ref = useRef(null);
  const frame = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px)";
    el.style.transformStyle = "preserve-3d";
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  if (disabled) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const py = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    const rx = (0.5 - py) * (max * 2);
    const ry = (px - 0.5) * (max * 2);

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`;
      el.style.transition = "transform 120ms ease-out";
      el.style.willChange = "transform";
      el.style.transformStyle = "preserve-3d";
      el.style.transformOrigin = "50% 50%";
    });
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
      el.style.transition = "transform 220ms ease";
    });
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onMouseEnter={onMove}
      style={{ transform: "perspective(900px)" }}
    >
      {children}
    </div>
  );
}
