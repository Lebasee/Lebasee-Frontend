import React from "react";
import { Box } from "@mui/material";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import PersonIcon from "@mui/icons-material/Person";
import { StepIconProps } from "@mui/material/StepIcon";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { pallete } from "../../../styles/pallete.m";

const steps = [
  { label: "عکس خود را بارگذاری کنید.", icon: CameraAltIcon },
  {
    label: "لباس‌هایی که می‌خواهید امتحان کنید اضافه کنید.",
    icon: CheckroomIcon,
  },
  { label: "تصویر نهایی را ببینید.", icon: PersonIcon },
];
const CustomStepIcon: React.FC<StepIconProps> = ({
  icon,
  active = false,
  completed = false,
  error = false,
  sx,
}) => {
  const iconIndex = Number(icon) - 1;
  const StepIcon = steps[iconIndex]?.icon || null;

  return (
    <Box
      sx={{
        width: { md: "80px", xs: "60px" },
        height: { md: "80px", xs: "60px" },
        borderRadius: "50%",
        backgroundColor: pallete.secondary[800],
        color:
          active || completed
            ? "primary.main"
            : error
            ? "error.main"
            : "grey.500",
        fontSize: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      <StepIcon sx={{ fontSize: { md: "36", xs: "25" }, color: "inherit" }} />
    </Box>
  );
};

export default CustomStepIcon;
