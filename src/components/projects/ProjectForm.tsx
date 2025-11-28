/**
 * @fileoverview Project form component
 * @module components/projects/ProjectForm
 */

import { useState, useEffect } from 'react';
import { Input, Textarea, Button } from '@/design-system';
import { IconConfig, Project } from '@/types';
import { ImageUploader } from '../atoms/ImageUploader';

export interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
}

export interface ProjectFormData {
  title: string;
  description: string;
  slug: string;
  image?: string;
  icon?: IconConfig;
  tags: string[];
  year: string;
  client: string;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: project?.title || '',
    description: project?.description || '',
    slug: project?.slug || '',
    image: project?.image || '',
    icon: project?.icon,
    tags: project?.tags || [],
    year: project?.year || new Date().getFullYear().toString(),
    client: project?.client || '',
  });

  const [tagsInput, setTagsInput] = useState(
    project?.tags.join(', ') || ''
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-generate slug from title
  useEffect(() => {
    if (!project && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, project]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }

    if (!formData.client.trim()) {
      newErrors.client = 'Client is required';
    }

    if (!formData.year.trim()) {
      newErrors.year = 'Year is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Parse tags
    const tags = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    onSubmit({
      ...formData,
      tags,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <Input
        label="Project Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        error={errors.title}
        placeholder="Enter project title"
        required
      />

      {/* Description */}
      <Textarea
        label="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        error={errors.description}
        placeholder="Brief project description"
        rows={4}
        required
      />

      {/* Slug */}
      <Input
        label="URL Slug"
        value={formData.slug}
        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
        error={errors.slug}
        placeholder="project-url-slug"
        helperText="Used in the project URL"
        required
      />

      {/* Client */}
      <Input
        label="Client"
        value={formData.client}
        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
        error={errors.client}
        placeholder="Client name"
        required
      />

      {/* Year */}
      <Input
        label="Year"
        type="number"
        value={formData.year}
        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
        error={errors.year}
        placeholder="2024"
        required
      />

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Project Image
        </label>
        <ImageUploader
          currentImage={formData.image}
          onImageChange={(url) => setFormData({ ...formData, image: url })}
          onRemove={() => setFormData({ ...formData, image: '' })}
        />
        <p className="text-xs text-text-tertiary mt-2">
          Upload an image or leave empty to use icon
        </p>
      </div>

      {/* Tags */}
      <Textarea
        label="Tags"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        placeholder="UX/UI Design, Web App, Dashboard"
        helperText="Comma-separated tags"
        rows={2}
      />

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-primary">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {project ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
};
