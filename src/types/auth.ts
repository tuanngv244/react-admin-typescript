import { IRole } from "./role";

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface IToken {
  id: string;
  accessToken: string;
  refreshToken: string;
  countRefreshToken: number;
}

export interface ILoginResponse {
  id: string;
  name: string;
  email: string;
  active: boolean;
  token: string;
  role: IRole;
  profileImage: string;
  createdUser: string;
  updatedUser: string;
  createdAt: string;
  updatedAt: string;
}
