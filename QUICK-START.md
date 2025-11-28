# Quick Start Guide

Get kipo.design CMS running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- Git installed

## Setup

### 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/yhristovxyz-ux/kipo.design.git
cd kipo.design

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Configure Environment

```bash
# Create frontend .env
cat > .env << EOF
VITE_USE_API=true
VITE_API_URL=http://localhost:3001/api
EOF

# Backend .env already exists
```

### 3. Start Backend

```bash
# In one terminal
cd backend
npm start
```

Backend runs on `http://localhost:3001`

### 4. Start Frontend

```bash
# In another terminal (from root)
npm run dev
```

Frontend runs on `http://localhost:5173`

## Test It Works

1. Open `http://localhost:5173`
2. Click "Edit" button in header
3. Hover over any text - see edit icon
4. Click to edit
5. Go to Projects section
6. Click "Manage Projects"
7. Add a project with image upload
8. Refresh page - changes persist!

## What You Get

- ✅ Inline text editing
- ✅ Project management (add/edit/delete)
- ✅ Image uploads
- ✅ Section reordering
- ✅ Persistent storage
- ✅ Multi-user support

## Deployment

See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for production deployment.

**Recommended**: Deploy backend to Railway, frontend to Vercel.

## Need Help?

- Backend API: [backend/README.md](backend/README.md)
- Full docs: [JSON-BACKEND-COMPLETE.md](JSON-BACKEND-COMPLETE.md)
- Deployment: [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)

## Common Issues

### Port already in use
```bash
lsof -ti:3001 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

### Backend not connecting
1. Check backend is running: `curl http://localhost:3001/api/health`
2. Check `.env` has correct URL
3. Restart both servers

### Images not uploading
1. Check `backend/uploads/` directory exists
2. Verify backend is running
3. Check file size (<5MB)

---

**That's it!** You're ready to edit your portfolio.
