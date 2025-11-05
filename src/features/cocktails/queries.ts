import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createCocktail,
  deleteCocktail,
  fetchCocktailById,
  fetchCocktails,
  fetchCocktailsByIngredient,
  updateCocktail,
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

export function useCreateCocktailMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCocktail,
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: cocktailsKeys.lists() });
      queryClient.setQueryData(cocktailsKeys.detail(created.id), created);
    },
  });
}

export function useUpdateCocktailMutation(id: number | string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Parameters<typeof updateCocktail>[1]) =>
      updateCocktail(id, payload),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: cocktailsKeys.lists() });
      queryClient.setQueryData(cocktailsKeys.detail(updated.id), updated);
    },
  });
}

export function useDeleteCocktailMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCocktail,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: cocktailsKeys.lists() });
      queryClient.removeQueries({ queryKey: cocktailsKeys.detail(id) });
    },
  });
}

export type CocktailsQueryResult = ReturnType<typeof useCocktails>;
export type CocktailQueryResult = ReturnType<typeof useCocktail>;
