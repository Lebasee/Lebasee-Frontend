import { AxiosError } from "axios";
import baseApi from "../baseApi";

const VerifyCode = async (verificationCode: string) => {
  try {
    const response = await baseApi.post("/api/auth/verify_code/", {
      verification_code: verificationCode,
    });

    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default VerifyCode;
