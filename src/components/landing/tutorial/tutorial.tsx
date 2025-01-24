import React from "react";
import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import PersonIcon from "@mui/icons-material/Person";
import CustomStepIcon from "./setpIcon";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const steps = [
  { label: "عکس خود را بارگذاری کنید.", icon: <CameraAltIcon /> },
  {
    label: "لباس‌هایی که می‌خواهید امتحان کنید اضافه کنید.",
    icon: <CheckroomIcon />,
  },
  { label: "تصویر نهایی را ببینید.", icon: <PersonIcon /> },
];

const Tutorial: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      data-testid="tutorial"
      sx={{
        width: "100%",
        height: { xs: "auto", md: "300px" },
        py: { xs: 4, md: 0 },
        px: { xs: 2, md: 0 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stepper
        sx={{
          width: "80%",
          mx: "auto",
          "& .MuiStepConnector-root": {
            display: { xs: "none", md: "block" },
            left: "calc( 50% + 50px );",
            right: "calc( -50% + 50px );",
            top: "calc( 50% - 20px );%",
          },
        }}
        orientation={isMobile ? "vertical" : "horizontal"}
        alternativeLabel={!isMobile}
        activeStep={3}
      >
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel
              StepIconComponent={CustomStepIcon}
              sx={{
                "& .MuiStepLabel-label": {
                  mt: { xs: 1 },
                  textAlign: "center",
                },
              }}
            >
              <Typography
                variant="body1"
                color="white"
                sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
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
