/**
 * @fileoverview Typography components for brutalist design system
 * @module design-system/components/primitives/Typography
 * 
 * Heading and Text components with consistent brutalist styling.
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/design-system/utils/cn';

/**
 * Heading variant styles
 */
const headingVariants = cva(
  'font-bold text-zinc-900',
  {
    variants: {
      level: {
        h1: 'text-4xl md:text-5xl lg:text-6xl',
        h2: 'text-3xl md:text-4xl lg:text-5xl',
        h3: 'text-2xl md:text-3xl lg:text-4xl',
        h4: 'text-xl md:text-2xl',
        h5: 'text-lg md:text-xl',
        h6: 'text-base md:text-lg',
      },
    },
    defaultVariants: {
      level: 'h2',
    },
  }
);

/**
 * Text variant styles
 */
const textVariants = cva(
  'text-zinc-600',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      size: 'base',
      weight: 'normal',
    },
  }
);

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface TextProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div';
}

/**
 * Heading component
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, as, ...props }, ref) => {
    const Component = as || level || 'h2';
    
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level: level || (as as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') }), className)}
        {...props}
      />
    );
  }
);

Heading.displayName = 'Heading';

/**
 * Text component
 */
export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, weight, as = 'p', ...props }, ref) => {
    const Component = as;
    
    return (
      <Component
        ref={ref as React.Ref<HTMLElement>}
        className={cn(textVariants({ size, weight }), className)}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';
