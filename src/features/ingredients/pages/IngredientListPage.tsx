import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppLayout, EmptyState, Loader } from "@shared/components";
import type { Ingredient } from "@shared/types";
import { useToast } from "@shared/hooks";

import { useAuth } from "@features/auth/hooks";

import {
  IngredientCocktailsPanel,
  IngredientFilters,
  IngredientSkeletonTable,
  IngredientTable,
} from "../components";
import {
  useDeleteIngredientMutation,
  useIngredients,
} from "../queries";

const NAVIGATION_ITEMS = [
  { to: "/app/dashboard", label: "Panel" },
  { to: "/app/cocktails", label: "Cocktails" },
  { to: "/app/ingredients", label: "Ingredientes" },
];

export function IngredientListPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { scopes } = useAuth();

  const ingredientsQuery = useIngredients();
  const deleteMutation = useDeleteIngredientMutation();

  const [classification, setClassification] = useState<
    "all" | "alcoholic" | "soda" | "juice" | "garnish"
  >("all");
  const [search, setSearch] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  const isAdmin = scopes.includes("admin");

  const filteredIngredients = useMemo(() => {
    if (!ingredientsQuery.data) return [];

    return ingredientsQuery.data.filter((ingredient) => {
      const matchesClassification =
        classification === "all" || ingredient.classification === classification;

      const matchesSearch = ingredient.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesClassification && matchesSearch;
    });
  }, [classification, ingredientsQuery.data, search]);

  function handleCreate() {
    if (!isAdmin) {
      toast({
        title: "Acceso restringido",
        description: "Solo los administradores pueden crear ingredientes.",
        variant: "error",
      });
      return;
    }
    navigate("/app/ingredients/new");
  }

  function handleEdit(ingredientId: number) {
    navigate(`/app/ingredients/${ingredientId}/edit`);
  }

  function handleViewCocktails(ingredient: Ingredient) {
    setSelectedIngredient(ingredient);
  }

  async function handleDelete(ingredientId: number, name: string) {
    const confirmed = window.confirm(
      `Seguro que deseas eliminar ${name}? Esta accion no se puede deshacer.`
    );
    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync(ingredientId);
      toast({
        title: "Ingrediente eliminado",
        description: `${name} ya no esta disponible en la despensa.`,
        variant: "success",
      });
    } catch {
      toast({
        title: "No se pudo eliminar",
        description: "Intenta de nuevo en unos segundos.",
        variant: "error",
      });
    }
  }

  if (ingredientsQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loader label="Cargando la despensa..." />
      </div>
    );
  }

  return (
    <AppLayout
      navigation={NAVIGATION_ITEMS}
      title="Despensa de Ingredientes"
      description="Gestiona el inventario de la barra, su origen y contenido alcoholico."
      actions={
        <button
          type="button"
          onClick={handleCreate}
          disabled={!isAdmin}
          className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Nuevo ingrediente
        </button>
      }
    >
      <section className="space-y-6">
        <IngredientFilters
          classification={classification}
          onClassificationChange={setClassification}
          search={search}
          onSearchChange={setSearch}
        />

        {ingredientsQuery.isFetching ? <IngredientSkeletonTable /> : null}

        {ingredientsQuery.isError ? (
          <EmptyState
            title="No se pudo cargar la despensa"
            description="Revisa tu conexion a internet y vuelve a intentarlo."
          />
        ) : null}

        {ingredientsQuery.isSuccess ? (
          filteredIngredients.length ? (
            <IngredientTable
              ingredients={filteredIngredients}
              isAdmin={isAdmin}
              onEdit={(ingredient) => handleEdit(ingredient.id)}
              onDelete={(ingredient) => handleDelete(ingredient.id, ingredient.name)}
              onViewCocktails={handleViewCocktails}
            />
          ) : (
            <EmptyState
              title="No encontramos ingredientes"
              description="Prueba cambiando los filtros o registra uno nuevo para empezar."
              action={
                isAdmin ? (
                  <button
                    type="button"
                    onClick={handleCreate}
                    className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
                  >
                    Crear ingrediente
                  </button>
                ) : null
              }
            />
          )
        ) : null}
      </section>

      {selectedIngredient ? (
        <IngredientCocktailsPanel
          ingredient={selectedIngredient}
          onClose={() => setSelectedIngredient(null)}
        />
      ) : null}
    </AppLayout>
  );
}
