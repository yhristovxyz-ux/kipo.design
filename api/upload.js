/**
 * Image upload endpoint
 * POST /api/upload - Upload image
 */

import { handleCors } from './lib/cors.js';
import { uploadFile } from './lib/storage.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseMultipartForm(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      try {
        const buffer = Buffer.concat(chunks);
        const boundary = req.headers['content-type'].split('boundary=')[1];
        const parts = buffer.toString('binary').split(`--${boundary}`);
        
        for (const part of parts) {
          if (part.includes('Content-Disposition')) {
            const nameMatch = part.match(/name="([^"]+)"/);
            const filenameMatch = part.match(/filename="([^"]+)"/);
            
            if (nameMatch && filenameMatch) {
              const contentStart = part.indexOf('\r\n\r\n') + 4;
              const contentEnd = part.lastIndexOf('\r\n');
              const content = part.substring(contentStart, contentEnd);
              
              resolve({
                fieldname: nameMatch[1],
                filename: filenameMatch[1],
                buffer: Buffer.from(content, 'binary'),
              });
              return;
            }
          }
        }
        reject(new Error('No file found in request'));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  return handleCors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }
      
      // Parse multipart form data
      const file = await parseMultipartForm(req);
      
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      const ext = file.filename.split('.').pop().toLowerCase();
      const mimeType = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
      
      if (!allowedTypes.includes(mimeType)) {
        return res.status(400).json({ error: 'Invalid file type' });
      }
      
      // Validate file size (5MB)
      if (file.buffer.length > 5 * 1024 * 1024) {
        return res.status(400).json({ error: 'File too large (max 5MB)' });
      }
      
      // Generate unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = `uploads/image-${uniqueSuffix}.${ext}`;
      
      // Upload to Vercel Blob
      const url = await uploadFile(filename, file.buffer);
      
      return res.status(200).json({
        success: true,
        url,
        filename,
        size: file.buffer.length,
        mimetype: mimeType,
      });
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({ error: 'Upload failed' });
    }
  });
}
