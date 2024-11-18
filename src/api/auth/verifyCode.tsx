import axios from "axios";

const persianToNumeric = (persianDigits: string[]) => {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const numericDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return persianDigits.map(digit => {
    const index = persianNumbers.indexOf(digit); // Find the index of the Persian digit
    return numericDigits[index]; // Replace it with the corresponding Arabic numeral
  }).join(''); // Join the array back into a string
};

const VerifyCode = async (verifyCode: object) => {
  const api = axios.create({ baseURL: "http://localhost:8000" });

  try {
    const code = persianToNumeric(verifyCode.verification_code );
    console.log(code);
    const response = await api.post("/api/auth/verify_code/", {verification_code: code});
    console.log(response);

    if (response.status === 201) {
      console.log(response.status);
      console.log(response.data.access);
    } else {
      console.log(response.status);
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default VerifyCode;