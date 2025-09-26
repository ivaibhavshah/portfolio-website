export default function Loading() {
  const bars = Array.from({ length: 4 });
  const racks = Array.from({ length: 3 });

  return (
    <div className="fixed inset-0 grid place-items-center bg-slate-950">
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
                  <div
                    key={i}
                    className="h-2 overflow-hidden rounded bg-slate-800/80"
                  >
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
          <div className="mt-2 text-lg font-medium text-slate-200">Building backend services…</div>
          <div className="mt-1 text-sm text-slate-400">Warming caches, provisioning pipelines, checking health</div>
        </div>
      </div>
    </div>
  );
}

