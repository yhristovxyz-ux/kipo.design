/**
 * @fileoverview Section component for brutalist design system
 * @module design-system/components/layout/Section
 * 
 * Provides consistent section spacing with brutalist styling.
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/design-system/utils/cn';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /**
   * Whether to add top border
   */
  bordered?: boolean;
  
  /**
   * Background color variant
   */
  variant?: 'white' | 'zinc';
}

/**
 * Section component
 * 
 * @example
 * ```tsx
 * <Section bordered variant="zinc">
 *   <h2>Section Title</h2>
 * </Section>
 * ```
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, bordered = true, variant = 'white', ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'py-16 md:py-24',
          bordered && 'border-t-2 border-zinc-900',
          variant === 'white' && 'bg-white',
          variant === 'zinc' && 'bg-zinc-50',
          className
        )}
        {...props}
      />
    );
  }
);

Section.displayName = 'Section';
