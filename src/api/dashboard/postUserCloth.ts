import { AxiosError } from "axios";
import baseApi from "../baseApi";

const postUserCloth = async (data: FormData) => {
  try {
    const response = await baseApi.post("/api/clothes/", data, {
      headers: {
        "Content-Type": "multipart/form-data", // Specify the correct content type for file uploads
      },
    });
    console.log("Response from API:", response);
    return response; // Return the full response to access status, etc.
  } catch (error) {
    console.error("Error in postUserCloth:", error);
    throw error as AxiosError;
  }
};

export default postUserCloth;