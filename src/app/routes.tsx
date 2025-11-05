import { Link, createBrowserRouter } from "react-router-dom";

import { ProtectedRoute, PublicOnlyRoute } from "@features/auth/components/ProtectedRoute";
import { LoginPage } from "@features/auth/pages/LoginPage";
import { RegisterPage } from "@features/auth/pages/RegisterPage";

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

const appPlaceholder = (
  <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-950 text-slate-100">
    <h1 className="text-2xl font-semibold">Panel principal</h1>
    <p className="text-sm text-slate-400">
      Sustituye este placeholder con las vistas reales de tu aplicacion.
    </p>
  </div>
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
    element: <ProtectedRoute />,
    errorElement: notFoundElement,
    children: [
      {
        path: "/app",
        element: appPlaceholder,
      },
    ],
  },
  {
    path: "*",
    element: notFoundElement,
  },
]);
