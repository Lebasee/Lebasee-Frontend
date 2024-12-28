import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Container from "../../../components/auth/container";
import { describe, test, expect } from "vitest";
import "@testing-library/jest-dom";

describe("Container", () => {
  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <Container />
      </BrowserRouter>
    );
    expect(screen.getByRole("img", { name: /login/i })).toBeInTheDocument();
  });

  test("renders Outlet component", () => {
    render(
      <BrowserRouter>
        <Container />
      </BrowserRouter>
    );
    expect(screen.getByRole("img", { name: /login/i })).toBeInTheDocument();
  });

  test("applies correct styles for desktop view", () => {
    render(
      <BrowserRouter>
        <Container />
      </BrowserRouter>
    );

    const containerBox = screen.getByRole("img", { name: /login/i })
      .parentElement?.parentElement;
    expect(containerBox).toHaveStyle("max-width: 1080px");
    expect(containerBox).toHaveStyle("height: 586px");
    expect(containerBox).toHaveStyle("border-radius: 16px");
    expect(containerBox).toHaveStyle("flex-direction: row");
  });
});
