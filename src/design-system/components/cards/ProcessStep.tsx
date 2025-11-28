import React from 'react';
import { Isocon } from '@/design-system/components/primitives/Isocon';

interface ProcessStepProps {
  step: {
    number: string;
    icon: React.ComponentType<{ className?: string }> | string;
    title: string;
    description: string;
    duration: string;
    deliverables: string[];
    details: string;
  };
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ step, isActive, onClick }) => {
  // Get icon name for Isocon
  const getIconName = () => {
    if (typeof step.icon === 'string') return step.icon;
    // Extract name from component if possible
    return step.icon.name?.toLowerCase() || 'default';
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-colors duration-200 bg-bg-primary p-8 border-t border-border-primary ${
        isActive ? 'bg-primary' : 'hover:bg-bg-secondary'
      }`}
    >
      {/* Step number badge */}
      <div className="mb-6">
        <div
          className={`inline-flex items-center justify-center w-12 h-12 border border-border-primary rounded-section font-bold text-lg transition-colors ${
            isActive
              ? 'bg-white text-primary'
              : 'bg-bg-secondary text-text-primary'
          }`}
        >
          {step.number}
        </div>
      </div>

      {/* Isometric icon */}
      <div className="w-full h-48 mb-6 flex items-center justify-center">
        <Isocon name={getIconName()} size={128} />
      </div>

      {/* Title */}
      <h3
        className={`text-xl font-bold mb-3 transition-colors ${
          isActive ? 'text-white' : 'text-text-primary'
        }`}
      >
        {step.title}
      </h3>

      {/* Duration badge */}
      <div className="mb-4">
        <span
          className={`inline-block text-xs font-bold px-3 py-1 rounded-interactive border border-border-primary uppercase tracking-wide transition-colors ${
            isActive
              ? 'bg-white text-primary'
              : 'text-text-tertiary bg-bg-secondary'
          }`}
        >
          {step.duration}
        </span>
      </div>

      {/* Description */}
      <p
        className={`text-sm leading-relaxed mb-4 transition-colors ${
          isActive ? 'text-white' : 'text-text-secondary'
        }`}
      >
        {step.description}
      </p>

      {/* Deliverables list - matches ServiceCard features style */}
      <ul className="space-y-2">
        {step.deliverables.map((deliverable, idx) => (
          <li
            key={idx}
            className={`flex items-start text-xs transition-colors ${
              isActive ? 'text-white' : 'text-text-tertiary'
            }`}
          >
            <span
              className={`mr-2 mt-1 w-1 h-1 rounded-full flex-shrink-0 ${
                isActive ? 'bg-white' : 'bg-primary'
              }`}
            ></span>
            <span>{deliverable}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProcessStep;
