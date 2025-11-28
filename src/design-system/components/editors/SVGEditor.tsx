/**
 * @fileoverview SVG Editor component for icon editing
 * @module design-system/components/editors/SVGEditor
 */

import { useState, useEffect } from 'react';
import { Modal, ModalFooter } from '../modals/Modal';
import { Textarea } from '../forms/Textarea';
import { Button } from '../primitives/Button';
import { cn } from '@/design-system/utils/cn';

export interface SVGEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (svg: string) => void;
  initialValue?: string;
  title?: string;
}

/**
 * Validate SVG text
 */
function validateSVG(text: string): { valid: boolean; error?: string } {
  if (!text.trim()) {
    return { valid: false, error: 'SVG text cannot be empty' };
  }

  if (!text.includes('<svg')) {
    return { valid: false, error: 'Invalid SVG: must contain <svg> tag' };
  }

  if (!text.includes('</svg>')) {
    return { valid: false, error: 'Invalid SVG: missing closing </svg> tag' };
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'image/svg+xml');
    const parserError = doc.querySelector('parsererror');
    
    if (parserError) {
      return { valid: false, error: 'Invalid SVG: XML parsing error' };
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, error: 'Invalid SVG: parsing failed' };
  }
}

/**
 * SVG Editor component
 * Allows editing SVG as text with live preview
 */
export const SVGEditor: React.FC<SVGEditorProps> = ({
  isOpen,
  onClose,
  onSave,
  initialValue = '',
  title = 'Edit SVG Icon',
}) => {
  const [svg, setSvg] = useState(initialValue);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setSvg(initialValue);
      setError('');
    }
  }, [isOpen, initialValue]);

  useEffect(() => {
    if (svg.trim()) {
      const validation = validateSVG(svg);
      if (!validation.valid) {
        setError(validation.error || 'Invalid SVG');
      } else {
        setError('');
      }
    } else {
      setError('');
    }
  }, [svg]);

  const handleSave = () => {
    const validation = validateSVG(svg);
    if (!validation.valid) {
      setError(validation.error || 'Invalid SVG');
      return;
    }

    onSave(svg);
    onClose();
  };

  const handleCancel = () => {
    setSvg(initialValue);
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title={title} size="lg">
      <div className="space-y-4">
        {/* Instructions */}
        <div className="bg-bg-secondary border border-border-primary rounded-section p-4">
          <h3 className="text-sm font-bold text-text-primary mb-2">
            Instructions
          </h3>
          <ul className="text-sm text-text-secondary space-y-1 list-disc list-inside">
            <li>Paste your SVG code in the textarea below</li>
            <li>SVG must include opening and closing tags</li>
            <li>Preview updates automatically</li>
            <li>Ensure SVG has viewBox attribute for proper scaling</li>
          </ul>
        </div>

        {/* Textarea */}
        <Textarea
          value={svg}
          onChange={(e) => setSvg(e.target.value)}
          error={error}
          placeholder="<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 24 24&quot;>...</svg>"
          rows={12}
          className="font-mono text-sm"
          helperText="Paste your SVG code here"
        />

        {/* Preview Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="show-preview"
            checked={showPreview}
            onChange={(e) => setShowPreview(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="show-preview" className="text-sm text-text-secondary">
            Show preview
          </label>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="border border-border-primary rounded-section p-8">
            <h3 className="text-sm font-bold text-text-primary mb-4">
              Preview
            </h3>
            <div className="flex items-center justify-center gap-8">
              {/* Small */}
              <div className="text-center">
                <div
                  className={cn(
                    'w-8 h-8 flex items-center justify-center bg-bg-secondary rounded',
                    error && 'opacity-50'
                  )}
                  dangerouslySetInnerHTML={
                    !error && svg.trim() ? { __html: svg } : undefined
                  }
                >
                  {(error || !svg.trim()) && (
                    <span className="text-xs text-text-tertiary">?</span>
                  )}
                </div>
                <span className="text-xs text-text-tertiary mt-1 block">
                  Small
                </span>
              </div>

              {/* Medium */}
              <div className="text-center">
                <div
                  className={cn(
                    'w-16 h-16 flex items-center justify-center bg-bg-secondary rounded',
                    error && 'opacity-50'
                  )}
                  dangerouslySetInnerHTML={
                    !error && svg.trim() ? { __html: svg } : undefined
                  }
                >
                  {(error || !svg.trim()) && (
                    <span className="text-sm text-text-tertiary">?</span>
                  )}
                </div>
                <span className="text-xs text-text-tertiary mt-1 block">
                  Medium
                </span>
              </div>

              {/* Large */}
              <div className="text-center">
                <div
                  className={cn(
                    'w-24 h-24 flex items-center justify-center bg-bg-secondary rounded',
                    error && 'opacity-50'
                  )}
                  dangerouslySetInnerHTML={
                    !error && svg.trim() ? { __html: svg } : undefined
                  }
                >
                  {(error || !svg.trim()) && (
                    <span className="text-base text-text-tertiary">?</span>
                  )}
                </div>
                <span className="text-xs text-text-tertiary mt-1 block">
                  Large
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <ModalFooter>
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={!!error || !svg.trim()}>
          Save SVG
        </Button>
      </ModalFooter>
    </Modal>
  );
};
