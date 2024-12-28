import { render, screen } from "@testing-library/react";
import Testimonials from "../../../components/landing/testimonials/testimonials";
import "@testing-library/jest-dom";

describe("Testimonials", () => {
  test("renders the Testimonials component", () => {
    render(<Testimonials />);
    expect(screen.getByText(/نظرات کاربران/i)).toBeInTheDocument();
  });
});