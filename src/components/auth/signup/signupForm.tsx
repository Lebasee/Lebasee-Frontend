import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CustomTextField from "../../base/CustomTextField";
import { useRef, useState } from "react";
import { validateEmail } from "../../../utils/validationUtils";
import SignUp from "../../../api/auth/signUp";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import Toast from "../../base/toast";
import { ToastData } from "../../../types/types";

const SignUpForm: React.FC = () => {
  const [focused, setFocused] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });
  const [textFieldError, setTextFieldError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });
  const [toastData, setToastData] = useState<ToastData>({
    open: false,
    message: "",
    severity: "error",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setTextFieldError({ ...textFieldError, email: !validateEmail(emailValue) });
  };

  const handleSignUp = async () => {
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      textFieldError.email
    ) {
      setTextFieldError({
        email: email === "",
        password: password === "",
        firstName: firstName === "",
        lastName: lastName === "",
      });
      return;
    }

    const user = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };
    try {
      setLoading(true);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      const response = await SignUp(user);
      if (response?.status == 201) {
        setToastData({
          open: true,
          message: "ثبت‌‌نام موفقیت آمیز بود",
          severity: "success",
        });
        navigate("/auth/confirm-email");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.status === 400) {
        setToastData({
          open: true,
          message: "ایمیل قبلا استفاده شده است.",
          severity: "error",
        });
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
        ثبت نام
      </Typography>
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="center"
        sx={{ width: "100%", gap: 1 }}
      >
        <CustomTextField
          fullWidth
          variant="outlined"
          label="نام"
          value={firstName}
          error={textFieldError.firstName}
          helperText={textFieldError.firstName && "لطفا نام خود را وارد کنید."}
          onChange={(e) => {
            setFirstName(e.target.value);
            setTextFieldError({
              ...textFieldError,
              firstName: e.target.value === "",
            });
          }}
          sx={{}}
          onFocus={() => setFocused({ ...focused, firstName: true })}
          onBlur={() => setFocused({ ...focused, firstName: false })}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon
                    color={
                      textFieldError.firstName
                        ? "error"
                        : focused.firstName
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
          label="نام خانوادگی"
          value={lastName}
          error={textFieldError.lastName}
          helperText={
            textFieldError.lastName && "لطفا نام‌خانوادگی خود را وارد کنید."
          }
          onChange={(e) => {
            setLastName(e.target.value);
            setTextFieldError({
              ...textFieldError,
              lastName: e.target.value === "",
            });
          }}
          onFocus={() => setFocused({ ...focused, lastName: true })}
          onBlur={() => setFocused({ ...focused, lastName: false })}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SupervisorAccountIcon
                    color={
                      textFieldError.lastName
                        ? "error"
                        : focused.lastName
                        ? "primary"
                        : undefined
                    }
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>
      <CustomTextField
        fullWidth
        variant="outlined"
        label="ایمیل"
        value={email}
        error={textFieldError.email}
        helperText={textFieldError.email && "لطفا یک ایمیل معتبر وارد کنید."}
        onChange={handleEmailChange}
        onFocus={() => setFocused({ ...focused, email: true })}
        onBlur={() => setFocused({ ...focused, email: false })}
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
        error={textFieldError.password}
        helperText={textFieldError.password && "لطفا رمزعبور مناسب وارد کنید."}
        onChange={(e) => {
          setPassword(e.target.value);
          localStorage.setItem("password", e.target.value);
          setTextFieldError({
            ...textFieldError,
            password: e.target.value === "",
          });
        }}
        onFocus={() => setFocused({ ...focused, password: true })}
        onBlur={() => setFocused({ ...focused, password: false })}
        type={showPassword ? "text" : "password"}
        inputRef={passwordInputRef}
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
          href="login"
        >
          ورود
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSignUp}
        >
          {loading ? (
            <CircularProgress
              size="32.5px"
              sx={{ color: "#ffffff" }}
            />
          ) : (
            "ثبت نام"
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

export default SignUpForm;
