/**
 * Projects endpoint
 * GET /api/projects - Get all projects
 * POST /api/projects - Create project
 */

import { handleCors } from './lib/cors.js';
import { readJSON, writeJSON } from './lib/storage.js';

const PROJECTS_FILE = 'projects.json';

function generateId() {
  return `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export default async function handler(req, res) {
  return handleCors(req, res, async () => {
    try {
      if (req.method === 'GET') {
        // Get all projects
        const projects = await readJSON(PROJECTS_FILE);
        return res.status(200).json(projects || []);
      }
      
      if (req.method === 'POST') {
        // Create project
        const newProject = req.body;
        let projects = await readJSON(PROJECTS_FILE) || [];
        
        // Add metadata
        newProject.id = newProject.id || generateId();
        newProject.createdAt = newProject.createdAt || new Date().toISOString();
        newProject.updatedAt = new Date().toISOString();
        
        projects.push(newProject);
        await writeJSON(PROJECTS_FILE, projects);
        
        return res.status(200).json({ success: true, project: newProject });
      }
      
      return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
      console.error('Projects error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
}
