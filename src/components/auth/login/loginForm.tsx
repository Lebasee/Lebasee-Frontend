import {
  Box,
  Button,
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
import CustomTextField from "../../base/CustomTextField";
const LoginForm: React.FC = () => {
  const [focused, setFocused] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

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
        onFocus={() => setFocused({ ...focused, email: true })}
        onBlur={() => setFocused({ ...focused, email: false })}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmailIcon
                  color={focused.email ? "primary" : undefined}
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
                <LockIcon color={focused.password ? "primary" : undefined} />
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
          href="/auth/signup"
        >
          ثبت نام
        </Button>
        <Button
          variant="contained"
          fullWidth
        >
          ورود
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
