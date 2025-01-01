import { AlertColor } from "@mui/material";

export interface User {
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
    password?: string | null;
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