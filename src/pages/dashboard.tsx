import { Box } from "@mui/material";
import React from "react";
import { pallete } from "../styles/pallete.m";
import Sidebar from "../components/dashboard//mainDashboard/sidebar";
import VerticalLine from "../components/dashboard/mainDashboard/verticalLine";
import { Outlet } from "react-router-dom";
// import MainDashboard from "../components/dashboard/mainDashboard/mainDashboard";

const Dashboard: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: `${pallete.secondary[900]}`,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >

    <Sidebar />
    <VerticalLine/>
    <Outlet/>

    </Box>
  );
};

export default Dashboard;