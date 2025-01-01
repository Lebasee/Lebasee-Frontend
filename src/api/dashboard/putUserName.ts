import { AxiosError } from "axios";
import baseApi from "../baseApi";

const putUserName = async (data: {first_name: string | null, last_name: string | null}) => {
  try {
    const response = await baseApi.put("/api/users/profile/", {
      first_name: data.first_name,
      last_name: data.last_name
    });
    console.log(response);
    localStorage.setItem("firstName", response.data.first_name);
    localStorage.setItem("lastName", response.data.last_name);
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default putUserName;