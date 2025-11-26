import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utilitaire standard de shadcn/ui pour fusionner les classes Tailwind
 * Permet de gérer les conflits de classes (ex: 'bg-red-500' vs 'bg-blue-500')
 * et les conditions (ex: isPrimary && 'bg-blue-500')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}