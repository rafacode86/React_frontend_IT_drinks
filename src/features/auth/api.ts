import { API_ROUTES } from "@shared/constants";
import { httpClient } from "@shared/lib/http";
import type {
  AuthCredentials,
  AuthResponse,
  RegisterPayload,
  User,
} from "@shared/types";

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await httpClient.post<AuthResponse>(API_ROUTES.register, payload);
  return data;
}

export async function login(payload: AuthCredentials): Promise<AuthResponse> {
  const { data } = await httpClient.post<AuthResponse>(API_ROUTES.login, payload);
  return data;
}

export async function logout(): Promise<void> {
  await httpClient.post(API_ROUTES.logout);
}

type CurrentUserResponse = {
  message?: string;
  user: User;
};

export async function fetchCurrentUser(): Promise<User> {
  const { data } = await httpClient.get<CurrentUserResponse>(API_ROUTES.user);
  return data.user;
}
