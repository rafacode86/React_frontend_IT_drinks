import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Ingredient, IngredientInput } from "@shared/types";

import {
  createIngredient,
  deleteIngredient,
  fetchIngredient,
  fetchIngredients,
  updateIngredient,
} from "./api";

const ingredientsKeys = {
  all: ["ingredients"] as const,
  lists: () => [...ingredientsKeys.all, "list"] as const,
  list: () => [...ingredientsKeys.lists(), "all"] as const,
  detail: (id: number | string) => [...ingredientsKeys.all, "detail", id] as const,
};

export function useIngredients() {
  return useQuery({
    queryKey: ingredientsKeys.list(),
    queryFn: fetchIngredients,
  });
}

export function useIngredient(id: number | string) {
  return useQuery({
    queryKey: ingredientsKeys.detail(id),
    queryFn: () => fetchIngredient(id),
    enabled: Boolean(id),
  });
}

export function useCreateIngredientMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IngredientInput) => createIngredient(payload),
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: ingredientsKeys.lists() });
      queryClient.setQueryData<Ingredient>(
        ingredientsKeys.detail(created.id),
        created
      );
    },
  });
}

export function useUpdateIngredientMutation(id: number | string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IngredientInput) => updateIngredient(id, payload),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ingredientsKeys.lists() });
      queryClient.setQueryData<Ingredient>(
        ingredientsKeys.detail(updated.id),
        updated
      );
    },
  });
}

export function useDeleteIngredientMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteIngredient,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ingredientsKeys.lists() });
      queryClient.removeQueries({ queryKey: ingredientsKeys.detail(id) });
    },
  });
}

export type IngredientsQueryResult = ReturnType<typeof useIngredients>;
