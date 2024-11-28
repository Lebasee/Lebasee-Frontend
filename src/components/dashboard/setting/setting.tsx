import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import UserPicture from "../../../assets/user2.jpg";
import { pallete } from "../../../styles/pallete.m";

const Setting: React.FC = () => {
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
            src={UserPicture}
          />
          <Box
            sx={{
              position: "absolute",
              top: "75%",
              left: "75%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              backgroundColor: pallete.primary[500],
              width: 35,
              height: 35,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              mt: -47.5,
              ml: -52,
              borderRadius: 1.5,
            }}
            onClick={() => console.log("Edit icon clicked!")}
          >
            <ModeEditOutlinedIcon
              sx={{
                color: "black",
                width: 25,
                height: 25,
              }}
            />
          </Box>
        </Box>

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
              <TextField
                fullWidth
                label="نام"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black", textAlign: "right" }, // Right-align label
                }}
                InputProps={{
                  style: {
                    color: "black", // Input text color
                    backgroundColor: pallete.secondary[200], // Background color of input fields
                  },
                }}
                sx={{
                  "& label": {
                    transformOrigin: "right",
                    left: "inherit",
                    right: "2rem",
                    top: "-0.2rem",
                    overflow: "unset",
                  },
                  "& legend": {
                    textAlign: "right",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "16px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="نام خانوادگی"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black", textAlign: "right" }, // Right-align label
                }}
                InputProps={{
                  style: {
                    color: "black",
                    backgroundColor: pallete.secondary[200], // Background color of input fields
                  },
                }}
                sx={{
                  "& label": {
                    transformOrigin: "right",
                    left: "inherit",
                    right: "2rem",
                    top: "-0.2rem",
                    overflow: "unset",
                  },
                  "& legend": {
                    textAlign: "right",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "16px",
                  },
                }}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ایمیل"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black", textAlign: "right" }, // Right-align label
                }}
                InputProps={{
                  style: {
                    color: "black",
                    backgroundColor: pallete.secondary[200], // Background color of input fields
                  },
                }}
                sx={{
                  "& label": {
                    transformOrigin: "right",
                    left: "inherit",
                    right: "2rem",
                    top: "-0.2rem",
                    overflow: "unset",
                  },
                  "& legend": {
                    textAlign: "right",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "16px",
                  },
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
                ایمیل شما تایید نشده است !
              </Typography>
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="رمز عبور"
                variant="outlined"
                type="password"
                InputLabelProps={{
                  style: { color: "black", textAlign: "right" }, // Right-align label
                }}
                InputProps={{
                  style: {
                    color: "black",
                    backgroundColor: pallete.secondary[200], // Background color of input fields
                  },
                }}
                sx={{
                  "& label": {
                    transformOrigin: "right",
                    left: "inherit",
                    right: "2rem",
                    top: "-0.2rem",
                    overflow: "unset",
                  },
                  "& legend": {
                    textAlign: "right",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "16px",
                  },
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