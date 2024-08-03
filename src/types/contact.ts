import { IQuery } from "./general";
import { CreateUpdateUser } from "./user";

export interface IContactQuery extends IQuery {}

export interface IContact {
  id: string;
  name: string;
  slug: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  image: string;
  active: boolean;
  sortOrder: number;
  createdUser: CreateUpdateUser;
  updatedUser: CreateUpdateUser;
  createdAt: string;
  updatedAt: string;
}
