"use client";

import Carousel from "./Carousel";
import Tilt from "./Tilt";

function CertCard({ cert, tilt = false }) {
  const Badge = (
    <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-full border border-cyan-400/40 bg-slate-950/70 shadow-[0_0_45px_rgba(8,145,178,0.25)]">
      {cert.badge ? (
        <img src={cert.badge} alt={`${cert.issuer} badge`} className="h-16 w-16 object-contain" />
      ) : (
        <svg className="h-12 w-12 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l3 5 5 3-5 3-3 5-3-5-5-3 5-3 3-5z" />
        </svg>
      )}
    </div>
  );

  return (
    <div className="flex h-full items-stretch gap-6 p-6">
      <div className="relative flex w-28 shrink-0 items-start justify-center">
        {tilt ? <Tilt>{Badge}</Tilt> : Badge}
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-cyan-400/25 via-transparent to-emerald-400/20 blur-xl" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center rounded-2xl border border-slate-800/70 bg-slate-900/60 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="truncate text-base font-semibold text-slate-50">{cert.name}</h3>
            <p className="text-sm text-slate-400">{cert.issuer}</p>
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{cert.year}</span>
        </div>
        {cert.credentialId ? (
          <div className="mt-3">
            <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Credential ID</div>
            <div className="mt-1 truncate text-sm text-slate-300">{cert.credentialId}</div>
          </div>
        ) : null}
        {cert.link ? (
          <div className="mt-4">
            <a href={cert.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200 transition hover:border-cyan-400/60 hover:text-cyan-100">Verify credential</a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function CertificationCarousel({ items }) {
  return (
    <>
      {/* Mobile: native swipe with snap */}
      <div className="md:hidden">
        <div className="relative">
          <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 py-1">
            {items.map((cert, i) => (
              <div key={i} className="snap-center shrink-0 basis-[88vw] rounded-3xl border border-slate-800/70 bg-slate-900/50 shadow-2xl">
                <CertCard cert={cert} tilt={false} />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950 to-transparent" />
        </div>
      </div>

      {/* Desktop: animated carousel with subtle badge tilt */}
      <div className="hidden md:block">
        <Carousel items={items} interval={4200} perView={{ default: 1, md: 2, lg: 3 }} showDots={false}
          renderItem={(cert) => (
            <div className="rounded-3xl border border-slate-800/70 bg-slate-900/50 shadow-2xl">
              <CertCard cert={cert} tilt={true} />
            </div>
          )}
        />
      </div>
    </>
  );
}
