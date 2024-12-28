import { render, screen } from "@testing-library/react";
import { describe, expect, beforeEach, test } from "vitest";
import Landing from "../../pages/landing";
import { BrowserRouter } from "react-router-dom";

describe("Landing Page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );
  });
  test("renders the Navbar component", () => {
    expect(screen.getByTestId("navbar"));
  });

  test("renders the HeroSection component", () => {
    expect(screen.getByTestId("hero-section"));
  });

  test("renders the Tutorial component", () => {
    expect(screen.getByTestId("tutorial"));
  });

  test("renders the Features component", () => {
    expect(screen.getByTestId("features"));
  });

  test("renders the Testimonials component", () => {
    expect(screen.getByTestId("testimonials"));
  });

  test("renders the AboutUs component", () => {
    expect(screen.getByTestId("aboutUs"));
  });

  test("renders the Footer component", () => {
    expect(screen.getByTestId("footer"));
  });
});
