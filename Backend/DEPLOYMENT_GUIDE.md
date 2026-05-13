# Deployment Guide - Production Setup

Complete guide to deploy your Travel Service Backend to production.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] JWT_SECRET changed to strong random value
- [ ] MONGODB_URI pointing to production database
- [ ] NODE_ENV set to "production"
- [ ] FRONTEND_URL updated to production frontend
- [ ] All dependencies installed
- [ ] Code tested locally
- [ ] Error logs configured
- [ ] HTTPS certificates ready (if needed)
- [ ] Database backups setup

---

## Option 1: Deploy to Heroku (Easiest - Free Tier Available)

### Prerequisites
- Heroku account: https://www.heroku.com
- Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

### Step 1: Create Procfile
In Backend folder, create `Procfile`:
```
web: npm start
```

### Step 2: Build TypeScript
```bash
npm run build
```

### Step 3: Create .npmrc (for production)
```
production=true
```

### Step 4: Create Heroku App
```bash
heroku login
heroku create your-app-name
```

### Step 5: Set Environment Variables
```bash
heroku config:set PORT=5000
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/travel-service
heroku config:set JWT_SECRET=your-super-secret-key-here-change-this
heroku config:set JWT_EXPIRE=7d
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-frontend-url.com
```

### Step 6: Deploy
```bash
# Initialize git (if not already)
git init

# Add Heroku remote
heroku git:remote -a your-app-name

# Deploy
git add .
git commit -m "Deploy backend"
git push heroku main
```

### Step 7: Check Logs
```bash
heroku logs --tail
```

### Backend URL
```
https://your-app-name.herokuapp.com/api
```

---

## Option 2: Deploy to Railway (Modern Alternative)

### Step 1: Create Account
Visit: https://railway.app

### Step 2: Connect Repository
1. Click "New Project"
2. Connect GitHub repository
3. Select Backend folder

### Step 3: Configure Environment
1. In Project Settings, add environment variables
2. Add all from .env:
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV=production
   - FRONTEND_URL
   - PORT (Railway assigns automatically)

### Step 4: Deploy
1. Railway auto-deploys on GitHub push
2. Or manually trigger deployment

### Backend URL
```
https://your-project-railway.app/api
```

---

## Option 3: Deploy to AWS EC2

### Step 1: Launch EC2 Instance
1. Go to AWS Console
2. Launch Ubuntu 20.04 LTS instance
3. Configure security groups:
   - Port 22 (SSH)
   - Port 80 (HTTP)
   - Port 443 (HTTPS)
   - Port 5000 (Backend, internal only)

### Step 2: Connect to Instance
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

### Step 3: Install Dependencies
```bash
# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Install Node.js
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB (or use Atlas)
sudo apt-get install -y mongodb

# Install PM2 (process manager)
sudo npm install -g pm2
```

### Step 4: Upload Code
```bash
scp -i your-key.pem -r Backend ubuntu@your-instance-ip:/home/ubuntu/
```

### Step 5: Setup Production
```bash
cd Backend
npm install
npm run build

# Create .env
nano .env
# Add production variables
```

### Step 6: Start with PM2
```bash
pm2 start dist/server.js --name "travel-backend"
pm2 save
pm2 startup
```

### Step 7: Setup Nginx Reverse Proxy
```bash
sudo apt-get install -y nginx

# Create config
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 8: Setup SSL with Let's Encrypt
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Step 9: Start Nginx
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## Option 4: Deploy to DigitalOcean (Affordable)

### Step 1: Create Droplet
1. Visit https://www.digitalocean.com
2. Create Ubuntu 20.04 Droplet
3. Choose plan (minimum $6/month)

### Step 2: Initial Setup
```bash
ssh root@your-droplet-ip

# Create non-root user
adduser deploy
usermod -aG sudo deploy
su - deploy
```

### Step 3: Install Dependencies (same as AWS)
```bash
# Follow AWS EC2 steps 3-9
```

### Step 4: Configure Firewall
```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

---

## Option 5: Deploy to PythonAnywhere (Simple)

Not ideal for Node.js but possible with Passenger.

---

## Production Environment Variables

Create `.env.production`:
```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://prod_user:secure_pass@prod-cluster.mongodb.net/travel-service

# JWT
JWT_SECRET=your-long-random-secret-key-use-crypto-generator
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=https://travelbooking.com

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=noreply@travelbooking.com
EMAIL_PASS=your-app-specific-password
```

---

## Security in Production

### 1. Generate Strong JWT Secret
```bash
# Linux/Mac
openssl rand -hex 32

# Windows (PowerShell)
[Convert]::ToHexString((Get-Random -InputObject (1..256) -Count 32))
```

### 2. Database Security
- Use MongoDB Atlas (managed security)
- Or secure MongoDB with authentication
- Use strong passwords
- Enable IP whitelisting
- Have automated backups

### 3. HTTPS/SSL
- Use Let's Encrypt (free)
- Update FRONTEND_URL to use https://

### 4. Environment Variables
- Never commit .env to git
- Use platform's secrets management
- Rotate secrets regularly

### 5. CORS Configuration
- Set specific FRONTEND_URL (not *)
- Use https:// in production

### 6. Rate Limiting (Optional)
Add to production:
```bash
npm install express-rate-limit
```

### 7. Logging
Use production logging service:
- Heroku Logs (built-in)
- CloudWatch (AWS)
- Datadog
- New Relic

---

## Post-Deployment

### 1. Test API
```bash
curl https://api.yourdomain.com/api/health
```

### 2. Update Frontend
Point frontend to production API:
```env
VITE_API_URL=https://api.yourdomain.com/api
```

### 3. Monitor Performance
- Check response times
- Monitor error rates
- Track database connections

### 4. Setup Backups
- Automated MongoDB backups
- Daily exports
- Off-site storage

### 5. Monitoring & Alerts
- Setup uptime monitoring
- Email alerts for errors
- Performance monitoring

---

## Scaling (When Popular)

### Horizontal Scaling
- Load balancer (Nginx, HAProxy)
- Multiple backend instances
- Sticky sessions for JWT

### Database Scaling
- MongoDB sharding
- Read replicas
- Connection pooling

### Caching
- Redis for session storage
- Cache popular services/offers

---

## Troubleshooting

### Backend won't start
```bash
# Check logs
npm run dev

# Check port availability
lsof -i :5000
```

### Database connection fails
- Verify MONGODB_URI
- Check IP whitelist
- Verify credentials

### CORS errors
- Update FRONTEND_URL in production .env
- Ensure frontend uses correct API URL

### 502 Bad Gateway (Nginx)
- Check if backend is running
- Check PM2 status: `pm2 status`
- Check Nginx config: `nginx -t`

---

## Deployment Commands Quick Reference

### Heroku
```bash
npm run build
heroku config:set JWT_SECRET=your-secret-key
git push heroku main
```

### Railway
```bash
npm run build
git push
# Auto-deploy configured
```

### AWS/DigitalOcean/Self-hosted
```bash
npm install
npm run build
pm2 start dist/server.js
```

---

## Domain Configuration

### Point domain to backend
1. Get IP/URL from hosting provider
2. Update DNS records:
   - Type: A
   - Name: api
   - Value: your-ip-address

Example: `api.yourdomain.com` → 123.45.67.89

---

## Cost Comparison

| Platform | Monthly Cost | Best For |
|----------|------------|----------|
| Heroku | Free ($0-7) | Learning, small apps |
| Railway | Free ($10+) | Production-ready |
| AWS | $5-50+ | Large scale |
| DigitalOcean | $6-50+ | Simple deployments |
| Vercel/Netlify | Paid | Mostly frontend |

---

## Getting Help

- **Heroku**: https://devcenter.heroku.com
- **Railway**: https://docs.railway.app
- **AWS**: https://aws.amazon.com/documentation
- **DigitalOcean**: https://www.digitalocean.com/docs
- **Nginx**: https://nginx.org/en/docs

---

## Maintenance

### Regular Tasks
- [ ] Monitor logs
- [ ] Check database size
- [ ] Verify backups
- [ ] Update dependencies
- [ ] Security patches
- [ ] Performance optimization

### Monthly
- [ ] Review error logs
- [ ] Update security dependencies
- [ ] Backup cleanup
- [ ] Performance analysis

### Quarterly
- [ ] Major version updates
- [ ] Security audit
- [ ] Cost optimization
- [ ] Capacity planning

---

**Your backend is now production-ready! 🚀**

Choose a deployment option and go live!
