import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

export const env = process.env.NODE_ENV;

// Custom react hook, always starts with "use"
export function useIsMobile() {
  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  return isMobile;
}