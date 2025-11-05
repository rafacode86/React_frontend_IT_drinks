import type { CocktailIngredient } from "@shared/types";
import { formatAlcoholContent } from "@shared/utils";

type IngredientListProps = {
  ingredients: CocktailIngredient[];
};

export function IngredientList({ ingredients }: IngredientListProps) {
  if (!ingredients.length) {
    return (
      <p className="text-sm text-slate-400">
        Este cocktail no tiene ingredientes asociados.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {ingredients.map((ingredient) => (
        <div
          key={ingredient.id}
          className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-200 shadow-inner shadow-slate-950/50"
        >
          <div>
            <p className="font-medium text-white">{ingredient.name}</p>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              {ingredient.classification}
            </p>
          </div>
          <div className="text-right">
            <p>{ingredient.pivot.measure_ml} ml</p>
            <p className="text-xs text-slate-400">
              {formatAlcoholContent(ingredient.alcohol_content)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
