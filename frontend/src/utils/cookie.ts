// utils/cookie.ts

import cookie from 'js-cookie';

// Function to set the JWT token in a cookie
export const setJwtCookie = (token: string): void => {
  cookie.set('jwtToken', token, {
    expires: 7, // Set the token to expire in 7 days (you can adjust as needed)
    secure: process.env.NODE_ENV === 'production', // Use true in production
    sameSite: 'strict',
    path: '/',
  });
};

// Function to get the JWT token from the cookie
export const getJwtFromCookie = (): string | undefined => {
  return cookie.get('jwtToken');
};

// Function to remove the JWT token from the cookie
export const removeJwtCookie = (): void => {
  cookie.remove('jwtToken');
};
