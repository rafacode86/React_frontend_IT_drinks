import { API_ROUTES } from "@shared/constants";
import { httpClient } from "@shared/lib/http";
import type { Ingredient } from "@shared/types";

export type IngredientInput = Omit<
  Ingredient,
  "id" | "created_at" | "updated_at" | "alcohol_content"
> & {
  alcohol_content?: number | null;
};

export async function fetchIngredients(): Promise<Ingredient[]> {
  const { data } = await httpClient.get<Ingredient[]>(API_ROUTES.ingredients);
  return data;
}

export async function fetchIngredient(id: number | string): Promise<Ingredient> {
  const { data } = await httpClient.get<Ingredient>(API_ROUTES.ingredient(id));
  return data;
}

export async function createIngredient(payload: IngredientInput): Promise<Ingredient> {
  const { data } = await httpClient.post<Ingredient>(API_ROUTES.ingredients, payload);
  return data;
}

export async function updateIngredient(
  id: number | string,
  payload: IngredientInput
): Promise<Ingredient> {
  const { data } = await httpClient.put<Ingredient>(API_ROUTES.ingredient(id), payload);
  return data;
}

export async function deleteIngredient(id: number | string): Promise<void> {
  await httpClient.delete(API_ROUTES.ingredient(id));
}
