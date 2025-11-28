# Deploy Now - Step by Step Guide

This guide will help you deploy kipo.design in ~15 minutes.

---

## Prerequisites

- GitHub account
- Credit card (for Railway/Vercel - free tier available)

---

## Step 1: Push to GitHub (If not already done)

```bash
# Initialize git (if needed)
git init
git add .
git commit -m "Initial commit with JSON backend"

# Add remote and push
git remote add origin https://github.com/yhristovxyz-ux/kipo.design.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Railway

### Option A: Via Railway Dashboard (Easiest)

1. **Go to [railway.app](https://railway.app)**
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose `kipo.design` repository**
6. **Configure deployment**:
   - Click on the service
   - Go to "Settings"
   - Set **Root Directory**: `backend`
   - Set **Start Command**: `npm start`
   - Set **Build Command**: `npm install`

7. **Add Environment Variables**:
   - Go to "Variables" tab
   - Add:
     ```
     PORT=3001
     NODE_ENV=production
     ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
     ```
   - Note: You'll update ALLOWED_ORIGINS after deploying frontend

8. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy the generated URL (e.g., `https://kipo-backend-production.up.railway.app`)

### Option B: Via Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Link to project
railway link

# Set environment variables
railway variables set PORT=3001
railway variables set NODE_ENV=production
railway variables set ALLOWED_ORIGINS=https://your-frontend-url.vercel.app

# Deploy
cd backend
railway up
```

### Verify Backend Deployment

```bash
# Test health endpoint
curl https://your-backend-url.railway.app/api/health

# Should return: {"status":"ok","timestamp":"..."}
```

---

## Step 3: Deploy Frontend to Vercel

### Option A: Via Vercel Dashboard (Easiest)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with GitHub
3. **Click "Add New..." → "Project"**
4. **Import `kipo.design` repository**
5. **Configure project**:
   - Framework Preset: **Vite**
   - Root Directory: `./` (leave as root)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add:
     ```
     VITE_USE_API=true
     VITE_API_URL=https://your-backend-url.railway.app/api
     ```
   - Replace `your-backend-url` with your Railway URL

7. **Deploy**:
   - Click "Deploy"
   - Wait for deployment
   - Copy the generated URL (e.g., `https://kipo-design.vercel.app`)

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? kipo-design
# - Directory? ./ (root)
# - Override settings? No

# Set environment variables
vercel env add VITE_USE_API
# Enter: true

vercel env add VITE_API_URL
# Enter: https://your-backend-url.railway.app/api

# Deploy to production
vercel --prod
```

### Verify Frontend Deployment

1. Visit your Vercel URL
2. Click "Edit" button
3. Try editing text
4. Try managing projects
5. Try uploading an image

---

## Step 4: Update CORS Configuration

Now that you have both URLs, update the backend CORS:

### Via Railway Dashboard

1. Go to your Railway project
2. Click on the backend service
3. Go to "Variables" tab
4. Update `ALLOWED_ORIGINS`:
   ```
   ALLOWED_ORIGINS=https://kipo-design.vercel.app,https://kipo-design-git-main-yourname.vercel.app
   ```
5. Redeploy (Railway will auto-redeploy on variable change)

### Via Railway CLI

```bash
railway variables set ALLOWED_ORIGINS=https://kipo-design.vercel.app
```

---

## Step 5: Test Everything

### Backend Tests

```bash
# Health check
curl https://your-backend.railway.app/api/health

# Get sections
curl https://your-backend.railway.app/api/sections

# Get projects
curl https://your-backend.railway.app/api/projects
```

### Frontend Tests

1. **Visit your site**: `https://kipo-design.vercel.app`
2. **Enable edit mode**: Click "Edit" button
3. **Test inline editing**:
   - Hover over any text
   - Click the edit icon
   - Edit and save
   - Refresh page - changes should persist

4. **Test project management**:
   - Go to Projects section
   - Click "Manage Projects"
   - Add a new project
   - Upload an image
   - Save
   - Refresh - project should still be there

5. **Test from another device**:
   - Open site on phone/tablet
   - Changes should be visible

---

## Step 6: Set Up Custom Domain (Optional)

### For Frontend (Vercel)

1. Go to Vercel dashboard
2. Select your project
3. Go to "Settings" → "Domains"
4. Add your domain (e.g., `kipo.design`)
5. Follow DNS configuration instructions
6. Wait for DNS propagation (~5-60 minutes)

### For Backend (Railway)

1. Go to Railway dashboard
2. Select your backend service
3. Go to "Settings" → "Domains"
4. Add custom domain (e.g., `api.kipo.design`)
5. Add CNAME record to your DNS:
   ```
   CNAME api.kipo.design → your-backend.railway.app
   ```
6. Wait for DNS propagation

### Update Environment Variables

After setting up custom domains:

**Backend** (Railway):
```
ALLOWED_ORIGINS=https://kipo.design
```

**Frontend** (Vercel):
```
VITE_API_URL=https://api.kipo.design/api
```

---

## Troubleshooting

### Backend Issues

**"Service Unavailable"**
- Check Railway logs: Dashboard → Service → Deployments → View Logs
- Verify environment variables are set
- Check if service is running

**CORS Errors**
- Verify `ALLOWED_ORIGINS` includes your frontend URL
- No trailing slashes in URLs
- Check browser console for exact error

**Upload Fails**
- Railway has persistent disk - should work
- Check logs for errors
- Verify file size (<5MB)

### Frontend Issues

**"Failed to fetch"**
- Check `VITE_API_URL` is correct
- Test backend URL directly in browser
- Check browser console for errors

**Changes Don't Persist**
- Verify backend is running
- Check API URL is correct
- Test backend endpoints directly

**Images Don't Load**
- Check image URLs in browser
- Verify backend serves `/uploads` correctly
- Check CORS headers

---

## Monitoring

### Railway

1. Go to Railway dashboard
2. Select your service
3. View:
   - **Metrics**: CPU, Memory, Network
   - **Logs**: Real-time logs
   - **Deployments**: Deployment history

### Vercel

1. Go to Vercel dashboard
2. Select your project
3. View:
   - **Analytics**: Page views, performance
   - **Logs**: Function logs
   - **Deployments**: Deployment history

---

## Backup

### Automated Backup (Recommended)

Add to your repository:

```bash
# .github/workflows/backup.yml
name: Backup Data

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM
  workflow_dispatch:

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Download data from Railway
        run: |
          # Add script to download data from Railway
          # Store in git or upload to S3
```

### Manual Backup

```bash
# SSH into Railway (if available) or use Railway CLI
railway run bash

# Backup data
tar -czf backup-$(date +%Y%m%d).tar.gz data/ uploads/

# Download backup
railway run cat backup-*.tar.gz > local-backup.tar.gz
```

---

## Costs

### Free Tier Limits

**Railway**:
- $5 free credit per month
- ~500 hours of usage
- Persistent storage included

**Vercel**:
- 100 GB bandwidth
- Unlimited deployments
- Free SSL

### Paid Plans (if needed)

**Railway**: $5/month after free credit
**Vercel**: $20/month for Pro (optional)

**Total**: $0-25/month

---

## Next Steps

1. ✅ Backend deployed to Railway
2. ✅ Frontend deployed to Vercel
3. ✅ CORS configured
4. ✅ Everything tested
5. ⏳ Set up custom domain (optional)
6. ⏳ Configure automated backups
7. ⏳ Set up monitoring alerts
8. ⏳ Add authentication (if needed)

---

## Support

### Railway
- Docs: https://docs.railway.app
- Discord: https://discord.gg/railway
- Status: https://status.railway.app

### Vercel
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support
- Status: https://vercel-status.com

---

## Quick Reference

### Your URLs (fill in after deployment)

```
Backend:  https://_________________.railway.app
Frontend: https://_________________.vercel.app
Health:   https://_________________.railway.app/api/health
```

### Important Commands

```bash
# Redeploy backend
cd backend && railway up

# Redeploy frontend
vercel --prod

# View backend logs
railway logs

# View frontend logs
vercel logs

# Update environment variable
railway variables set KEY=value
vercel env add KEY
```

---

**Ready to deploy?** Start with Step 1!
