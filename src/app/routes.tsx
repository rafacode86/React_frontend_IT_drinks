import { createBrowserRouter } from "react-router-dom";

const landingElement = (
  <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-slate-950 text-slate-100">
    <h1 className="text-3xl font-semibold">IT Drinks</h1>
    <p className="text-sm text-slate-400">
      Estructura base lista. Agrega tus rutas de funcionalidades aqui.
    </p>
  </div>
);

const notFoundElement = (
  <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-slate-950 text-slate-100">
    <h1 className="text-2xl font-semibold">404</h1>
    <p className="text-sm text-slate-400">Esta ruta todavia no existe.</p>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: landingElement,
    errorElement: notFoundElement,
  },
  {
    path: "*",
    element: notFoundElement,
  },
]);
