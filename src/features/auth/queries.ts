import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { tokenStorage } from "@shared/lib/http";
import type {
  AuthCredentials,
  AuthResponse,
  RegisterPayload,
  User,
} from "@shared/types";

import {
  fetchCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
} from "./api";

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

export function useCurrentUser(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: fetchCurrentUser,
    enabled: options?.enabled,
    staleTime: 1000 * 60 * 5,
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AuthCredentials) => loginRequest(payload),
    onSuccess: (response: AuthResponse) => {
      persistAuth(response);
      queryClient.setQueryData<User>(authKeys.user(), response.user);
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerRequest(payload),
    onSuccess: (response: AuthResponse) => {
      persistAuth(response);
      queryClient.setQueryData<User>(authKeys.user(), response.user);
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logoutRequest(),
    onSuccess: () => {
      tokenStorage.clearToken();
      queryClient.removeQueries({ queryKey: authKeys.all });
    },
  });
}

function persistAuth(response: AuthResponse) {
  tokenStorage.setToken(response.token);
  tokenStorage.setScopes(response.scopes ?? []);
}
