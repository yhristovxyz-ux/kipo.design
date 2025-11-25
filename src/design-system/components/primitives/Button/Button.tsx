/**
 * @fileoverview Button component with Momentic.ai-inspired variants
 * @module design-system/components/primitives/Button
 * 
 * A flexible button component with multiple variants, sizes, and states.
 * Uses class-variance-authority for variant management.
 * 
 * @example
 * ```tsx
 * import { Button } from '@/design-system/components/primitives/Button';
 * 
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 * 
 * <Button variant="secondary" size="lg" icon={ArrowRight}>
 *   Learn More
 * </Button>
 * ```
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/design-system/utils/cn';

/**
 * Button variant styles using CVA
 * Brutalist design system - geometric, bold, no shadows
 */
const buttonVariants = cva(
  // Base styles - brutalist aesthetic
  'inline-flex items-center justify-center font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 rounded-brutalist',
  {
    variants: {
      variant: {
        // Primary - Blue fill
        primary: 'bg-primary text-white border-primary hover:bg-primary-hover hover:border-primary-hover',
        
        // Secondary - Outlined black
        secondary: 'border-zinc-900 text-zinc-900 bg-white hover:bg-zinc-900 hover:text-white',
        
        // Ghost - No border
        ghost: 'border-transparent text-zinc-900 hover:bg-zinc-100',
        
        // Outline - Zinc border
        outline: 'border-zinc-300 text-zinc-900 bg-white hover:border-zinc-900',
      },
      
      size: {
        sm: 'h-9 px-4 text-sm gap-2',
        md: 'h-11 px-6 text-base gap-2',
        lg: 'h-13 px-8 text-lg gap-3',
        xl: 'h-16 px-10 text-xl gap-3',
      },
      
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Button content */
  children: ReactNode;
  /** Optional icon component (from lucide-react) */
  icon?: React.ComponentType<{ className?: string }>;
  /** Icon position */
  iconPosition?: 'left' | 'right';
  /** Loading state */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Button component with multiple variants and sizes
 * 
 * @param variant - Button style variant
 * @param size - Button size
 * @param fullWidth - Whether button should take full width
 * @param icon - Optional icon component
 * @param iconPosition - Position of icon (left or right)
 * @param isLoading - Show loading state
 * @param className - Additional CSS classes
 * @param children - Button content
 * @param props - Additional button HTML attributes
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" icon={ArrowRight}>
 *   Get Started
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      fullWidth,
      icon: Icon,
      iconPosition = 'right',
      isLoading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
            <span>{children}</span>
            {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export type { VariantProps };
