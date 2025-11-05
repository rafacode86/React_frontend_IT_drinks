export type UserRole = "admin" | "user";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
}
