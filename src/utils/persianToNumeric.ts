export const persianToNumeric = (persianDigits: string[]): string => {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const numericDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return persianDigits
    .map(digit => {
      const index = persianNumbers.indexOf(digit);
      return index !== -1 ? numericDigits[index] : digit;
    })
    .join('');
};
