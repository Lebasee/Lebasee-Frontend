import { AxiosError } from "axios";
import axios from "axios";
import { generatedImage } from "../../types/types";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM4MTQ4NDk3LCJpYXQiOjE3MzgwNjIwOTcsImp0aSI6IjUxMWQyYTk3N2E3YzQwOWE4MjQwNGNkYWZkZDk2ZTk0IiwidXNlcl9pZCI6M30.04AsuvKu5LyUfpYu3sE2P0o24JcjO22vNFf_9Fwteew";

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
