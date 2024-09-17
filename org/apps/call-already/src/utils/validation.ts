export function isValidGroupCode(code: string): boolean {
  // Regular expression to match a string of exactly four uppercase alphanumeric characters
  const regex = /^[A-Z0-9]{4}$/;
  return regex.test(code);
}

export function isValidNickname(nickname: string) {
  // Regular expression to match a string of 2 to 16 characters consisting of only letters and numbers
  const regex = /^[a-zA-Z0-9]{2,16}$/;
  return regex.test(nickname);
}
