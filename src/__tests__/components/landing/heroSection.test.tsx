import { render, screen } from "@testing-library/react";
import HeroSection from "../../../components/landing/heroSection/heroSection";
import "@testing-library/jest-dom";

describe("HeroSection", () => {
  test("renders the HeroSection component", () => {
    render(<HeroSection />);
    expect(screen.getByText(/تجربه‌ای نوین در انتخاب لباس/i)).toBeInTheDocument();
    expect(screen.getByText(/لباس‌های خود را بر روی مدل سه‌بعدی بدن خود ببینید/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /مشاهده‌ی دموی رایگان/i })).toBeInTheDocument();
  });
});