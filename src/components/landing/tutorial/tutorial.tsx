import React from "react";
import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import PersonIcon from "@mui/icons-material/Person";
import StraightenIcon from "@mui/icons-material/Straighten";
import CustomStepIcon from "./setpIcon";

const steps = [
  { label: "ابعاد بدن خود را وارد کنید", icon: <StraightenIcon /> },
  { label: "مدل سه‌بعدی منحصر به فرد خود را بسازید", icon: <PersonIcon /> },
  { label: "لباس‌ها را بر روی مدل خود امتحان کنید", icon: <CheckroomIcon /> },
];

const Tutorial: React.FC = () => {
  return (
    <Box
      sx={{
        maxWidth: "1063px",
        width: "100%",
        height: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stepper
        sx={{
          width: "100%",

          "& .MuiStepConnector-alternativeLabel": {
            left: "calc( 50% + 50px );",
            right: "calc( -50% + 50px );",
            top: "calc( 50% - 20px );%",
          },
        }}
        alternativeLabel
        activeStep={3}
      >
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={CustomStepIcon}>
              <Typography
                variant="body1"
                color="white"
              >
                {step.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default Tutorial;
