import React from "react";
import { Box, Typography } from "@mui/material";
import Feature from "./feature";

const Features: React.FC = () => {
  return (
    <Box
      data-testid="features"
      sx={{
        width: "100%",
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 0 },
      }}
    >
      <Typography
        color="white"
        variant="h3"
        sx={{
          mb: { xs: 3, md: 5 },
          fontSize: { xs: "1.5rem", md: "2rem" },
          textAlign: "center",
        }}
      >
        مزایا و ویژگی ها
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 4 },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {[1, 2, 3].map((_, index) => (
          <Feature
            key={index}
            text="ساخت مدل سه‌بعدی با توجه به ابعاد واقعی بدن شما"
          />
        ))}
      </Box>
    </Box>
  );
};

export default Features;
