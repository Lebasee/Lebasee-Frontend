import { AxiosError } from "axios";
import baseApi from "../baseApi";
import { ClothType } from "../../types/types";


// Explicitly define the response type
interface ClothesApiResponse {
  results: ClothType[];
}

// Fetch user clothes with typed API response
const getUserClothes = async (): Promise<ClothType[]> => {
  try {
    const response = await baseApi.get<ClothesApiResponse>("/api/clothes/");
    const datas = response.data.results.map((item) => ({
      description: item.caption,
      image: item.image,
      id: item.id,
      name: String(item.id)
    }));
    return datas;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getUserClothes;