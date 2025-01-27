import { AxiosError } from "axios";
import baseApi from "../baseApi";

export const ForgotPassword = async (obj: { email: string }) => {
  try {
    const response = await baseApi.post("/api/forgot-password/", obj);
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default ForgotPassword;