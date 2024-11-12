import React from "react";
import { Box } from "@mui/material";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import PersonIcon from "@mui/icons-material/Person";
import StraightenIcon from "@mui/icons-material/Straighten";
import { StepIconProps } from "@mui/material/StepIcon";
import { pallete } from "../../../styles/pallete.m";

const steps = [
  { label: "ابعاد بدن خود را وارد کنید", icon: StraightenIcon },
  { label: "مدل سه‌بعدی منحصر به فرد خود را بسازید", icon: PersonIcon },
  { label: "لباس‌ها را بر روی مدل خود امتحان کنید", icon: CheckroomIcon },
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
        width: "80px",
        height: "80px",
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
      <StepIcon sx={{ fontSize: "36px", color: "inherit" }} />
    </Box>
  );
};

export default CustomStepIcon;
