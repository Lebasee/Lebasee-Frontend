import { Box, Button, Typography } from "@mui/material";
import React from "react";
// import { pallete } from "../../../styles/pallete.m";
import ModelViewer from "../../base/SketchfabEmbed";


const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        mt: "105px",
        display: "flex",
        flexDirection: "row",
        height: "550px",
        maxWidth: "1063px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        <Typography
          variant="h1"
          color="white"
        >
          تجربه‌ای نوین در انتخاب لباس
        </Typography>
        <Typography
          variant="body1"
          fontWeight="bold"
          color="white"
        >
          لباس‌های خود را بر روی مدل سه‌بعدی بدن خود ببینید
        </Typography>
        <Button variant="contained">مشاهده‌ی دموی رایگان</Button>
      </Box>
      <Box
        sx={{
          flexShrink: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
              sx={{
                mb: -12,
                height: 500,
                width: 400,
              }}
            >
              <ModelViewer />
            </Box>
        {/* <Box
          bgcolor={pallete.secondary[50]}
          width="415px"
          height="415px"
          borderRadius="6px"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2">نمونه مدل</Typography>
        </Box> */}
      </Box>
    </Box>
  );
};

export default HeroSection;
