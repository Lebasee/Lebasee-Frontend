import { AlertColor } from "@mui/material";

export interface User {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  password?: string | null;
  profile_image?: string | null;
}

export interface BodyInformation {
  name: string | null;
  id: string | null;
  value: number | null;
  type: string | null;
  min?: number | null;
  max?: number | null;
}

export interface ClothType {
  id: number;
  image: string | File | null;
  caption: string;
  name?: string;
  description?: string;
  is_outfit?: boolean;
}

export interface ToastData {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export interface generatedImage{
  human_image_url:	string;
  garment_image_url:	string;
  description?:	string;
  num_inference_steps?: number;
  seed?: number;
}

export interface generatedImageResponse{
  image: {
    file_name:string 
    url: string
  }
}

