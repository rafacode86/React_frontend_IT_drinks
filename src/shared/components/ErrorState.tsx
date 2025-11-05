import { ReactNode } from "react";

type ErrorStateProps = {
  title?: string;
  message?: string;
  action?: ReactNode;
};

export function ErrorState({
  title = "Algo salio mal",
  message = "Intenta recargar la pagina o vuelve mas tarde.",
  action,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-8 text-center text-red-200 shadow-inner shadow-red-900/40">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-red-200/80">{message}</p>
      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  );
}
