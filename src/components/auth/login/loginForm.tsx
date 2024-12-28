import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRef, useState } from "react";
import Login from "../../../api/auth/login";
import { useNavigate } from "react-router-dom";
import { ToastData, User } from "../../../types/types";
import CustomTextField from "../../base/CustomTextField";
import { AxiosError } from "axios";
import Toast from "../../base/toast";

const LoginForm: React.FC = () => {
  const [focused, setFocused] = useState({ email: false, password: false });
  const [textFieldError, setTextFieldError] = useState({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [toastData, setToastData] = useState<ToastData>({
    open: false,
    message: "",
    severity: "error",
  });

  const handlePasswordVisibilityToggle = () => {
    const currentPos = passwordInputRef.current?.selectionStart || 0;
    setShowPassword((prev) => !prev);
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
    setTimeout(() => {
      passwordInputRef.current?.setSelectionRange(currentPos, currentPos);
    }, 0);
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      setTextFieldError({ email: email === "", password: password === "" });
      return;
    }

    const user: User = { email, password };

    try {
      setLoading(true);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      const response = await Login(user);

      if (response?.status === 200) {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        setToastData({
          open: true,
          message: "ورود موفقیت آمیز بود",
          severity: "success",
        });
        navigate("/home");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.status === 401) {
        setToastData({
          open: true,
          message: "ایمیل یا رمزعبور اشتباه می باشد.",
          severity: "error",
        });
        setTextFieldError({ email: true, password: true });
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
        gap: "20px",
        m: "auto",
      }}
    >
      <Typography
        sx={{ mb: 2 }}
        variant="h4"
        color="primary.dark"
      >
        ورود به حساب کاربری
      </Typography>
      <CustomTextField
        fullWidth
        variant="outlined"
        label="ایمیل"
        value={email}
        error={textFieldError.email}
        onChange={(e) => {
          setEmail(e.target.value);
          setTextFieldError({
            ...textFieldError,
            email: e.target.value === "",
          });
        }}
        onFocus={() => setFocused({ ...focused, email: true })}
        onBlur={() => setFocused({ ...focused, email: false })}
        helperText={
          textFieldError.email && email === "" && "لطفا ایمیل خود را وارد کنید."
        }
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmailIcon
                  color={
                    textFieldError.email
                      ? "error"
                      : focused.email
                      ? "primary"
                      : undefined
                  }
                />
              </InputAdornment>
            ),
          },
        }}
      />
      <CustomTextField
        fullWidth
        variant="outlined"
        label="رمزعبور"
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
          "لطفا رمزعبور خود را وارد کنید."
        }
        sx={{
          "& div": { px: 0 },
          "& input": { pr: "14px" },
        }}
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
                <IconButton
                  onClick={handlePasswordVisibilityToggle}
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Link
        typography="body2"
        sx={{
          pl: "14px",
          width: "100%",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        رمز خود را فراموش کردید؟
      </Link>
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
          onClick={() => navigate("/auth/signup")}
        >
          ثبت نام
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          data-testid="login-button"
        >
          {loading ? (
            <CircularProgress
              size="32.5px"
              sx={{ color: "#ffffff" }}
            />
          ) : (
            "ورود"
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

export default LoginForm;
