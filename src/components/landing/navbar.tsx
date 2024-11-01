import React from "react";
import { AppBar, Box, Typography, Container, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { pallete } from "../../styles/pallete.m";

const sections = [
  { title: "خانه", href: "#home" },
  { title: "ویژگی ها و مزایا", href: "#home" },
  { title: "نظرات کاربران", href: "#home" },
  { title: "درباره ما", href: "#home" },
  { title: "تماس با ما", href: "#home" },
];

const Navbar: React.FC = () => {
  return (
    <AppBar
      position="absolute"
      sx={{
        mx: "auto",
        width: "90%",
        top: "35px",
        right: "5%",
        bgcolor: `${pallete.secondary[800]}`,
        borderRadius: "6px",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          px: "1rem !important",
          py: ".75rem !important",
        }}
      >
        <Typography
          variant="h4"
          component="a"
          href="/"
          sx={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          لباسی
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {sections.map((section) => (
            <Button
              href={section.href}
              key={section.title}
              sx={{ color: "white" }}
            >
              {section.title}
            </Button>
          ))}
        </Box>
        <Button
          variant="contained"
          href="/auth/login"
        >
          ورود
          <LoginIcon sx={{ mr: 1 }} />
        </Button>
      </Container>
    </AppBar>
  );
};
export default Navbar;
