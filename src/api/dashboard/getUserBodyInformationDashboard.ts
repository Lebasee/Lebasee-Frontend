import { AxiosError } from "axios";
import baseApi from "../baseApi";
import { BodyInformation } from "../../types/types";

const getUserBodyInformationDashboard = async () => {
  try {
    const response = await baseApi.get("/api/physical-attributes/");
    const data = response.data;
    const datas: BodyInformation[] = [
      {
        name: "قد",
        id: "1",
        value: data.height ? data.height : "180",
        type: "سانتی متر",
      },
      { name: "سن", id: "2", value: data.age ? data.age : "30", type: "سال" },
      {
        name: "عرض شانه",
        id: "3",
        value: data.shoulder_width ? data.shoulder_width : "33",
        type: "سانتی متر",
      },
      {
        name: "وزن",
        id: "4",
        value: data.weight ? data.weight : "60",
        type: "کیلوگرم",
      },
    ];
    return datas;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getUserBodyInformationDashboard;