const ACCESS_TOKEN_KEY = "itdrinks.accessToken";

export const tokenStorage = {
  getToken(): string | null {
    try {
      return window.localStorage.getItem(ACCESS_TOKEN_KEY);
    } catch {
      return null;
    }
  },
  setToken(token: string) {
    try {
      window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch {
      // ignore storage errors (private mode, quota, etc.)
    }
  },
  clearToken() {
    try {
      window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    } catch {
      // ignore storage errors
    }
  },
};

export function getAccessTokenKey() {
  return ACCESS_TOKEN_KEY;
}
