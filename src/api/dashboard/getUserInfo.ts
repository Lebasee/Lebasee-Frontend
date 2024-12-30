import { AxiosError } from "axios";
import baseApi from "../baseApi";

const getUserInfo = async () => {
  try {
    const response = await baseApi.get("/api/users/profile/");
    console.log(response);
    return response.data;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getUserInfo;