"use client";

import { useEffect, useRef, useState, useCallback } from "react";

function getPerView(breakpoints) {
  if (typeof window === "undefined") return breakpoints?.default ?? 1;
  const w = window.innerWidth;
  // Tailwind-ish breakpoints: sm 640, md 768, lg 1024, xl 1280
  if (w >= 1280) return breakpoints?.xl ?? breakpoints?.lg ?? breakpoints?.md ?? breakpoints?.default ?? 1;
  if (w >= 1024) return breakpoints?.lg ?? breakpoints?.md ?? breakpoints?.default ?? 1;
  if (w >= 768) return breakpoints?.md ?? breakpoints?.default ?? 1;
  return breakpoints?.default ?? 1;
}

export default function Carousel({
  items,
  renderItem,
  autoPlay = true,
  interval = 4500,
  showArrows = true,
  showDots = false,
  wrap = true,
  perView = { default: 1, md: 2, lg: 3 },
  className = "",
}) {
  const count = items?.length || 0;
  const [pv, setPv] = useState(getPerView(perView));
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const hoveredRef = useRef(false);

  useEffect(() => {
    const onResize = () => setPv(getPerView(perView));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [perView]);

  const lastStart = Math.max(0, count - pv);

  const goto = useCallback(
    (next) => {
      if (!count) return;
      if (wrap) {
        const mod = (n, m) => ((n % m) + m) % m;
        const pages = Math.max(1, count);
        setIndex((i) => mod(next, pages));
      } else {
        setIndex(Math.max(0, Math.min(next, lastStart)));
      }
    },
    [count, lastStart, wrap]
  );

  const prev = useCallback(() => goto(index - 1), [goto, index]);
  const next = useCallback(() => goto(index + 1), [goto, index]);

  useEffect(() => {
    if (!autoPlay || count <= pv) return;
    if (hoveredRef.current) return;
    timerRef.current = setTimeout(() => goto(index + 1), interval);
    return () => clearTimeout(timerRef.current);
  }, [autoPlay, interval, index, count, pv, goto]);

  const onEnter = () => {
    hoveredRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
  };
  const onLeave = () => {
    hoveredRef.current = false;
    if (autoPlay) timerRef.current = setTimeout(() => goto(index + 1), interval);
  };

  const slideWidth = 100 / pv;
  const trackWidth = count * slideWidth;

  return (
    <div className={`relative ${className}`} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/40 backdrop-blur">
        <div
          className="flex will-change-transform"
          style={{
            width: `${trackWidth}%`,
            transform: `translateX(-${index * slideWidth}%)`,
            transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {items.map((item, i) => {
            const active = i >= index && i < index + pv;
            return (
              <div
                key={i}
                className={`group relative shrink-0 grow-0 px-2 py-2`}
                style={{ width: `${slideWidth}%` }}
              >
                <div
                  className={`relative h-full rounded-3xl border border-slate-800/70 bg-slate-900/60 p-0 shadow-2xl transition duration-500 ${
                    active
                      ? "scale-100 opacity-100 shadow-[0_25px_80px_rgba(8,145,178,0.25)]"
                      : "scale-[0.97] opacity-70"
                  }`}
                >
                  {renderItem(item, i, active)}
                  {/* ambient glow */}
                  <div className="pointer-events-none absolute -inset-2 -z-10 rounded-[28px] bg-gradient-to-br from-cyan-500/20 via-transparent to-emerald-400/15 blur-2xl" />
                </div>
              </div>
            );
          })}
        </div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent" />
      </div>

      {showArrows && count > pv ? (
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-2">
          <button
            aria-label="Previous"
            className="rounded-full border border-slate-700/70 bg-slate-900/70 p-2 text-slate-200 shadow transition hover:border-cyan-400/60 hover:text-cyan-100"
            onClick={prev}
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none"><path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            aria-label="Next"
            className="rounded-full border border-slate-700/70 bg-slate-900/70 p-2 text-slate-200 shadow transition hover:border-cyan-400/60 hover:text-cyan-100"
            onClick={next}
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none"><path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      ) : null}

      {showDots && count > pv ? (
        <div className="mt-3 flex items-center justify-center gap-2">
          {Array.from({ length: Math.max(1, count - pv + 1) }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 w-5 rounded-full transition ${i === index ? "bg-cyan-400" : "bg-slate-700"}`}
              onClick={() => goto(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
