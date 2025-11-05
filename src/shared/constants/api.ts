export const API_ROUTES = {
  register: "/register",
  login: "/login",
  logout: "/logout",
  user: "/user",
  cocktails: "/cocktails",
  cocktail: (id: number | string) => `/cocktails/${id}`,
  cocktailAlcohol: (id: number | string) => `/cocktails/${id}/alcohol`,
  searchCocktails: (ingredientId: number | string) => `/search/${ingredientId}`,
  ingredients: "/ingredients",
  ingredient: (id: number | string) => `/ingredients/${id}`,
} as const;
