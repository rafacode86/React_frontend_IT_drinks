import type { Ingredient } from "./ingredient";

export interface CocktailIngredientPivot {
  measure_ml: number;
}

export interface CocktailIngredient extends Ingredient {
  pivot: CocktailIngredientPivot;
}

export interface Cocktail {
  id: number;
  name: string;
  description?: string | null;
  type?: string | null;
  ingredients: CocktailIngredient[];
  created_at?: string;
  updated_at?: string;
}
