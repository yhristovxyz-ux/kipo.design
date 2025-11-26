/**
 * @fileoverview Input component with validation support
 * @module design-system/components/primitives/Input
 * 
 * A flexible input component with validation, error states, and icons.
 * Follows Momentic.ai dark theme design.
 * 
 * @example
 * ```tsx
 * import { Input } from '@/design-system/components/primitives/Input';
 * 
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="you@example.com"
 *   error="Invalid email address"
 * />
 * ```
 */

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/design-system/utils/cn';

/**
 * Input variant styles using CVA
 */
const inputVariants = cva(
  // Base styles - brutalist with utilitarian refinements
  'w-full rounded-interactive border bg-bg-primary placeholder:text-text-tertiary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 font-medium',
  {
    variants: {
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-14 px-5 text-lg',
      },
      state: {
        default: 'border-border-primary text-text-primary hover:border-primary',
        error: 'border-red-600 focus:ring-red-600 text-text-primary',
        success: 'border-green-600 focus:ring-green-600 text-text-primary',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Input label */
  label?: string;
  /** Error message */
  error?: string;
  /** Success message */
  success?: string;
  /** Helper text */
  helperText?: string;
  /** Left icon component */
  leftIcon?: React.ComponentType<{ className?: string }>;
  /** Right icon component */
  rightIcon?: React.ComponentType<{ className?: string }>;
  /** Additional wrapper classes */
  wrapperClassName?: string;
}

/**
 * Input component with validation and icons
 * 
 * @param label - Input label text
 * @param error - Error message to display
 * @param success - Success message to display
 * @param helperText - Helper text below input
 * @param leftIcon - Icon to display on left
 * @param rightIcon - Icon to display on right
 * @param size - Input size variant
 * @param state - Input state (default, error, success)
 * @param wrapperClassName - Additional wrapper classes
 * @param className - Additional input classes
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Password"
 *   type="password"
 *   error="Password must be at least 8 characters"
 *   leftIcon={Lock}
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      helperText,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      size,
      state,
      wrapperClassName,
      className,
      id,
      ...props
    },
    ref
  ) => {
    // Determine state based on error/success
    const inputState = error ? 'error' : success ? 'success' : state || 'default';
    
    // Generate ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={cn('w-full', wrapperClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {LeftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <LeftIcon className="w-5 h-5" />
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ size, state: inputState }),
              LeftIcon && 'pl-10',
              RightIcon && 'pr-10',
              className
            )}
            {...props}
          />

          {/* Right icon */}
          {RightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <RightIcon className="w-5 h-5" />
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p className="mt-2 text-sm text-error flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}

        {/* Success message */}
        {success && !error && (
          <p className="mt-2 text-sm text-success flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {success}
          </p>
        )}

        {/* Helper text */}
        {helperText && !error && !success && (
          <p className="mt-2 text-sm text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
