import { CreateUpdateUser } from "./user";

export interface IRole {
  id: string;
  name: string;
  isAdmin: boolean;
  permissions: string[];
  active: boolean;
  createdUser: CreateUpdateUser;
  updatedUser: CreateUpdateUser;
  createdAt: string;
  updatedAt: string;
}
