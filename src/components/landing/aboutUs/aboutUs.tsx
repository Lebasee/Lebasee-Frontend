import { Box, Typography } from "@mui/material";
import React from "react";
import AboutUsBanner from "../../../assets/about-us-banner.webp";
import Counter from "./counter";
const AboutUs: React.FC = () => {
  return (
    <Box
      sx={{
        maxWidth: "1063px",
        width: "100%",
        height: "550px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        color="white"
        variant="h3"
      >
        درباره ما
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          height="380px"
          width="525px"
          src={AboutUsBanner}
          alt="درباره ما"
        />
        <Box>
          <Typography
            variant="body1"
            color="white"
            sx={{ mb: 5 }}
          >
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است.
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
              flex: "1 1 0",
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
