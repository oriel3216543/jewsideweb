# JewSide Deployment Guide

Complete guide to deploy JewSide website to jewside.com

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account

### Setup Steps

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment Variables**
```bash
# Copy the example env file
cp env.example .env

# Edit .env with your settings
nano .env
```

3. **Start MongoDB** (if using local MongoDB)
```bash
mongod
```

4. **Seed the Database**
```bash
npm run seed
```

5. **Start the Server**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

6. **Access the Website**
- Open browser to: http://localhost:3000
- Admin login: username: `admin`, password: `jewside2025` (or your configured credentials)

---

## 🌐 Production Deployment Options

### Option 1: Traditional VPS/Server (Recommended for jewside.com)

#### Requirements
- Ubuntu 20.04+ server
- Domain name (jewside.com) pointed to server IP
- Root or sudo access

#### Step-by-Step Deployment

**1. Prepare the Server**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Nginx
sudo apt install -y nginx

# Install PM2 (Process Manager)
sudo npm install -g pm2
```

**2. Upload Your Code**
```bash
# On your local machine, create a production archive
tar -czf jewside.tar.gz --exclude=node_modules --exclude=.git .

# Upload to server (replace YOUR_SERVER_IP)
scp jewside.tar.gz user@YOUR_SERVER_IP:/var/www/

# On the server
cd /var/www
sudo mkdir -p jewside
sudo tar -xzf jewside.tar.gz -C jewside
cd jewside
```

**3. Configure Environment**
```bash
# Create .env file
sudo nano .env
```

Add your production settings:
```env
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb://localhost:27017/jewside
JWT_SECRET=YOUR_SECURE_RANDOM_STRING_HERE
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YOUR_SECURE_PASSWORD
ALLOWED_ORIGINS=https://jewside.com,https://www.jewside.com
SESSION_EXPIRY=24h
```

**4. Install Dependencies and Seed Database**
```bash
sudo npm install --production
sudo npm run seed
```

**5. Start Application with PM2**
```bash
sudo pm2 start server.js --name jewside
sudo pm2 startup
sudo pm2 save
```

**6. Configure Nginx**
```bash
# Copy nginx config
sudo cp nginx.conf /etc/nginx/sites-available/jewside

# Create symbolic link
sudo ln -s /etc/nginx/sites-available/jewside /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

**7. Setup SSL with Let's Encrypt**
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d jewside.com -d www.jewside.com

# Auto-renewal is set up automatically
```

**8. Configure Firewall**
```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

✅ **Your site is now live at https://jewside.com!**

---

### Option 2: Docker Deployment

**1. Install Docker**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo apt install -y docker-compose
```

**2. Configure Environment**
```bash
# Create .env file with production values
cp env.example .env
nano .env
```

**3. Build and Run**
```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Seed database
docker-compose exec app npm run seed
```

**4. Setup Nginx as Reverse Proxy** (same as Option 1, step 6-7)

---

### Option 3: Cloud Platforms

#### A. Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Deploy**
```bash
heroku login
heroku create jewside
heroku addons:create mongolab:sandbox
heroku config:set JWT_SECRET=your_secret
heroku config:set ADMIN_USERNAME=admin
heroku config:set ADMIN_PASSWORD=your_password
heroku config:set ALLOWED_ORIGINS=https://jewside.herokuapp.com
git push heroku main
heroku run npm run seed
```

3. **Add Custom Domain**
```bash
heroku domains:add jewside.com
heroku domains:add www.jewside.com
```

#### B. DigitalOcean App Platform

1. Connect your GitHub repository
2. Configure environment variables in the dashboard
3. Select Node.js buildpack
4. Add MongoDB database
5. Deploy

#### C. AWS (EC2 + MongoDB Atlas)

1. Launch EC2 instance (Ubuntu 20.04)
2. Follow "Option 1" steps above
3. Use MongoDB Atlas instead of local MongoDB
4. Configure security groups for ports 80, 443

---

## 🗄️ MongoDB Atlas Setup (Recommended for Production)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free tier

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to your server
   - Create cluster

3. **Configure Access**
   - Database Access: Create database user
   - Network Access: Add your server IP (or 0.0.0.0/0 for testing)

4. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Update .env file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jewside?retryWrites=true&w=majority
   ```

---

## 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Generate secure JWT_SECRET (use: `openssl rand -base64 32`)
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall
- [ ] Set up MongoDB authentication
- [ ] Restrict MongoDB network access
- [ ] Keep dependencies updated
- [ ] Set up automated backups
- [ ] Enable rate limiting (already configured)
- [ ] Monitor application logs

---

## 🔄 Updating the Application

```bash
# Pull latest changes
cd /var/www/jewside
git pull

# Install dependencies
npm install --production

# Restart application
pm2 restart jewside

# Clear Nginx cache (if needed)
sudo systemctl reload nginx
```

---

## 📊 Monitoring & Maintenance

### View Logs
```bash
# PM2 logs
pm2 logs jewside

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Monitor Performance
```bash
pm2 monit
```

### Database Backup
```bash
# Backup MongoDB
mongodump --db jewside --out /backup/$(date +%Y%m%d)

# Restore MongoDB
mongorestore --db jewside /backup/20250101/jewside
```

---

## 🌍 DNS Configuration for jewside.com

Point your domain to your server:

### A Records
```
Type    Name    Value           TTL
A       @       YOUR_SERVER_IP  3600
A       www     YOUR_SERVER_IP  3600
```

### For Cloudflare (Recommended)
1. Add site to Cloudflare
2. Update nameservers at your domain registrar
3. Enable SSL/TLS (Full mode)
4. Enable "Always Use HTTPS"
5. Configure caching rules

---

## 🆘 Troubleshooting

### Application won't start
```bash
# Check PM2 logs
pm2 logs jewside --lines 100

# Check if port is in use
sudo lsof -i :3000

# Restart application
pm2 restart jewside
```

### MongoDB connection issues
```bash
# Check MongoDB status
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

### Nginx issues
```bash
# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Check error logs
sudo tail -f /var/log/nginx/error.log
```

---

## 📞 Support

For issues or questions:
- Check logs first
- Review this documentation
- Contact system administrator

---

## 📝 Post-Deployment Checklist

- [ ] Website accessible at https://jewside.com
- [ ] SSL certificate installed and working
- [ ] Admin login working
- [ ] Can add/edit/delete prayers
- [ ] All prayers displaying correctly
- [ ] Mobile responsive design working
- [ ] Database backups configured
- [ ] Monitoring set up
- [ ] DNS properly configured
- [ ] Firewall rules applied

---

**🎉 Congratulations! Your JewSide website is now live!**

