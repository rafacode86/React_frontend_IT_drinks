import type { Cocktail } from "@shared/types";
import { formatAlcoholContent } from "@shared/utils";

function getApproxAlcohol(cocktail: Cocktail) {
  const { ingredients } = cocktail;

  if (!ingredients.length) {
    return 0;
  }

  let totalVolume = 0;
  let totalAlcohol = 0;

  ingredients.forEach((ingredient) => {
    const volume = ingredient.pivot?.measure_ml ?? 0;
    totalVolume += volume;
    if (ingredient.alcohol_content > 0) {
      totalAlcohol += volume * (ingredient.alcohol_content / 100);
    }
  });

  if (totalVolume === 0) {
    return 0;
  }

  return parseFloat(((totalAlcohol / totalVolume) * 100).toFixed(2));
}

type CocktailHeroProps = {
  cocktail: Cocktail;
};

export function CocktailHero({ cocktail }: CocktailHeroProps) {
  const approximateAlcohol = getApproxAlcohol(cocktail);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-slate-950/60">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_top_right,rgba(56,189,248,0.35),transparent_65%)]" />
      <div className="relative z-10 space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
          Cocktail
        </span>
        <h1 className="text-3xl font-semibold text-white md:text-4xl">
          {cocktail.name}
        </h1>
        {cocktail.description ? (
          <p className="max-w-2xl text-sm text-slate-300 md:text-base">
            {cocktail.description}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-400">
          <span className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1">
            {cocktail.type ?? "Signature"}
          </span>
          <span className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1">
            {cocktail.ingredients.length} ingrediente
            {cocktail.ingredients.length === 1 ? "" : "s"}
          </span>
          <span className="rounded-full border border-sky-600/70 bg-sky-500/20 px-3 py-1 text-sky-200">
            Alcohol aprox. {formatAlcoholContent(approximateAlcohol)}
          </span>
        </div>
      </div>
    </section>
  );
}
