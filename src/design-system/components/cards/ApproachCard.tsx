import React from 'react';
import EditableText from '@/components/atoms/EditableText';
import { Isocon } from '@/design-system/components/primitives/Isocon';

interface ApproachCardProps {
  principle: {
    icon: React.ComponentType<{ className?: string }> | string;
    title: string;
    description: string;
    stat: string;
  };
  index: number;
}

const ApproachCard: React.FC<ApproachCardProps> = ({ principle, index }) => {
  // Get icon name for Isocon
  const getIconName = () => {
    if (typeof principle.icon === 'string') return principle.icon;
    return principle.icon.name?.toLowerCase() || 'default';
  };

  return (
    <div className="bg-bg-primary p-8 border-t border-border-primary">
      {/* Isometric icon */}
      <div className="w-full h-48 mb-6 flex items-center justify-center">
        <Isocon name={getIconName()} size={128} />
      </div>

      <EditableText
        elementId={`approach-title-${index}`}
        onUpdate={(value) => console.log('Update title:', value)}
        className="text-xl font-bold text-text-primary mb-3"
        as="h3"
      >
        {principle.title}
      </EditableText>

      <EditableText
        elementId={`approach-description-${index}`}
        onUpdate={(value) => console.log('Update description:', value)}
        className="text-sm text-text-secondary mb-4 leading-relaxed"
        as="p"
        multiline
      >
        {principle.description}
      </EditableText>

      <div className="pt-4 border-t border-border-primary">
        <EditableText
          elementId={`approach-stat-${index}`}
          onUpdate={(value) => console.log('Update stat:', value)}
          className="text-xs font-bold text-text-tertiary uppercase tracking-wide"
          as="div"
        >
          {principle.stat}
        </EditableText>
      </div>
    </div>
  );
};

export default ApproachCard;
