import React from 'react';
import { Edit3, Eye, Save, Settings, Plus, Copy, Trash2, Move, LogOut, X } from 'lucide-react';
import { useCMS } from '../../contexts/CMSContext';
import { useNavigate } from 'react-router-dom';

const EditingToolbar: React.FC = () => {
  const { isEditMode, setEditMode, sections, selectedElement, showSectionManager, setShowSectionManager } = useCMS();
  const navigate = useNavigate();

  if (!isEditMode) {
    return null; // Only show when in edit mode (admin logged in)
  }

  const handleLogout = () => {
    setEditMode(false);
    navigate('/admin');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Edit3 className="w-5 h-5" />
              <span className="font-semibold">Edit Mode</span>
            </div>
            
            {selectedElement && (
              <div className="text-sm bg-blue-700 px-3 py-1 rounded">
                Selected: {selectedElement}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSectionManager(!showSectionManager)}
              className={`flex items-center gap-2 px-3 py-1 rounded transition-colors ${
                showSectionManager 
                  ? 'bg-blue-800 text-white' 
                  : 'bg-blue-700 hover:bg-blue-800'
              }`}
              title="Section Manager"
            >
              <Settings className="w-4 h-4" />
              {showSectionManager ? 'Close Sections' : 'Sections'}
            </button>
            
            <button
              className="flex items-center gap-2 px-3 py-1 bg-green-600 rounded hover:bg-green-700 transition-colors"
              title="Save Changes"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded hover:bg-red-700 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
            
            <button
              onClick={() => setEditMode(false)}
              className="flex items-center gap-2 px-3 py-1 bg-gray-600 rounded hover:bg-gray-700 transition-colors"
              title="Exit Edit Mode"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditingToolbar;