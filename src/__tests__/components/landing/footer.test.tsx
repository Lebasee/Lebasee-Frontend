import { render, screen } from "@testing-library/react";
import Footer from "../../../components/landing/footer/footer";
import "@testing-library/jest-dom";

describe("Footer", () => {
  test("renders the Footer component", () => {
    render(<Footer />);
    expect(screen.getByText(/درباره لباسی/i)).toBeInTheDocument();
    expect(screen.getByText(/کلیه حقوق مادی و معنوی محفوظ است./i)).toBeInTheDocument();
  });
});