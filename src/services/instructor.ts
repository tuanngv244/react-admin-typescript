import { PaginationType } from "@/types/general";
import { IInstructor, IInstructorQuery } from "@/types/instructor";
import axiosInstance from "@/utils/axiosInstance";

const basePath = "/instructors" as const;

type TGetInstructorResponse = {
  instructors: IInstructor[];
  pagination: PaginationType;
};

export const instructorService = {
  getInstructors(
    payload: Partial<IInstructorQuery>
  ): Promise<{ data: TGetInstructorResponse }> {
    return axiosInstance.get(`${basePath}`, { params: payload });
  },
};
