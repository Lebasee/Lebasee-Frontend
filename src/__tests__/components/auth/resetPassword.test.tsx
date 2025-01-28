import { MemoryRouter, Route, Routes } from "react-router-dom";
import ResetPasswordForm from "../../../components/auth/resetPassword/resetPassword";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, vi, Mock } from "vitest";
import "@testing-library/jest-dom";
import ResetPassword from "../../../api/auth/resetPassword";

vi.mock("../../../api/auth/resetPassword");

describe("ResetPasswordForm", () => {
  const setup = () => {
    render(
      <MemoryRouter initialEntries={["/reset-password/uid/token"]}>
        <Routes>
          <Route
            path="/reset-password/:uid/:token"
            element={<ResetPasswordForm />}
          />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders the form", () => {
    setup();
    expect(screen.getByLabelText(/رمز عبور جدید/i)).toBeInTheDocument();
    expect(screen.getByLabelText("تأیید رمز عبور")).toBeInTheDocument();
    expect(screen.getByText("تغییر رمز عبور")).toBeInTheDocument();
  });

  it("shows error messages when passwords are empty", async () => {
    setup();
    fireEvent.click(screen.getByText("تایید"));
    expect(
      await screen.findByText("لطفا رمز عبور جدید خود را وارد کنید.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("لطفا تأیید رمز عبور را وارد کنید.")
    ).toBeInTheDocument();
  });

  it("shows error message when passwords do not match", async () => {
    setup();
    fireEvent.change(screen.getByLabelText("رمز عبور جدید"), {
      target: { value: "Password123!" },
    });
    fireEvent.change(screen.getByLabelText("تأیید رمز عبور"), {
      target: { value: "Password123" },
    });
    fireEvent.click(screen.getByText("تایید"));
    expect(
      await screen.findByText("رمز عبور ها مطابقت ندارند.")
    ).toBeInTheDocument();
  });

  it("shows error message when password is less than 8 characters", async () => {
    setup();
    fireEvent.change(screen.getByLabelText("رمز عبور جدید"), {
      target: { value: "Pass1!" },
    });
    fireEvent.change(screen.getByLabelText("تأیید رمز عبور"), {
      target: { value: "Pass1!" },
    });
    fireEvent.click(screen.getByText("تایید"));
    expect(
      await screen.findByText("رمز عبور جدید کمتر از 8 کاراکتر است")
    ).toBeInTheDocument();
  });

  it("shows error message when password does not have lowercase letter", async () => {
    setup();
    fireEvent.change(screen.getByLabelText("رمز عبور جدید"), {
      target: { value: "PASSWORD123!" },
    });
    fireEvent.change(screen.getByLabelText("تأیید رمز عبور"), {
      target: { value: "PASSWORD123!" },
    });
    fireEvent.click(screen.getByText("تایید"));
    expect(
      await screen.findByText("رمز عبور جدید حرف کوچک ندارد")
    ).toBeInTheDocument();
  });

  it("shows error message when password does not have uppercase letter", async () => {
    setup();
    fireEvent.change(screen.getByLabelText("رمز عبور جدید"), {
      target: { value: "password123!" },
    });
    fireEvent.change(screen.getByLabelText("تأیید رمز عبور"), {
      target: { value: "password123!" },
    });
    fireEvent.click(screen.getByText("تایید"));
    expect(
      await screen.findByText("رمز عبور جدید حرف بزرگ ندارد")
    ).toBeInTheDocument();
  });

  it("shows error message when password does not have a symbol", async () => {
    setup();
    fireEvent.change(screen.getByLabelText("رمز عبور جدید"), {
      target: { value: "Password123" },
    });
    fireEvent.change(screen.getByLabelText("تأیید رمز عبور"), {
      target: { value: "Password123" },
    });
    fireEvent.click(screen.getByText("تایید"));
    expect(
      await screen.findByText("رمز عبور جدید فقط شامل حروف است")
    ).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    (ResetPassword as Mock).mockResolvedValue({ status: 200 });
    setup();
    fireEvent.change(screen.getByLabelText("رمز عبور جدید"), {
      target: { value: "Password123!" },
    });
    fireEvent.change(screen.getByLabelText("تأیید رمز عبور"), {
      target: { value: "Password123!" },
    });
    fireEvent.click(screen.getByText("تایید"));
    await waitFor(() =>
      expect(
        screen.getByText("رمز عبور با موفقیت بازیابی شد")
      ).toBeInTheDocument()
    );
  });

  it("shows error message when server communication fails", async () => {
    (ResetPassword as Mock).mockRejectedValue(new Error("Server error"));
    setup();
    fireEvent.change(screen.getByLabelText("رمز عبور جدید"), {
      target: { value: "Password123!" },
    });
    fireEvent.change(screen.getByLabelText("تأیید رمز عبور"), {
      target: { value: "Password123!" },
    });
    fireEvent.click(screen.getByText("تایید"));
    await waitFor(() =>
      expect(
        screen.getByText("خطا در برقراری ارتباط با سرور.")
      ).toBeInTheDocument()
    );
  });
});
