import axios from "axios";

import { tokenStorage } from "./token-storage";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

httpClient.interceptors.request.use((config) => {
  const token = tokenStorage.getToken();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenStorage.clearToken();
    }

    return Promise.reject(error);
  }
);
