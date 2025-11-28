import React, { ReactNode } from 'react';
import { Settings, Copy, Eye, EyeOff, ChevronUp, ChevronDown } from 'lucide-react';
import { useCMS } from '../../contexts/CMSContext';

interface SectionWrapperProps {
  sectionId: string;
  children: ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ sectionId, children }) => {
  const { isEditMode, sections, duplicateSection, toggleSection, reorderSections, setShowSectionManager } = useCMS();
  
  const section = sections.find(s => s.id === sectionId);
  const sectionIndex = sections.findIndex(s => s.id === sectionId);
  
  if (!section?.enabled && !isEditMode) {
    return null;
  }

  if (!isEditMode) {
    return <>{children}</>;
  }

  const moveUp = () => {
    if (sectionIndex > 0) {
      const newSections = [...sections];
      [newSections[sectionIndex], newSections[sectionIndex - 1]] = 
      [newSections[sectionIndex - 1], newSections[sectionIndex]];
      reorderSections(newSections);
    }
  };

  const moveDown = () => {
    if (sectionIndex < sections.length - 1) {
      const newSections = [...sections];
      [newSections[sectionIndex], newSections[sectionIndex + 1]] = 
      [newSections[sectionIndex + 1], newSections[sectionIndex]];
      reorderSections(newSections);
    }
  };
  return (
    <div className={`relative ${!section?.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Section Controls */}
      <div className="absolute top-4 right-4 z-[45] flex gap-2">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex gap-1">
          <button
            onClick={moveUp}
            disabled={sectionIndex === 0}
            className={`p-2 rounded hover:bg-gray-100 transition-colors ${
              sectionIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'
            }`}
            title="Move Up"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          
          <button
            onClick={moveDown}
            disabled={sectionIndex === sections.length - 1}
            className={`p-2 rounded hover:bg-gray-100 transition-colors ${
              sectionIndex === sections.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'
            }`}
            title="Move Down"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => toggleSection(sectionId)}
            className={`p-2 rounded hover:bg-gray-100 transition-colors ${
              section?.enabled ? 'text-green-600' : 'text-red-500'
            }`}
            title={section?.enabled ? 'Hide Section' : 'Show Section'}
          >
            {section?.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => duplicateSection(sectionId)}
            className="p-2 rounded hover:bg-gray-100 transition-colors text-blue-600"
            title="Duplicate Section"
          >
            <Copy className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setShowSectionManager(true)}
            className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-600"
            title="Section Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Section Label */}
      <div className="absolute top-4 left-4 z-[45]">
        <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
          {section?.name}
        </div>
      </div>

      {/* Section Content */}
      <div className={`${isEditMode ? 'pt-16' : ''}`}>
        {section?.enabled ? children : null}
      </div>
    </div>
  );
};

export default SectionWrapper;