import { AxiosError } from "axios";
import baseApi from "../baseApi";

const putUserName = async (data: FormData) => {
  try {
    const response = await baseApi.put("/api/users/profile/", data, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure the proper content type is set
      },
    });
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default putUserName;