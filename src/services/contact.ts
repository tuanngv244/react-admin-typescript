import { IContact, IContactQuery } from "@/types/contact";
import { PaginationType } from "@/types/general";
import axiosInstance from "@/utils/axiosInstance";

const basePath = "/contacts" as const;

type TGetContactResponse = {
  subscribes: IContact[];
  pagination: PaginationType;
};

export const contactService = {
  getContacts(
    payload: Partial<IContactQuery>
  ): Promise<{ data: TGetContactResponse }> {
    return axiosInstance.get(`${basePath}`, { params: payload });
  },
};
