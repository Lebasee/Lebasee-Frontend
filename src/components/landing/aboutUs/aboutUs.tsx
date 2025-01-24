import { Box, Typography } from "@mui/material";
import React from "react";
import AboutUsBanner from "../../../assets/about-us-banner.webp";
import Counter from "./counter";
const AboutUs: React.FC = () => {
  return (
    <Box
      data-testid="aboutUs"
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
        درباره ما
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 6 },
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={AboutUsBanner}
          alt="درباره ما"
          sx={{
            width: { xs: "100%", md: 525 },
            height: { xs: 250, md: 380 },
            objectFit: "cover",
            borderRadius: 2,
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body1"
            color="white"
            sx={{
              mb: { xs: 3, md: 5 },
              fontSize: { xs: "0.875rem", md: "1rem" },
              textAlign: { xs: "center", md: "right" },
            }}
          >
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است.
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
            }}
          >
            <Counter
              end={69420}
              label="کاربران"
            />
            <Counter
              end={69}
              label="مدل ها"
            />
            <Counter
              end={313}
              label="لباس ها"
            />
            <Counter
              end={420}
              label="لباس ها"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUs;
