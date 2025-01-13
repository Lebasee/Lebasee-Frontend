import { AxiosError } from "axios";
import baseApi from "../baseApi";
import { generatedImage } from "../../types/types";

export const tryon = async (data: generatedImage) : Promise<string> => {
  try {
    const response = await baseApi.post("/api/tryon", data);
    console.log(response)
    return response.data.image.url;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default tryon;