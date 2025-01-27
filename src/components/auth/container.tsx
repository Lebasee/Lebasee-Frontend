import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { ReactNode } from "react";
import { pallete } from "../../styles/pallete.m";
import LoginImage from "../../assets/LoginImage.png";
import { Outlet } from "react-router";

type ContainerProps = {
  children?: ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background: `linear-gradient(to right top, ${pallete.secondary[500]}, ${pallete.primary[300]}, ${pallete.secondary[500]}, ${pallete.primary[600]}, ${pallete.secondary[700]})`,
        mx: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: isMobile ? "100%" : isTablet ? "700px" : "1080px",
          height: isMobile ? "100%" : isTablet ? "400px" : "586px",
          borderRadius: isMobile ? "0" : "16px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "stretch",
          bgcolor: pallete.secondary[200],
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children || <Outlet />} {/* Render children or use Outlet */}
        </Box>

        {!isMobile && (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
              pl: "27px",
            }}
          >
            <img
              src={LoginImage}
              alt="Login"
              width={isTablet ? 300 : 536}
              height={isTablet ? 297 : 531}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Container;