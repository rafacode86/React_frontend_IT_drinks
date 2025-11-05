import { useNavigate } from "react-router-dom";

import { AppLayout } from "@shared/components";
import { useToast } from "@shared/hooks";

import { useAuth } from "@features/auth/hooks";

import { CocktailForm } from "../components";
import { useCreateCocktailMutation } from "../queries";

const NAVIGATION_ITEMS = [
  { to: "/app/dashboard", label: "Panel" },
  { to: "/app/cocktails", label: "Cocteles" },
  { to: "/app/ingredients", label: "Ingredientes" },
];

export function CocktailCreatePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { scopes } = useAuth();
  const createMutation = useCreateCocktailMutation();

  const isAdmin = scopes.includes("admin");

  async function handleSubmit(values: Parameters<typeof createMutation.mutateAsync>[0]) {
    if (!isAdmin) {
      toast({
        title: "Acceso restringido",
        description: "Solo los administradores pueden crear cocteles.",
        variant: "error",
      });
      return;
    }

    const cocktail = await createMutation.mutateAsync(values);
    toast({
      title: "Cocktail creado",
      description: `${cocktail.name} ya forma parte de la carta.`,
      variant: "success",
    });
    navigate(`/app/cocktails/${cocktail.id}`, { replace: true });
  }

  return (
    <AppLayout
      navigation={NAVIGATION_ITEMS}
      title="Nuevo Cocktail"
      description="Define la receta, los ingredientes y las cantidades necesarias."
      actions={
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
        >
          Volver
        </button>
      }
    >
      <section className="space-y-6">
        <CocktailForm
          submitLabel="Crear cocktail"
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
          isSaving={createMutation.isPending}
        />
      </section>
    </AppLayout>
  );
}
