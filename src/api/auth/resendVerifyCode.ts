import { AxiosError } from "axios";
import baseApi from "../baseApi";

const resendVerifyCode = async (email: string | null) => {
  try {
    const response = await baseApi.post("/api/auth/users/resend_activation/", {
      email: email,
    });
    console.log(response);
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default resendVerifyCode;