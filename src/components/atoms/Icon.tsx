import React from 'react';
import * as LucideIcons from 'lucide-react';
import { useCMS } from '../../contexts/CMSContext';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  editableId?: string;
  onEdit?: (newIcon: string) => void;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  className = '',
  editableId,
  onEdit
}) => {
  const { isEditMode, selectedElement, setSelectedElement } = useCMS();
  
  // Get the icon component from Lucide
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  
  const isSelected = isEditMode && selectedElement === editableId;
  const editClasses = isEditMode && editableId ? 'cursor-pointer hover:ring-2 hover:ring-blue-200 rounded relative' : '';
  const selectedClasses = isSelected ? 'ring-2 ring-blue-400 rounded' : '';

  const handleClick = () => {
    if (isEditMode && editableId) {
      setSelectedElement(editableId);
    }
  };

  return (
    <div className={`inline-flex ${editClasses} ${selectedClasses}`} onClick={handleClick}>
      <IconComponent 
        size={size} 
        color={color} 
        className={className}
      />
      {isEditMode && editableId && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">✎</span>
        </div>
      )}
    </div>
  );
};

export default Icon;