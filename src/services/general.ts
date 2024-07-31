import { BASE_URL } from "@/constants/environments";
import axios from "axios";

export const generalService = {
  uploadImage(payload: File): Promise<{ data: { url: string } }> {
    return axios.post(
      `${BASE_URL.replace("/admin", "")}/ckeditor/upload/single`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
};
