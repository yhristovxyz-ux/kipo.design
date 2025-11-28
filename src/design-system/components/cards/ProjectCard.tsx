import React from 'react';
import EditableText from '@/components/atoms/EditableText';
import EditableImage from '@/components/atoms/EditableImage';
import { Isocon } from '@/design-system/components/primitives/Isocon';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    image?: string;
    icon?: string;
    tags: string[];
    year: string;
    client: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-bg-primary p-8 border-t border-border-primary">
      {/* Image or Icon placeholder */}
      <div className="w-full h-48 mb-6 bg-bg-secondary border border-border-primary rounded-section overflow-hidden flex items-center justify-center">
        {project.image ? (
          <EditableImage
            src={project.image}
            alt={project.title}
            elementId={`project-image-${project.id}`}
            onUpdate={(newSrc, newAlt) => {
              console.log('Update project image:', newSrc, newAlt);
            }}
            className="w-full h-full object-cover"
          />
        ) : (
          <Isocon name={project.icon || 'briefcase'} size={128} />
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4 font-mono text-xs text-text-tertiary">
          <EditableText
            elementId={`project-year-${project.id}`}
            onUpdate={(value) => console.log('Update year:', value)}
            as="span"
          >
            {project.year}
          </EditableText>
          <span>•</span>
          <EditableText
            elementId={`project-client-${project.id}`}
            onUpdate={(value) => console.log('Update client:', value)}
            as="span"
          >
            {project.client}
          </EditableText>
        </div>

        <EditableText
          elementId={`project-title-${project.id}`}
          onUpdate={(value) => console.log('Update title:', value)}
          className="text-xl font-bold text-text-primary mb-3"
          as="h3"
        >
          {project.title}
        </EditableText>

        <EditableText
          elementId={`project-description-${project.id}`}
          onUpdate={(value) => console.log('Update description:', value)}
          className="text-text-secondary mb-4 leading-relaxed"
          as="p"
          multiline
        >
          {project.description}
        </EditableText>

        {/* Tags as bullet list */}
        <ul className="space-y-2">
          {project.tags.map((tag, idx) => (
            <li key={idx} className="flex items-start text-xs text-text-tertiary">
              <span className="mr-2 mt-1 w-1 h-1 bg-primary rounded-full flex-shrink-0"></span>
              <span>{tag}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectCard;
