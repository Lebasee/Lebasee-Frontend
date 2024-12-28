import React from "react";
import { AppBar, Box, Typography, Container, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { pallete } from "../../../styles/pallete.m";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  scrollToSection: (ref: React.RefObject<HTMLElement>) => void;
  sectionRefs: {
    [key: string]: React.RefObject<HTMLElement>;
  };
}

const sections = [
  { title: "خانه", id: "home" },
  { title: "ویژگی ها و مزایا", id: "features" },
  { title: "نظرات کاربران", id: "testimonials" },
  { title: "درباره ما", id: "aboutUs" },
  { title: "تماس با ما", id: "footer" },
];

const Navbar: React.FC<NavbarProps> = ({ scrollToSection, sectionRefs }) => {
  const navigate = useNavigate();
  return (
    <AppBar
      data-testid="navbar"
      position="absolute"
      sx={{
        mx: "auto",
        width: "90%",
        top: "35px",
        right: 0,
        left: 0,
        bgcolor: `${pallete.secondary[800]}`,
        borderRadius: "6px",
        maxWidth: "1280px",
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
              key={section.id}
              onClick={() => scrollToSection(sectionRefs[section.id])}
              sx={{ color: "white" }}
            >
              {section.title}
            </Button>
          ))}
        </Box>
        <Button
          variant="contained"
          onClick={() => navigate("/auth/login")}
        >
          ورود
          <LoginIcon sx={{ mr: 1 }} />
        </Button>
      </Container>
    </AppBar>
  );
};
export default Navbar;
