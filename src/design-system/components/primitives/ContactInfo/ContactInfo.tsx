/**
 * @fileoverview ContactInfo component for contact details
 * @module design-system/components/primitives/ContactInfo
 * 
 * A component for displaying contact information with icons
 */

import React from 'react';
import * as LucideIcons from 'lucide-react';

export interface ContactInfoProps {
  icon: keyof typeof LucideIcons | React.ComponentType;
  label: string;
  value: string;
  href?: string;
  className?: string;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  icon,
  label,
  value,
  href,
  className = ''
}) => {
  const Icon = typeof icon === 'string' 
    ? (LucideIcons[icon] as React.ComponentType<any>) 
    : icon;
  
  if (!Icon) return null;

  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-10 h-10 border border-border-primary rounded-brutalist flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-text-primary" />
      </div>
      <div>
        <p className="util-label mb-1">{label}</p>
        <p className="text-text-primary font-medium">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className="hover:opacity-75 transition-opacity"
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
};

export default ContactInfo;
