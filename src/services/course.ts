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
  getCourse(id: string): Promise<{ data: ICourse }> {
    return axiosInstance.get(`${basePath}/${id}`);
  },
  deleteCourse(ids: string[]): Promise<{ data: ICourse }> {
    return axiosInstance.delete(`${basePath}`, { data: ids });
  },
  createCourse(payload: FormData): Promise<{ data: ICourse }> {
    return axiosInstance.post(`${basePath}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateCourse(payload: {
    id: string;
    formData: FormData;
  }): Promise<{ data: ICourse }> {
    const { id, formData } = payload;
    return axiosInstance.put(`${basePath}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
