/**
 * @fileoverview CMS type definitions
 * @module types/cms
 */

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  alt?: string;
}

export interface ButtonConfig {
  text: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
  icon?: IconConfig;
  iconPosition?: 'left' | 'right';
}

export interface IconConfig {
  type: 'lucide' | 'svg';
  value: string; // Icon name for lucide, SVG text for svg
}

export interface SectionConfig {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
  content: Record<string, unknown>;
}

export interface ServiceCardConfig {
  icon: IconConfig;
  title: string;
  description: string;
  features: string[];
}

export interface ProcessStepConfig {
  number: string;
  icon: IconConfig;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
  image: MediaItem;
  details: string;
}

export interface StudioContentConfig {
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  icon: IconConfig;
  stats: string;
}

export interface CMSContextType {
  isEditMode: boolean;
  setEditMode: (enabled: boolean) => void;
  showSectionManager: boolean;
  setShowSectionManager: (show: boolean) => void;
  sections: SectionConfig[];
  updateSection: (sectionId: string, content: Record<string, unknown>) => void;
  reorderSections: (sections: SectionConfig[]) => void;
  duplicateSection: (sectionId: string) => void;
  toggleSection: (sectionId: string) => void;
  deleteSection?: (sectionId: string) => void;
  selectedElement: string | null;
  setSelectedElement: (elementId: string | null) => void;
}
