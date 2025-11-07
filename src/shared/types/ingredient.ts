export type IngredientClassification =
  | "alcoholic"
  | "soda"
  | "juice"
  | "garnish";

export interface Ingredient {
  id: number;
  name: string;
  type?: string | null;
  origin?: string | null;
  classification: IngredientClassification;
  alcohol_content: number;
  created_at?: string;
  updated_at?: string;
}

export interface IngredientInput {
  name: string;
  type?: string | null;
  origin?: string | null;
  classification: IngredientClassification;
  alcohol_content?: number;
}
