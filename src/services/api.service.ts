/**
 * @fileoverview API service for backend communication
 * @module services/api
 */

import { SectionConfig } from '../types/cms.types';
import { Project, CreateProjectDto } from '../types/project.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new ApiError(response.status, error.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export class ApiService {
  private static instance: ApiService;

  private constructor() {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Sections
  async getSections(): Promise<SectionConfig[]> {
    return fetchAPI<SectionConfig[]>('/sections');
  }

  async saveSections(sections: SectionConfig[]): Promise<void> {
    await fetchAPI('/sections', {
      method: 'POST',
      body: JSON.stringify(sections),
    });
  }

  async updateSection(id: string, updates: Partial<SectionConfig>): Promise<SectionConfig> {
    const response = await fetchAPI<{ section: SectionConfig }>(`/sections/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
    return response.section;
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return fetchAPI<Project[]>('/projects');
  }

  async createProject(data: CreateProjectDto): Promise<Project> {
    const response = await fetchAPI<{ project: Project }>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.project;
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const response = await fetchAPI<{ project: Project }>(`/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
    return response.project;
  }

  async deleteProject(id: string): Promise<void> {
    await fetchAPI(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Image upload
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);

    const url = `${API_BASE_URL}/upload`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - browser will set it with boundary
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Upload failed' }));
        throw new ApiError(response.status, error.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      
      // Return full URL
      const baseUrl = API_BASE_URL.replace('/api', '');
      return `${baseUrl}${data.url}`;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error(`Upload error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await fetchAPI('/health');
      return true;
    } catch {
      return false;
    }
  }
}

export const apiService = ApiService.getInstance();
