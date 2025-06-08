import axios from "axios";

// Instancia de Axios configurada para todos los requests
export const axiosInstance = axios.create({
  baseURL: process.env.VITE_BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});
