import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type NavigationItem = {
  to: string;
  label: string;
  icon?: ReactNode;
};

type AppLayoutProps = {
  title?: string;
  description?: string;
  navigation: NavigationItem[];
  footer?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
};

export function AppLayout({
  title = "IT Drinks",
  description = "Gestiona recetas, ingredientes y experiencias.",
  navigation,
  actions,
  footer,
  children,
}: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="relative overflow-hidden border-b border-slate-800 bg-slate-900/80">
        <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_top,rgba(56,189,248,0.35),transparent_55%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-6">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              Cocktail Studio
            </span>
            <h1 className="text-2xl font-semibold text-white md:text-3xl">
              {title}
            </h1>
            {description ? (
              <p className="text-sm text-slate-400 md:text-base">
                {description}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden rounded-full border border-slate-800 bg-slate-900/70 p-1 text-sm md:flex">
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "inline-flex items-center gap-2 rounded-full px-4 py-2 transition",
                      isActive
                        ? "bg-sky-500/90 text-white shadow-lg shadow-sky-500/30"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/70",
                    ].join(" ")
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
            {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
          </div>
        </div>
        <nav className="relative mx-auto flex w-full max-w-6xl gap-2 px-4 pb-4 md:hidden">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex-1 rounded-lg border px-3 py-2 text-center text-sm transition",
                  isActive
                    ? "border-sky-500/80 bg-sky-500/90 text-white shadow-lg shadow-sky-500/30"
                    : "border-slate-800 bg-slate-900/80 text-slate-300 hover:border-sky-600/50 hover:text-white",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 md:px-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/60 backdrop-blur">
          {children}
        </div>
      </main>
      {footer ? (
        <footer className="border-t border-slate-800 bg-slate-900/80">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-xs text-slate-500">
            {footer}
          </div>
        </footer>
      ) : null}
    </div>
  );
}
