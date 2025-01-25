import { render, screen } from "@testing-library/react";
import HeroSection from "../../../components/landing/heroSection/heroSection";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";

describe("HeroSection", () => {
  test("renders the HeroSection component", () => {
    render(
      <Router>
        <HeroSection />
      </Router>
    );
    expect(
      screen.getByText(/تجربه‌ای نوین در انتخاب لباس/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/لباس‌های خود را بر روی عکس دلخواه خود ببینید/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /شروع کنید/i })
    ).toBeInTheDocument();
  });
});
