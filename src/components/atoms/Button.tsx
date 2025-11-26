/**
 * @fileoverview Button component wrapper with CMS editing support
 * @module components/atoms/Button
 * 
 * Wraps the design system Button with CMS editing functionality.
 * Uses the new Momentic.ai-inspired design system.
 */

import React from 'react';
import { Button as DSButton } from '@/design-system';
import { cn } from '@/design-system/utils/cn';
import { useCMS } from '../../contexts/CMSContext';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right';
  className?: string;
  editableId?: string;
  onEdit?: (newText: string) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  icon,
  iconPosition = 'right',
  className = '',
  editableId,
  onEdit
}) => {
  const { isEditMode, selectedElement, setSelectedElement } = useCMS();
  
  const isSelected = isEditMode && selectedElement === editableId;
  const editClasses = isEditMode ? 'relative hover:ring-2 hover:ring-blue-400' : '';
  const selectedClasses = isSelected ? 'ring-2 ring-blue-500' : '';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isEditMode && editableId) {
      e.preventDefault();
      setSelectedElement(editableId);
    } else if (onClick) {
      onClick(e as any);
    }
  };

  // If href is provided and not in edit mode, render as link
  if (href && !isEditMode) {
    return (
      <a 
        href={href} 
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 border-2 rounded-brutalist',
          variant === 'primary' && 'bg-primary text-white border-primary hover:bg-primary-hover hover:border-primary-hover',
          variant === 'secondary' && 'border-zinc-900 text-zinc-900 bg-white hover:bg-zinc-900 hover:text-white',
          variant === 'ghost' && 'border-transparent text-zinc-900 hover:bg-zinc-100',
          variant === 'outline' && 'border-zinc-300 text-zinc-900 bg-white hover:border-zinc-900',
          size === 'sm' && 'h-9 px-4 text-sm gap-2',
          size === 'md' && 'h-11 px-6 text-base gap-2',
          size === 'lg' && 'h-13 px-8 text-lg gap-3',
          size === 'xl' && 'h-16 px-10 text-xl gap-3',
          editClasses,
          selectedClasses,
          className
        )}
      >
        {icon && iconPosition === 'left' && React.createElement(icon, { className: 'w-5 h-5' })}
        <span>{children}</span>
        {icon && iconPosition === 'right' && React.createElement(icon, { className: 'w-5 h-5' })}
      </a>
    );
  }

  return (
    <div className="relative inline-block">
      <DSButton
        variant={variant}
        size={size}
        icon={icon}
        iconPosition={iconPosition}
        onClick={handleClick}
        className={cn(editClasses, selectedClasses, className)}
      >
        {children}
      </DSButton>
      
      {isEditMode && editableId && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">✎</span>
        </div>
      )}
    </div>
  );
};

export default Button;