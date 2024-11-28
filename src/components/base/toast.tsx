import React from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface ToastProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: "100%",
          "& .MuiAlert-icon": {
            ml: "12px",
            mr: 0,
          },
          "& .MuiAlert-action": {
            pl: 0,
            pr: "16px",
            ml: 0,
            mr: "8px",
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
