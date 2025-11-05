import { Link, Navigate, createBrowserRouter } from "react-router-dom";

import { ProtectedRoute, PublicOnlyRoute } from "@features/auth/components/ProtectedRoute";
import { LoginPage } from "@features/auth/pages/LoginPage";
import { RegisterPage } from "@features/auth/pages/RegisterPage";
import { DashboardPage } from "@features/dashboard/pages/DashboardPage";

const landingElement = (
  <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-slate-950 text-slate-100">
    <h1 className="text-3xl font-semibold">IT Drinks</h1>
    <p className="text-sm text-slate-400">
      Estructura base lista. Agrega tus rutas de funcionalidades aqui.
    </p>
    <Link
      to="/login"
      className="mt-4 rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
    >
      Acceder a la aplicacion
    </Link>
  </div>
);

const notFoundElement = (
  <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-slate-950 text-slate-100">
    <h1 className="text-2xl font-semibold">404</h1>
    <p className="text-sm text-slate-400">Esta ruta todavia no existe.</p>
  </div>
);

const sectionPlaceholder = (title: string, description: string) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-10 text-center text-slate-200 shadow-lg shadow-slate-950/60">
    <h2 className="text-2xl font-semibold">{title}</h2>
    <p className="max-w-md text-sm text-slate-400">{description}</p>
  </div>
);

const cocktailsElement = sectionPlaceholder(
  "Modulo de cocteles",
  "Aqui apareceran las listas, fichas y creacion de recetas. Lo integraremos en el siguiente bloque."
);

const ingredientsElement = sectionPlaceholder(
  "Modulo de ingredientes",
  "Gestionaras inventario, clasificacion y contenido alcoholico de cada ingrediente."
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: landingElement,
    errorElement: notFoundElement,
  },
  {
    element: <PublicOnlyRoute />,
    errorElement: notFoundElement,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/app",
    element: <ProtectedRoute />,
    errorElement: notFoundElement,
    children: [
      {
        index: true,
        element: <Navigate to="/app/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "cocktails/*",
        element: cocktailsElement,
      },
      {
        path: "ingredients/*",
        element: ingredientsElement,
      },
    ],
  },
  {
    path: "*",
    element: notFoundElement,
  },
]);
