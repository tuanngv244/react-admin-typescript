import { IQuery } from "./general";
import { CreateUpdateUser } from "./user";

export interface IInstructorQuery extends IQuery {}

export interface IInstructor {
  id: string;
  name: string;
  slug: string;
  jobTitle: string;
  image: string;
  active: boolean;
  description: string;
  tags: string[];
  sortOrder: number;
  createdUser: CreateUpdateUser;
  updatedUser: CreateUpdateUser;
  createdAt: string;
  updatedAt: string;
}
