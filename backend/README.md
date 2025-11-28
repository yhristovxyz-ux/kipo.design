# Kipo.design Backend API

Simple Express backend for CMS data persistence and image uploads.

## Features

- ✅ JSON file storage for sections and projects
- ✅ Image upload with file storage
- ✅ CORS enabled for frontend
- ✅ RESTful API endpoints

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

## Development

```bash
npm run dev
```

Server runs on port 3001 by default.

## Production

```bash
npm start
```

## API Endpoints

### Health Check
```
GET /api/health
```

### Sections
```
GET    /api/sections          # Get all sections
POST   /api/sections          # Save all sections
PATCH  /api/sections/:id      # Update specific section
```

### Projects
```
GET    /api/projects          # Get all projects
POST   /api/projects          # Create project
PATCH  /api/projects/:id      # Update project
DELETE /api/projects/:id      # Delete project
```

### Image Upload
```
POST   /api/upload            # Upload image (multipart/form-data)
```

Returns:
```json
{
  "success": true,
  "url": "/uploads/image-123456.jpg",
  "filename": "image-123456.jpg",
  "size": 123456,
  "mimetype": "image/jpeg"
}
```

## File Structure

```
backend/
├── src/
│   └── server.js          # Main server file
├── data/                  # JSON data files
│   ├── sections.json
│   └── projects.json
├── uploads/               # Uploaded images
├── package.json
└── .env
```

## Environment Variables

```env
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend-url.com
```

## Deployment

### Option 1: Railway
1. Create account at railway.app
2. Connect GitHub repo
3. Set environment variables
4. Deploy

### Option 2: Render
1. Create account at render.com
2. New Web Service
3. Connect repo, select backend folder
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables
7. Deploy

### Option 3: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

### Option 4: DigitalOcean App Platform
1. Create account
2. New App
3. Connect repo
4. Configure build settings
5. Deploy

## CORS Configuration

Update `ALLOWED_ORIGINS` in `.env` to include your frontend URL:

```env
ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend.com
```

## Image Upload Limits

- Max file size: 5MB
- Allowed types: JPEG, PNG, GIF, WebP
- Files stored in `uploads/` directory

## Data Persistence

Data is stored in JSON files in the `data/` directory:
- `sections.json` - CMS sections
- `projects.json` - Projects

**Backup**: Regularly backup the `data/` and `uploads/` directories.

## Security Notes

- No authentication implemented (add if needed)
- CORS restricted to allowed origins
- File upload validation in place
- Consider adding rate limiting for production

## Troubleshooting

### Port already in use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### CORS errors
Check `ALLOWED_ORIGINS` includes your frontend URL.

### Upload fails
Check `uploads/` directory exists and is writable.

## License

MIT
