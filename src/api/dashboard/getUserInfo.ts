import { AxiosError } from "axios";
import baseApi from "../baseApi";

const getUserInfo = async (userId: string) => {
  try {
    const response = await baseApi.get(`/api/user/${userId}/`);

    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getUserInfo;