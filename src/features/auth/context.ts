import { createContext, useContext } from "react";

import type { AuthCredentials, RegisterPayload, User, UserRole } from "@shared/types";

export type AuthContextValue = {
  user: User | null;
  scopes: UserRole[];
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  login: (credentials: AuthCredentials) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
}
