/**
 * @fileoverview Project CRUD service
 * @module services/project
 */

import { Project, CreateProjectDto, UpdateProjectDto } from '../types/project.types';
import { apiService } from './api.service';

const USE_API = import.meta.env.VITE_USE_API === 'true';

/**
 * Generate unique ID
 */
function generateId(): string {
  return `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate URL-friendly slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export class ProjectService {
  private static instance: ProjectService;

  private constructor() {}

  static getInstance(): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService();
    }
    return ProjectService.instance;
  }

  /**
   * Get all projects
   */
  async getAll(): Promise<Project[]> {
    if (USE_API) {
      return await apiService.getProjects();
    }
    // Fallback to localStorage for development
    const stored = localStorage.getItem('kipo_projects');
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Get project by ID
   */
  async getById(id: string): Promise<Project | null> {
    const projects = await this.getAll();
    return projects.find(p => p.id === id) || null;
  }

  /**
   * Get project by slug
   */
  async getBySlug(slug: string): Promise<Project | null> {
    const projects = await this.getAll();
    return projects.find(p => p.slug === slug) || null;
  }

  /**
   * Create new project
   */
  async create(data: CreateProjectDto): Promise<Project> {
    if (USE_API) {
      return await apiService.createProject({
        ...data,
        slug: data.slug || generateSlug(data.title)
      });
    }
    
    // Fallback to localStorage
    const projects = await this.getAll();
    const newProject: Project = {
      ...data,
      id: generateId(),
      slug: data.slug || generateSlug(data.title),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    projects.push(newProject);
    localStorage.setItem('kipo_projects', JSON.stringify(projects));

    return newProject;
  }

  /**
   * Update existing project
   */
  async update(id: string, updates: Partial<UpdateProjectDto>): Promise<Project | null> {
    if (USE_API) {
      return await apiService.updateProject(id, updates);
    }
    
    // Fallback to localStorage
    const projects = await this.getAll();
    const index = projects.findIndex(p => p.id === id);

    if (index === -1) {
      return null;
    }

    projects[index] = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('kipo_projects', JSON.stringify(projects));
    return projects[index];
  }

  /**
   * Delete project
   */
  async delete(id: string): Promise<boolean> {
    if (USE_API) {
      await apiService.deleteProject(id);
      return true;
    }
    
    // Fallback to localStorage
    const projects = await this.getAll();
    const filtered = projects.filter(p => p.id !== id);

    if (filtered.length === projects.length) {
      return false;
    }

    localStorage.setItem('kipo_projects', JSON.stringify(projects));
    return true;
  }

  /**
   * Check if slug is unique
   */
  async isSlugUnique(slug: string, excludeId?: string): Promise<boolean> {
    const projects = await this.getAll();
    return !projects.some(p => p.slug === slug && p.id !== excludeId);
  }

  /**
   * Reorder projects
   */
  async reorder(projectIds: string[]): Promise<void> {
    const projects = await this.getAll();
    const reordered = projectIds
      .map(id => projects.find(p => p.id === id))
      .filter((p): p is Project => p !== undefined);

    if (USE_API) {
      await apiService.saveSections(reordered as any); // TODO: Add reorder endpoint
    } else {
      localStorage.setItem('kipo_projects', JSON.stringify(reordered));
    }
  }
}

export const projectService = ProjectService.getInstance();
