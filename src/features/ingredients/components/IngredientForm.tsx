import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import type {
  Ingredient,
  IngredientClassification,
  IngredientInput,
} from "@shared/types";

const ingredientSchema = z
  .object({
    name: z.string().nonempty("El nombre es obligatorio"),
    type: z
      .string()
      .optional()
      .or(z.literal("").transform(() => undefined)),
    origin: z
      .string()
      .optional()
      .or(z.literal("").transform(() => undefined)),
    classification: z.enum(["alcoholic", "soda", "juice", "garnish"]),
    alcohol_content: z
      .number({ invalid_type_error: "Introduce el contenido alcoholico" })
      .min(0, "Debe ser igual o mayor a 0")
      .max(100, "No puede superar 100")
      .or(z.nan())
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.classification === "alcoholic" && data.alcohol_content === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["alcohol_content"],
        message: "Introduce el contenido alcoholico",
      });
    }
  });

type IngredientFormValues = z.infer<typeof ingredientSchema>;

const CLASSIFICATION_LABELS: Record<IngredientClassification, string> = {
  alcoholic: "Alcoholico",
  soda: "Soda",
  juice: "Jugo",
  garnish: "Garnish",
};

type IngredientFormProps = {
  ingredient?: Ingredient;
  submitLabel?: string;
  onSubmit: (values: IngredientInput) => Promise<void>;
  onCancel?: () => void;
  isSaving?: boolean;
};

function mapIngredientToValues(ingredient?: Ingredient): IngredientFormValues {
  if (!ingredient) {
    return {
      name: "",
      type: undefined,
      origin: undefined,
      classification: "alcoholic",
      alcohol_content: 0,
    };
  }

  return {
    name: ingredient.name,
    type: ingredient.type ?? undefined,
    origin: ingredient.origin ?? undefined,
    classification: ingredient.classification,
    alcohol_content: ingredient.alcohol_content,
  };
}

export function IngredientForm({
  ingredient,
  submitLabel = "Guardar",
  onSubmit,
  onCancel,
  isSaving,
}: IngredientFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<IngredientFormValues>({
    mode: "onBlur",
    resolver: zodResolver(ingredientSchema),
    defaultValues: mapIngredientToValues(ingredient),
  });

  const classification = watch("classification");

  const submitting = isSubmitting || isSaving;

  async function handleFormSubmit(values: IngredientFormValues) {
    const payload: IngredientInput = {
      name: values.name,
      type: values.type,
      origin: values.origin,
      classification: values.classification,
      alcohol_content:
        values.classification === "alcoholic"
          ? (values.alcohol_content ?? 0)
          : 0,
    };

    await onSubmit(payload);
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 text-slate-200"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
            Nombre
          </label>
          <input
            className="rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-white outline-none transition focus:border-sky-500"
            placeholder="Ej. Ron Blanco"
            {...register("name")}
          />
          {errors.name ? (
            <p className="text-xs text-red-400">{errors.name.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
            Tipo
          </label>
          <input
            className="rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-white outline-none transition focus:border-sky-500"
            placeholder="Spirit, Mixer..."
            {...register("type")}
          />
          {errors.type ? (
            <p className="text-xs text-red-400">{errors.type.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
            Origen
          </label>
          <input
            className="rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-white outline-none transition focus:border-sky-500"
            placeholder="Pais o region"
            {...register("origin")}
          />
          {errors.origin ? (
            <p className="text-xs text-red-400">{errors.origin.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
            Clasificacion
          </label>
          <select
            className="rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-white outline-none transition focus:border-sky-500"
            {...register("classification")}
          >
            {(
              Object.keys(CLASSIFICATION_LABELS) as IngredientClassification[]
            ).map((value) => (
              <option key={value} value={value}>
                {CLASSIFICATION_LABELS[value]}
              </option>
            ))}
          </select>
          {errors.classification ? (
            <p className="text-xs text-red-400">
              {errors.classification.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
          Contenido alcoholico (%)
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="100"
          disabled={classification !== "alcoholic"}
          className="rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-white outline-none transition disabled:cursor-not-allowed disabled:opacity-50 focus:border-sky-500"
          {...register("alcohol_content", { valueAsNumber: true })}
        />
        {errors.alcohol_content ? (
          <p className="text-xs text-red-400">
            {errors.alcohol_content.message}
          </p>
        ) : null}
      </div>

      <div className="flex justify-end gap-3">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
            disabled={submitting}
          >
            Cancelar
          </button>
        ) : null}
        <button
          type="submit"
          className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? "Guardando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
