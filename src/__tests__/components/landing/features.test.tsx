import { render, screen } from "@testing-library/react";
import Features from "../../../components/landing/features/features";
import "@testing-library/jest-dom";

describe("Features", () => {
  test("renders the Features component", () => {
    render(<Features />);
    expect(screen.getByText(/مزایا و ویژگی ها/i)).toBeInTheDocument();
  });
});
