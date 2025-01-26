import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  ButtonBase,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import getUserInfo from "../../../api/dashboard/getUserInfo";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import Logo from "../../../assets/logo_primary.svg";
import LogoMobile from "../../../assets/icon3.svg";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const email = localStorage.getItem("email");
  const [profileImage, setProfileImage] = useState("");

  const location = useLocation();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isMediumScreen = useMediaQuery("(min-width: 1025px");
  const isLargeScreen = useMediaQuery("(min-width: 1460px)");
  const isSmallScreenY = useMediaQuery("(max-height: 600px)");

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
    const handleCustomEvent = () => {
      fetchUserData();
    };
    window.addEventListener("refetchUserData", handleCustomEvent);

    return () => {
      window.removeEventListener("refetchUserData", handleCustomEvent);
    };
  }, []);

  const handleClick = async (tab: {
    name: string;
    id: number;
    href: string;
  }) => {
    if (tab.id === 5) {
      localStorage.clear();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/landing"); // Navigate to landing page after clearing localStorage
    } else {
      navigate(`/dashboard${tab.href}`); // Navigate to the appropriate tab
    }
  };

  const tabs = [
    { name: "داشبود", id: 1, icon: DashboardIcon, href: "" },
    {
      name: isLargeScreen ? "استایل ها" : "استایل",
      id: 6,
      icon: AccessibilityNewIcon,
      href: "/styles",
    },
    {
      name: isLargeScreen ? "لباس ها" : "لباس",
      id: 4,
      icon: CheckroomIcon,
      href: "/clothes",
    },
    {
      name: isLargeScreen ? "ترکیب ها" : "ترکیب",
      id: 7,
      icon: BookmarksIcon,
      href: "/tryons",
    },
    {
      name: isLargeScreen ? "ابعاد بدن" : "ابعاد",
      id: 2,
      icon: PersonOutlineIcon,
      href: "/info",
    },
    { name: "تنظیمات", id: 3, icon: SettingsIcon, href: "/setting" },
    { name: "خروج", id: 5, icon: LogoutIcon, href: "/logout" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: isSmallScreen ? (isSmallScreen ? "60px" : "200px") : "24%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: "25px",
          height: "100vh",
          transition: "width 0.3s ease",
          position: "relative",
          padding: isSmallScreen ? "10px 0" : "20px 0",

          boxSizing: "border-box",
          zIndex: 1200,
        }}
      >
        {/* برگشت Button */}
        {!isSmallScreen && (
          <ButtonBase
            onClick={() => navigate("/home")} // Navigate to home
            sx={{
              position: "absolute", // Place it in the top-right corner
              top: 15, // Adjust vertical position
              right: 10, // Adjust horizontal position
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "white",
              padding: "5px 10px", // Add padding
              borderRadius: "8px", // Rounded corners
              cursor: "pointer",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "#34495e",
              },
              "&:active": {
                transform: "scale(0.95)", // Scale down slightly on click
              },
            }}
          >
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
            <Typography
              variant="body2"
              sx={{
                fontSize: 14,
              }}
            >
              برگشت
            </Typography>
          </ButtonBase>
        )}

        {/* Sidebar Title */}

        {/* User Avatar */}
        {!isSmallScreen && (
          <>
            <img
              src={Logo}
              alt="لباسی"
              style={{
                marginTop: "50px",
                marginBottom: "15px",
                height: "35px", // Adjust the height as needed
                width: "auto", // Adjust the width as needed
              }}
            />
            <Avatar
              src={profileImage}
              alt="User Avatar"
              sx={{
                width: { sm: 80, md: 140, lg: 180 },
                height: { sm: 80, md: 140, lg: 180 },
                border: "2px solid #ecf0f1",
                marginBottom: "10px",
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                color: "white",
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 1,
                mb: isSmallScreen ? "32px" : 0,
              }}
            >
              {firstName || "کاربر"} {lastName || "ناشناس"}
            </Typography>
            {!isSmallScreen && (
              <Typography
                variant="caption"
                sx={{
                  color: "white",
                  fontSize: 14,
                  marginBottom: "32px",
                }}
              >
                {email || "ایمیل نامشخص"}
              </Typography>
            )}
          </>
        )}

        {/* Dynamic Tab Components */}
        <Grid
          container
          spacing={isSmallScreen ? 2 : 1}
          sx={{
            width: "100%",
            position: "relative",
            alignItems: "center",
            mt: isSmallScreen ? 1 : 0,
            pl: isSmallScreen ? "7px" : 1,
          }}
        >
          {isSmallScreen && (
            <Grid
              item
              xs={12}
              key={12}
            >
              <ButtonBase
                onClick={() => navigate("/home")} // Navigate to home
                sx={{
                  width: "100%", // Ensure the clickable area spans the full width
                  display: "block",
                  borderRadius: "8px", // Apply rounded corners to the entire button
                  mt: isSmallScreenY ? 1 : 3,
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "#34495e",
                  },
                  "&:active": {
                    transform: "scale(0.95)", // Scale down slightly on click
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    fontSize: 10,
                    p: 1,
                  }}
                >
                  <ArrowForwardIcon sx={{ fontSize: 24, color: "white" }} />
                </Box>
              </ButtonBase>
            </Grid>
          )}
          {isSmallScreen && (
            <Grid
              item
              xs={12}
              key={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ButtonBase
                onClick={() => navigate("/home")}
                sx={{
                  width: "95%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  mt: 1,
                }}
              >
                <img
                  src={LogoMobile}
                  alt="لباسی"
                  style={{
                    height: "auto", // Adjust the height as needed
                    width: "100%", // Adjust the width as needed
                  }}
                />
              </ButtonBase>
            </Grid>
          )}
          {tabs.map((tab) => {
            const isActive = location.pathname === `/dashboard${tab.href}`;
            return (
              <Grid
                item
                xs={isSmallScreen ? 13 : tab.id === 5 ? 13 : 6}
                key={tab.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ButtonBase
                  onClick={() => handleClick(tab)} // Pass the full tab object
                  sx={{
                    width: "100%", // Ensure the clickable area spans the full width
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px", // Apply rounded corners to the entire button
                    mt: 1,
                    backgroundColor: isActive ? "#2c3e50" : "transparent",
                    "&:hover": {
                      backgroundColor: "#34495e",
                    },
                    "&:active": {
                      transform: "scale(0.95)", // Scale down slightly on click
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      fontSize: 10,
                      p: isSmallScreenY ? 1 : 2,
                    }}
                  >
                    <tab.icon
                      sx={{
                        color: "white",
                        fontSize: isSmallScreen ? 24 : 18,
                        ml: !isSmallScreen ? 1 : 0,
                        "&:MuiSvgIcon-root": {
                          m: 0,
                        },
                      }}
                    />
                    {!isSmallScreen && !isSmallScreen && (
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: isLargeScreen
                            ? "22px !important"
                            : isMediumScreen
                            ? "20px !important"
                            : "13px !important",
                        }}
                      >
                        {tab.name}
                      </Typography>
                    )}
                  </Box>
                </ButtonBase>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Sidebar;
