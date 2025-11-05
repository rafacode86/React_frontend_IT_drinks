import type { User, UserRole } from "./user";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends AuthCredentials {
  name: string;
  password_confirmation: string;
}

export interface AuthResponse {
  message?: string;
  user: User;
  token: string;
  scopes?: UserRole[];
}
