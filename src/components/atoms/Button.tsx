import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { useCMS } from '../../contexts/CMSContext';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  icon?: LucideIcon;
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
  icon: Icon,
  iconPosition = 'right',
  className = '',
  editableId,
  onEdit
}) => {
  const { isEditMode, selectedElement, setSelectedElement } = useCMS();
  
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-full';
  
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-gray-900 hover:bg-gray-50 shadow-lg hover:shadow-xl border border-gray-200',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  const isSelected = isEditMode && selectedElement === editableId;
  const editClasses = isEditMode ? 'relative hover:ring-2 hover:ring-blue-400' : '';
  const selectedClasses = isSelected ? 'ring-2 ring-blue-500' : '';

  const handleClick = (e: React.MouseEvent) => {
    if (isEditMode && editableId) {
      e.preventDefault();
      setSelectedElement(editableId);
    } else if (onClick) {
      onClick(e);
    }
  };

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
      {isEditMode && editableId && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">✎</span>
        </div>
      )}
    </>
  );

  if (href && !isEditMode) {
    return (
      <a href={href} className={`${classes} ${editClasses} ${selectedClasses}`} onClick={handleClick}>
        {content}
      </a>
    );
  }

  return (
    <button className={`${classes} ${editClasses} ${selectedClasses}`} onClick={handleClick}>
      {content}
    </button>
  );
};

export default Button;