import {
  Box,
  Button,
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
import CustomTextField from "../../base/customTextField";
import { useRef, useState } from "react";
import { validateEmail } from "../../../utils/validationUtils";

const LoginForm: React.FC = () => {
  const [focused, setFocused] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEmailError(!validateEmail(emailValue)); // Use the validation function here
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
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", gap: 1 }}
      >
        <CustomTextField
          fullWidth
          variant="outlined"
          label="نام"
          onFocus={() => setFocused({ ...focused, firstName: true })}
          onBlur={() => setFocused({ ...focused, firstName: false })}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon
                    color={focused.firstName ? "primary" : undefined}
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
          onFocus={() => setFocused({ ...focused, lastName: true })}
          onBlur={() => setFocused({ ...focused, lastName: false })}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SupervisorAccountIcon
                    color={focused.lastName ? "primary" : undefined}
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
        error={emailError}
        helperText={emailError ? "ایمیل معتبر نیست" : ""}
        onChange={handleEmailChange}
        onFocus={() => setFocused({ ...focused, email: true })}
        onBlur={() => setFocused({ ...focused, email: false })}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmailIcon
                  color={
                    emailError ? "error" : focused.email ? "primary" : undefined
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
          href="confirm-email"
        >
          ثبت نام
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
