import { AxiosError } from "axios";
import baseApi from "../baseApi";

const patchUserClothCaption = async (data: {id: number, caption: string}) => {
  try {
    const response = await baseApi.patch(`/api/clothes/${data.id}/`, {
      caption: data.caption
    });
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default patchUserClothCaption;