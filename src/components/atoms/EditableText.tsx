import React, { useState, useRef, useEffect } from 'react';
import { useCMS } from '../../contexts/CMSContext';

interface EditableTextProps {
  children: React.ReactNode;
  elementId: string;
  onUpdate: (newContent: string) => void;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
  children,
  elementId,
  onUpdate,
  className = '',
  as: Component = 'div',
  multiline = false
}) => {
  const { isEditMode, selectedElement, setSelectedElement } = useCMS();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(children?.toString() || '');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  
  const isSelected = selectedElement === elementId;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleClick = () => {
    if (isEditMode) {
      setSelectedElement(elementId);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    onUpdate(content);
    setSelectedElement(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setContent(children?.toString() || '');
    setSelectedElement(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
      handleSave();
    }
  };

  if (isEditMode && isEditing) {
    const InputComponent = multiline ? 'textarea' : 'input';
    return (
      <div className="relative">
        <InputComponent
          ref={inputRef as React.RefObject<HTMLInputElement & HTMLTextAreaElement>}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className={`${className} border-2 border-blue-500 rounded px-2 py-1 w-full resize-none`}
          rows={multiline ? 3 : undefined}
        />
        <div className="absolute -top-8 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          {multiline ? 'Ctrl+Enter to save, Esc to cancel' : 'Enter to save, Esc to cancel'}
        </div>
      </div>
    );
  }

  const editableClasses = isEditMode 
    ? 'cursor-pointer hover:bg-blue-50 hover:ring-2 hover:ring-blue-200 rounded transition-all relative group' 
    : '';
  
  const selectedClasses = isEditMode && isSelected 
    ? 'ring-2 ring-blue-400 bg-blue-50' 
    : '';

  return (
    <Component 
      className={`${className} ${editableClasses} ${selectedClasses}`}
      onClick={handleClick}
    >
      {children}
      {isEditMode && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-10">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
            <path d="m15 5 4 4"/>
          </svg>
        </div>
      )}
    </Component>
  );
};

export default EditableText;