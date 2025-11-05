import { useQuery } from "@tanstack/react-query";

import {
  fetchCocktailById,
  fetchCocktails,
  fetchCocktailsByIngredient,
} from "./api";

const cocktailsKeys = {
  all: ["cocktails"] as const,
  lists: () => [...cocktailsKeys.all, "list"] as const,
  list: (filters?: unknown) => [...cocktailsKeys.lists(), filters] as const,
  detail: (id: number | string) => [...cocktailsKeys.all, "detail", id] as const,
  byIngredient: (ingredientId: number | string) =>
    [...cocktailsKeys.all, "ingredient", ingredientId] as const,
};

export function useCocktails(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: cocktailsKeys.list(filters),
    queryFn: () => {
      const ingredientId = filters?.ingredient as string | number | undefined;

      if (ingredientId) {
        return fetchCocktailsByIngredient(ingredientId);
      }

      return fetchCocktails(filters as Record<string, string | number | undefined>);
    },
  });
}

export function useCocktail(id: number | string) {
  return useQuery({
    queryKey: cocktailsKeys.detail(id),
    queryFn: () => fetchCocktailById(id),
    enabled: Boolean(id),
  });
}

export function useCocktailsByIngredient(ingredientId: number | string) {
  return useQuery({
    queryKey: cocktailsKeys.byIngredient(ingredientId),
    queryFn: () => fetchCocktailsByIngredient(ingredientId),
    enabled: Boolean(ingredientId),
  });
}

export type CocktailsQueryResult = ReturnType<typeof useCocktails>;
export type CocktailQueryResult = ReturnType<typeof useCocktail>;
