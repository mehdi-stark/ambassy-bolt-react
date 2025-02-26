import { type ClassValue, clsx } from "clsx"
import exp from "constants"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUserFromSessionStorage() {
    const user = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user") as string)
    : null;
    return user;
}

export function getUserCompleteFromSessionStorage() {
  const user = sessionStorage.getItem("userComplete")
  ? JSON.parse(sessionStorage.getItem("userComplete") as string)
  : null;
  return user;
}