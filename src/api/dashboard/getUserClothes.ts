import { AxiosError } from "axios";
import baseApi from "../baseApi";
import { ClothType } from "../../types/types";

interface ClothesApiResponse {
  results: ClothType[];
  next: string | null;
}

const getUserClothes = async (): Promise<ClothType[]> => {
  try {
    const response = await baseApi.get<ClothesApiResponse>("/api/clothes/");
    let images: ClothType[] = [];
    let datas = response;
    let j = 2;
    while (true) {
      for (let i = 0; i < datas.data.results.length; i++) {
        images.push({
          id: datas.data.results[i].id,
          image: datas.data.results[i].image,
          caption: datas.data.results[i].caption,
        });
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

export default getUserClothes;