import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, beforeEach, Mock } from "vitest";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import DigitInput from "../../components/base/digitInput";

describe("DigitInput", () => {
  let code: string[];
  let setCode: Mock;

  beforeEach(() => {
    code = ["", "", "", ""];
    setCode = vi.fn();
    render(
      <DigitInput
        code={code}
        setCode={setCode}
      />
    );
  });

  test("renders four input fields", () => {
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(4);
  });

  test("focuses on the first input field on initial render", () => {
    const firstInput = screen.getByTestId("digit-input-0");
    expect(firstInput).toHaveFocus();
  });

  test("allows only digits to be entered", () => {
    const firstInput = screen.getByTestId("digit-input-0");
    fireEvent.change(firstInput, { target: { value: "a" } });
    expect(firstInput).toHaveValue("");
  });

  test("moves focus to the next input field on entering a digit", () => {
    const firstInput = screen.getByTestId("digit-input-0");
    const secondInput = screen.getByTestId("digit-input-1");
    fireEvent.change(firstInput, { target: { value: "1" } });
    expect(secondInput).toHaveFocus();
  });

  test("moves focus to the previous input field on backspace", () => {
    const secondInput = screen.getByTestId("digit-input-1");
    fireEvent.keyDown(secondInput, { key: "Backspace" });
    const firstInput = screen.getByTestId("digit-input-0");
    expect(firstInput).toHaveFocus();
  });

  test("handles paste event correctly", () => {
    const firstInput = screen.getByTestId("digit-input-0");
    fireEvent.paste(firstInput, {
      clipboardData: {
        getData: () => "1234",
      },
    });
    expect(setCode).toHaveBeenCalledWith(["۱", "۲", "۳", "۴"]);
  });
});
