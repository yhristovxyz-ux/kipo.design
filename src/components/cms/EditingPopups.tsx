import React, { useState } from 'react';
import { X, Plus, Trash2, Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface ButtonEditPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: ButtonConfig) => void;
  initialConfig?: ButtonConfig;
}

interface ButtonConfig {
  text: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
  icon?: string;
  iconPosition?: 'left' | 'right';
}

interface ServiceCardConfig {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface ServiceCardEditPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: ServiceCardConfig) => void;
  initialConfig?: ServiceCardConfig;
}

interface ProcessStepConfig {
  number: string;
  icon: string;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
  image: string;
  details: string;
}

interface ProcessStepEditPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: ProcessStepConfig) => void;
  initialConfig?: ProcessStepConfig;
}

interface StudioContentConfig {
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  icon: string;
  stats: string;
}

interface StudioContentEditPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: StudioContentConfig) => void;
  initialConfig?: StudioContentConfig;
}

// Icon Selector Component
const IconSelector: React.FC<{
  selectedIcon: string;
  onSelect: (iconName: string) => void;
  onClose: () => void;
}> = ({ selectedIcon, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const iconNames = Object.keys(LucideIcons).filter(name => 
    name !== 'default' && 
    name !== 'createLucideIcon' &&
    name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 50); // Limit to 50 icons for performance

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200]">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">Select Icon</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-96">
          <div className="grid grid-cols-8 gap-2">
            {iconNames.map((iconName) => {
              const IconComponent = (LucideIcons as any)[iconName];
              return (
                <button
                  key={iconName}
                  onClick={() => {
                    onSelect(iconName);
                    onClose();
                  }}
                  className={`p-3 rounded-lg border-2 transition-colors hover:bg-gray-50 ${
                    selectedIcon === iconName 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200'
                  }`}
                  title={iconName}
                >
                  <IconComponent className="w-5 h-5 mx-auto" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Button Edit Popup
export const ButtonEditPopup: React.FC<ButtonEditPopupProps> = ({
  isOpen,
  onClose,
  onSave,
  initialConfig
}) => {
  const [config, setConfig] = useState<ButtonConfig>(initialConfig || {
    text: '',
    href: '',
    variant: 'primary',
    icon: '',
    iconPosition: 'right'
  });
  const [showIconSelector, setShowIconSelector] = useState(false);

  if (!isOpen) return null;

  const sections = [
    { id: 'hero', name: 'Hero Section' },
    { id: 'services', name: 'Services' },
    { id: 'process', name: 'Process' },
    { id: 'studio', name: 'Studio' },
    { id: 'approach', name: 'Approach' },
    { id: 'projects', name: 'Projects' },
    { id: 'testimonials', name: 'Testimonials' },
    { id: 'contact', name: 'Contact' }
  ];

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[150]">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold">Edit Button</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Text
              </label>
              <input
                type="text"
                value={config.text}
                onChange={(e) => setConfig({ ...config, text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter button text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Type
              </label>
              <select
                value={config.variant}
                onChange={(e) => setConfig({ ...config, variant: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="outline">Outline</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link Type
              </label>
              <div className="space-y-2">
                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="linkType"
                      checked={config.href.startsWith('#')}
                      onChange={() => setConfig({ ...config, href: '#' })}
                      className="mr-2"
                    />
                    Link to Section
                  </label>
                  {config.href.startsWith('#') && (
                    <select
                      value={config.href}
                      onChange={(e) => setConfig({ ...config, href: e.target.value })}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="#">Select section</option>
                      {sections.map(section => (
                        <option key={section.id} value={`#${section.id}`}>
                          {section.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="linkType"
                      checked={!config.href.startsWith('#')}
                      onChange={() => setConfig({ ...config, href: 'https://' })}
                      className="mr-2"
                    />
                    Custom URL
                  </label>
                  {!config.href.startsWith('#') && (
                    <input
                      type="url"
                      value={config.href}
                      onChange={(e) => setConfig({ ...config, href: e.target.value })}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com"
                    />
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon (Optional)
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowIconSelector(true)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-left"
                >
                  {config.icon ? (
                    <div className="flex items-center gap-2">
                      {React.createElement((LucideIcons as any)[config.icon], { className: "w-4 h-4" })}
                      <span>{config.icon}</span>
                    </div>
                  ) : (
                    'Select Icon'
                  )}
                </button>
                {config.icon && (
                  <button
                    type="button"
                    onClick={() => setConfig({ ...config, icon: '' })}
                    className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {config.icon && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon Position
                  </label>
                  <select
                    value={config.iconPosition}
                    onChange={(e) => setConfig({ ...config, iconPosition: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-3 p-6 border-t">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      
      {showIconSelector && (
        <IconSelector
          selectedIcon={config.icon}
          onSelect={(iconName) => setConfig({ ...config, icon: iconName })}
          onClose={() => setShowIconSelector(false)}
        />
      )}
    </>
  );
};

// Service Card Edit Popup
export const ServiceCardEditPopup: React.FC<ServiceCardEditPopupProps> = ({
  isOpen,
  onClose,
  onSave,
  initialConfig
}) => {
  const [config, setConfig] = useState<ServiceCardConfig>(initialConfig || {
    icon: 'Palette',
    title: '',
    description: '',
    features: ['']
  });
  const [showIconSelector, setShowIconSelector] = useState(false);

  if (!isOpen) return null;

  const addFeature = () => {
    setConfig({ ...config, features: [...config.features, ''] });
  };

  const removeFeature = (index: number) => {
    setConfig({ 
      ...config, 
      features: config.features.filter((_, i) => i !== index) 
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...config.features];
    newFeatures[index] = value;
    setConfig({ ...config, features: newFeatures });
  };

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[150]">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold">Edit Service Card</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowIconSelector(true)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-left"
                >
                  <div className="flex items-center gap-2">
                    {React.createElement((LucideIcons as any)[config.icon], { className: "w-4 h-4" })}
                    <span>{config.icon}</span>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Service title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={config.description}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Service description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>
              <div className="space-y-2">
                {config.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Feature"
                    />
                    <button
                      onClick={() => removeFeature(index)}
                      className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addFeature}
                  className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 text-gray-600 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Feature
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 p-6 border-t">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      
      {showIconSelector && (
        <IconSelector
          selectedIcon={config.icon}
          onSelect={(iconName) => setConfig({ ...config, icon: iconName })}
          onClose={() => setShowIconSelector(false)}
        />
      )}
    </>
  );
};

// Process Step Edit Popup
export const ProcessStepEditPopup: React.FC<ProcessStepEditPopupProps> = ({
  isOpen,
  onClose,
  onSave,
  initialConfig
}) => {
  const [config, setConfig] = useState<ProcessStepConfig>(initialConfig || {
    number: '01',
    icon: 'MessageCircle',
    title: '',
    description: '',
    duration: '',
    deliverables: [''],
    image: '',
    details: ''
  });
  const [showIconSelector, setShowIconSelector] = useState(false);

  if (!isOpen) return null;

  const addDeliverable = () => {
    setConfig({ ...config, deliverables: [...config.deliverables, ''] });
  };

  const removeDeliverable = (index: number) => {
    setConfig({ 
      ...config, 
      deliverables: config.deliverables.filter((_, i) => i !== index) 
    });
  };

  const updateDeliverable = (index: number, value: string) => {
    const newDeliverables = [...config.deliverables];
    newDeliverables[index] = value;
    setConfig({ ...config, deliverables: newDeliverables });
  };

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[150]">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold">Edit Process Step</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Step Number
                </label>
                <input
                  type="text"
                  value={config.number}
                  onChange={(e) => setConfig({ ...config, number: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="01"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={config.duration}
                  onChange={(e) => setConfig({ ...config, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1-2 weeks"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon
              </label>
              <button
                type="button"
                onClick={() => setShowIconSelector(true)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-left"
              >
                <div className="flex items-center gap-2">
                  {React.createElement((LucideIcons as any)[config.icon], { className: "w-4 h-4" })}
                  <span>{config.icon}</span>
                </div>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Step title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={config.description}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Step description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Details
              </label>
              <textarea
                value={config.details}
                onChange={(e) => setConfig({ ...config, details: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Additional details"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={config.image}
                onChange={(e) => setConfig({ ...config, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deliverables
              </label>
              <div className="space-y-2">
                {config.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={deliverable}
                      onChange={(e) => updateDeliverable(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Deliverable"
                    />
                    <button
                      onClick={() => removeDeliverable(index)}
                      className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addDeliverable}
                  className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 text-gray-600 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Deliverable
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 p-6 border-t">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      
      {showIconSelector && (
        <IconSelector
          selectedIcon={config.icon}
          onSelect={(iconName) => setConfig({ ...config, icon: iconName })}
          onClose={() => setShowIconSelector(false)}
        />
      )}
    </>
  );
};

// Studio Content Edit Popup
export const StudioContentEditPopup: React.FC<StudioContentEditPopupProps> = ({
  isOpen,
  onClose,
  onSave,
  initialConfig
}) => {
  const [config, setConfig] = useState<StudioContentConfig>(initialConfig || {
    title: '',
    description: '',
    mediaUrl: '',
    mediaType: 'image',
    icon: 'Target',
    stats: ''
  });
  const [showIconSelector, setShowIconSelector] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[150]">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold">Edit Studio Content</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Content title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={config.description}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Content description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon
              </label>
              <button
                type="button"
                onClick={() => setShowIconSelector(true)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-left"
              >
                <div className="flex items-center gap-2">
                  {React.createElement((LucideIcons as any)[config.icon], { className: "w-4 h-4" })}
                  <span>{config.icon}</span>
                </div>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stats Text
              </label>
              <input
                type="text"
                value={config.stats}
                onChange={(e) => setConfig({ ...config, stats: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="100+ User Interviews"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media Type
              </label>
              <select
                value={config.mediaType}
                onChange={(e) => setConfig({ ...config, mediaType: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media URL
              </label>
              <input
                type="url"
                value={config.mediaUrl}
                onChange={(e) => setConfig({ ...config, mediaUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/media.jpg"
              />
            </div>
          </div>
          
          <div className="flex gap-3 p-6 border-t">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      
      {showIconSelector && (
        <IconSelector
          selectedIcon={config.icon}
          onSelect={(iconName) => setConfig({ ...config, icon: iconName })}
          onClose={() => setShowIconSelector(false)}
        />
      )}
    </>
  );
};