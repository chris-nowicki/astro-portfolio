import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

// EMAIL (CONTACT FORM) VALIDATIONS
// validate if the contact form email and message is a string
export const validateString = (
  value: unknown,
  maxLength: number
): value is string => {
  if (!value || typeof value !== 'string' || value.length > maxLength) {
    return false
  }

  return true
}

// get the error message if the email has issues sending through resend
export const getErrorMessage = (error: unknown): string => {
  let message: string

  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message)
  } else if (typeof error === 'string') {
    message = error
  } else {
    message = 'Something went wrong'
  }

  return message
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// DYNAMIC OG IMAGE URL
export default function ogImageURL(description: string) {
  const url =
    process.env.NEXT_PUBLIC_NODE_ENV === 'production'
      ? 'https://chrisnowicki.io'
      : 'http://localhost:3000'

  return {
    url: `${url}/api/og?description=${description}`,
  }
}
