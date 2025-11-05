import { API_ROUTES } from "@shared/constants";
import { httpClient } from "@shared/lib/http";
import type { Cocktail } from "@shared/types";

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
