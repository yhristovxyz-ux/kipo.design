/**
 * @fileoverview Tag component - wrapper around design system Badge
 * @deprecated Use Badge from design system directly
 */

import React from 'react';
import { useCMS } from '../../contexts/CMSContext';
import { Badge } from '@/design-system';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  editableId?: string;
}

const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  className = '',
  editableId
}) => {
  const { isEditMode, selectedElement, setSelectedElement } = useCMS();
  
  const isSelected = isEditMode && selectedElement === editableId;
  const editClasses = isEditMode && editableId ? 'cursor-pointer hover:ring-2 hover:ring-primary/20 relative' : '';
  const selectedClasses = isSelected ? 'ring-2 ring-primary' : '';

  const handleClick = () => {
    if (isEditMode && editableId) {
      setSelectedElement(editableId);
    }
  };

  return (
    <span className={`relative inline-block ${editClasses} ${selectedClasses}`} onClick={handleClick}>
      <Badge variant={variant} className={className}>
        {children}
      </Badge>
      {isEditMode && editableId && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-brutalist flex items-center justify-center border border-zinc-900">
          <span className="text-white text-xs">✎</span>
        </div>
      )}
    </span>
  );
};

export default Tag;