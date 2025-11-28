import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import multer from 'multer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded images
app.use('/uploads', express.static(join(ROOT_DIR, 'uploads')));

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = join(ROOT_DIR, 'uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error, null);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = file.originalname.split('.').pop();
    cb(null, `image-${uniqueSuffix}.${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'));
    }
  }
});

// Helper functions for JSON file operations
const DATA_DIR = join(ROOT_DIR, 'data');

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

async function readJSON(filename) {
  try {
    const filePath = join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

async function writeJSON(filename, data) {
  await ensureDataDir();
  const filePath = join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Sections endpoints
app.get('/api/sections', async (req, res) => {
  try {
    const sections = await readJSON('sections.json');
    res.json(sections || []);
  } catch (error) {
    console.error('Error reading sections:', error);
    res.status(500).json({ error: 'Failed to read sections' });
  }
});

app.post('/api/sections', async (req, res) => {
  try {
    const sections = req.body;
    await writeJSON('sections.json', sections);
    res.json({ success: true, sections });
  } catch (error) {
    console.error('Error saving sections:', error);
    res.status(500).json({ error: 'Failed to save sections' });
  }
});

app.patch('/api/sections/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    let sections = await readJSON('sections.json') || [];
    const index = sections.findIndex(s => s.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Section not found' });
    }
    
    sections[index] = { ...sections[index], ...updates };
    await writeJSON('sections.json', sections);
    
    res.json({ success: true, section: sections[index] });
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(500).json({ error: 'Failed to update section' });
  }
});

// Projects endpoints
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await readJSON('projects.json');
    res.json(projects || []);
  } catch (error) {
    console.error('Error reading projects:', error);
    res.status(500).json({ error: 'Failed to read projects' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const newProject = req.body;
    let projects = await readJSON('projects.json') || [];
    
    // Add timestamps
    newProject.id = newProject.id || `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    newProject.createdAt = newProject.createdAt || new Date().toISOString();
    newProject.updatedAt = new Date().toISOString();
    
    projects.push(newProject);
    await writeJSON('projects.json', projects);
    
    res.json({ success: true, project: newProject });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.patch('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    let projects = await readJSON('projects.json') || [];
    const index = projects.findIndex(p => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    projects[index] = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await writeJSON('projects.json', projects);
    
    res.json({ success: true, project: projects[index] });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    let projects = await readJSON('projects.json') || [];
    const filtered = projects.filter(p => p.id !== id);
    
    if (filtered.length === projects.length) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    await writeJSON('projects.json', filtered);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Image upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      url: imageUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📁 Data directory: ${DATA_DIR}`);
  console.log(`🖼️  Upload directory: ${join(ROOT_DIR, 'uploads')}`);
  console.log(`🌐 Allowed origins: ${allowedOrigins.join(', ')}`);
});
