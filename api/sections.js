/**
 * Sections endpoint
 * GET /api/sections - Get all sections
 * POST /api/sections - Save all sections
 */

import { handleCors } from './lib/cors.js';
import { readJSON, writeJSON } from './lib/storage.js';

const SECTIONS_FILE = 'sections.json';

export default async function handler(req, res) {
  return handleCors(req, res, async () => {
    try {
      if (req.method === 'GET') {
        // Get all sections
        const sections = await readJSON(SECTIONS_FILE);
        return res.status(200).json(sections || []);
      }
      
      if (req.method === 'POST') {
        // Save all sections
        const sections = req.body;
        
        if (!Array.isArray(sections)) {
          return res.status(400).json({ error: 'Sections must be an array' });
        }
        
        await writeJSON(SECTIONS_FILE, sections);
        return res.status(200).json({ success: true, sections });
      }
      
      return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
      console.error('Sections error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
}
