import { STORAGE } from "@/constants/storage";
import { IToken } from "@/types/auth";
import Cookies from "js-cookie";

export const localToken = {
  get: () => JSON.parse(localStorage.getItem(STORAGE.token) as string),
  set: (token: any) =>
    localStorage.setItem(STORAGE.token, JSON.stringify(token)),
  remove: () => localStorage.removeItem(STORAGE.token),
};

export const cookieToken = {
  get: (): IToken =>
    JSON.parse(
      (Cookies.get(STORAGE.token) !== undefined
        ? Cookies.get(STORAGE.token)
        : null) as string
    ),
  set: (token: unknown) => Cookies.set(STORAGE.token, JSON.stringify(token)),
  remove: () => Cookies.remove(STORAGE.token),
};

const tokenMethod = {
  get: () => {
    return cookieToken.get();
  },
  set: (token: IToken) => {
    cookieToken.set(token);
  },
  remove: () => {
    cookieToken.remove();
  },
};

export default tokenMethod;
