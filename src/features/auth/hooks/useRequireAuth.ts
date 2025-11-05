import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import type { UserRole } from "@shared/types";

import { useAuth } from "./useAuth";

type Options = {
  redirectTo?: string;
  roles?: UserRole[];
};

export function useRequireAuth(options?: Options) {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    if (auth.isLoading) return;

    if (!auth.isAuthenticated) {
      navigate(options?.redirectTo ?? "/login", {
        replace: true,
        state: {
          from: location,
        },
      });
    }
  }, [
    auth.isAuthenticated,
    auth.isLoading,
    location,
    navigate,
    options?.redirectTo,
  ]);

  const hasRole = options?.roles
    ? options.roles.some((role) => auth.scopes.includes(role))
    : true;

  return {
    ...auth,
    hasRole,
  };
}
