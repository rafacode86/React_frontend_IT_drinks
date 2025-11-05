export function CocktailCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-inner shadow-slate-950/40">
      <div className="h-5 w-2/3 rounded bg-slate-800/80" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-slate-800/60" />
        <div className="h-3 w-5/6 rounded bg-slate-800/60" />
        <div className="h-3 w-2/3 rounded bg-slate-800/60" />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="h-3 w-20 rounded bg-slate-800/50" />
        <div className="h-3 w-24 rounded bg-slate-800/50" />
      </div>
    </div>
  );
}
