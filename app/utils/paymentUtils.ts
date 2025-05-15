import valid from 'card-validator';

// Format card number as 1234 5678 1234 5678
export const formatCardNumber = (value: string): string => {
  const cardNumber = value.replace(/\D/g, '').slice(0, 16); // Remove non-digits, limit to 16
  if (!cardNumber) return '';
  const validation = valid.number(cardNumber);
  const gapPattern = validation.card?.gaps || [4, 8, 12]; // Default gaps
  let formatted = '';
  for (let i = 0; i < cardNumber.length; i++) {
    if (gapPattern.includes(i) && i < cardNumber.length) formatted += ' ';
    formatted += cardNumber[i];
  }
  return formatted.trim().slice(0, 19); // Max 19 chars
};

// Format expiry as MM/YY
export const formatExpiry = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 4); // Remove non-digits, limit to 4
  if (!digits) return '';
  if (digits.length <= 2) return digits.padStart(2, '0'); // Pad with leading zero
  return `${digits.slice(0, 2)}/${digits.slice(2)}`.slice(0, 5); // Add slash
};

// Validate card number (16 digits + Luhn algorithm)
export const validateCardNumber = (value: string): boolean => {
  const cardNumber = value.replace(/\D/g, '');
  const validation = valid.number(cardNumber);
  return validation.isValid && cardNumber.length === 16; // Ensure valid and 16 digits
};

// Validate expiry (MM/YY, not in past)
export const validateExpiry = (value: string): boolean => {
  const validation = valid.expirationDate(value);
  if (!validation.isValid) return false;

  const [month, year] = value.split('/').map(Number);
  const fullYear = 2000 + year;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 1-12

  if (fullYear < currentYear) return false;
  if (fullYear === currentYear && month < currentMonth) return false;
  return true;
};

// Validate CVV (3 or 4 digits based on card type)
export const validateCVV = (value: string, cardNumber?: string): boolean => {
  const cardType = cardNumber
    ? valid.number(cardNumber.replace(/\D/g, '')).card?.type
    : null;
  const cvvLength = cardType === 'american-express' ? 4 : 3; // Amex uses 4-digit CVV
  const validation = valid.cvv(value, cvvLength);
  return validation.isValid;
};
