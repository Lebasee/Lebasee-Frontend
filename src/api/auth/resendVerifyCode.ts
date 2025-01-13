import { AxiosError } from "axios";
import baseApi from "../baseApi";

const resendVerifyCode = async (email: string | null) => {
  try {
    const response = await baseApi.post("/api/auth/send_code/", {
      email: email,
    });
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default resendVerifyCode;