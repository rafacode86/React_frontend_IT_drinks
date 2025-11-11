import { Link } from "react-router-dom";

import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-slate-800 bg-slate-900/40 p-8 shadow-lg">
        <header className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold">Inicia sesion</h1>
          <p className="text-sm text-slate-400">
            Gestiona tus cocktails favoritos con IT Drinks.
          </p>
        </header>

        <LoginForm />

        <p className="text-center text-sm text-slate-400">
          No tienes cuenta?{" "}
          <Link
            to="/register"
            className="font-medium text-sky-400 hover:text-sky-300"
          >
            Registrate aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
