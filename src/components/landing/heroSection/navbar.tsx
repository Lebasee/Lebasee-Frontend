import React from "react";
import {
  AppBar,
  Box,
  Typography,
  Container,
  Button,
  Drawer,
  IconButton,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { pallete } from "../../../styles/pallete.m";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

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
  const mainTheme = createTheme({
    direction: "ltr",
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 1,
        bgcolor: pallete.secondary[800],
      }}
    >
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
          py: 1,
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
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h4"
            component="a"
            href="/"
            sx={{
              color: "white",
              textDecoration: "none",
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            لباسی
          </Typography>

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

          <Button
            variant="contained"
            onClick={() => navigate("/auth/login")}
            sx={{
              py: 1,
              px: { xs: 2, md: 3 },
              fontSize: { xs: "0.75rem", md: "0.875rem" },
            }}
          >
            ورود
            <LoginIcon
              sx={{ mr: 1, fontSize: { xs: "1rem", md: "1.25rem" } }}
            />
          </Button>
        </Container>
      </AppBar>
      <ThemeProvider theme={mainTheme}>
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
              width: 240,
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
