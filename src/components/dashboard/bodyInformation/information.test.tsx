import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";
import Information from "./information";
import "@testing-library/jest-dom";

vi.mock("../../../api/dashboard/getUserBodyInformation");
vi.mock("../../../api/dashboard/patchUserBodyInformation");

describe("Information Component", () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <Information />
      </MemoryRouter>
    );
  };

  it("renders the component", () => {
    setup();
    expect(screen.getByText("اطلاعات بدن شما")).toBeInTheDocument();
  });
});
