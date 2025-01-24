import React from "react";
import {
  AppBar,
  Box,
  Container,
  Button,
  Drawer,
  IconButton,
  createTheme,
  ThemeProvider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { pallete } from "../../../styles/pallete.m";
import { useNavigate } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Logo from "../../../assets/logo_primary.svg";

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
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const parentTheme = useTheme(); // Get the parent theme
  const mergedTheme = createTheme({
    ...parentTheme, // Spread the parent theme properties
    direction: "ltr", // Add your custom override
  });
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      data-testid="navbar"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 1,
        bgcolor: pallete.secondary[800],
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "64px",
          p: 2,
          bgcolor: pallete.secondary[900],
        }}
      >
        <img
          src={Logo}
          alt="لباسی"
          style={{
            height: "25px", // Adjust the height as needed
            width: "auto", // Adjust the width as needed
            color: "white", // If you want to change the color of the SVG
          }}
        />
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: "white",
            transform: mobileOpen ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.2s ease-in-out",
          }}
        >
          <MenuOpenIcon />
        </IconButton>
      </Box>
      <Box sx={{ p: 2, width: "100%" }}>
        {sections.map((section) => (
          <Button
            key={section.id}
            onClick={() => {
              scrollToSection(sectionRefs[section.id]);
              setMobileOpen(false);
            }}
            sx={{ color: "white", width: "100%", justifyContent: "flex-start" }}
          >
            {section.title}
          </Button>
        ))}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          borderRadius: 0,
          bgcolor: `${pallete.secondary[800]}`,
          boxShadow: "none",
          width: "100%",
          maxWidth: "100%",
          left: 0,
          right: 0,
          py: 1.5,
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, md: 4 },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { md: "none" },
              color: "white",
            }}
          >
            <MenuOpenIcon />
          </IconButton>
          <img
            src={Logo}
            alt="لباسی"
            style={{
              height: isMobile ? "25px" : "35px", // Adjust the height as needed
              width: "auto", // Adjust the width as needed
              color: "white", // If you want to change the color of the SVG
            }}
          />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              alignItems: "center",
            }}
          >
            {sections.map((section) => (
              <Button
                key={section.id}
                onClick={() => scrollToSection(sectionRefs[section.id])}
                sx={{
                  color: "white",
                  fontSize: { md: "0.875rem", lg: "1rem" },
                }}
              >
                {section.title}
              </Button>
            ))}
          </Box>

          {isMobile ? (
            <IconButton onClick={() => navigate("/auth/login")}>
              <LoginIcon
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          ) : (
            <Button
              variant="contained"
              onClick={() => navigate("/auth/login")}
              sx={{
                py: 1,
                px: { xs: 0, md: 3 },
                fontSize: { xs: "0.75rem", md: "0.875rem" },
              }}
            >
              ورود
              <LoginIcon
                sx={{ mr: 1, fontSize: { xs: "1rem", md: "1.25rem" } }}
              />
            </Button>
          )}
        </Container>
      </AppBar>
      <ThemeProvider theme={mergedTheme}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          anchor="right"
          sx={{
            transform: "translateX",
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 200,
              bgcolor: pallete.secondary[800],
            },
          }}
        >
          {drawer}
        </Drawer>
      </ThemeProvider>
    </>
  );
};

export default Navbar;
