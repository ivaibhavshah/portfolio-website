"use client";

import { useEffect, useRef, useState } from "react";

export default function DramaticLoader({ minMs = 1200 }) {
  const [visible, setVisible] = useState(true);
  const [remove, setRemove] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [dotCount, setDotCount] = useState(0);
  const prevOverflowRef = useRef("");

  useEffect(() => {
    const start = Date.now();

    function finish() {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, minMs - elapsed);
      const t = setTimeout(() => {
        setVisible(false);
        const t2 = setTimeout(() => setRemove(true), 350);
        return () => clearTimeout(t2);
      }, wait);
      return () => clearTimeout(t);
    }

    function onLoad() {
      if (document.fonts && typeof document.fonts.ready?.then === "function") {
        document.fonts.ready.then(() => finish());
      } else {
        finish();
      }
    }

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    prevOverflowRef.current = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("load", onLoad);
      document.documentElement.style.overflow = prevOverflowRef.current || "";
    };
  }, [minMs]);

  useEffect(() => {
    if (!visible) {
      document.documentElement.style.overflow = prevOverflowRef.current || "";
    }
  }, [visible]);

  // Cycle headline + subline and animated dots while visible
  useEffect(() => {
    if (!visible) return;
    const msgTimer = setInterval(() => setMsgIndex((i) => i + 1), 1100);
    const dotsTimer = setInterval(() => setDotCount((d) => (d + 1) % 4), 450);
    return () => {
      clearInterval(msgTimer);
      clearInterval(dotsTimer);
    };
  }, [visible]);

  if (remove) return null;

  const bars = Array.from({ length: 4 });
  const racks = Array.from({ length: 3 });

  const headlines = [
    "Launching systems",
    "Forging the platform",
    "Spinning up containers",
    "Linking microservices",
    "Routing packets",
  ];
  const details = [
    "Warming caches",
    "Provisioning pipelines",
    "Checking health",
    "Hydrating state",
    "Securing endpoints",
  ];
  const headline = headlines[msgIndex % headlines.length];
  const detail = details[msgIndex % details.length];

  return (
    <div
      className={`fixed inset-0 z-[9999] grid place-items-center bg-slate-950 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-busy={visible}
      aria-live="polite"
    >
      <div className="relative flex flex-col items-center gap-8 p-6">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_55%)]" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {racks.map((_, r) => (
            <div
              key={r}
              className="relative h-28 w-64 rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3 shadow-[0_0_45px_rgba(8,145,178,0.12)]"
            >
              <div className="flex flex-col gap-2">
                {bars.map((__, i) => (
                  <div key={i} className="h-2 overflow-hidden rounded bg-slate-800/80">
                    <div
                      className="h-full origin-left rounded bg-gradient-to-r from-cyan-400 to-emerald-400 animate-build-bar"
                      style={{ animationDelay: `${(i + r) * 180}ms` }}
                    />
                  </div>
                ))}
              </div>

              <div className="absolute right-3 bottom-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.25em] text-slate-400">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400/30 animate-beacon" />
                  <span className="relative h-2 w-2 rounded-full bg-cyan-400" />
                </span>
                online
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">Initializing</div>
          <div className="mt-2 text-xl font-semibold shimmer-text">{headline}</div>
          <div className="mt-1 text-sm text-slate-400">{detail}{".".repeat(dotCount)}</div>
        </div>
      </div>
    </div>
  );
}

