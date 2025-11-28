import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import { useCMS } from '../../contexts/CMSContext';

interface EditableImageProps {
  src: string;
  alt: string;
  className?: string;
  elementId: string;
  onUpdate: (newSrc: string, newAlt?: string) => void;
}

const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  className = '',
  elementId,
  onUpdate
}) => {
  const { isEditMode, selectedElement, setSelectedElement } = useCMS();
  const [isEditing, setIsEditing] = useState(false);
  const [newSrc, setNewSrc] = useState(src);
  const [newAlt, setNewAlt] = useState(alt);
  
  const isSelected = selectedElement === elementId;

  const handleClick = () => {
    if (isEditMode) {
      setSelectedElement(elementId);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    onUpdate(newSrc, newAlt);
    setSelectedElement(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewSrc(src);
    setNewAlt(alt);
    setSelectedElement(null);
  };

  if (isEditMode && isEditing) {
    return (
      <div className="relative">
        <div className="border-2 border-blue-500 rounded-lg p-4 bg-white">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={newSrc}
                onChange={(e) => setNewSrc(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alt Text
              </label>
              <input
                type="text"
                value={newAlt}
                onChange={(e) => setNewAlt(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the image"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const editableClasses = isEditMode 
    ? 'cursor-pointer hover:ring-2 hover:ring-blue-200 transition-all relative group' 
    : '';
  
  const selectedClasses = isEditMode && isSelected 
    ? 'ring-2 ring-blue-400' 
    : '';

  return (
    <div className={`${editableClasses} ${selectedClasses} relative`} onClick={handleClick}>
      <img src={src} alt={alt} className={className} />
      {isEditMode && (
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <Edit className="w-4 h-4 text-gray-700" />
            </div>
          </div>
          <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-xs">✎</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableImage;