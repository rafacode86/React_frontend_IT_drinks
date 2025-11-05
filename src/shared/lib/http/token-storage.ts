const ACCESS_TOKEN_KEY = "itdrinks.accessToken";
const ACCESS_SCOPES_KEY = "itdrinks.accessScopes";

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
      window.localStorage.removeItem(ACCESS_SCOPES_KEY);
    } catch {
      // ignore storage errors
    }
  },
  setScopes(scopes: string[]) {
    try {
      window.localStorage.setItem(ACCESS_SCOPES_KEY, JSON.stringify(scopes));
    } catch {
      // ignore storage errors
    }
  },
  getScopes(): string[] {
    try {
      const stored = window.localStorage.getItem(ACCESS_SCOPES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },
};

export function getAccessTokenKey() {
  return ACCESS_TOKEN_KEY;
}

export function getAccessScopesKey() {
  return ACCESS_SCOPES_KEY;
}
