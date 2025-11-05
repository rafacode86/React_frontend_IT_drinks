import { twMerge } from "tailwind-merge";

type LoaderProps = {
  className?: string;
  label?: string;
};

export function Loader({ className, label }: LoaderProps) {
  return (
    <div className={twMerge("flex flex-col items-center gap-3", className)}>
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-slate-600 border-t-sky-500" />
      {label ? (
        <span className="text-sm font-medium text-slate-400">{label}</span>
      ) : null}
    </div>
  );
}
