import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import baseApi from "../baseApi";

// Define the Clothes interface
interface Clothes {
  id: number;
  image: string;
  // caption: string;
}

// Explicitly define the response type
interface ClothesApiResponse {
  results: Clothes[];
}

// Fetch user clothes with typed API response
const getUserClothes = async (): Promise<Clothes[]> => {
  try {
    console.log("HI");
    const response = await baseApi.get<ClothesApiResponse>("/api/clothes/");
    const datas = response.data.results.map((item) => ({
      caption: item.caption,
      image: item.image,
      id: item.id,
    }));
    console.log(datas);
    return datas;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getUserClothes;