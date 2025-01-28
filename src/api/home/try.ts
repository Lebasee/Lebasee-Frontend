import { AxiosError } from "axios";
import axios from "axios";
import { generatedImage } from "../../types/types";

const token = localStorage.getItem("access");

const baseApi = axios.create({
  baseURL: "https://lebasee-backend-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",

    Authorization: token ? `Bearer ${token}` : null,
  },
});

baseApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export const tryon = async (data: generatedImage): Promise<string> => {
  try {
    const response = await baseApi.post("/api/tryon", data);
    console.log(response);
    return response.data.image.url;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default tryon;
