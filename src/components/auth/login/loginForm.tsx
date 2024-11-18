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
import CustomTextField from "../../base/customTextField";
import Login from "../../../api/auth/login"; // Import the Login function
import { useNavigate } from "react-router-dom";


const LoginForm: React.FC = () => {
  const [focused, setFocused] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>(""); // For displaying errors
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error before submitting

    // Check if email and password are entered
    if (!email || !password) {
      setError("لطفا ایمیل و رمزعبور را وارد کنید.");
      return;
    }

    // Prepare data for login
    const person = { email, password };

    // Call the login API
    const response = await Login(person);

    // Handle the response
    if (response?.status === 200) {
      console.log("Login successful!", response.data.access);
      navigate("/landing");
      // Redirect or perform any post-login actions (e.g., store the token)
    } else {
      setError("ایمیل یا رمزعبور اشتباه است.");
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
        ورود به حساب کاربری
      </Typography>
      <form onSubmit={handleSubmit}>
        <CustomTextField
          fullWidth
          variant="outlined"
          label="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        {error && (
          <Typography color="error" sx={{ width: "100%", textAlign: "center" }}>
            {error}
          </Typography>
        )}
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
          <Button variant="contained" fullWidth type="submit" >
            ورود
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;