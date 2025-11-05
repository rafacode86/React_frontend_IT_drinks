import { useNavigate, useParams } from "react-router-dom";

import { AppLayout, ErrorState, Loader } from "@shared/components";
import { useToast } from "@shared/hooks";

import { useAuth } from "@features/auth/hooks";

import { CocktailForm } from "../components";
import {
  useCocktail,
  useDeleteCocktailMutation,
  useUpdateCocktailMutation,
} from "../queries";

const NAVIGATION_ITEMS = [
  { to: "/app/dashboard", label: "Panel" },
  { to: "/app/cocktails", label: "Cocteles" },
  { to: "/app/ingredients", label: "Ingredientes" },
];

export function CocktailEditPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { scopes } = useAuth();

  const cocktailId = params.id ?? "";
  const isAdmin = scopes.includes("admin");

  const cocktailQuery = useCocktail(cocktailId);
  const updateMutation = useUpdateCocktailMutation(cocktailId);
  const deleteMutation = useDeleteCocktailMutation();

  if (!isAdmin) {
    return (
      <AppLayout
        navigation={NAVIGATION_ITEMS}
        title="Acceso restringido"
        description="Solo los administradores pueden editar cocteles."
      >
        <ErrorState message="Contacta con un administrador para solicitar acceso." />
      </AppLayout>
    );
  }

  if (cocktailQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loader label="Preparando la receta..." />
      </div>
    );
  }

  if (cocktailQuery.isError || !cocktailQuery.data) {
    return (
      <AppLayout
        navigation={NAVIGATION_ITEMS}
        title="No encontramos el cocktail"
        description="Es posible que haya sido eliminado."
      >
        <ErrorState
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

  async function handleUpdate(values: Parameters<typeof updateMutation.mutateAsync>[0]) {
    const updated = await updateMutation.mutateAsync(values);
    toast({
      title: "Cocktail actualizado",
      description: `${updated.name} ha sido guardado correctamente.`,
      variant: "success",
    });
    navigate(`/app/cocktails/${updated.id}`, { replace: true });
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Seguro que deseas eliminar este cocktail? Esta accion no se puede deshacer."
    );
    if (!confirmed) return;

    await deleteMutation.mutateAsync(cocktail.id);
    toast({
      title: "Cocktail eliminado",
      description: `${cocktail.name} ya no forma parte de la carta.`,
      variant: "success",
    });
    navigate("/app/cocktails", { replace: true });
  }

  return (
    <AppLayout
      navigation={NAVIGATION_ITEMS}
      title={`Editar ${cocktail.name}`}
      description="Actualiza ingredientes, proporciones y notas del cocktail."
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
            className="rounded-full border border-red-500/70 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/10 disabled:opacity-50"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      }
    >
      <section className="space-y-6">
        <CocktailForm
          cocktail={cocktail}
          submitLabel="Guardar cambios"
          onSubmit={handleUpdate}
          onCancel={() => navigate(-1)}
          isSaving={updateMutation.isPending}
        />
      </section>
    </AppLayout>
  );
}
