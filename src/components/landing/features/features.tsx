import React from "react";
import { Box, Typography } from "@mui/material";
import Feature from "./feature";

const Features: React.FC = () => {
  return (
    <Box
      sx={{
        maxWidth: "1063px",
        width: "100%",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "50px",
      }}
    >
      <Typography
        color="white"
        variant="h3"
      >
        مزایا و ویژگی ها
      </Typography>
      <Box
        data-testid="features"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Feature text="ساخت مدل سه‌بعدی با توجه به ابعاد واقعی بدن شما" />
        <Feature text="ساخت مدل سه‌بعدی با توجه به ابعاد واقعی بدن شما" />
        <Feature text="ساخت مدل سه‌بعدی با توجه به ابعاد واقعی بدن شما" />
      </Box>
    </Box>
  );
};

export default Features;
