import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import PersonIcon from "@mui/icons-material/Person";
import StraightenIcon from "@mui/icons-material/Straighten";
import Step from "./step";

const Tutorial: React.FC = () => {
  return (
    <Box
      sx={{
        width: "80%",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={10}
      >
        <Grid item>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Step icon={StraightenIcon} />
            <Typography
              variant="body1"
              color="white"
              sx={{ mt: 2 }}
            >
              ابعاد بدن خود را وارد کنید
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Step icon={PersonIcon} />
            <Typography
              variant="body1"
              color="white"
              sx={{ mt: 2 }}
            >
              مدل سه‌بعدی منحصر به فرد خود را بسازید
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Step icon={CheckroomIcon} />
            <Typography
              variant="body1"
              color="white"
              sx={{ mt: 2 }}
            >
              لباس‌ها را بر روی مدل خود امتحان کنید
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tutorial;
