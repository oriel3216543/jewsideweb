# ⚡ Quick Start Guide - JewSide Website

Get your JewSide website running in 5 minutes!

## 🎯 For Local Testing

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Environment File
```bash
cp env.example .env
```

The default `.env` values work for local testing!

### Step 3: Start MongoDB
```bash
# Mac (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

### Step 4: Seed Database
```bash
npm run seed
```

### Step 5: Start Server
```bash
npm run dev
```

### Step 6: Open Browser
```
http://localhost:3000
```

**Admin Login:**
- Email: `admin@jewside.com`
- Password: `OriAdmin`
- Location: Footer at bottom of page

---

## 🌐 For Production Deployment to jewside.com

### Option A: One-Command Docker Setup (Easiest)

```bash
# 1. Create .env file
cp env.example .env
nano .env  # Edit with your values

# 2. Start everything
docker-compose up -d

# 3. Seed database
docker-compose exec app npm run seed
```

Done! Your site is running on port 3000.

### Option B: Traditional Server (Most Control)

**On your server:**

```bash
# 1. Install requirements
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs mongodb nginx
sudo npm install -g pm2

# 2. Upload and setup
cd /var/www/jewside
npm install --production
cp env.example .env
nano .env  # Edit with production values

# 3. Start services
sudo systemctl start mongod
npm run seed
pm2 start server.js --name jewside
pm2 startup
pm2 save

# 4. Configure Nginx
sudo cp nginx.conf /etc/nginx/sites-available/jewside
sudo ln -s /etc/nginx/sites-available/jewside /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# 5. Setup SSL
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d jewside.com -d www.jewside.com
```

Done! Visit https://jewside.com

### Option C: MongoDB Atlas + Any Host (Recommended)

**Best for: Heroku, DigitalOcean, AWS, etc.**

1. **Create MongoDB Atlas cluster** (free tier available)
   - Go to https://www.mongodb.com/cloud/atlas
   - Create cluster
   - Get connection string

2. **Update .env**
   ```env
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/jewside
   ```

3. **Deploy to your platform**
   - Heroku: `git push heroku main`
   - DigitalOcean: Connect GitHub repo
   - AWS: Follow Option B above

4. **Seed database**
   ```bash
   npm run seed
   ```

---

## 🔑 Important: Change These Before Going Live!

Edit `.env`:
```env
JWT_SECRET=run_this_command_openssl_rand_base64_32
ADMIN_PASSWORD=your_secure_password_here
ALLOWED_ORIGINS=https://jewside.com,https://www.jewside.com
```

---

## 📋 Verification Checklist

After deployment, verify:
- [ ] Website loads at your domain
- [ ] Can see prayers on homepage
- [ ] Can log in as admin
- [ ] Can add a test prayer
- [ ] Can edit a prayer
- [ ] Can delete a prayer
- [ ] Works on mobile phone

---

## 🆘 Having Issues?

### Application won't start
```bash
# Check what's wrong
pm2 logs jewside
```

### Can't connect to MongoDB
```bash
# Make sure it's running
sudo systemctl status mongod

# Restart it
sudo systemctl restart mongod
```

### Port already in use
```bash
# Change port in .env
PORT=3001
```

### Need more help?
See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

---

## 🎉 You're All Set!

Your JewSide website is ready to share Jewish prayers with the world!

**Next Steps:**
1. Add your prayers via admin dashboard
2. Customize colors in `public/styles.css` if needed
3. Share with your community

**May your prayers be answered! 🙏**

