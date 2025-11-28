import React, { useState } from 'react';
import { useCMS } from '../../contexts/CMSContext';
import { ServiceCardEditPopup } from '../cms/EditingPopups';
import Icon from './Icon';
import { Card, CardContent } from '@/design-system';

interface EditableServiceCardProps {
  service: {
    icon: { name: string };
    title: string;
    description: string;
    features: string[];
    color?: string;
  };
  index: number;
  onUpdate: (index: number, config: any) => void;
}

const EditableServiceCard: React.FC<EditableServiceCardProps> = ({
  service,
  index,
  onUpdate
}) => {
  const { isEditMode, selectedElement, setSelectedElement } = useCMS();
  const [showEditPopup, setShowEditPopup] = useState(false);
  
  const elementId = `service-card-${index}`;
  const isSelected = isEditMode && selectedElement === elementId;

  const handleClick = () => {
    if (isEditMode) {
      setSelectedElement(elementId);
      setShowEditPopup(true);
    }
  };

  const handleSave = (config: any) => {
    onUpdate(index, config);
    setShowEditPopup(false);
    setSelectedElement(null);
  };

  const editClasses = isEditMode 
    ? 'cursor-pointer hover:ring-2 hover:ring-blue-400 relative group' 
    : '';
  
  const selectedClasses = isSelected ? 'ring-2 ring-blue-500' : '';

  return (
    <>
      <Card
        onClick={handleClick}
        className={`group relative ${editClasses} ${selectedClasses}`}
      >
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 border-2 border-zinc-900 rounded-brutalist flex items-center justify-center flex-shrink-0">
              <Icon
                name={service.icon.name}
                size={20}
                className="text-zinc-900"
              />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mt-1">
              {service.title}
            </h3>
          </div>

          <p className="text-zinc-600 mb-6 leading-relaxed">
            {service.description}
          </p>

          <ul className="space-y-2">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm text-zinc-600">
                <span className="font-mono mr-3 text-zinc-400">→</span>
                {feature}
              </li>
            ))}
          </ul>

          {isEditMode && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs">✎</span>
            </div>
          )}
        </CardContent>
      </Card>

      <ServiceCardEditPopup
        isOpen={showEditPopup}
        onClose={() => {
          setShowEditPopup(false);
          setSelectedElement(null);
        }}
        onSave={handleSave}
        initialConfig={{
          icon: service.icon.name,
          title: service.title,
          description: service.description,
          features: service.features
        }}
      />
    </>
  );
};

export default EditableServiceCard;