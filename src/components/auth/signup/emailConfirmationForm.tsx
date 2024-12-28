import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import DigitInput from "../../base/digitInput";
import VerifyCode from "../../../api/auth/verifyCode";
import { useNavigate } from "react-router-dom";
import { persianToNumeric } from "../../../utils/persianToNumeric";
import { ToastData } from "../../../types/types";
import Toast from "../../base/toast";
import { AxiosError } from "axios";

const EmailConfirmationForm: React.FC = () => {
  const [countdown, setCountdown] = useState(90);
  const [isResendAvailable, setIsResendAvailable] = useState(false);
  const [code, setCode] = useState(Array(4).fill(""));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toastData, setToastData] = useState<ToastData>({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsResendAvailable(true);
    }
  }, [countdown]);

  const handleResend = () => {
    // Logic to resend the code goes here
    setCountdown(90);
    setIsResendAvailable(false);
  };

  const handleVerifyCode = async () => {
    if (!code) {
      return;
    }

    try {
      const parsedCode = persianToNumeric(code);

      setLoading(true);
      const response = await VerifyCode(parsedCode);

      if (response?.status == 200) {
        setToastData({
          open: true,
          message: "ایمیل با موفقیت تایید شد.",
          severity: "success",
        });
        navigate("/Landing"); // navigate to dashboard or main page
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.status === 404) {
        setToastData({
          open: true,
          message: "کد تایید معتبر نمی باشد.",
          severity: "error",
        });
        setCode(Array(4).fill(""));
      } else {
        setToastData({
          open: true,
          message: "خطا در برقراری ارتباط با سرور.",
          severity: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "80%",
        m: "auto",
      }}
    >
      <MarkEmailReadIcon
        color="primary"
        sx={{ fontSize: "120px" }}
      />
      <Typography
        sx={{ mb: 2 }}
        variant="h4"
        color="primary.dark"
      >
        تایید کنید شما هستید
      </Typography>
      <Typography
        sx={{ mb: 2 }}
        variant="body1"
        color="primary"
      >
        کد به آدرس شما ایمیل شد
      </Typography>
      <DigitInput
        code={code}
        setCode={setCode}
      />
      {isResendAvailable ? (
        <Link
          component="button"
          variant="body2"
          sx={{ mt: 2 }}
          onClick={handleResend}
          color="primary"
        >
          ارسال مجدد کد
        </Link>
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2 }}
        >
          ارسال مجدد کد تا {countdown} ثانیه دیگر
        </Typography>
      )}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", gap: 1, mt: 2 }}
      >
        <Button
          variant="contained"
          fullWidth
          color="secondary"
          href="/auth/signup"
        >
          انصراف
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={handleVerifyCode}
        >
          {loading ? (
            <CircularProgress
              size="32.5px"
              sx={{ color: "#ffffff" }}
            />
          ) : (
            "تایید"
          )}
        </Button>
      </Stack>
      <Toast
        message={toastData.message}
        open={toastData.open}
        severity={toastData.severity}
        onClose={() => setToastData({ ...toastData, open: false })}
      />
    </Box>
  );
};

export default EmailConfirmationForm;
