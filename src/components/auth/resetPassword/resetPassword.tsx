import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../base/CustomTextField";
import { ToastData } from "../../../types/types";
import Toast from "../../base/toast";
import ResetPassword from "../../../api/auth/resetPassword";
import FullScreenLoader from "../../base/FullScreenLoader";

const ResetPasswordForm: React.FC = () => {
  const { uid, token } = useParams();
  const [focused, setFocused] = useState({
    password: false,
    confirmPassword: false,
  });
  const [textFieldError, setTextFieldError] = useState({
    password: false,
    confirmPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [toastData, setToastData] = useState<ToastData>({
    open: false,
    message: "",
    severity: "error",
  });

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prev) => !prev);
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  const handleConfirmPasswordVisibilityToggle = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async () => {
    if (!password || !confirmPassword || password !== confirmPassword) {
      setTextFieldError({
        password: password === "",
        confirmPassword: confirmPassword === "" || password !== confirmPassword,
      });
      return;
    }

    if (!uid || !token) {
      setToastData({
        open: true,
        message: "خطا در برقراری ارتباط با سرور.",
        severity: "error",
      });
      return;
    }

    try {
      setLoading(true);

      const moreThan8 = password.length >= 8;
      const haveLowerCase = /[a-z]/.test(password);
      const haveUpperCase = /[A-Z]/.test(password);
      const haveSymbol = /[^a-zA-Z0-9]/.test(password);

      if (!moreThan8) {
        setToastData({
          open: true,
          message: "رمز عبور جدید کمتر از 8 کاراکتر است",
          severity: "warning",
        });
        return;
      }

      if (!haveLowerCase) {
        setToastData({
          open: true,
          message: "رمز عبور جدید حرف کوچک ندارد",
          severity: "warning",
        });
        return;
      }

      if (!haveUpperCase) {
        setToastData({
          open: true,
          message: "رمز عبور جدید حرف بزرگ ندارد",
          severity: "warning",
        });
        return;
      }

      if (!haveSymbol) {
        setToastData({
          open: true,
          message: "رمز عبور جدید فقط شامل حروف است",
          severity: "warning",
        });
        return;
      }

      const obj = {
        new_password: password,
        uid: uid,
        token: token,
      };

      const response = await ResetPassword(obj);
      if (response.status === 200) {
        setToastData({
          open: true,
          message: "رمز عبور با موفقیت بازیابی شد",
          severity: "success",
        });
      }
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    } catch (error) {
      setToastData({
        open: true,
        message: "خطا در برقراری ارتباط با سرور.",
        severity: "error",
      });
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
        gap: "20px",
        m: "auto",
      }}
    >
      <Typography sx={{ mb: 2 }} variant="h4" color="primary.dark">
        تغییر رمز عبور
      </Typography>

      {loading && <FullScreenLoader />}

      <CustomTextField
        fullWidth
        variant="outlined"
        label="رمز عبور جدید"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setTextFieldError({
            ...textFieldError,
            password: e.target.value === "",
          });
        }}
        onFocus={() => setFocused({ ...focused, password: true })}
        onBlur={() => setFocused({ ...focused, password: false })}
        type={showPassword ? "text" : "password"}
        inputRef={passwordInputRef}
        error={textFieldError.password}
        helperText={
          textFieldError.password &&
          password === "" &&
          "لطفا رمز عبور جدید خود را وارد کنید."
        }
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon
                  color={
                    textFieldError.password
                      ? "error"
                      : focused.password
                      ? "primary"
                      : undefined
                  }
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordVisibilityToggle}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <CustomTextField
        fullWidth
        variant="outlined"
        label="تأیید رمز عبور"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setTextFieldError({
            ...textFieldError,
            confirmPassword:
              e.target.value === "" || password !== e.target.value,
          });
        }}
        onFocus={() => setFocused({ ...focused, confirmPassword: true })}
        onBlur={() => setFocused({ ...focused, confirmPassword: false })}
        type={showConfirmPassword ? "text" : "password"}
        error={textFieldError.confirmPassword}
        helperText={
          textFieldError.confirmPassword &&
          (confirmPassword === ""
            ? "لطفا تأیید رمز عبور را وارد کنید."
            : "رمز عبور ها مطابقت ندارند.")
        }
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon
                  color={
                    textFieldError.confirmPassword
                      ? "error"
                      : focused.confirmPassword
                      ? "primary"
                      : undefined
                  }
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleConfirmPasswordVisibilityToggle}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", gap: 1 }}
      >
        <Button
          variant="contained"
          fullWidth
          color="secondary"
          onClick={() => navigate("/auth/login")}
        >
          لغو
        </Button>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          تایید
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

export default ResetPasswordForm;