import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PictureModal from "../../components/base/pictureInput";
import { describe, test, expect, beforeEach, vi } from "vitest";
import "@testing-library/jest-dom";

describe("PictureModal", () => {
  const onClose = vi.fn();
  const onConfirm = vi.fn();

  beforeEach(() => {
    render(
      <PictureModal
        open={true}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    );
  });

  test("renders upload button when not cropping", () => {
    expect(screen.getByTestId("base-upload-button"));
  });

  test("opens file input dialog on upload button click", () => {
    const uploadButton = screen.getByTestId("base-upload-button");
    fireEvent.click(uploadButton);
    const fileInput = screen.getByTestId("base-upload-input");
    expect(fileInput).toBeInTheDocument();
  });

  test("shows cropping interface after selecting an image", async () => {
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const fileInput = screen.getByTestId("base-upload-input");

    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [file] } });
    }

    await waitFor(() => {
      expect(screen.getByText(/زوم/i)).toBeInTheDocument();
    });
  });

  test("calls onClose when close button is clicked", () => {
    fireEvent.click(screen.getByText(/بستن/i));
    expect(onClose).toHaveBeenCalled();
  });

  test("calls onConfirm with cropped image when confirm button is clicked", async () => {
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const fileInput = screen.getByTestId("base-upload-input");

    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [file] } });
    }

    await waitFor(() => {
      expect(screen.getByText(/زوم/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("confirm-button"));

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalled();
    });
  });

  test("resets state when cancel button is clicked", async () => {
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const fileInput = screen.getByTestId("base-upload-input");

    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [file] } });
    }

    await waitFor(() => {
      expect(screen.getByText(/زوم/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("cancel-button"));

    await waitFor(() => {
      expect(screen.getByText(/آپلود تصویر/i)).toBeInTheDocument();
    });
  });
});
