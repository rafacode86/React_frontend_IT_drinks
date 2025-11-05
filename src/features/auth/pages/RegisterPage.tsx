import { Link } from "react-router-dom";

import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-slate-800 bg-slate-900/40 p-8 shadow-lg">
        <header className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold">Crea tu cuenta</h1>
          <p className="text-sm text-slate-400">
            Unete para acceder al recetario de cocteles.
          </p>
        </header>

        <RegisterForm />

        <p className="text-center text-sm text-slate-400">
          Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="font-medium text-sky-400 hover:text-sky-300"
          >
            Inicia sesion
          </Link>
        </p>
      </div>
    </div>
  );
}
