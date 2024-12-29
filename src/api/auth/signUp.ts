import { AxiosError } from "axios";
import { User } from "../../types/types";
import baseApi from "../baseApi";

export const Signup = async (user: User) => {
  try {
    const response = await baseApi.post("/api/signup", user);
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default Signup;