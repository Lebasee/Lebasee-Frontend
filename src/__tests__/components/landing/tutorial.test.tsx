import { render, screen } from "@testing-library/react";
import Tutorial from "../../../components/landing/tutorial/tutorial";
import "@testing-library/jest-dom";

describe("Tutorial", () => {
  test("renders the Tutorial component", () => {
    render(<Tutorial />);
    expect(screen.getByText(/عکس خود را بارگذاری کنید./i)).toBeInTheDocument();
    expect(
      screen.getByText(/لباس‌هایی که می‌خواهید امتحان کنید اضافه کنید./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/تصویر نهایی را ببینید./i)).toBeInTheDocument();
  });
});
