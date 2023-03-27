export const ADMIN = "admin";
export const SUPER_ADMIN = "super-admin";
export const USER = "user";

export function generateFiveDigitCode(): string {
  // Generate a random number between 10000 and 99999
  const randomNumber = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

  // Convert the number to a string and return it
  return randomNumber.toString();
}
