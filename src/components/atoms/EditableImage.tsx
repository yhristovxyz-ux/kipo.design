import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import { useCMS } from '../../contexts/CMSContext';
import { ImageUploader } from './ImageUploader';

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
        <div className="border-2 border-primary rounded-section p-4 bg-bg-primary">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Upload New Image
              </label>
              <ImageUploader
                currentImage={newSrc}
                onImageChange={(url) => setNewSrc(url)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Alt Text
              </label>
              <input
                type="text"
                value={newAlt}
                onChange={(e) => setNewAlt(e.target.value)}
                className="w-full px-3 py-2 border border-border-primary rounded-interactive bg-bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Describe the image"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary text-white rounded-interactive hover:bg-primary-hover"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-bg-secondary text-text-primary rounded-interactive hover:bg-bg-tertiary"
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