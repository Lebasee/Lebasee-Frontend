import React, { useState, useEffect } from "react";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import DigitInput from "../../base/digitInput";
import VerifyCode from "../../../api/auth/verifyCode";
import { useNavigate } from "react-router-dom";

const EmailConfirmationForm: React.FC = () => {
  const [countdown, setCountdown] = useState(90);
  const [isResendAvailable, setIsResendAvailable] = useState(false);
  const [code, setCode] = useState(Array(4).fill(""));
  const navigate = useNavigate();

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
      // setError("Please enter the verification code.");
      return;
    }

    try {
      const response = await VerifyCode({ verification_code: code });


      // If verification is successful, redirect to Landing page
      if (response?.status == 200) {
        navigate("/Landing"); // Redirect to Landing page
      } else {
        console.error("Verification failed. Please try again.");
      }
    } catch (err) {
      console.error("An error occurred during verification. Please try again.", err);
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
      <DigitInput code={code} setCode={setCode}/>
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
          تایید
        </Button>
      </Stack>
    </Box>
  );
};

export default EmailConfirmationForm;