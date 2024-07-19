import { IUser } from "../types/user";
import { ILoginResponse } from "@/types/auth";
import { ILoginFormData } from "@/types/auth";
import axiosInstance from "@/utils/axiosInstance";

const basePath = "/user" as const;

export const authService = {
  login(payload: ILoginFormData): Promise<{ data: ILoginResponse }> {
    return axiosInstance.post(`${basePath}/login`, payload);
  },
  refresh(refreshToken: string): Promise<{ data: ILoginResponse }> {
    return axiosInstance.put(`${basePath}/refresh`, {
      refreshToken,
    });
  },
  getProfile(id: string): Promise<IUser> {
    return axiosInstance.get(`${basePath}/${id}`);
  },
};
