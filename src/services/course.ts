import { ICourse, ICourseQuery } from "@/types/course";
import { PaginationType } from "@/types/general";
import axiosInstance from "@/utils/axiosInstance";

const basePath = "/courses" as const;

type TGetCourseResponse = { courses: ICourse[]; pagination: PaginationType };

export const courseService = {
  getCourses(
    payload: Partial<ICourseQuery>
  ): Promise<{ data: TGetCourseResponse }> {
    return axiosInstance.get(`${basePath}`, { params: payload });
  },
  deleteCourse(ids: string[]): Promise<{ data: ICourse }> {
    return axiosInstance.delete(`${basePath}`, { data: ids });
  },
};
