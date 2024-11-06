// Sidebar.js
import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import CheckroomIcon from "@mui/icons-material/Checkroom";

const tabs = [
  { name: "داشبود", id: 1, icon: DashboardIcon },
  { name: "اطلاعات بدن", id: 2, icon: AccessibilityIcon },
  { name: "لباس ها", id: 3, icon: CheckroomIcon },
  { name: "تنظیمات", id: 4, icon: SettingsIcon },
  { name: "خروج", id: 5, icon: LogoutIcon },
];

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: "20%",
        backgroundColor: "#28353a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        padding: "20px 0",
        boxSizing: "border-box",
      }}
    >
      {/* Sidebar Title */}
      <Typography
        variant="h4"
        sx={{
          mt: 8,
          color: "white",
          fontWeight: "bold",
          marginBottom: "24px",
        }}
      >
        لباسی
      </Typography>

      {/* User Avatar Section */}
      <Avatar
        src=""
        alt="User Avatar"
        sx={{
          width: 100,
          height: 100,
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
          <Box
            key={tab.id}
            sx={{
              display: "flex",
              alignItems: "center",
              paddingY: 2,
              paddingX: 3,
              marginBottom: 1,
              cursor: "pointer",
              borderRadius: "8px",
              transition: "transform 0.1s, background-color 0.3s",
              "&:hover": {
                backgroundColor: "#34495e",
              },
              "&:active": {
                transform: "scale(0.95)", // Scale down slightly on click
              },
            }}
          >
            <tab.icon sx={{ color: "white", marginRight: 2, fontSize: 20, ml: 1 }} />
            <Typography variant="body1" sx={{ color: "white", fontSize: 14 }}>
              {tab.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
