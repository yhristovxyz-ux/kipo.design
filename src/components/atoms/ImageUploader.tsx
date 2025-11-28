/**
 * @fileoverview Image uploader component
 * @module components/atoms/ImageUploader
 */

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { apiService } from '@/services';

export interface ImageUploaderProps {
  currentImage?: string;
  onImageChange: (url: string) => void;
  onRemove?: () => void;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImage,
  onImageChange,
  onRemove,
  className = '',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    setError('');
    setIsUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const url = await apiService.uploadImage(file);
      onImageChange(url);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
      setPreview(currentImage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
    if (onRemove) {
      onRemove();
    } else {
      onImageChange('');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-section border border-border-primary"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-section flex items-center justify-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 bg-primary text-white rounded-interactive hover:bg-primary-hover disabled:opacity-50"
            >
              Change
            </button>
            <button
              onClick={handleRemove}
              disabled={isUploading}
              className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 bg-error text-white rounded-interactive hover:bg-red-700 disabled:opacity-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full h-48 border-2 border-dashed border-border-primary rounded-section flex flex-col items-center justify-center gap-3 hover:border-primary hover:bg-bg-secondary transition-all disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="text-sm text-text-secondary">Uploading...</span>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center">
                <Upload className="w-6 h-6 text-text-secondary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-text-primary">
                  Click to upload image
                </p>
                <p className="text-xs text-text-tertiary mt-1">
                  PNG, JPG, GIF, WebP up to 5MB
                </p>
              </div>
            </>
          )}
        </button>
      )}

      {error && (
        <p className="text-sm text-error flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};
