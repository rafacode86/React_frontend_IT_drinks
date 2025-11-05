import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { AppLayout, ErrorState, Loader } from "@shared/components";

import { useAuth } from "@features/auth/hooks";

const NAVIGATION_ITEMS = [
  { to: "/app/dashboard", label: "Panel" },
  { to: "/app/cocktails", label: "Cocteles" },
  { to: "/app/ingredients", label: "Ingredientes" },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout, isLoading, isError, error } = useAuth();

  const navigation = useMemo(() => NAVIGATION_ITEMS, []);

  async function handleLogout() {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      // error feedback already managed in provider toast
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loader label="Preparando el bar..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <ErrorState
          title="No pudimos cargar tu sesion"
          message={
            error instanceof Error
              ? error.message
              : "Intenta iniciar sesion nuevamente."
          }
          action={
            <button
              type="button"
              onClick={() => navigate("/login", { replace: true })}
              className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Volver al login
            </button>
          }
        />
      </div>
    );
  }

  return (
    <AppLayout
      navigation={navigation}
      actions={
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">
            {user?.role ?? "user"}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-red-500/60 hover:text-white"
          >
            Cerrar sesion
          </button>
        </div>
      }
      footer={
        <>
          <span>IT Drinks - Cocktail Experience Studio</span>
          <span className="text-slate-600">
            {new Date().getFullYear()} - Crafted with sabor
          </span>
        </>
      }
    >
      <section className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900 to-slate-950 p-6 shadow-xl shadow-slate-950/60">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
              Bienvenido de nuevo
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              {user?.name ?? "Mixologo"}
            </h2>
            <p className="mt-4 max-w-xl text-sm text-slate-300 md:text-base">
              Explora el catalogo de cocteles, administra ingredientes y crea
              experiencias memorables para tu barra digital.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/app/cocktails")}
                className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
              >
                Crear coctel
              </button>
              <button
                type="button"
                onClick={() => navigate("/app/ingredients")}
                className="rounded-full border border-slate-700 bg-transparent px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-sky-500/70 hover:text-white"
              >
                Ver ingredientes
              </button>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/40">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
              Ultima actividad
            </h3>
            <div className="mt-4 space-y-4 text-sm text-slate-300">
              <p>
                Personaliza esta seccion con tus ultimos cocteles, borradores o
                recetas destacadas para el equipo.
              </p>
              <p className="text-slate-500">
                En proximos pasos puedes integrar datos reales con TanStack
                Query y tus endpoints backend.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Cocteles",
              hint: "Explora, edita y publica cada receta de la carta.",
            },
            {
              label: "Ingredientes",
              hint: "Controla inventario y porcentajes de alcohol.",
            },
            {
              label: "Favoritos",
              hint: "Destaca las mezclas preferidas de la casa.",
            },
            {
              label: "Eventos",
              hint: "Planifica catas, talleres y experiencias privadas.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 shadow-lg shadow-slate-950/40 transition hover:border-sky-500/60 hover:shadow-sky-500/20"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                {item.label}
              </p>
              <p className="mt-2 text-sm text-slate-300">{item.hint}</p>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
