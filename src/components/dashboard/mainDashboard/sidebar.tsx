import React, { useEffect, useState } from "react";
import { Avatar, Box, Typography, ButtonBase } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import getUserInfo from "../../../api/dashboard/getUserInfo";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";

const tabs = [
  { name: "داشبود", id: 1, icon: DashboardIcon, href: "" },
  { name: "اطلاعات بدن", id: 2, icon: AccessibilityIcon, href: "/info" },
  { name: "لباس ها", id: 3, icon: CheckroomIcon, href: "/clothes" },
  { name: "استایل ها", id: 6, icon: AccessibilityNewIcon, href: "/styles" },
  { name: "تنظیمات", id: 4, icon: SettingsIcon, href: "/setting" },
  { name: "خروج", id: 5, icon: LogoutIcon, href: "/logout" },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const email = localStorage.getItem("email");
  const [profileImage, setProfileImage] = useState("");

  const location = useLocation();

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

    // Initial fetch
    fetchUserData();

    // Set interval to fetch data every 10 seconds
    const intervalId = setInterval(fetchUserData, 10000000);

    // Listen for custom event
    const handleCustomEvent = () => {
      console.log("Custom event triggered, refetching user data...");
      fetchUserData();
    };

    window.addEventListener("refetchUserData", handleCustomEvent);

    // Cleanup the interval and event listener on component unmount
    return () => {
      clearInterval(intervalId);
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

  return (
    <Box
      sx={{
        width: "20%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        padding: "20px 0",
        boxSizing: "border-box",
        position: "relative", // Add relative positioning to the parent container
      }}
    >
      {/* برگشت Button */}
      <ButtonBase
        onClick={() => navigate("/home")} // Navigate to home
        sx={{
          position: "absolute", // Place it in the top-right corner
          top: 10, // Adjust vertical position
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

      {/* Sidebar Title */}
      <Typography
        variant="h3"
        sx={{
          color: "white",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        لباسی
      </Typography>

      {/* User Avatar Section */}
      <Avatar
        src={profileImage}
        alt="User Avatar"
        sx={{
          mt: 7,
          width: 180,
          height: 180,
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
        }}
      >
        {firstName || "کاربر"} {lastName || "ناشناس"}
      </Typography>
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

      {/* Dynamic Tab Components */}
      <Box sx={{ width: "100%", paddingX: 2 }}>
        {tabs.map((tab) => {
          const isActive = location.pathname === `/dashboard${tab.href}`;
          return (
            <ButtonBase
              key={tab.id}
              onClick={() => handleClick(tab)} // Pass the full tab object
              sx={{
                width: "100%", // Ensure the clickable area spans the full width
                display: "block",
                textAlign: "left", // Align the text to the left
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
                  paddingY: 2,
                  paddingX: 3,
                }}
              >
                <tab.icon
                  sx={{ color: "white", marginRight: 2, fontSize: 20, ml: 1 }}
                />
                <Typography
                  variant="body1"
                  sx={{ color: "white", fontSize: 14 }}
                >
                  {tab.name}
                </Typography>
              </Box>
            </ButtonBase>
          );
        })}
      </Box>
    </Box>
  );
};

export default Sidebar;