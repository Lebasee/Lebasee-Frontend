import { AxiosError } from "axios";
import baseApi from "../baseApi";
import { BodyInformation } from "../../types/types";

const getUserBodyInformation = async () => {
  try {
    const response = await baseApi.get("/api/physical-attributes/");
    const data = response.data;

    const datas: BodyInformation[] = [
      {
        name: "قد",
        id: "height",
        value: Number(data.height ?? 155), // Ensure the value is a number
        type: "سانتی متر",
        min: 120,
        max: 210,
      },
      {
        name: "سن",
        id: "age",
        value: Number(data.age ?? 20),
        type: "سال",
        min: 1,
        max: 100,
      },
      {
        name: "وزن",
        id: "weight",
        value: Number(data.weight ?? 90),
        type: "کیلوگرم",
        min: 30,
        max: 150,
      },
      {
        name: "عرض شانه",
        id: "shoulder_width",
        value: Number(data.shoulder_width ?? 50),
        type: "سانتی متر",
        min: 30,
        max: 80,
      },
      {
        name: "دور سینه",
        id: "chest_circumference",
        value: Number(data.chest_circumference ?? 50),
        type: "سانتی متر",
        min: 30,
        max: 100,
      },
      {
        name: "دور بازو",
        id: "arm_size",
        value: Number(data.arm_size ?? 20),
        type: "سانتی متر",
        min: 10,
        max: 80,
      },
    ];

    return datas;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getUserBodyInformation;