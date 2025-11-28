# Deploy to Render (Alternative to Railway)

Render offers a simpler deployment with a free tier. This guide uses Render's Blueprint feature for one-click deployment.

---

## Option 1: One-Click Deploy (Easiest)

### Step 1: Click Deploy Button

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/yhristovxyz-ux/kipo.design)

### Step 2: Configure

1. **Sign up/Login** to Render with GitHub
2. **Blueprint will auto-detect** `render.yaml`
3. **Set environment variables**:
   - `ALLOWED_ORIGINS`: Will be set after frontend deploys
   - `VITE_API_URL`: Will be set after backend deploys
4. **Click "Apply"**
5. Wait for both services to deploy (~5 minutes)

### Step 3: Update Environment Variables

After deployment:

1. **Get Backend URL**:
   - Go to `kipo-backend` service
   - Copy the URL (e.g., `https://kipo-backend.onrender.com`)

2. **Update Frontend**:
   - Go to `kipo-frontend` service
   - Environment → Add variable:
     - `VITE_API_URL` = `https://kipo-backend.onrender.com/api`
   - Redeploy

3. **Update Backend**:
   - Go to `kipo-backend` service
   - Environment → Add variable:
     - `ALLOWED_ORIGINS` = `https://kipo-frontend.onrender.com`
   - Redeploy

### Step 4: Test

Visit your frontend URL and test all features!

---

## Option 2: Manual Deploy

### Deploy Backend

1. **Go to [render.com](https://render.com)**
2. **Click "New +" → "Web Service"**
3. **Connect GitHub repository**
4. **Configure**:
   - **Name**: `kipo-backend`
   - **Region**: Frankfurt (or closest to you)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=3001
   ALLOWED_ORIGINS=https://your-frontend.onrender.com
   ```

6. **Advanced**:
   - Health Check Path: `/api/health`

7. **Create Web Service**

8. **Wait for deployment** (~3-5 minutes)

9. **Copy URL** (e.g., `https://kipo-backend.onrender.com`)

### Deploy Frontend

1. **Click "New +" → "Static Site"**
2. **Connect same repository**
3. **Configure**:
   - **Name**: `kipo-frontend`
   - **Branch**: `main`
   - **Root Directory**: `./` (leave empty)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Environment Variables**:
   ```
   VITE_USE_API=true
   VITE_API_URL=https://kipo-backend.onrender.com/api
   ```

5. **Create Static Site**

6. **Wait for deployment** (~2-3 minutes)

7. **Copy URL** (e.g., `https://kipo-frontend.onrender.com`)

### Update Backend CORS

1. Go back to backend service
2. Environment → Edit `ALLOWED_ORIGINS`
3. Set to your frontend URL
4. Save (will auto-redeploy)

---

## Render Features

### Pros
- ✅ Free tier available (750 hours/month)
- ✅ Automatic SSL
- ✅ Auto-deploy from Git
- ✅ Persistent disk storage
- ✅ Easy to use dashboard
- ✅ Health checks included
- ✅ European servers available

### Cons
- ⚠️ Free tier spins down after 15 min inactivity
- ⚠️ First request after spin-down is slow (~30 seconds)
- ⚠️ Limited to 750 hours/month on free tier

### Free Tier Limits
- **Web Services**: 750 hours/month
- **Static Sites**: Unlimited
- **Bandwidth**: 100 GB/month
- **Build Minutes**: 500/month
- **Disk**: 1 GB persistent storage

---

## Keeping Free Tier Active

### Option 1: Cron Job (External)

Use a service like [cron-job.org](https://cron-job.org):

1. Create free account
2. Add new cron job
3. URL: `https://kipo-backend.onrender.com/api/health`
4. Schedule: Every 10 minutes
5. This keeps your backend awake

### Option 2: UptimeRobot

1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Add new monitor
3. URL: `https://kipo-backend.onrender.com/api/health`
4. Interval: 5 minutes
5. Free tier: 50 monitors

### Option 3: GitHub Actions

Add to `.github/workflows/keep-alive.yml`:

```yaml
name: Keep Render Alive

on:
  schedule:
    - cron: '*/10 * * * *'  # Every 10 minutes
  workflow_dispatch:

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping backend
        run: curl https://kipo-backend.onrender.com/api/health
```

---

## Monitoring

### Render Dashboard

1. **Metrics**: CPU, Memory, Bandwidth
2. **Logs**: Real-time logs with search
3. **Events**: Deployment history
4. **Health Checks**: Automatic monitoring

### Email Alerts

Render automatically sends alerts for:
- Deployment failures
- Service crashes
- Health check failures

---

## Upgrading to Paid

If you need 24/7 uptime:

**Starter Plan**: $7/month per service
- No spin-down
- Faster builds
- More resources

**Total**: $7/month (backend only, frontend is free)

---

## Custom Domain

### Frontend

1. Go to frontend service
2. Settings → Custom Domain
3. Add domain (e.g., `kipo.design`)
4. Add DNS records:
   ```
   CNAME www.kipo.design → kipo-frontend.onrender.com
   A     kipo.design     → 216.24.57.1
   ```
5. Wait for DNS propagation

### Backend

1. Go to backend service
2. Settings → Custom Domain
3. Add domain (e.g., `api.kipo.design`)
4. Add DNS record:
   ```
   CNAME api.kipo.design → kipo-backend.onrender.com
   ```
5. Update frontend `VITE_API_URL`

---

## Troubleshooting

### Service Won't Start

Check logs:
1. Go to service
2. Logs tab
3. Look for errors

Common issues:
- Missing environment variables
- Wrong build/start commands
- Port conflicts

### Slow First Request

This is normal on free tier:
- Service spins down after 15 min
- First request wakes it up (~30 sec)
- Use keep-alive solution above

### Disk Space Issues

Free tier has 1GB:
- Monitor uploads folder
- Implement image compression
- Clean old files regularly

---

## Backup

### Download Data

Render doesn't provide direct SSH access, but you can:

1. **Add backup endpoint** to your backend:

```javascript
// backend/src/server.js
app.get('/api/backup', async (req, res) => {
  const sections = await readJSON('sections.json');
  const projects = await readJSON('projects.json');
  
  res.json({
    sections,
    projects,
    timestamp: new Date().toISOString()
  });
});
```

2. **Download via API**:
```bash
curl https://kipo-backend.onrender.com/api/backup > backup.json
```

3. **Automate with GitHub Actions**:

```yaml
name: Backup Data

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Download backup
        run: |
          curl https://kipo-backend.onrender.com/api/backup > backup-$(date +%Y%m%d).json
      - name: Commit backup
        run: |
          git config user.name "Backup Bot"
          git config user.email "bot@example.com"
          git add backup-*.json
          git commit -m "Automated backup"
          git push
```

---

## Comparison: Render vs Railway

| Feature | Render | Railway |
|---------|--------|---------|
| Free Tier | 750 hrs/month | $5 credit/month |
| Spin Down | Yes (15 min) | No |
| Setup | Easier | Easy |
| Dashboard | Better | Good |
| Logs | Excellent | Good |
| Europe Servers | Yes | No |
| Paid Plan | $7/month | $5/month |

**Recommendation**: 
- **Render** for free tier with keep-alive
- **Railway** for always-on without hassle

---

## Quick Commands

```bash
# View logs
render logs kipo-backend

# Redeploy
render deploy kipo-backend

# Shell access (paid plans only)
render shell kipo-backend
```

---

## Support

- **Docs**: https://render.com/docs
- **Community**: https://community.render.com
- **Status**: https://status.render.com
- **Support**: support@render.com

---

**Ready?** Click the deploy button at the top or follow the manual steps!
