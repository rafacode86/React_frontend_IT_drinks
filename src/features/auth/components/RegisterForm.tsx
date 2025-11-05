import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { useToast } from "@shared/hooks";

import { useAuth } from "../hooks";

const registerSchema = z
  .object({
    name: z.string().nonempty("El nombre es obligatorio"),
    email: z.string().nonempty("Introduce tu email").email("Email no valido"),
    password: z
      .string()
      .nonempty("La contrasena es obligatoria")
      .min(8, "Minimo 8 caracteres"),
    password_confirmation: z
      .string()
      .nonempty("Confirma la contrasena")
      .min(8, "Minimo 8 caracteres"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contrasenas no coinciden",
    path: ["password_confirmation"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const DEFAULT_VALUES: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export function RegisterForm() {
  const { register: registerUser, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<RegisterFormValues>({
    mode: "onSubmit",
    resolver: zodResolver(registerSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const submitting = isSubmitting || isLoading;

  const onSubmit = handleSubmit(async (values) => {
    try {
      await registerUser(values);
      toast({
        title: "Cuenta creada",
        description: "Te hemos autenticado automaticamente.",
        variant: "success",
      });
      reset();
      navigate("/app");
    } catch {
      setError("root", {
        type: "manual",
        message: "No pudimos crear tu cuenta. Intentalo de nuevo.",
      });
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-200" htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-500"
          {...register("name")}
        />
        {errors.name ? (
          <p className="text-sm text-red-400">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-200" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-500"
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-medium text-slate-200"
          htmlFor="password"
        >
          Contrasena
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-500"
          {...register("password")}
        />
        {errors.password ? (
          <p className="text-sm text-red-400">{errors.password.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-medium text-slate-200"
          htmlFor="password_confirmation"
        >
          Confirmar contrasena
        </label>
        <input
          id="password_confirmation"
          type="password"
          autoComplete="new-password"
          className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-500"
          {...register("password_confirmation")}
        />
        {errors.password_confirmation ? (
          <p className="text-sm text-red-400">
            {errors.password_confirmation.message}
          </p>
        ) : null}
      </div>

      {errors.root ? (
        <p className="text-sm text-red-400">{errors.root.message}</p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Creando cuenta..." : "Crear cuenta"}
      </button>
    </form>
  );
}
