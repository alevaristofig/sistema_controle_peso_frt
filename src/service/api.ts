// services/api.ts
import axios from "axios";
import { authService } from "./auth";
import { refreshToken } from "./refreshToken";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = authService.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // token expirado
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const tokenData = await refreshToken();

        authService.setAuth(
          tokenData.access_token,
          tokenData.refresh_token,
          authService.getUser(),
          authService.getUrls()
        );

        originalRequest.headers.Authorization =
          `Bearer ${tokenData.access_token}`;

        return api(originalRequest);

      } catch (refreshError) {

        authService.logout();

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;