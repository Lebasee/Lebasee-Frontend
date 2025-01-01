import { render, screen } from "@testing-library/react";
import AboutUs from "../../../components/landing/aboutUs/aboutUs";
import "@testing-library/jest-dom";

describe("AboutUs", () => {
  test("renders the AboutUs component", () => {
    render(<AboutUs />);
    expect(screen.getByText(/درباره ما/i)).toBeInTheDocument();
    expect(screen.getByText(/لورم ایپسوم متن ساختگی/i)).toBeInTheDocument();
  });
});