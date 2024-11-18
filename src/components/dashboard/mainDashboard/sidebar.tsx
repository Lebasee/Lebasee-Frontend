import React from "react";
import { Avatar, Box, Typography, ButtonBase } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import UserPicture from "../../../assets/user2.jpg";

const tabs = [
  { name: "داشبود", id: 1, icon: DashboardIcon, href: "" },
  { name: "اطلاعات بدن", id: 2, icon: AccessibilityIcon, href: "/info" },
  { name: "لباس ها", id: 3, icon: CheckroomIcon, href: "/clothes" },
  { name: "تنظیمات", id: 4, icon: SettingsIcon, href: "/setting" },
  { name: "خروج", id: 5, icon: LogoutIcon },
];

const Sidebar: React.FC = () => {
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
      }}
    >
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
        src={UserPicture}
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
        غلام رضا غلامی
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: "white",
          fontSize: 14,
          marginBottom: "32px",
        }}
      >
        mamarezatajik@gmail.com
      </Typography>

      {/* Dynamic Tab Components */}
      <Box sx={{ width: "100%", paddingX: 2 }}>
        {tabs.map((tab) => (
          <ButtonBase
            key={tab.id}
            sx={{
              width: "100%", // Ensure the clickable area spans the full width
              display: "block",
              textAlign: "left", // Align the text to the left
              borderRadius: "8px", // Apply rounded corners to the entire button
              "&:hover": {
                backgroundColor: "#34495e",
              },
              "&:active": {
                transform: "scale(0.95)", // Scale down slightly on click
              },
            }}
          >
            <Link
              to={`/dashboard${tab.href}`}
              style={{
                textDecoration: "none",
                display: "block",
                width: "100%",
                color: "inherit",
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
            </Link>
          </ButtonBase>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;