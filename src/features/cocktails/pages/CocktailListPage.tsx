import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { EmptyState, AppLayout } from "@shared/components";
import { usePaginationParams, useToast } from "@shared/hooks";

import { useAuth } from "@features/auth/hooks";

import {
  CocktailGrid,
  CocktailGridSkeleton,
} from "../components";
import { useCocktails } from "../queries";

const NAVIGATION_ITEMS = [
  { to: "/app/dashboard", label: "Panel" },
  { to: "/app/cocktails", label: "Cocktails" },
  { to: "/app/ingredients", label: "Ingredientes" },
];

export function CocktailListPage() {
  const navigate = useNavigate();
  const { isAuthenticated, scopes } = useAuth();
  const { toast } = useToast();
  const { pagination, updatePagination } = usePaginationParams();
  const [searchParams] = useSearchParams();
  const [selectedIngredient] = useState(searchParams.get("ingredient") ?? "");

  const isAdmin = scopes.includes("admin");

  const cocktailsQuery = useCocktails({
    page: pagination.page,
    limit: pagination.limit,
    ingredient: selectedIngredient,
  });

  function handleCreate() {
    if (!isAdmin) {
      toast({
        title: "Acceso restringido",
        description: "Solo los administradores pueden crear cocktails.",
        variant: "error",
      });
      return;
    }

    navigate("/app/cocktails/new");
  }

  return (
    <AppLayout
      title="Carta de Cocktails"
      description="Disfruta una coleccion de recetas curadas para cualquier ocasion."
      navigation={NAVIGATION_ITEMS}
      actions={
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!isAdmin}
        >
          Nuevo cocktail
        </button>
      }
    >
      <section className="space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Cocktails destacados
            </h2>
            <p className="text-sm text-slate-400">
              Utiliza los filtros para encontrar la mezcla perfecta.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Pagina {pagination.page}</span>
            <button
              type="button"
              onClick={() =>
                updatePagination({ page: Math.max(1, pagination.page - 1) })
              }
              className="rounded-full border border-slate-800 px-3 py-1 transition hover:border-sky-500/60 hover:text-white"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => updatePagination({ page: pagination.page + 1 })}
              className="rounded-full border border-slate-800 px-3 py-1 transition hover:border-sky-500/60 hover:text-white"
            >
              Siguiente
            </button>
          </div>
        </header>

        {cocktailsQuery.isLoading ? (
          <CocktailGridSkeleton />
        ) : null}

        {cocktailsQuery.isError ? (
          <EmptyState
            title="No se pudo cargar la carta"
            description="Verifica tu conexion o vuelve a intentarlo mas tarde."
          />
        ) : null}

        {cocktailsQuery.isSuccess ? (
          cocktailsQuery.data.length ? (
            <CocktailGrid cocktails={cocktailsQuery.data} />
          ) : (
            <EmptyState
              title="No hay cocktails disponibles"
              description="Empieza creando tu primera receta o agrega ingredientes para inspirarte."
              action={
                isAuthenticated ? (
                  <button
                    type="button"
                    onClick={handleCreate}
                    className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
                  >
                    Crear cocktail
                  </button>
                ) : null
              }
            />
          )
        ) : null}
      </section>
    </AppLayout>
  );
}
