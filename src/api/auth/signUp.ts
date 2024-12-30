import { AxiosError } from "axios";
import { User } from "../../types/types";
import baseApi from "../baseApi";

export const Signup = async (user: User) => {
  try {
    const response = await baseApi.post("/api/signup", user);
    localStorage.setItem("firstName", response.data.first_name);
    localStorage.setItem("lastName", response.data.last_name);
    localStorage.setItem("email", response.data.email);
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default Signup;