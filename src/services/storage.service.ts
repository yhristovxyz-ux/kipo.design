/**
 * @fileoverview LocalStorage service for data persistence
 * @module services/storage
 */

export class StorageService {
  private static instance: StorageService;

  private constructor() {}

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  /**
   * Save data to localStorage
   */
  save<T>(key: string, data: T): void {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error saving to localStorage (${key}):`, error);
    }
  }

  /**
   * Load data from localStorage
   */
  load<T>(key: string): T | null {
    try {
      const serialized = localStorage.getItem(key);
      if (serialized === null) {
        return null;
      }
      return JSON.parse(serialized) as T;
    } catch (error) {
      console.error(`Error loading from localStorage (${key}):`, error);
      return null;
    }
  }

  /**
   * Remove data from localStorage
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
    }
  }

  /**
   * Clear all data from localStorage
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * Check if key exists in localStorage
   */
  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}

export const storage = StorageService.getInstance();
