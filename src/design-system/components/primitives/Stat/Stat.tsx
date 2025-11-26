/**
 * @fileoverview Stat component for displaying metrics
 * @module design-system/components/primitives/Stat
 * 
 * A component for displaying statistics with value and label
 */

import React from 'react';

export interface StatProps {
  value: string | number;
  label: string;
  className?: string;
}

export const Stat: React.FC<StatProps> = ({
  value,
  label,
  className = ''
}) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="text-3xl md:text-4xl font-bold font-mono text-text-primary mb-2">
        {value}
      </div>
      <div className="util-label">
        {label}
      </div>
    </div>
  );
};

export default Stat;
