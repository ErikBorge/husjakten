import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Encode function to convert special characters to safe representations
export const encodeCollectionName = (name: string): string => {
  return name
    .replace(/æ/g, "$ae")
    .replace(/ø/g, "$oe")
    .replace(/å/g, "$aa")
    .replace(/\s/g, "%20");
};

// Decode function to convert safe representations back to special characters
export const decodeCollectionName = (name: string): string => {
  return name
    .replace(/\$ae/g, "æ")
    .replace(/\$oe/g, "ø")
    .replace(/\$aa/g, "å")
    .replace(/\%20/g, " ");
};
