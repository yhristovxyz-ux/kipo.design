# Deployment Guide - JSON Backend

## Overview

The kipo.design CMS now uses a JSON file backend for data persistence and image uploads. This guide covers deployment options.

---

## Quick Start (Local Development)

### 1. Start Backend
```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:3001`

### 2. Configure Frontend
```bash
# In root directory
cp .env.example .env
```

Edit `.env`:
```env
VITE_USE_API=true
VITE_API_URL=http://localhost:3001/api
```

### 3. Start Frontend
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## Production Deployment

### Option 1: Railway (Recommended - Easiest)

**Cost**: Free tier available, then $5/month

**Steps**:
1. Create account at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables:
   ```
   PORT=3001
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-frontend-url.com
   ```
6. Deploy
7. Copy the generated URL (e.g., `https://your-app.railway.app`)
8. Update frontend `.env`:
   ```env
   VITE_API_URL=https://your-app.railway.app/api
   ```

**Pros**:
- Automatic deployments from Git
- Free SSL
- Easy to use
- Persistent storage

**Cons**:
- Free tier has limits
- US-based servers only

---

### Option 2: Render

**Cost**: Free tier available, then $7/month

**Steps**:
1. Create account at [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: kipo-backend
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables:
   ```
   PORT=3001
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-frontend-url.com
   ```
6. Create Web Service
7. Wait for deployment
8. Copy the URL (e.g., `https://kipo-backend.onrender.com`)
9. Update frontend `.env`:
   ```env
   VITE_API_URL=https://kipo-backend.onrender.com/api
   ```

**Pros**:
- Free tier available
- Automatic SSL
- Good documentation
- Persistent disk storage

**Cons**:
- Free tier spins down after inactivity (slow first request)
- Limited free tier hours

---

### Option 3: Vercel

**Cost**: Free tier available

**Steps**:
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy backend:
   ```bash
   cd backend
   vercel
   ```

3. Follow prompts:
   - Link to existing project? No
   - Project name: kipo-backend
   - Directory: ./
   - Override settings? No

4. Set environment variables:
   ```bash
   vercel env add ALLOWED_ORIGINS
   # Enter your frontend URL
   ```

5. Deploy:
   ```bash
   vercel --prod
   ```

6. Copy the URL
7. Update frontend `.env`:
   ```env
   VITE_API_URL=https://kipo-backend.vercel.app/api
   ```

**Pros**:
- Free tier generous
- Fast deployments
- Good CLI
- Automatic SSL

**Cons**:
- Serverless (may need adjustments for file uploads)
- Cold starts

---

### Option 4: DigitalOcean App Platform

**Cost**: $5/month minimum

**Steps**:
1. Create account at [digitalocean.com](https://digitalocean.com)
2. Go to App Platform
3. Click "Create App"
4. Connect GitHub repository
5. Configure:
   - **Source Directory**: `backend`
   - **Build Command**: `npm install`
   - **Run Command**: `npm start`
   - **HTTP Port**: 3001
6. Add environment variables
7. Deploy
8. Copy the URL
9. Update frontend `.env`

**Pros**:
- Reliable
- Good performance
- Persistent storage
- Predictable pricing

**Cons**:
- No free tier
- More expensive

---

### Option 5: Self-Hosted (VPS)

**Cost**: $5-10/month (DigitalOcean, Linode, Vultr)

**Steps**:

1. **Create VPS** (Ubuntu 22.04 recommended)

2. **SSH into server**:
   ```bash
   ssh root@your-server-ip
   ```

3. **Install Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Install PM2** (process manager):
   ```bash
   npm install -g pm2
   ```

5. **Clone repository**:
   ```bash
   git clone https://github.com/your-username/kipo.design.git
   cd kipo.design/backend
   ```

6. **Install dependencies**:
   ```bash
   npm install
   ```

7. **Create .env**:
   ```bash
   nano .env
   ```
   Add:
   ```env
   PORT=3001
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-frontend-url.com
   ```

8. **Start with PM2**:
   ```bash
   pm2 start src/server.js --name kipo-backend
   pm2 save
   pm2 startup
   ```

9. **Setup Nginx** (reverse proxy):
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/kipo-backend
   ```
   
   Add:
   ```nginx
   server {
       listen 80;
       server_name api.your-domain.com;

       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable:
   ```bash
   sudo ln -s /etc/nginx/sites-available/kipo-backend /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

10. **Setup SSL** (Let's Encrypt):
    ```bash
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d api.your-domain.com
    ```

11. **Update frontend .env**:
    ```env
    VITE_API_URL=https://api.your-domain.com/api
    ```

**Pros**:
- Full control
- Best performance
- Cheapest long-term
- No vendor lock-in

**Cons**:
- Requires server management
- More setup time
- Need to handle security updates

---

## Frontend Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set environment variables**:
   ```bash
   vercel env add VITE_USE_API
   # Enter: true
   
   vercel env add VITE_API_URL
   # Enter: https://your-backend-url.com/api
   ```

4. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Netlify

1. Create account at [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Add environment variables:
   - `VITE_USE_API=true`
   - `VITE_API_URL=https://your-backend-url.com/api`
5. Deploy

---

## Post-Deployment Checklist

### Backend
- [ ] Backend is accessible at the deployed URL
- [ ] Health check works: `curl https://your-backend/api/health`
- [ ] CORS is configured with frontend URL
- [ ] Environment variables are set
- [ ] Data directory is writable
- [ ] Uploads directory is writable
- [ ] SSL certificate is valid

### Frontend
- [ ] Frontend is accessible
- [ ] API URL is configured correctly
- [ ] Can create/edit/delete projects
- [ ] Can upload images
- [ ] Images are served correctly
- [ ] Section editing works
- [ ] Changes persist after refresh

---

## Backup Strategy

### Automated Backup Script

Create `backend/backup.sh`:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backups/$DATE"

mkdir -p $BACKUP_DIR
cp -r data $BACKUP_DIR/
cp -r uploads $BACKUP_DIR/

echo "Backup created: $BACKUP_DIR"
```

Make executable:
```bash
chmod +x backup.sh
```

### Cron Job (Daily Backup)
```bash
crontab -e
```

Add:
```
0 2 * * * cd /path/to/backend && ./backup.sh
```

### Cloud Backup

**Option 1: AWS S3**
```bash
npm install aws-sdk
```

**Option 2: Backblaze B2**
```bash
npm install backblaze-b2
```

**Option 3: Git**
```bash
# Add to .gitignore exceptions
!data/*.json
!uploads/*.jpg
!uploads/*.png

# Commit and push regularly
git add data uploads
git commit -m "Backup data"
git push
```

---

## Monitoring

### Health Check Endpoint

Test regularly:
```bash
curl https://your-backend/api/health
```

### Uptime Monitoring

Use services like:
- [UptimeRobot](https://uptimerobot.com) (Free)
- [Pingdom](https://pingdom.com)
- [StatusCake](https://statuscake.com)

### Error Logging

Add to `server.js`:
```javascript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

---

## Troubleshooting

### CORS Errors
- Check `ALLOWED_ORIGINS` includes your frontend URL
- Ensure no trailing slashes
- Check browser console for exact error

### Upload Fails
- Check `uploads/` directory exists
- Verify write permissions
- Check file size limits
- Verify MIME type restrictions

### Data Not Persisting
- Check `data/` directory exists
- Verify write permissions
- Check disk space
- Review server logs

### 502 Bad Gateway
- Backend not running
- Wrong port configuration
- Firewall blocking port

### Slow Performance
- Enable gzip compression
- Add caching headers
- Use CDN for images
- Optimize image sizes

---

## Security Recommendations

### Production Checklist
- [ ] Use HTTPS only
- [ ] Set secure CORS origins
- [ ] Add rate limiting
- [ ] Implement authentication
- [ ] Validate all inputs
- [ ] Sanitize file uploads
- [ ] Use environment variables for secrets
- [ ] Enable security headers
- [ ] Regular security updates
- [ ] Monitor for suspicious activity

### Add Rate Limiting

```bash
npm install express-rate-limit
```

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## Cost Comparison

| Service | Free Tier | Paid Tier | Best For |
|---------|-----------|-----------|----------|
| Railway | 500 hours/month | $5/month | Easy deployment |
| Render | 750 hours/month | $7/month | Persistent storage |
| Vercel | Generous | $20/month | Serverless |
| DigitalOcean | None | $5/month | Reliability |
| VPS | None | $5-10/month | Full control |

---

## Support

For issues:
1. Check backend logs
2. Test API endpoints directly
3. Verify environment variables
4. Check CORS configuration
5. Review deployment logs

---

**Recommendation**: Start with **Railway** for easiest deployment, then migrate to VPS if you need more control or lower costs.
