import axios from "axios";
import tokenMethod from "./token";
import { BASE_URL } from "@/constants/environments";
import { authService } from "@/services/auth";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // check refresh count
    let countRefreshToken = Number(tokenMethod.get()?.countRefreshToken) || 0;
    if (
      (error.response?.status === 403 || error.response?.status === 401) &&
      !!!originalRequest._retry &&
      countRefreshToken <= 3 &&
      tokenMethod.get()
    ) {
      originalRequest._retry = true;
      try {
        const res = await authService.refresh(tokenMethod.get()?.refreshToken);
        countRefreshToken += 1;

        const { id, token } = res?.data || {};
        tokenMethod.set({
          id: id,
          accessToken: token,
          refreshToken: token,
          countRefreshToken: countRefreshToken,
        });
        originalRequest.headers.Authorization = `Bearer ${token}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        tokenMethod.remove();
      }
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${tokenMethod.get()?.accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
