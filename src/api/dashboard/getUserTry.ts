import { AxiosError } from "axios";
import axios from "axios";
import { ClothType } from "../../types/types";

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

interface ClothesApiResponse {
  results: ClothType[];
  next: string | null;
  is_outfit: boolean | null;
}

const getUserTryons = async (): Promise<ClothType[]> => {
  try {
    const response = await baseApi.get<ClothesApiResponse>("/api/tryon-logs/");
    console.log(response);
    let images: ClothType[] = [];
    let datas = response;
    let j = 2;
    while (true) {
      for (let i = 0; i < datas.data.results.length; i++) {
        if (datas.data.results[i].is_outfit === true) {
          images.push({
            id: datas.data.results[i].id,
            image: datas.data.results[i].image,
            caption: datas.data.results[i].caption,
          });
        }
      }
      if (datas.data.next == null) {
        break;
      }
      datas = await baseApi.get<ClothesApiResponse>(`/api/clothes/?page=${j}`);
      j++;
    }
    images.sort((a, b) => a.id - b.id);
    return images;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getUserTryons;
