import { AlertColor } from "@mui/material";

export interface User {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  password?: string | null;
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
  image: string;
  caption?: string;
  name: string;
  description?: string;
}

export interface ToastData {
  open: boolean;
  message: string;
  severity: AlertColor;
}