import { AxiosError } from "axios";
import baseApi from "../baseApi";
import { generatedImage } from "../../types/types";

export const tryon = async (data: generatedImage) : Promise<generatedImage> => {
  try {
    const response = await baseApi.post("/api/tryon", data);
    return response.data.results;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default tryon;