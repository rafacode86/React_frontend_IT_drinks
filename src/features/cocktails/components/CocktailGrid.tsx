import type { Cocktail } from "@shared/types";

import { CocktailCard } from "./CocktailCard";

type CocktailGridProps = {
  cocktails: Cocktail[];
};

export function CocktailGrid({ cocktails }: CocktailGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {cocktails.map((cocktail) => (
        <CocktailCard key={cocktail.id} cocktail={cocktail} />
      ))}
    </div>
  );
}
