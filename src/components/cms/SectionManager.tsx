import React from 'react';
import { X, Eye, EyeOff, Copy, Trash2, ChevronUp, ChevronDown, Settings } from 'lucide-react';
import { useCMS } from '../../contexts/CMSContext';

const SectionManager: React.FC = () => {
  const { 
    showSectionManager, 
    setShowSectionManager, 
    sections, 
    reorderSections, 
    duplicateSection, 
    toggleSection,
    deleteSection 
  } = useCMS();

  if (!showSectionManager) return null;

  const moveUp = (index: number) => {
    if (index > 0) {
      const newSections = [...sections];
      [newSections[index], newSections[index - 1]] = 
      [newSections[index - 1], newSections[index]];
      reorderSections(newSections);
    }
  };

  const moveDown = (index: number) => {
    if (index < sections.length - 1) {
      const newSections = [...sections];
      [newSections[index], newSections[index + 1]] = 
      [newSections[index + 1], newSections[index]];
      reorderSections(newSections);
    }
  };

  return (
    <div className="fixed top-[60px] right-4 z-[90] w-80">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 max-h-[calc(100vh-80px)] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Section Manager</h2>
          <button
            onClick={() => setShowSectionManager(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[50vh]">
          <div className="space-y-3">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`p-4 border rounded-lg transition-all ${
                  section.enabled 
                    ? 'border-gray-200 bg-white' 
                    : 'border-gray-100 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        className={`p-1 rounded ${
                          index === 0 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveDown(index)}
                        disabled={index === sections.length - 1}
                        className={`p-1 rounded ${
                          index === sections.length - 1 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">{section.name}</h3>
                      <p className="text-xs text-gray-500">ID: {section.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`p-2 rounded hover:bg-gray-100 transition-colors ${
                        section.enabled ? 'text-green-600' : 'text-red-500'
                      }`}
                      title={section.enabled ? 'Hide Section' : 'Show Section'}
                    >
                      {section.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    
                    <button
                      onClick={() => duplicateSection(section.id)}
                      className="p-2 rounded hover:bg-gray-100 transition-colors text-blue-600"
                      title="Duplicate Section"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    
                    <button
                      className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-600"
                      title="Section Settings"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                    
                    {!['hero', 'services', 'process'].includes(section.id) && (
                      <button
                        onClick={() => deleteSection && deleteSection(section.id)}
                        className="p-2 rounded hover:bg-gray-100 transition-colors text-red-600"
                        title="Delete Section"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Add New Section
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionManager;