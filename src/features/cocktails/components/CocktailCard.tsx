import { Link } from "react-router-dom";

import type { Cocktail } from "@shared/types";
import { formatAlcoholContent } from "@shared/utils";

type CocktailCardProps = {
  cocktail: Cocktail;
};

export function CocktailCard({ cocktail }: CocktailCardProps) {
  const alcohol =
    cocktail.ingredients?.find(
      (ingredient) => ingredient.classification === "alcoholic"
    )?.alcohol_content ?? 0;

  return (
    <Link
      to={`/app/cocktails/${cocktail.id}`}
      className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-left shadow-lg shadow-slate-950/40 transition hover:-translate-y-1 hover:border-sky-500/60 hover:shadow-sky-500/20"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white transition group-hover:text-sky-100">
          {cocktail.name}
        </h3>
        <span className="rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-400">
          {cocktail.type ?? "Signature"}
        </span>
      </div>
      {cocktail.description ? (
        <p className="mt-3 text-sm text-slate-300 line-clamp-3">
          {cocktail.description}
        </p>
      ) : (
        <p className="mt-3 text-sm text-slate-500">
          Sin descripcion disponible.
        </p>
      )}
      <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
        <span>
          {cocktail.ingredients?.length ?? 0} ingrediente
          {(cocktail.ingredients?.length ?? 0) === 1 ? "" : "s"}
        </span>
        <span>ABV aprox. {formatAlcoholContent(alcohol)}</span>
      </div>
    </Link>
  );
}
