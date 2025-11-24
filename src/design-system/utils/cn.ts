/**
 * @fileoverview Utility for merging Tailwind CSS classes
 * @module design-system/utils/cn
 * 
 * Combines clsx and tailwind-merge for optimal class merging.
 * Handles conditional classes and resolves Tailwind conflicts.
 * 
 * @example
 * ```tsx
 * import { cn } from '@/design-system/utils';
 * 
 * <div className={cn('px-4 py-2', isActive && 'bg-blue-500', className)} />
 * ```
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names with Tailwind CSS conflict resolution
 * 
 * @param inputs - Class names to merge
 * @returns Merged class string
 * 
 * @example
 * ```tsx
 * cn('px-2 py-1', 'px-4') // => 'py-1 px-4' (px-2 is overridden)
 * cn('text-red-500', condition && 'text-blue-500') // Conditional classes
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
