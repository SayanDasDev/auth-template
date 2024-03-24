import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getShortName(name: string): string {
  const words = name.split(' ').filter(word => !word.endsWith('.'));
  if (words.length === 1) {
    return words[0].substring(0, 2);
  } else if (words.length === 2) {
    return words.map(word => word[0]).join('');
  } else {
    return words[0][0] + words[words.length - 1][0];
  }
}