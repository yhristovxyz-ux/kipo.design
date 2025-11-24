import React from 'react';
import { useCMS } from '../../contexts/CMSContext';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  editableId?: string;
  onEdit?: (newText: string) => void;
}

const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  editableId,
  onEdit
}) => {
  const { isEditMode, selectedElement, setSelectedElement } = useCMS();
  
  const baseClasses = 'inline-flex items-center border';

  const variantClasses = {
    default: 'border-gray-300 text-gray-700 bg-white',
    primary: 'border-blue-300 text-blue-800 bg-blue-50',
    secondary: 'border-purple-300 text-purple-800 bg-purple-50',
    success: 'border-green-300 text-green-800 bg-green-50',
    warning: 'border-yellow-300 text-yellow-800 bg-yellow-50',
    error: 'border-red-300 text-red-800 bg-red-50'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs font-mono',
    md: 'px-3 py-1 text-sm font-mono',
    lg: 'px-4 py-2 text-base font-mono'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  const isSelected = isEditMode && selectedElement === editableId;
  const editClasses = isEditMode && editableId ? 'cursor-pointer hover:ring-2 hover:ring-blue-200 relative' : '';
  const selectedClasses = isSelected ? 'ring-2 ring-blue-400' : '';

  const handleClick = () => {
    if (isEditMode && editableId) {
      setSelectedElement(editableId);
    }
  };

  return (
    <span className={`${classes} ${editClasses} ${selectedClasses}`} onClick={handleClick}>
      {children}
      {isEditMode && editableId && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">✎</span>
        </div>
      )}
    </span>
  );
};

export default Tag;