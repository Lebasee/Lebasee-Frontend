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
import UserPicture from "../../../assets/user2.jpg";
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

const Setting: React.FC = () => {
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const [lastName, setLastName] = useState(localStorage.getItem("lastName"));
  const [profileImage, setProfileImage] = useState("");
  const [newPassword, setNewPassword] = useState(
    localStorage.getItem("password")
  );
  const currentPassword = localStorage.getItem("password");
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [toastData, setToastData] = useState<ToastData>({
    open: false,
    message: "",
    severity: "error",
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserInfo();
        const { first_name, last_name, profile_image } = response;
        setFirstName(first_name);
        setLastName(last_name);
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
        window.location.reload();
        return;
      }
      const response = await putUserName({
        first_name: firstName ?? "",
        last_name: lastName ?? "",
      });
      if (response.status !== 200) {
        throw new Error();
      }
      if (newPassword != currentPassword) {
        const response = await putUserName({
          password: newPassword,
        });
        if (response.status !== 200) {
          throw new Error();
        }
        localStorage.setItem("password", newPassword ?? "");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setToastData({
        open: true,
        message: "اطلاعات شما با موفقیت به روز شد.",
        severity: "success",
      });
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
        <Box>
          <Avatar
            sx={{
              border: "2px solid #ecf0f1",
              height: 220,
              width: 220,
              mr: 44,
              mt: -2,
              zIndex: 0,
              position: "relative",
            }}
            src={profileImage}
          />
          <Box
            sx={{
              // position: "absolute",
              // top: "75%",
              // left: "75%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              backgroundColor: pallete.primary[500],
              width: 35,
              height: 35,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              mt: -1.5,
              mr: "54%",
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
                  mt: 1,
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
                onChange={(e) => setFirstName(e.target.value)}
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
            <Grid item xs={12}>
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

              {/* Verification Link */}
              <Typography
                variant="body2"
                sx={{
                  color: pallete.warning[100], // Styled as a link
                  textAlign: "right", // Align text to the right
                  mt: 1,
                  cursor: "pointer",
                }}
                onClick={() => window.open("https://example.com", "_blank")}
              >
                ایمیل شما تایید نشده است!
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label="رمز عبور"
                variant="filled"
                type={showPassword ? "text" : "password"} // Toggle type based on state
                value={newPassword} // Bind to the newPassword state
                onChange={(e) => setNewPassword(e.target.value)} // Update the password state on change
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
                          mr: 6,
                        }}
                        onClick={() => setShowPassword(!showPassword)} // Toggle visibility on click
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
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