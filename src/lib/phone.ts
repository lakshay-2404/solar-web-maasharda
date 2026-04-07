export function extractPhoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function normalisePhoneNumber(value: string) {
  const digits = extractPhoneDigits(value);

  if (digits.length === 10) {
    return `+91${digits}`;
  }

  if (digits.length === 12 && digits.startsWith("91")) {
    return `+${digits}`;
  }

  if (value.startsWith("+")) {
    return value;
  }

  return value;
}

export function hasValidPhoneNumber(value: string) {
  const digits = extractPhoneDigits(value);
  return digits.length === 10 || (digits.length === 12 && digits.startsWith("91"));
}

export function phonesMatch(left?: string, right?: string) {
  if (!left || !right) {
    return false;
  }

  return extractPhoneDigits(left).slice(-10) === extractPhoneDigits(right).slice(-10);
}
