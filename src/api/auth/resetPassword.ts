import { AxiosError } from "axios";
import baseApi from "../baseApi";

export const ResetPassword = async (obj: {
  new_password: string;
  uid: string;
  token: string;
}) => {
  try {
    const response = await baseApi.post("/api/reset-password/", obj);
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default ResetPassword;