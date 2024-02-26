import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export async function getTokenFromLocalStorage() {
  if (typeof localStorage !== 'undefined') {
    return await localStorage.getItem('token');
  } else {
    return null; // or handle the case where localStorage is not available
  }
}
