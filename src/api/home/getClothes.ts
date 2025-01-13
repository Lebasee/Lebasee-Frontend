import { AxiosError } from "axios";
import { ClothType } from "../../types/types";
import baseApi from "../baseApi";

export const getClothes = async () : Promise<ClothType[]> => {
  try {
    const response = await baseApi.get("/api/clothes");
    return response.data.results;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getClothes;