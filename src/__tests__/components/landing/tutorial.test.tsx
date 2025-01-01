import { render, screen } from "@testing-library/react";
import Tutorial from "../../../components/landing/tutorial/tutorial";
import "@testing-library/jest-dom";

describe("Tutorial", () => {
  test("renders the Tutorial component", () => {
    render(<Tutorial />);
    expect(screen.getByText(/ابعاد بدن خود را وارد کنید/i)).toBeInTheDocument();
    expect(
      screen.getByText(/مدل سه‌بعدی منحصر به فرد خود را بسازید/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/لباس‌ها را بر روی مدل خود امتحان کنید/i)
    ).toBeInTheDocument();
  });
});
