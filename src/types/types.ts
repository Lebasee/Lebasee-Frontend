import { AlertColor } from "@mui/material";

export interface User {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
}

export interface BodyInformation {
    name: string;
    id: string;
    value: number;
    type: string;
    min?: number;
    max?: number;
}


export interface ToastData {
    open: boolean;
    message: string;
    severity: AlertColor;
}