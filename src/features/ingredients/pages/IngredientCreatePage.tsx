import { useNavigate } from "react-router-dom";

import { AppLayout } from "@shared/components";
import { useToast } from "@shared/hooks";

import { useAuth } from "@features/auth/hooks";

import { IngredientForm } from "../components";
import { useCreateIngredientMutation } from "../queries";

const NAVIGATION_ITEMS = [
  { to: "/app/dashboard", label: "Panel" },
  { to: "/app/cocktails", label: "Cocktails" },
  { to: "/app/ingredients", label: "Ingredientes" },
];

export function IngredientCreatePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { scopes } = useAuth();
  const createMutation = useCreateIngredientMutation();

  const isAdmin = scopes.includes("admin");

  async function handleSubmit(values: Parameters<typeof createMutation.mutateAsync>[0]) {
    if (!isAdmin) {
      toast({
        title: "Acceso restringido",
        description: "Solo los administradores pueden crear ingredientes.",
        variant: "error",
      });
      return;
    }

    try {
      const ingredient = await createMutation.mutateAsync(values);
      toast({
        title: "Ingrediente creado",
        description: `${ingredient.name} ya esta disponible para tus recetas.`,
        variant: "success",
      });
      navigate("/app/ingredients", { replace: true });
    } catch {
      toast({
        title: "No se pudo crear el ingrediente",
        description: "Verifica los datos e intenta nuevamente.",
        variant: "error",
      });
    }
  }

  return (
    <AppLayout
      navigation={NAVIGATION_ITEMS}
      title="Nuevo ingrediente"
      description="Registra los detalles de cada ingrediente para mantener la carta actualizada."
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
        <IngredientForm
          submitLabel="Crear ingrediente"
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
          isSaving={createMutation.isPending}
        />
      </section>
    </AppLayout>
  );
}
