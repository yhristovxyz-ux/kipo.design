/**
 * @fileoverview Project editor component with CRUD operations
 * @module components/projects/ProjectEditor
 */

import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Modal, Button } from '@/design-system';
import { ProjectForm, ProjectFormData } from './ProjectForm';
import { projectService } from '@/services';
import { Project } from '@/types';

export interface ProjectEditorProps {
  projects: Project[];
  onProjectsChange: () => void;
}

export const ProjectEditor: React.FC<ProjectEditorProps> = ({
  projects,
  onProjectsChange,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();

  const handleCreate = () => {
    setEditingProject(undefined);
    setShowForm(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = async (project: Project) => {
    if (confirm(`Delete project "${project.title}"?`)) {
      try {
        await projectService.delete(project.id);
        onProjectsChange();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project');
      }
    }
  };

  const handleSubmit = async (data: ProjectFormData) => {
    try {
      if (editingProject) {
        await projectService.update(editingProject.id, data);
      } else {
        await projectService.create(data);
      }
      setShowForm(false);
      setEditingProject(undefined);
      onProjectsChange();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(undefined);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-text-primary">
          Manage Projects ({projects.length})
        </h3>
        <Button
          variant="primary"
          size="sm"
          onClick={handleCreate}
          leftIcon={Plus}
        >
          Add Project
        </Button>
      </div>

      {/* Project List */}
      <div className="border border-border-primary rounded-section divide-y divide-border-primary">
        {projects.length === 0 ? (
          <div className="p-8 text-center text-text-tertiary">
            No projects yet. Click "Add Project" to create one.
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="p-4 flex items-center justify-between hover:bg-bg-secondary transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-bold text-text-primary">{project.title}</h4>
                <p className="text-sm text-text-secondary line-clamp-1">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-text-tertiary">
                    {project.client}
                  </span>
                  <span className="text-xs text-text-tertiary">•</span>
                  <span className="text-xs text-text-tertiary">
                    {project.year}
                  </span>
                  <span className="text-xs text-text-tertiary">•</span>
                  <span className="text-xs text-text-tertiary">
                    {project.tags.length} tags
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 hover:bg-bg-primary rounded-interactive transition-colors"
                  title="Edit project"
                >
                  <Edit className="w-4 h-4 text-text-secondary" />
                </button>
                <button
                  onClick={() => handleDelete(project)}
                  className="p-2 hover:bg-bg-primary rounded-interactive transition-colors"
                  title="Delete project"
                >
                  <Trash2 className="w-4 h-4 text-error" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={handleCancel}
        title={editingProject ? 'Edit Project' : 'Create Project'}
        size="lg"
      >
        <ProjectForm
          project={editingProject}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};
