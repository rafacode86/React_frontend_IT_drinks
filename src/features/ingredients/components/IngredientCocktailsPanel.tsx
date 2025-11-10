import { useEffect } from "react";

import { EmptyState } from "@shared/components";
import type { Ingredient } from "@shared/types";

import {
  CocktailCard,
  CocktailCardSkeleton,
} from "@features/cocktails/components";
import { useCocktailsByIngredient } from "@features/cocktails/queries";

type IngredientCocktailsPanelProps = {
  ingredient: Ingredient;
  onClose: () => void;
};

export function IngredientCocktailsPanel({
  ingredient,
  onClose,
}: IngredientCocktailsPanelProps) {
  const cocktailsQuery = useCocktailsByIngredient(ingredient.id);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur">
      <div className="relative flex w-full max-w-4xl flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/70">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300 transition hover:border-slate-500"
        >
          Cerrar
        </button>
        <header className="space-y-1 pr-16">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
            Cocteles con
          </p>
          <h2 className="text-2xl font-semibold text-white">{ingredient.name}</h2>
          <p className="text-sm text-slate-400">
            Clasificacion: {ingredient.classification}
          </p>
        </header>

        {cocktailsQuery.isLoading ? (
          <CocktailCardSkeleton />
        ) : null}

        {cocktailsQuery.isError ? (
          <EmptyState
            title="No se pudieron cargar los cocteles"
            description="Revisa tu conexion e intenta nuevamente."
          />
        ) : null}

        {cocktailsQuery.isSuccess ? (
          cocktailsQuery.data.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {cocktailsQuery.data.map((cocktail) => (
                <CocktailCard key={cocktail.id} cocktail={cocktail} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Sin cocteles asociados"
              description="Aun no hay recetas que utilicen este ingrediente."
            />
          )
        ) : null}
      </div>
    </div>
  );
}
