import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

export const env = process.env.NODE_ENV;

// Custom react hook, always starts with "use"
export function useIsMobile() {
  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  return isMobile;
}

export function generateGroupCode(length: number = 4): string {
  // Define the characters to choose from (uppercase letters and digits)
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
      // Randomly select a character from the characters string
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
  }

  return code;
}