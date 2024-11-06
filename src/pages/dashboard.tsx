import { Box } from "@mui/material";
import React from "react";
import { pallete } from "../styles/pallete.m";
import Sidebar from "../components/dashboard/sidebar";
import VerticalLine from "../components/dashboard/verticalLine";

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


    </Box>
  );
};

export default Dashboard;