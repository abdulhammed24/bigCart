// Format card number as 1234 5678 1234 5678
export const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 16); // Remove non-digits, limit to 16
  const parts = [];
  for (let i = 0; i < digits.length; i += 4) {
    parts.push(digits.slice(i, i + 4));
  }
  return parts.join(' ').slice(0, 19); // Join with spaces, max 19 chars
};

// Format expiry as MM/YY
export const formatExpiry = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 4); // Remove non-digits, limit to 4
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`.slice(0, 5); // Add slash after MM
};

// Validate card number (16 digits + Luhn algorithm)
export const validateCardNumber = (value: string): boolean => {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 16) return false;

  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
};

// Validate expiry (MM/YY, not in past)
export const validateExpiry = (value: string): boolean => {
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return false;
  const [month, year] = value.split('/').map(Number);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Last two digits
  const currentMonth = currentDate.getMonth() + 1; // 1-12
  const fullYear = 2000 + year;
  const currentFullYear = currentDate.getFullYear();

  if (fullYear < currentFullYear) return false;
  if (fullYear === currentFullYear && month < currentMonth) return false;
  return true;
};

// Validate CVV (exactly 3 digits)
export const validateCVV = (value: string): boolean => {
  return /^\d{3}$/.test(value);
};
