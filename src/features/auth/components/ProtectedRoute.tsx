import { Navigate, Outlet, useLocation } from "react-router-dom";

import { Loader } from "@shared/components";
import type { UserRole } from "@shared/types";

import { useAuth } from "../hooks";

type ProtectedRouteProps = {
  roles?: UserRole[];
  redirectTo?: string;
};

export function ProtectedRoute({
  roles,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const location = useLocation();
  const { isAuthenticated, isLoading, scopes } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loader label="Cargando sesion..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  if (roles && roles.length > 0) {
    const hasRole = roles.some((role) => scopes.includes(role));
    if (!hasRole) {
      return <Navigate to="/app" replace />;
    }
  }

  return <Outlet />;
}

type PublicOnlyRouteProps = {
  redirectTo?: string;
};

export function PublicOnlyRoute({ redirectTo = "/app" }: PublicOnlyRouteProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
