import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect, beforeEach, vi, Mock } from "vitest";
import "@testing-library/jest-dom";
import VerifyCode from "../../../api/auth/verifyCode";
import EmailConfirmationForm from "../../../components/auth/signup/emailConfirmationForm";

vi.mock("../../../api/auth/verifyCode");

describe("EmailConfirmationForm", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <EmailConfirmationForm />
      </BrowserRouter>
    );
  });

  test("renders all elements", () => {
    expect(screen.getByText(/تایید کنید شما هستید/i)).toBeInTheDocument();
    expect(screen.getByText(/کد به آدرس شما ایمیل شد/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /تایید/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /انصراف/i })).toBeInTheDocument();
  });

  test("shows countdown for resend code", () => {
    expect(screen.getByText(/ارسال مجدد کد تا/i)).toBeInTheDocument();
  });

  test("submits form with valid code", async () => {
    const mockResponse = { status: 200 };
    (VerifyCode as Mock).mockResolvedValue(mockResponse);

    fireEvent.change(screen.getByTestId("digit-input-0"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByTestId("digit-input-1"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByTestId("digit-input-2"), {
      target: { value: "3" },
    });
    fireEvent.change(screen.getByTestId("digit-input-3"), {
      target: { value: "4" },
    });
    fireEvent.click(screen.getByRole("button", { name: /تایید/i }));

    await waitFor(() => {
      expect(VerifyCode).toHaveBeenCalledWith("1234");
    });
  });

  test("shows error toast on verification failure", async () => {
    const mockError = { status: 404 };
    (VerifyCode as Mock).mockRejectedValue(mockError);

    fireEvent.change(screen.getByTestId("digit-input-0"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByTestId("digit-input-1"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByTestId("digit-input-2"), {
      target: { value: "3" },
    });
    fireEvent.change(screen.getByTestId("digit-input-3"), {
      target: { value: "4" },
    });
    fireEvent.click(screen.getByRole("button", { name: /تایید/i }));

    await waitFor(() => {
      expect(screen.getByText(/کد تایید معتبر نمی باشد./i)).toBeInTheDocument();
    });
  });

  test("renders cancel button", () => {
    expect(screen.getByRole("button", { name: /انصراف/i })).toBeInTheDocument();
  });

  test("redirects to signup page on cancel button click", () => {
    const cancelButton = screen.getByRole("button", { name: /انصراف/i });
    fireEvent.click(cancelButton);

    expect(window.location.pathname).toBe("/landing");
  });
});
