import React, { useState } from 'react';
import { useCMS } from '../../contexts/CMSContext';
import { ButtonEditPopup } from '../cms/EditingPopups';
import Button from './Button';

interface ButtonConfig {
  text: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
}

interface EditableButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right';
  className?: string;
  editableId: string;
  onUpdate: (config: ButtonConfig) => void;
}

const EditableButton: React.FC<EditableButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  icon,
  iconPosition = 'right',
  className = '',
  editableId,
  onUpdate
}) => {
  const { isEditMode, selectedElement, setSelectedElement } = useCMS();
  const [showEditPopup, setShowEditPopup] = useState(false);
  
  const isSelected = isEditMode && selectedElement === editableId;

  const handleClick = (e: React.MouseEvent) => {
    if (isEditMode) {
      e.preventDefault();
      setSelectedElement(editableId);
      setShowEditPopup(true);
    } else if (onClick) {
      onClick();
    }
  };

  const handleSave = (config: ButtonConfig) => {
    onUpdate(config);
    setShowEditPopup(false);
    setSelectedElement(null);
  };

  const editClasses = isEditMode ? 'relative hover:ring-2 hover:ring-blue-400 cursor-pointer' : '';
  const selectedClasses = isSelected ? 'ring-2 ring-blue-500' : '';

  return (
    <>
      <Button
        variant={variant}
        size={size}
        href={href}
        onClick={handleClick}
        icon={icon}
        iconPosition={iconPosition}
        className={`${className} ${editClasses} ${selectedClasses}`}
      >
        {children}
        {isEditMode && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✎</span>
          </div>
        )}
      </Button>

      <ButtonEditPopup
        isOpen={showEditPopup}
        onClose={() => {
          setShowEditPopup(false);
          setSelectedElement(null);
        }}
        onSave={handleSave}
        initialConfig={{
          text: children?.toString() || '',
          href: href || '',
          variant,
          icon: icon?.name || '',
          iconPosition
        }}
      />
    </>
  );
};

export default EditableButton;