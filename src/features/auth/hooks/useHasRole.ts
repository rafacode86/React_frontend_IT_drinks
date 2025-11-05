import type { UserRole } from "@shared/types";

import { useAuth } from "./useAuth";

export function useHasRole(roles: UserRole | UserRole[]) {
  const { scopes } = useAuth();
  const list = Array.isArray(roles) ? roles : [roles];
  return list.some((role) => scopes.includes(role));
}
