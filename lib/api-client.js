import axios from "axios";

// Detecta entorno automáticamente
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos máximo de espera
});

// INTERCEPTOR DE SALIDA (Request)
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    // Aquí inyectamos el token automáticamente
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// INTERCEPTOR DE ENTRADA (Response)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo centralizado de errores (Ej: Token vencido)
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Redirigir a login si la sesión caducó
        // window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);
