import axios, { AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined in the .env file.");
}

const token = localStorage.getItem("access");

const baseApi = axios.create({
  baseURL: API_BASE_URL,
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

export default baseApi;