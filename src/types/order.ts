import { IQuery } from "./general";
import { CreateUpdateUser } from "./user";

export interface IOrderQuery extends IQuery {}

export interface IOrder {
  id: string;
  name: string;
  slug: string;
  phone: string;
  course: Course;
  customer: Customer;
  type: string;
  paymentMethod: string;
  createdUser: CreateUpdateUser;
  updatedUser: CreateUpdateUser;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  name: string;
  id: string;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}
