/**
 * @fileoverview Container component for brutalist design system
 * @module design-system/components/layout/Container
 * 
 * Provides consistent max-width container with brutalist styling.
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/design-system/utils/cn';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to apply full width (no max-width constraint)
   */
  fluid?: boolean;
}

/**
 * Container component
 * 
 * @example
 * ```tsx
 * <Container>
 *   <h1>Content</h1>
 * </Container>
 * ```
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, fluid = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto px-4 sm:px-6 lg:px-8',
          !fluid && 'max-w-7xl',
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';
