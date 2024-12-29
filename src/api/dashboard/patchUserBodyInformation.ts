import { AxiosError } from "axios";
import baseApi from "../baseApi";
import { BodyInformation } from "../../types/types";

const patchUserBodyInformation = async (data: {
  id: string;
  newValue: number;
}): Promise<BodyInformation[]> => {
  try {
    const response = await baseApi.patch("/api/physical-attributes/", {
      [data.id]: data.newValue, // Use computed property name
    });
    const datas: BodyInformation[] = [
      {
        name: "قد",
        id: "height",
        value: Number(response.data.height ?? 155), // Ensure the value is a number
        type: "سانتی متر",
        min: 120,
        max: 210,
      },
      {
        name: "سن",
        id: "age",
        value: Number(response.data.age ?? 20),
        type: "سال",
        min: 1,
        max: 100,
      },
      {
        name: "وزن",
        id: "weight",
        value: Number(response.data.weight ?? 90),
        type: "کیلوگرم",
        min: 30,
        max: 150,
      },
      {
        name: "عرض شانه",
        id: "shoulder_width",
        value: Number(response.data.shoulder_width ?? 50),
        type: "سانتی متر",
        min: 30,
        max: 80,
      },
      {
        name: "دور سینه",
        id: "chest_circumference",
        value: Number(response.data.chest_circumference ?? 50),
        type: "سانتی متر",
        min: 30,
        max: 100,
      },
      {
        name: "دور بازو",
        id: "arm_size",
        value: Number(response.data.arm_size ?? 20),
        type: "سانتی متر",
        min: 10,
        max: 80,
      },
    ];
    return datas; // Ensure the response data is cast to string
  } catch (error) {
    throw error as AxiosError;
  }
};

export default patchUserBodyInformation;