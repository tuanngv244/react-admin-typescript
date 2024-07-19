export interface IUser {
  id: string;
  name: string;
  email: string;
  active: boolean;
  token: string;
  role: string;
  profileImage: string;
  createdUser: CreateUpdateUser;
  updatedUser: CreateUpdateUser;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUpdateUser extends Pick<IUser, "id" | "email"> {}
