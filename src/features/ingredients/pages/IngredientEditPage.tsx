import { useNavigate, useParams } from "react-router-dom";

import { AppLayout, ErrorState, Loader } from "@shared/components";
import { useToast } from "@shared/hooks";

import { useAuth } from "@features/auth/hooks";

import { IngredientForm } from "../components";
import {
  useDeleteIngredientMutation,
  useIngredient,
  useUpdateIngredientMutation,
} from "../queries";

const NAVIGATION_ITEMS = [
  { to: "/app/dashboard", label: "Panel" },
  { to: "/app/cocktails", label: "Cocteles" },
  { to: "/app/ingredients", label: "Ingredientes" },
];

export function IngredientEditPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { scopes } = useAuth();

  const ingredientId = params.id ?? "";
  const isAdmin = scopes.includes("admin");

  const ingredientQuery = useIngredient(ingredientId);
  const updateMutation = useUpdateIngredientMutation(ingredientId);
  const deleteMutation = useDeleteIngredientMutation();

  if (!isAdmin) {
    return (
      <AppLayout
        navigation={NAVIGATION_ITEMS}
        title="Acceso restringido"
        description="Solo los administradores pueden editar ingredientes."
      >
        <ErrorState message="Contacta con un administrador para solicitar acceso." />
      </AppLayout>
    );
  }

  if (ingredientQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loader label="Cargando ingrediente..." />
      </div>
    );
  }

  if (ingredientQuery.isError || !ingredientQuery.data) {
    return (
      <AppLayout
        navigation={NAVIGATION_ITEMS}
        title="Ingrediente no disponible"
        description="Es posible que haya sido eliminado."
      >
        <ErrorState
          action={
            <button
              type="button"
              onClick={() => navigate("/app/ingredients")}
              className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Volver al listado
            </button>
          }
        />
      </AppLayout>
    );
  }

  const ingredient = ingredientQuery.data;

  async function handleUpdate(values: Parameters<typeof updateMutation.mutateAsync>[0]) {
    try {
      const updated = await updateMutation.mutateAsync(values);
      toast({
        title: "Ingrediente actualizado",
        description: `${updated.name} se ha guardado correctamente.`,
        variant: "success",
      });
      navigate("/app/ingredients", { replace: true });
    } catch {
      toast({
        title: "No se pudo actualizar",
        description: "Revisa los datos e intenta nuevamente.",
        variant: "error",
      });
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Seguro que deseas eliminar ${ingredient.name}? Esta accion no se puede deshacer.`
    );
    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync(ingredient.id);
      toast({
        title: "Ingrediente eliminado",
        description: `${ingredient.name} ya no esta disponible.`,
        variant: "success",
      });
      navigate("/app/ingredients", { replace: true });
    } catch {
      toast({
        title: "No se pudo eliminar",
        description: "Intenta de nuevo en unos segundos.",
        variant: "error",
      });
    }
  }

  return (
    <AppLayout
      navigation={NAVIGATION_ITEMS}
      title={`Editar ${ingredient.name}`}
      description="Actualiza clasificacion, origen y contenido alcoholico."
      actions={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
          >
            Volver
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="rounded-full border border-red-500/70 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/10 disabled:opacity-50"
          >
            {deleteMutation.isPending ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      }
    >
      <section className="space-y-6">
        <IngredientForm
          ingredient={ingredient}
          submitLabel="Guardar cambios"
          onSubmit={handleUpdate}
          onCancel={() => navigate(-1)}
          isSaving={updateMutation.isPending}
        />
      </section>
    </AppLayout>
  );
}
