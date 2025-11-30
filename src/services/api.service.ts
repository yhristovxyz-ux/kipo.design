/**
 * @fileoverview API service for Supabase backend communication
 * @module services/api
 */

import { supabase } from '../lib/supabase';
import { SectionConfig } from '../types/cms.types';
import { Project, CreateProjectDto } from '../types/project.types';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
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

  async getSections(): Promise<SectionConfig[]> {
    const { data, error } = await supabase
      .from('sections')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      throw new ApiError(500, `Failed to fetch sections: ${error.message}`);
    }

    return data || [];
  }

  async saveSections(sections: SectionConfig[]): Promise<void> {
    const { error: deleteError } = await supabase
      .from('sections')
      .delete()
      .neq('id', '');

    if (deleteError) {
      throw new ApiError(500, `Failed to clear sections: ${deleteError.message}`);
    }

    if (sections.length === 0) return;

    const { error: insertError } = await supabase
      .from('sections')
      .insert(sections.map(s => ({
        id: s.id,
        name: s.name,
        enabled: s.enabled,
        order: s.order,
        content: s.content
      })));

    if (insertError) {
      throw new ApiError(500, `Failed to save sections: ${insertError.message}`);
    }
  }

  async updateSection(id: string, updates: Partial<SectionConfig>): Promise<SectionConfig> {
    const { data, error } = await supabase
      .from('sections')
      .update({
        name: updates.name,
        enabled: updates.enabled,
        order: updates.order,
        content: updates.content
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new ApiError(500, `Failed to update section: ${error.message}`);
    }

    return data;
  }

  async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new ApiError(500, `Failed to fetch projects: ${error.message}`);
    }

    return (data || []).map(p => ({
      ...p,
      icon: p.icon as any,
      content: p.content as any
    }));
  }

  async createProject(data: CreateProjectDto): Promise<Project> {
    const id = `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        id,
        title: data.title,
        description: data.description,
        slug: data.slug,
        image: data.image,
        icon: data.icon as any,
        tags: data.tags,
        year: data.year,
        client: data.client,
        content: data.content as any
      })
      .select()
      .single();

    if (error) {
      throw new ApiError(500, `Failed to create project: ${error.message}`);
    }

    return {
      ...project,
      icon: project.icon as any,
      content: project.content as any
    };
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const { data: project, error } = await supabase
      .from('projects')
      .update({
        title: updates.title,
        description: updates.description,
        slug: updates.slug,
        image: updates.image,
        icon: updates.icon as any,
        tags: updates.tags,
        year: updates.year,
        client: updates.client,
        content: updates.content as any
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new ApiError(500, `Failed to update project: ${error.message}`);
    }

    return {
      ...project,
      icon: project.icon as any,
      content: project.content as any
    };
  }

  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      throw new ApiError(500, `Failed to delete project: ${error.message}`);
    }
  }

  async uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw new ApiError(500, `Failed to upload image: ${uploadError.message}`);
    }

    const { data } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  async healthCheck(): Promise<boolean> {
    try {
      const { error } = await supabase.from('sections').select('id').limit(1);
      return !error;
    } catch {
      return false;
    }
  }
}

export const apiService = ApiService.getInstance();
