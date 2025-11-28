/**
 * @fileoverview Modal component
 * @module design-system/components/modals/Modal
 */

import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/design-system/utils/cn';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showCloseButton?: boolean;
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className,
  showCloseButton = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Modal */}
      <div
        className={cn(
          'relative bg-bg-primary border border-border-primary rounded-section shadow-xl w-full max-h-[90vh] overflow-hidden flex flex-col',
          sizeClasses[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-border-primary">
            {title && (
              <h2 className="text-xl font-bold text-text-primary">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-bg-secondary rounded-interactive transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

export interface ModalHeaderProps {
  children: ReactNode;
  className?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'px-6 py-4 border-b border-border-primary',
        className
      )}
    >
      {children}
    </div>
  );
};

export interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('px-6 py-4', className)}>
      {children}
    </div>
  );
};

export interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'px-6 py-4 border-t border-border-primary bg-bg-secondary flex items-center justify-end gap-3',
        className
      )}
    >
      {children}
    </div>
  );
};
