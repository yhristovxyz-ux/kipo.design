import React from 'react';
import EditableText from '@/components/atoms/EditableText';
import { Isocon } from '@/design-system/components/primitives/Isocon';

interface ServiceCardProps {
  service: {
    icon: { name: string };
    title: string;
    description: string;
    features: string[];
  };
  index: number;
  onUpdate: (index: number, field: string, value: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, onUpdate }) => {
  return (
    <div className="bg-bg-primary p-8 border-t border-border-primary">
      {/* Isometric icon */}
      <div className="w-full h-64 mb-6 flex items-center justify-center">
        <Isocon name={service.icon.name.toLowerCase()} size={192} />
      </div>
      
      <EditableText
        elementId={`service-title-${index}`}
        onUpdate={(value) => onUpdate(index, 'title', value)}
        className="text-xl font-bold text-text-primary mb-3"
        as="h3"
      >
        {service.title}
      </EditableText>
      
      <EditableText
        elementId={`service-description-${index}`}
        onUpdate={(value) => onUpdate(index, 'description', value)}
        className="text-sm text-text-secondary mb-4"
        as="p"
        multiline
      >
        {service.description}
      </EditableText>
      
      <ul className="space-y-2">
        {service.features.map((feature, idx) => (
          <li key={idx} className="flex items-start text-xs text-text-tertiary">
            <span className="mr-2 mt-1 w-1 h-1 bg-primary rounded-full flex-shrink-0"></span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;
