import { useParams, useNavigate } from "react-router-dom";

import { AppLayout, EmptyState, Loader } from "@shared/components";

import { useAuth } from "@features/auth/hooks";

import {
  CocktailHero,
  IngredientList,
} from "../components";
import { useCocktail } from "../queries";

const NAVIGATION_ITEMS = [
  { to: "/app/dashboard", label: "Panel" },
  { to: "/app/cocktails", label: "Cocteles" },
  { to: "/app/ingredients", label: "Ingredientes" },
];

export function CocktailDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { scopes } = useAuth();

  const cocktailId = params.id ?? "";
  const isAdmin = scopes.includes("admin");

  const cocktailQuery = useCocktail(cocktailId);

  if (cocktailQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loader label="Shaking la copa..." />
      </div>
    );
  }

  if (cocktailQuery.isError || !cocktailQuery.data) {
    return (
      <AppLayout
        navigation={NAVIGATION_ITEMS}
        title="Cocktail no disponible"
        description="No encontramos la receta que estabas buscando."
      >
        <EmptyState
          title="No pudimos encontrar el cocktail"
          description="Puede que haya sido eliminado o que la URL sea incorrecta."
          action={
            <button
              type="button"
              onClick={() => navigate("/app/cocktails")}
              className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Volver a la carta
            </button>
          }
        />
      </AppLayout>
    );
  }

  const cocktail = cocktailQuery.data;

  return (
    <AppLayout
      navigation={NAVIGATION_ITEMS}
      title="Detalle del Cocktail"
      description="Descubre ingredientes, medidas y notas para replicar la mezcla perfecta."
      actions={
        isAdmin ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(`/app/cocktails/${cocktail.id}/edit`)}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-sky-500/70 hover:text-white"
            >
              Editar
            </button>
          </div>
        ) : null
      }
    >
      <div className="space-y-8">
        <CocktailHero cocktail={cocktail} />
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/40">
          <h2 className="text-lg font-semibold text-white">Ingredientes</h2>
          <p className="mt-1 text-sm text-slate-400">
            Sigue las medidas para mantener el balance perfecto.
          </p>
          <div className="mt-4">
            <IngredientList ingredients={cocktail.ingredients} />
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
