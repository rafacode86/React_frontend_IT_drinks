import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import type { Cocktail, CocktailInput } from "@shared/types";

const ingredientSchema = z.object({
  id: z
    .number({ invalid_type_error: "Ingresa un ID numerico" })
    .int("Debe ser un numero entero")
    .positive("El ID debe ser mayor a 0"),
  measure_ml: z
    .number({ invalid_type_error: "Ingresa la medida en ml" })
    .min(0, "La medida debe ser mayor o igual a 0"),
});

const cocktailSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  type: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  ingredients: z
    .array(ingredientSchema)
    .min(1, "Agrega al menos un ingrediente"),
});

type CocktailFormValues = z.infer<typeof cocktailSchema>;

type CocktailFormProps = {
  cocktail?: Cocktail;
  submitLabel?: string;
  onSubmit: (values: CocktailInput) => Promise<void>;
  onCancel?: () => void;
  isSaving?: boolean;
};

function mapCocktailToValues(cocktail?: Cocktail): CocktailFormValues {
  if (!cocktail) {
    return {
      name: "",
      description: "",
      type: "",
      ingredients: [{ id: 0, measure_ml: 0 }],
    };
  }

  return {
    name: cocktail.name,
    description: cocktail.description ?? "",
    type: cocktail.type ?? "",
    ingredients:
      cocktail.ingredients.length > 0
        ? cocktail.ingredients.map((ingredient) => ({
            id: ingredient.id,
            measure_ml: ingredient.pivot?.measure_ml ?? 0,
          }))
        : [{ id: 0, measure_ml: 0 }],
  };
}

export function CocktailForm({
  cocktail,
  submitLabel = "Guardar",
  onSubmit,
  onCancel,
  isSaving,
}: CocktailFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CocktailFormValues>({
    resolver: zodResolver(cocktailSchema),
    defaultValues: mapCocktailToValues(cocktail),
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const submitting = isSubmitting || isSaving;

  async function handleFormSubmit(values: CocktailFormValues) {
    const payload: CocktailInput = {
      name: values.name,
      description: values.description?.trim() || undefined,
      type: values.type?.trim() || undefined,
      ingredients: values.ingredients.map(({ id, measure_ml }) => ({
        id,
        measure_ml,
      })),
    };

    await onSubmit(payload);
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 text-slate-200"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
            Nombre
          </label>
          <input
            className="rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-white outline-none transition focus:border-sky-500"
            placeholder="Ej. Negroni"
            {...register("name")}
          />
          {errors.name ? (
            <p className="text-xs text-red-400">{errors.name.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
            Categoria
          </label>
          <input
            className="rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-white outline-none transition focus:border-sky-500"
            placeholder="Signature, Classic..."
            {...register("type")}
          />
          {errors.type ? (
            <p className="text-xs text-red-400">{errors.type.message}</p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
          Descripcion
        </label>
        <textarea
          rows={3}
          className="rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-500"
          placeholder="Notas de cata, aromas, sensaciones..."
          {...register("description")}
        />
        {errors.description ? (
          <p className="text-xs text-red-400">{errors.description.message}</p>
        ) : null}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              Ingredientes
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Usa los IDs existentes y especifica la medida en mililitros.
            </p>
          </div>
          <button
            type="button"
            onClick={() => append({ id: 0, measure_ml: 0 })}
            className="rounded-full border border-slate-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:border-sky-500/70 hover:text-white"
          >
            Anadir ingrediente
          </button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 md:grid-cols-[1fr,1fr,auto]"
            >
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  ID ingrediente
                </label>
                <input
                  type="number"
                  className="rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none transition focus:border-sky-500"
                  {...register(`ingredients.${index}.id`, {
                    valueAsNumber: true,
                  })}
                />
                {errors.ingredients?.[index]?.id ? (
                  <p className="text-xs text-red-400">
                    {errors.ingredients[index]?.id?.message}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  Medida (ml)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none transition focus:border-sky-500"
                  {...register(`ingredients.${index}.measure_ml`, {
                    valueAsNumber: true,
                  })}
                />
                {errors.ingredients?.[index]?.measure_ml ? (
                  <p className="text-xs text-red-400">
                    {errors.ingredients[index]?.measure_ml?.message}
                  </p>
                ) : null}
              </div>
              <div className="flex items-end justify-end">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="rounded-full border border-red-500/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-200 transition hover:bg-red-500/10 disabled:opacity-40"
                  disabled={fields.length === 1}
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>
        {errors.ingredients ? (
          <p className="text-xs text-red-400">{errors.ingredients.message}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
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
          disabled={submitting}
          className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Guardando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
