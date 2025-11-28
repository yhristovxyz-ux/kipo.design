/**
 * @fileoverview Textarea component with validation
 * @module design-system/components/forms/Textarea
 */

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/design-system/utils/cn';

const textareaVariants = cva(
  'w-full rounded-interactive border bg-bg-primary placeholder:text-text-tertiary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 font-medium resize-none',
  {
    variants: {
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-5 py-4 text-lg',
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

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  wrapperClassName?: string;
  showCharCount?: boolean;
  maxLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      success,
      helperText,
      size,
      state,
      wrapperClassName,
      className,
      id,
      showCharCount,
      maxLength,
      value,
      ...props
    },
    ref
  ) => {
    const textareaState = error ? 'error' : success ? 'success' : state || 'default';
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className={cn('w-full', wrapperClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-text-primary mb-2"
          >
            {label}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            textareaVariants({ size, state: textareaState }),
            className
          )}
          maxLength={maxLength}
          value={value}
          {...props}
        />

        {/* Character count */}
        {showCharCount && maxLength && (
          <div className="mt-1 text-xs text-text-tertiary text-right">
            {charCount} / {maxLength}
          </div>
        )}

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
          <p className="mt-2 text-sm text-text-tertiary">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
