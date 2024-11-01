import React from "react";
import { Box, Avatar } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import { pallete } from "../../styles/pallete.m";

interface StepProps {
  icon: SvgIconComponent;
}

const Step: React.FC<StepProps> = ({ icon: Icon }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "#FFFFFF",
    }}
  >
    <Avatar
      sx={{
        backgroundColor: `${pallete.secondary[800]}`,
        width: "80px",
        height: "80px",
        mb: 1,
      }}
    >
      <Icon
        sx={{ color: `${pallete.primary[500]}`, width: "50px", height: "50px" }}
      />
    </Avatar>
  </Box>
);

export default Step;
