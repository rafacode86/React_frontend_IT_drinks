export function IngredientSkeletonTable() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-slate-950/40">
      <div className="space-y-4 p-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-4 sm:grid-cols-5"
          >
            <div className="h-4 rounded bg-slate-800/80 sm:col-span-2" />
            <div className="h-4 rounded bg-slate-800/70" />
            <div className="h-4 rounded bg-slate-800/70" />
            <div className="h-4 rounded bg-slate-800/70" />
          </div>
        ))}
      </div>
    </div>
  );
}
