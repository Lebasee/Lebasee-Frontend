import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { pallete } from "../../../styles/pallete.m";
import CustomTextField from "../../base/CustomTextField";
import putUserName from "../../../api/dashboard/putUserName";
import { ToastData } from "../../../types/types";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import Toast from "../../base/toast";
import postUserNewPassword from "../../../api/dashboard/postUserNewPassword";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import getUserInfo from "../../../api/dashboard/getUserInfo";
import DigitInput from "../../base/digitInput";
import { persianToNumeric } from "../../../utils/persianToNumeric";
import VerifyCode from "../../../api/auth/verifyCode";
import resendVerifyCode from "../../../api/auth/resendVerifyCode";

const Setting: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const [lastName, setLastName] = useState(localStorage.getItem("lastName"));
  const [profileImage, setProfileImage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const correctPassword = localStorage.getItem("password");
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [toastData, setToastData] = useState<ToastData>({
    open: false,
    message: "",
    severity: "error",
  });
  const [showPassword1, setShowPassword1] = useState(false); // State to toggle password visibility
  const [showPassword2, setShowPassword2] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserInfo();
        const { first_name, last_name, profile_image, is_verified } = response;
        setFirstName(first_name);
        setLastName(last_name);
        setIsActive(is_verified);
        setProfileImage(
          `https://lebasee-backend-production.up.railway.app/${profile_image}`
        );
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (operation: number) => {
    try {
      if (operation === 0) {
        setFirstName(localStorage.getItem("firstName"));
        setLastName(localStorage.getItem("lastName"));
        return;
      }

      let changed = false;
      if (
        firstName !== localStorage.getItem("firstName") ||
        lastName !== localStorage.getItem("lastName")
      ) {
        console.log("hi");
        const formData = new FormData();
        formData.append("first_name", firstName ?? "");
        formData.append("last_name", lastName ?? "");
        const response = await putUserName(formData);

        if (response.status !== 200) {
          throw new Error();
        }
        localStorage.setItem("firstName", firstName ?? "");
        localStorage.setItem("lastName", lastName ?? "");
        changed = true;
      }

      if (changed) {
        console.log("changed");
        setToastData({
          open: true,
          message: "اطلاعات شما با موفقیت به روز شد.",
          severity: "success",
        });
        const customEvent = new Event("refetchUserData");
        window.dispatchEvent(customEvent);
        setNewPassword("");
        setCurrentPassword("");
        return;
      }

      if (!changed && newPassword.length === 0) {
        return;
      }

      if (correctPassword != currentPassword) {
        setToastData({
          open: true,
          message: "رمز عبور فعلی مطابقت ندارد",
          severity: "error",
        });
        return;
      }

      const moreThan8 = newPassword.length >= 8;
      const haveLowerCase = /[a-z]/.test(newPassword);
      const haveUpperCase = /[A-Z]/.test(newPassword);
      const haveSymbol = /[^a-zA-Z0-9]/.test(newPassword); // Matches any non-alphanumeric character

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

      const passwordResponse = await postUserNewPassword({
        new_password: newPassword,
        current_password: currentPassword,
      });
      if (passwordResponse.status !== 204) {
        throw new Error();
      }
      localStorage.setItem("password", newPassword ?? "");
      setNewPassword("");
      setCurrentPassword("");
      setToastData({
        open: true,
        message: "رمز عبور شما با موفقیت عوض شد",
        severity: "success",
      });
      return;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.status === 401) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setToastData({
          open: true,
          message: "نشست شما منقضی شده است.",
          severity: "error",
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/auth/login");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setToastData({
          open: true,
          message: "خطا در برقراری ارتباط با سرور.",
          severity: "error",
        });
      }
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_image", file); // Ensure "profile_image" matches the backend key.

      try {
        const response = await putUserName(formData); // Pass FormData to the API
        if (response?.status === 200) {
          // Revoke the previous object URL to release memory
          if (profileImage) {
            URL.revokeObjectURL(profileImage);
          }

          // Update the profile picture preview
          const newImageURL = URL.createObjectURL(file);
          setProfileImage(newImageURL);
          setToastData({
            open: true,
            message: "تصویر پروفایل با موفقیت به‌روز شد.",
            severity: "success",
          });
          const customEvent = new Event("refetchUserData");
          window.dispatchEvent(customEvent);
        } else {
          throw new Error("Failed to update the profile image.");
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        setToastData({
          open: true,
          message: "خطا در آپلود تصویر پروفایل.",
          severity: "error",
        });
      } finally {
        // Reset the file input value
        event.target.value = "";
      }
    } else {
      console.log("Failed to update the profile");
    }
  };

  const handleClick = async () => {
    if (isActive) {
      return;
    }
    setIsVerifying(true);
    try {
      const response = await resendVerifyCode(email);
      if (response.status === 200) {
        setIsVerifying(true);
        setToastData({
          open: true,
          message: "ایمیل تایید با موفقیت ارسال شد.",
          severity: "success",
        });
      }
    } catch (error) {
      setToastData({
        open: true,
        message: "خطا در برقراری ارتباط با سرور.",
        severity: "error",
      });
      setIsVerifying(false);
    }
  };

  const [isVerifying, setIsVerifying] = useState(false); // Toggle between link and verification fields
  const [code, setCode] = useState(Array(4).fill(""));

  const handleVerifyCode = async () => {
    try {
      const parsedCode = persianToNumeric(code);
      const response = await VerifyCode(parsedCode);

      if (response?.status == 200) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setToastData({
          open: true,
          message: "ایمیل با موفقیت تایید شد.",
          severity: "success",
        });
        setIsVerifying(false);
        setIsActive(true);
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
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "65%",
          height: "100vh",
          mr: 3,
          // bgcolor: "white",
        }}
      >
        <Typography
          variant="h2"
          color="white"
          sx={{
            mt: 7,
          }}
        >
          تنظیمات
        </Typography>

        {/* Profile Picture Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative", // Make the container relative for absolute positioning
          }}
        >
          <Avatar
            sx={{
              border: "2px solid #ecf0f1",
              height: 220,
              width: 220,
            }}
            src={profileImage}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 3,
              mr: 15,
              zIndex: 1,
              backgroundColor: pallete.primary[500],
              width: 35,
              height: 35,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderRadius: 1.5,
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: pallete.primary[700], // Change background on hover
              },
            }}
          >
            <label htmlFor="upload-profile-picture">
              <input
                id="upload-profile-picture"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <ModeEditOutlinedIcon
                sx={{
                  mt: 1.3,
                  color: "black",
                  cursor: "pointer",
                  width: 25,
                  height: 25,
                }}
              />
            </label>
          </Box>
        </Box>

        <Toast
          message={toastData.message}
          open={toastData.open}
          severity={toastData.severity}
          onClose={() => setToastData({ ...toastData, open: false })}
        />

        {/* Form Section */}
        <Box
          sx={{
            mt: 8,
            p: 3,
            borderRadius: "8px",
            // No background color for the form section
          }}
        >
          <Grid container spacing={2}>
            {/* First Name and Last Name in a row */}
            <Grid item xs={6}>
              <CustomTextField
                fullWidth
                label="نام"
                variant="filled"
                value={firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFirstName(e.target.value)
                }
                sx={{
                  "& .MuiInputBase-input": {
                    ml: 3,
                  },
                  bgcolor: pallete.secondary[200],
                  borderRadius: 1,
                }}
                inputProps={{
                  dir: "ltr", // Align content from left-to-right
                  // readOnly: true, // Make the input read-only
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                fullWidth
                label="نام خانوادگی"
                variant="filled"
                value={lastName}
                // placeholder="توضیحات مربوط به لباس جدید را وارد کنید"
                onChange={(e) => setLastName(e.target.value)}
                multiline
                sx={{
                  bgcolor: pallete.secondary[200],
                  borderRadius: 1,
                  "& .MuiInputBase-input": {
                    ml: 3,
                  },
                }}
                inputProps={{
                  dir: "ltr", // Align content from left-to-right
                  // readOnly: true, // Make the input read-only
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                fullWidth
                label="ایمیل"
                variant="filled"
                value={email}
                // placeholder="توضیحات مربوط به لباس جدید را وارد کنید"
                onChange={(e) => setEmail(e.target.value)}
                multiline
                sx={{
                  "& .MuiInputBase-input": {
                    ml: 3,
                  },
                  bgcolor: pallete.secondary[200],
                  borderRadius: 1,
                }}
                inputProps={{
                  dir: "ltr", // Align content from left-to-right
                  readOnly: true, // Make the input read-only
                }}
              />
            </Grid>

            <Grid item xs={6}>
              {/* Verification Link */}
              <Box sx={{ textAlign: "right", mt: 2 }}>
                {isVerifying ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      mt: -2,
                    }}
                  >
                    {/* Verify Button */}
                    <Box
                      sx={{
                        bgcolor: pallete.secondary[200],
                        p: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {/* Verification Fields */}
                      <DigitInput code={code} setCode={setCode} />
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleVerifyCode}
                      sx={{ mr: 4 }}
                    >
                      تایید
                    </Button>
                  </Box>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      color: isActive ? pallete.primary[200] : "warning.main", // Styled as a link
                      cursor: "pointer",
                    }}
                    onClick={handleClick}
                  >
                    ایمیل شما تایید {isActive ? "شده" : "نشده"} است!
                  </Typography>
                )}
              </Box>
            </Grid>

            <Grid item xs={6}>
              <CustomTextField
                fullWidth
                label="رمز عبور فعلی"
                variant="filled"
                value={currentPassword}
                type={showPassword1 ? "text" : "password"} // Toggle type based on state
                // Bind to the newPassword state
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCurrentPassword(e.target.value)
                } // Update the password state on change
                sx={{
                  bgcolor: pallete.secondary[200],
                  borderRadius: 1,
                  "& .MuiInputBase-input": {
                    ml: 3,
                  },
                }}
                InputProps={{
                  dir: "ltr", // Align content from left-to-right
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{
                          mr: 2,
                          mb: -2,
                        }}
                        onClick={() => setShowPassword1(!showPassword1)} // Toggle visibility on click
                        edge="end"
                      >
                        {showPassword1 ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true, // Keep the label above the input field
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomTextField
                fullWidth
                label="رمز عبور جدید"
                variant="filled"
                value={newPassword}
                type={showPassword2 ? "text" : "password"} // Toggle type based on state
                // Bind to the newPassword state
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewPassword(e.target.value)
                } // Update the password state on change
                sx={{
                  bgcolor: pallete.secondary[200],
                  borderRadius: 1,
                  "& .MuiInputBase-input": {
                    ml: 3,
                  },
                }}
                InputProps={{
                  dir: "ltr", // Align content from left-to-right
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{
                          mr: 2,
                          mb: -2,
                        }}
                        onClick={() => setShowPassword2(!showPassword2)} // Toggle visibility on click
                        edge="end"
                      >
                        {showPassword2 ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true, // Keep the label above the input field
                }}
              />
            </Grid>

            {/* Buttons */}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 10 }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleSubmit(0)}
                sx={{
                  width: 120, // Increased width
                  color: "black", // Text color
                  backgroundColor: pallete.secondary[400], // Background color for انصراف
                  "&:hover": { backgroundColor: pallete.secondary[600] }, // Slightly lighter black on hover
                }}
              >
                انصراف
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit(1)}
                sx={{
                  width: 120, // Increased width
                  backgroundColor: pallete.primary[600], // Background color for ذخیره
                  color: "white", // White text for contrast
                  "&:hover": { backgroundColor: pallete.primary[800] }, // Slightly lighter black on hover
                }}
              >
                ذخیره
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box
        sx={{
          width: "35%",
          height: "100%",
        }}
      ></Box>
    </Box>
  );
};

export default Setting;