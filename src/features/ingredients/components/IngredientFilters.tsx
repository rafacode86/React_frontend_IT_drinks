import type { IngredientClassification } from "@shared/types";

const CLASSIFICATIONS: Array<{ value: IngredientClassification; label: string }> = [
  { value: "alcoholic", label: "Alcoholico" },
  { value: "soda", label: "Soda" },
  { value: "juice", label: "Jugo" },
  { value: "garnish", label: "Garnish" },
];

type IngredientFiltersProps = {
  classification?: IngredientClassification | "all";
  onClassificationChange: (classification: IngredientClassification | "all") => void;
  search?: string;
  onSearchChange: (value: string) => void;
};

export function IngredientFilters({
  classification = "all",
  onClassificationChange,
  search = "",
  onSearchChange,
}: IngredientFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-slate-950/40 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por nombre..."
          className="flex-1 rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-white outline-none transition focus:border-sky-500"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onClassificationChange("all")}
          className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
            classification === "all"
              ? "border-sky-500/70 bg-sky-500/20 text-sky-100"
              : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-sky-500/40 hover:text-white"
          }`}
        >
          Todos
        </button>
        {CLASSIFICATIONS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onClassificationChange(item.value)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
              classification === item.value
                ? "border-sky-500/70 bg-sky-500/20 text-sky-100"
                : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-sky-500/40 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
