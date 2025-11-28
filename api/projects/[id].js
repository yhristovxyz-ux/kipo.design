/**
 * Single project endpoint
 * PATCH /api/projects/[id] - Update project
 * DELETE /api/projects/[id] - Delete project
 */

import { handleCors } from '../lib/cors.js';
import { readJSON, writeJSON } from '../lib/storage.js';

const PROJECTS_FILE = 'projects.json';

export default async function handler(req, res) {
  return handleCors(req, res, async () => {
    const { id } = req.query;
    
    try {
      if (req.method === 'PATCH') {
        // Update project
        const updates = req.body;
        let projects = await readJSON(PROJECTS_FILE) || [];
        
        const index = projects.findIndex(p => p.id === id);
        if (index === -1) {
          return res.status(404).json({ error: 'Project not found' });
        }
        
        projects[index] = {
          ...projects[index],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        
        await writeJSON(PROJECTS_FILE, projects);
        
        return res.status(200).json({ success: true, project: projects[index] });
      }
      
      if (req.method === 'DELETE') {
        // Delete project
        let projects = await readJSON(PROJECTS_FILE) || [];
        const filtered = projects.filter(p => p.id !== id);
        
        if (filtered.length === projects.length) {
          return res.status(404).json({ error: 'Project not found' });
        }
        
        await writeJSON(PROJECTS_FILE, filtered);
        
        return res.status(200).json({ success: true });
      }
      
      return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
      console.error('Project operation error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
}
