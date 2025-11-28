import React, { useState, useEffect } from 'react';
import { ArrowRight, Settings } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';
import EditableText from './atoms/EditableText';
import SectionWrapper from './cms/SectionWrapper';
import { ProjectCard, Modal } from '@/design-system';
import { ProjectEditor } from './projects';
import { projectService } from '@/services';
import { Project } from '@/types';

const Projects: React.FC = () => {
  const { updateSection, isEditMode } = useCMS();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showEditor, setShowEditor] = useState(false);

  // Load projects from service
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const allProjects = await projectService.getAll();
      setProjects(allProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const updateContent = (field: string, value: string) => {
    updateSection('projects', { [field]: value });
  };

  return (
    <SectionWrapper sectionId="projects">
      <section id="work" className="brutalist-section bg-bg-primary ">
        <div className="brutalist-container">
          <div className="mb-16">
            <div className="flex items-center justify-between">
              <div className="util-label mb-4">006-PROJECTS</div>
              {isEditMode && (
                <button
                  onClick={() => setShowEditor(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-inverse rounded-interactive hover:bg-primary/90 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Manage Projects
                </button>
              )}
            </div>
            <EditableText
              elementId="projects-headline"
              onUpdate={(value) => updateContent('headline', value)}
              className="text-4xl md:text-5xl font-bold text-text-primary mb-6"
              as="h2"
            >
              Featured Projects
            </EditableText>
            <EditableText
              elementId="projects-description"
              onUpdate={(value) => updateContent('description', value)}
              className="text-lg text-text-secondary max-w-2xl"
              as="p"
              multiline
            >
              Explore our latest work and see how we've helped businesses
              transform their digital presence.
            </EditableText>
          </div>

          {/* Full-width contained grid - matches Services section */}
          {projects.length > 0 ? (
            <>
              <div className="border-l border-r border-border-primary">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px brutalist-hatch">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>

              <div className="mt-12">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 border border-border-primary text-text-primary px-6 py-3 font-bold hover:bg-primary hover:text-inverse transition-all duration-200 rounded-brutalist uppercase tracking-wide text-sm"
                >
                  View All Projects
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </>
          ) : (
            <div className="border border-border-primary rounded-section p-12 text-center">
              <p className="text-text-tertiary mb-4">No projects yet.</p>
              {isEditMode && (
                <button
                  onClick={() => setShowEditor(true)}
                  className="px-6 py-3 bg-primary text-inverse rounded-interactive hover:bg-primary/90 transition-colors"
                >
                  Add Your First Project
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Project Editor Modal */}
      <Modal
        isOpen={showEditor}
        onClose={() => setShowEditor(false)}
        title="Project Management"
        size="xl"
      >
        <ProjectEditor
          projects={projects}
          onProjectsChange={loadProjects}
        />
      </Modal>
    </SectionWrapper>
  );
};

export default Projects;