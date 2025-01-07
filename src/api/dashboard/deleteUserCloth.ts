import { AxiosError } from "axios";
import baseApi from "../baseApi";

const deleteUserCloth = async (id: number) => {
  try {
    const response = await baseApi.delete(`/api/clothes/${id}/`);
    console.log(response);
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default deleteUserCloth;