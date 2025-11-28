/**
 * Single section endpoint
 * PATCH /api/sections/[id] - Update specific section
 */

import { handleCors } from '../lib/cors.js';
import { readJSON, writeJSON } from '../lib/storage.js';

const SECTIONS_FILE = 'sections.json';

export default async function handler(req, res) {
  return handleCors(req, res, async () => {
    const { id } = req.query;
    
    try {
      if (req.method === 'PATCH') {
        const updates = req.body;
        let sections = await readJSON(SECTIONS_FILE) || [];
        
        const index = sections.findIndex(s => s.id === id);
        if (index === -1) {
          return res.status(404).json({ error: 'Section not found' });
        }
        
        sections[index] = { ...sections[index], ...updates };
        await writeJSON(SECTIONS_FILE, sections);
        
        return res.status(200).json({ success: true, section: sections[index] });
      }
      
      return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
      console.error('Section update error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
}
