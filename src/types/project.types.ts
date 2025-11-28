/**
 * @fileoverview Project type definitions
 * @module types/project
 */

import { IconConfig, MediaItem } from './cms.types';

export interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  image?: string;
  icon?: IconConfig;
  tags: string[];
  year: string;
  client: string;
  content?: ProjectContent;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectContent {
  overview: string;
  challenge: string;
  solution: string;
  results: string;
  gallery: MediaItem[];
  testimonial?: Testimonial;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface CreateProjectDto {
  title: string;
  description: string;
  slug: string;
  image?: string;
  icon?: IconConfig;
  tags: string[];
  year: string;
  client: string;
  content?: ProjectContent;
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {
  id: string;
}
