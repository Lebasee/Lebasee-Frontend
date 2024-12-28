import { AxiosError } from "axios";
import baseApi from "../baseApi";

const getUserBodyInformation = async () => {
  try {
    const response = await baseApi.get("/api/physical-attributes/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getUserBodyInformation;