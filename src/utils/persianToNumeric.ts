export const persianToNumeric = (persianDigits: string[]) => {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const numericDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
    return persianDigits.map(digit => {
      const index = persianNumbers.indexOf(digit);
      return numericDigits[index];
    }).join('');
  };
  