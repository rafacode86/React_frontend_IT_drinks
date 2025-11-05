import { API_ROUTES } from "@shared/constants";
import { httpClient } from "@shared/lib/http";
import type { Cocktail, CocktailInput } from "@shared/types";

type CocktailsResponse = Cocktail[];

export async function fetchCocktails(
  params?: Record<string, string | number | undefined>
): Promise<CocktailsResponse> {
  const { data } = await httpClient.get<CocktailsResponse>(
    API_ROUTES.cocktails,
    { params }
  );
  return data;
}

export async function fetchCocktailById(id: number | string): Promise<Cocktail> {
  const { data } = await httpClient.get<Cocktail>(API_ROUTES.cocktail(id));
  return data;
}

export async function fetchCocktailsByIngredient(
  ingredientId: number | string
): Promise<CocktailsResponse> {
  const { data } = await httpClient.get<CocktailsResponse>(
    API_ROUTES.searchCocktails(ingredientId)
  );
  return data;
}

export async function createCocktail(payload: CocktailInput): Promise<Cocktail> {
  const { data } = await httpClient.post<Cocktail>(API_ROUTES.cocktails, payload);
  return data;
}

export async function updateCocktail(
  id: number | string,
  payload: CocktailInput
): Promise<Cocktail> {
  const { data } = await httpClient.put<Cocktail>(API_ROUTES.cocktail(id), payload);
  return data;
}

export async function deleteCocktail(id: number | string): Promise<void> {
  await httpClient.delete(API_ROUTES.cocktail(id));
}
