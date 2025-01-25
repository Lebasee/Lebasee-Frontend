import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../../../components/auth/login/loginForm";
import { describe, test, expect, beforeEach, vi, Mock } from "vitest";
import "@testing-library/jest-dom";
import Login from "../../../api/auth/login";

vi.mock("../../../api/auth/login");

describe("LoginForm", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
  });

  test("renders email and password fields", () => {
    expect(screen.getByLabelText(/ایمیل/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/رمزعبور/i)).toBeInTheDocument();
  });

  test("shows error messages when fields are empty", async () => {
    fireEvent.click(screen.getByTestId("login-button"));
    expect(
      await screen.findByText(/لطفا ایمیل خود را وارد کنید./i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/لطفا رمزعبور خود را وارد کنید./i)
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

  // test("submits form with valid data", async () => {
  //   const mockResponse = {
  //     status: 200,
  //     data: { access: "access_token", refresh: "refresh_token" },
  //   };
  //   (Login as Mock).mockResolvedValue(mockResponse);

  //   fireEvent.change(screen.getByLabelText(/ایمیل/i), {
  //     target: { value: "test@example.com" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/رمزعبور/i), {
  //     target: { value: "password" },
  //   });
  //   fireEvent.click(screen.getByTestId("login-button"));

  //   await waitFor(() => {
  //     expect(Login).toHaveBeenCalledWith({
  //       email: "test@example.com",
  //       password: "password",
  //     });
  //     expect(localStorage.getItem("access")).toBe("access_token");
  //     expect(localStorage.getItem("refresh")).toBe("refresh_token");
  //   });
  // });
  test("renders signup button", () => {
    expect(screen.getByText(/ثبت نام/i)).toBeInTheDocument();
  });

  test("redirects to registration page on signup button click", () => {
    const signUpButton = screen.getByText(/ثبت نام/i);
    fireEvent.click(signUpButton);

    expect(window.location.pathname).toBe("/auth/signup");
  });

  test("shows error toast on login failure", async () => {
    const mockError = { status: 401 };
    (Login as Mock).mockRejectedValue(mockError);

    fireEvent.change(screen.getByLabelText(/ایمیل/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/رمزعبور/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByTestId("login-button"));

    await waitFor(() => {
      expect(
        screen.getByText(/ایمیل یا رمزعبور اشتباه می باشد./i)
      ).toBeInTheDocument();
    });
  });
});
