import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUpForm from "../../../components/auth/signup/signupForm";
import { describe, test, expect, beforeEach, vi, Mock } from "vitest";
import "@testing-library/jest-dom";
import SignUp from "../../../api/auth/signUp";

vi.mock("../../../api/auth/signUp");

describe("SignUpForm", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SignUpForm />
      </BrowserRouter>
    );
  });

  test("renders all input fields", () => {
    expect(screen.getByTestId("name-text-input")).toBeInTheDocument();
    expect(screen.getByLabelText(/نام خانوادگی/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ایمیل/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/رمزعبور/i)).toBeInTheDocument();
  });

  test("shows error messages when fields are empty", async () => {
    fireEvent.click(screen.getByTestId("signup-button"));
    expect(
      await screen.findByText(/لطفا نام خود را وارد کنید./i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/لطفا نام‌خانوادگی خود را وارد کنید./i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/لطفا یک ایمیل معتبر وارد کنید./i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/لطفا رمزعبور مناسب وارد کنید./i)
    ).toBeInTheDocument();
  });

  test("toggles password visibility", () => {
    const passwordField = screen.getByLabelText(/رمزعبور/i);
    const toggleButton = screen.getByLabelText(/toggle password visibility/i);

    expect(passwordField).toHaveAttribute("type", "password");
    fireEvent.click(toggleButton);
    expect(passwordField).toHaveAttribute("type", "text");
    fireEvent.click(toggleButton);
    expect(passwordField).toHaveAttribute("type", "password");
  });

  test("submits form with valid data", async () => {
    const mockResponse = { status: 201 };
    (SignUp as Mock).mockResolvedValue(mockResponse);

    fireEvent.change(screen.getByTestId("name-text-input"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/نام خانوادگی/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/ایمیل/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/رمزعبور/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByTestId("signup-button"));

    await waitFor(() => {
      expect(SignUp).toHaveBeenCalledWith({
        first_name: "John",
        last_name: "Doe",
        email: "test@example.com",
        password: "password",
      });
    });
  });

  test("shows error toast on signup failure", async () => {
    const mockError = { status: 400 };
    (SignUp as Mock).mockRejectedValue(mockError);

    fireEvent.change(screen.getByTestId("name-text-input"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/نام خانوادگی/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/ایمیل/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/رمزعبور/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByTestId("signup-button"));

    await waitFor(() => {
      expect(
        screen.getByText(/ایمیل قبلا استفاده شده است./i)
      ).toBeInTheDocument();
    });
  });

  test("renders login button", () => {
    expect(screen.getByText(/ورود/i)).toBeInTheDocument();
  });

  test("redirects to login page on login button click", () => {
    const loginButton = screen.getByText(/ورود/i);
    fireEvent.click(loginButton);

    expect(window.location.pathname).toBe("/auth/login");
  });
});
