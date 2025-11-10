import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

import type { Ingredient } from "@shared/types";
import { formatAlcoholContent } from "@shared/utils";

type IngredientTableProps = {
  ingredients: Ingredient[];
  onEdit?: (ingredient: Ingredient) => void;
  onDelete?: (ingredient: Ingredient) => void;
  onViewCocktails?: (ingredient: Ingredient) => void;
  isAdmin?: boolean;
};

const classificationColors: Record<string, string> = {
  alcoholic: "bg-red-500/20 text-red-200 border border-red-500/30",
  soda: "bg-sky-500/20 text-sky-100 border border-sky-500/30",
  juice: "bg-amber-500/20 text-amber-100 border border-amber-500/30",
  garnish: "bg-emerald-500/20 text-emerald-100 border border-emerald-500/30",
};

export function IngredientTable({
  ingredients,
  onEdit,
  onDelete,
  onViewCocktails,
  isAdmin,
}: IngredientTableProps) {
  const sorted = useMemo(
    () =>
      [...ingredients].sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" })),
    [ingredients]
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-slate-950/50">
      <table className="min-w-full divide-y divide-slate-800 text-sm text-slate-200">
        <thead>
          <tr className="bg-slate-900/80 text-xs uppercase tracking-[0.3em] text-slate-400">
            <th scope="col" className="px-4 py-3 text-left">
              Ingrediente
            </th>
            <th scope="col" className="px-4 py-3 text-left">
              Marca
            </th>
            <th scope="col" className="px-4 py-3 text-left">
              Clasificacion
            </th>
            <th scope="col" className="px-4 py-3 text-left">
              Alcohol
            </th>
            <th scope="col" className="px-4 py-3 text-left">
              Origen
            </th>
            {(isAdmin || onViewCocktails) ? (
              <th scope="col" className="px-4 py-3 text-right">
                Acciones
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {sorted.map((ingredient) => (
            <tr
              key={ingredient.id}
              className="transition hover:bg-slate-900/70"
            >
              <td className="px-4 py-4">
                <div className="font-medium text-white">{ingredient.name}</div>
                {ingredient.type ? (
                  <div className="text-xs text-slate-400">{ingredient.type}</div>
                ) : null}
              </td>
              <td className="px-4 py-4 text-slate-300">
                {ingredient.type ?? "No especificado"}
              </td>
              <td className="px-4 py-4">
                <span
                  className={twMerge(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize",
                    classificationColors[ingredient.classification] ??
                      "bg-slate-800/80 text-slate-200 border border-slate-700"
                  )}
                >
                  {ingredient.classification}
                </span>
              </td>
              <td className="px-4 py-4 text-slate-300">
                {formatAlcoholContent(ingredient.alcohol_content)}
              </td>
              <td className="px-4 py-4 text-slate-300">
                {ingredient.origin ?? "Desconocido"}
              </td>
              {(isAdmin || onViewCocktails) ? (
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
                    {onViewCocktails ? (
                      <button
                        type="button"
                        onClick={() => onViewCocktails(ingredient)}
                        className="rounded-full border border-slate-700 px-3 py-1 text-slate-200 transition hover:border-sky-500/70 hover:text-white"
                      >
                        Cocteles
                      </button>
                    ) : null}
                    {isAdmin ? (
                      <>
                        <button
                          type="button"
                          onClick={() => onEdit?.(ingredient)}
                          className="rounded-full border border-slate-700 px-3 py-1 text-slate-200 transition hover:border-sky-500/70 hover:text-white"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete?.(ingredient)}
                          className="rounded-full border border-red-500/70 px-3 py-1 text-red-200 transition hover:bg-red-500/10"
                        >
                          Borrar
                        </button>
                      </>
                    ) : null}
                  </div>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
