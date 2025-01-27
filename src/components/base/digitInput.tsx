import React, { useRef, useEffect, SetStateAction, Dispatch } from "react";
import { TextField, Stack } from "@mui/material";
import { toPersianNumber } from "../../utils/toPersianNumber";

interface DigitInputProps {
  // count?: number;
  code: any[];
  setCode: Dispatch<SetStateAction<any[]>>;
}

const DigitInput: React.FC<DigitInputProps> = ({ code, setCode }) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d$/.test(value) && value !== "") return;

    const newCode = [...code];
    newCode[index] = toPersianNumber(value);
    setCode(newCode);

    if (value && index < 4 - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (code[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text").replace(/\D/g, ""); // Remove non-digit characters
    const newCode = [...code];

    pastedData.split("").forEach((digit, i) => {
      if (i < code.length) {
        newCode[i] = toPersianNumber(digit);
      }
    });

    setCode(newCode);

    // Focus the next empty input after the last pasted character
    const lastIndex = Math.min(pastedData.length, code.length) - 1;
    if (lastIndex >= 0 && inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex]?.focus();
    }
  };

  return (
    <Stack direction="row-reverse" sx={{ gap: 2 }}>
      {code.map((digit, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputRefs.current[index] = el)}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => e.key === "Backspace" && handleBackspace(index)}
          onPaste={(e) => handlePaste(e)}
          slotProps={{
            htmlInput: {
              maxLength: 1,
              style: {
                textAlign: "center",
                fontSize: "24px",
              },
              "data-testid": `digit-input-${index}`,
            },
          }}
          variant="outlined"
          size="small"
          sx={{
            width: "60px",
          }}
        />
      ))}
    </Stack>
  );
};

export default DigitInput;