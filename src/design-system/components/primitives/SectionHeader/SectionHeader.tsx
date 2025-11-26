/**
 * @fileoverview SectionHeader component for section titles
 * @module design-system/components/primitives/SectionHeader
 * 
 * A component for displaying section headers with technical labels
 */

import React from 'react';

export interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  description,
  align = 'center',
  className = ''
}) => {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';
  
  return (
    <div className={`mb-16 ${alignClass} ${className}`}>
      <div className="util-label mb-4">{label}</div>
      <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
