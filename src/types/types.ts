import { AlertColor } from "@mui/material";

export interface User {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
}


export interface ToastData {
    open: boolean;
    message: string;
    severity: AlertColor;
  }