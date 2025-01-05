import { AxiosError } from "axios";
import baseApi from "../baseApi";

const postUserNewPassword = async (data: {
  new_password: string | null;
  current_password: string | null;
}) => {
  try {
    const response = await baseApi.post("/api/auth/users/set_password/", {
      new_password: data.new_password,
      current_password: data.current_password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default postUserNewPassword;