import { IQuery } from "./general";
import { CreateUpdateUser } from "./user";

export interface ICourseQuery extends IQuery {}

export interface ICourse {
  id: string;
  name: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  active: boolean;
  startDate: string;
  endDate: string;
  duration: number;
  tags: string[];
  price: number;
  link: string;
  schedule: ISchedule;
  content: IContent[];
  required: string[];
  teams: Array<{
    tags: string[];
    active: boolean;
    name: string;
    slug: string;
    image: string;
    jobTitle: string;
    description: string;
    sortOrder: number;
    createdUser: string;
    updatedUser: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  }>;
  sortOrder: number;
  createdUser: CreateUpdateUser;
  updatedUser: CreateUpdateUser;
  createdAt: string;
  updatedAt: string;
}

export interface ISchedule {
  startDate: string;
  days: string;
  time: string;
  address: string;
}

export interface IContent {
  description: string[];
  title: string;
}

export enum ECourseTypes {
  "ONLINE" = "Online",
  "OFFLINE" = "Offline",
}
