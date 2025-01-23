import { Box } from "@mui/material";
import React, { useRef } from "react";
import { pallete } from "../styles/pallete.m";
import Navbar from "../components/landing/heroSection/navbar";
import HeroSection from "../components/landing/heroSection/heroSection";
import Tutorial from "../components/landing/tutorial/tutorial";
import Features from "../components/landing/features/features";
import Testimonials from "../components/landing/testimonials/testimonials";
import AboutUs from "../components/landing/aboutUs/aboutUs";
import Footer from "../components/landing/footer/footer";

const Landing: React.FC = () => {
  const sectionRefs = {
    home: useRef<HTMLElement | null>(null),
    tutorial: useRef<HTMLElement | null>(null),
    features: useRef<HTMLElement | null>(null),
    testimonials: useRef<HTMLElement | null>(null),
    aboutUs: useRef<HTMLElement | null>(null),
    footer: useRef<HTMLElement | null>(null),
  };

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: `${pallete.secondary[900]}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Navbar
        scrollToSection={scrollToSection}
        sectionRefs={sectionRefs}
      />
      {/* <Box
        sx={{ maxWidth: "1063px", width: "100%" }}
        ref={sectionRefs.home}
      >
        <HeroSection />
      </Box>
      <Box
        sx={{ maxWidth: "1063px", width: "100%" }}
        ref={sectionRefs.tutorial}
      >
        <Tutorial />
      </Box>
      <Box
        sx={{ maxWidth: "1063px", width: "100%" }}
        ref={sectionRefs.features}
      >
        <Features />
      </Box>
      <Box
        sx={{ maxWidth: "1063px", width: "100%" }}
        ref={sectionRefs.testimonials}
      >
        <Testimonials />
      </Box>
      <Box
        sx={{ maxWidth: "1063px", width: "100%" }}
        ref={sectionRefs.aboutUs}
      >
        <AboutUs />
      </Box>
      <Box
        sx={{ width: "100%" }}
        ref={sectionRefs.footer}
      >
        <Footer />
      </Box> */}
    </Box>
  );
};

export default Landing;
