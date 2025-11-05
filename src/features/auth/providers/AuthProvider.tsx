import { ReactNode, useState } from "react";

import { useToast } from "@shared/hooks";
import { tokenStorage } from "@shared/lib/http";
import type { UserRole } from "@shared/types";

import { AuthContext, type AuthContextValue } from "../context";
import {
  useCurrentUser,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} from "../queries";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [scopes, setScopes] = useState<UserRole[]>(() =>
    tokenStorage.getScopes() as UserRole[]
  );
  const { toast } = useToast();

  const hasToken = Boolean(tokenStorage.getToken());

  const currentUserQuery = useCurrentUser({
    enabled: hasToken,
  });
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const logoutMutation = useLogoutMutation();

  async function login(credentials: Parameters<AuthContextValue["login"]>[0]) {
    try {
      const response = await loginMutation.mutateAsync(credentials);
      if (response.scopes) {
        setScopes(response.scopes);
      }
      return response.user;
    } catch (error) {
      showAuthError();
      throw error;
    }
  }

  async function register(
    payload: Parameters<AuthContextValue["register"]>[0]
  ) {
    try {
      const response = await registerMutation.mutateAsync(payload);
      if (response.scopes) {
        setScopes(response.scopes);
      }
      return response.user;
    } catch (error) {
      showAuthError();
      throw error;
    }
  }

  async function logout() {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      toast({
        title: "No se pudo cerrar sesion",
        description: "Vuelve a intentarlo en unos segundos.",
        variant: "error",
      });
      throw error;
    } finally {
      setScopes([]);
    }
  }

  function showAuthError() {
    toast({
      title: "No se pudo completar la autenticacion",
      description: "Verifica tus credenciales e intentalo de nuevo.",
      variant: "error",
    });
  }

  const value: AuthContextValue = {
    user: currentUserQuery.data ?? null,
    scopes,
    isAuthenticated: Boolean(currentUserQuery.data),
    isLoading:
      currentUserQuery.isLoading ||
      loginMutation.isPending ||
      registerMutation.isPending ||
      logoutMutation.isPending,
    isError: currentUserQuery.isError,
    error: currentUserQuery.error ?? null,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
