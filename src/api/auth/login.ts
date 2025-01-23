import { AxiosError } from "axios";
import { User } from "../../types/types";
import baseApi from "../baseApi";

export const Login = async (user: User) => {
  try {
    localStorage.clear();
    const response = await baseApi.post("/api/login", user);
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    localStorage.setItem("email", user.email ?? "");
    localStorage.setItem("password", user.password ?? "");
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default Login;