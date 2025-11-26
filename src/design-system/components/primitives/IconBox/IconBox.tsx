/**
 * @fileoverview IconBox component for icon containers
 * @module design-system/components/primitives/IconBox
 * 
 * A component for displaying icons in bordered containers
 */

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const iconBoxVariants = cva(
  'flex items-center justify-center border border-border-primary transition-colors',
  {
    variants: {
      size: {
        sm: 'w-8 h-8 rounded-brutalist',
        md: 'w-12 h-12 rounded-brutalist',
        lg: 'w-16 h-16 rounded-brutalist',
      },
      variant: {
        default: 'bg-bg-primary',
        secondary: 'bg-bg-secondary',
        primary: 'bg-primary border-primary',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

export interface IconBoxProps extends VariantProps<typeof iconBoxVariants> {
  icon: keyof typeof LucideIcons | React.ComponentType;
  className?: string;
  iconClassName?: string;
}

export const IconBox: React.FC<IconBoxProps> = ({
  icon,
  size,
  variant,
  className,
  iconClassName
}) => {
  const Icon = typeof icon === 'string' 
    ? (LucideIcons[icon] as React.ComponentType<any>) 
    : icon;
  
  if (!Icon) return null;

  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
  const iconColor = variant === 'primary' ? 'text-white' : 'text-text-primary';

  return (
    <div className={cn(iconBoxVariants({ size, variant }), className)}>
      <Icon 
        size={iconSize} 
        className={cn(iconColor, iconClassName)}
      />
    </div>
  );
};

export default IconBox;
