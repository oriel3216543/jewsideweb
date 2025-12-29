# 🚀 JewSide Deployment Checklist for jewside.com

## Pre-Deployment Checklist

### 1. Environment Setup ✓
- [ ] Node.js 18+ installed on server
- [ ] MongoDB installed or MongoDB Atlas account created
- [ ] Domain jewside.com purchased and accessible
- [ ] Server/hosting provider set up (VPS, cloud, etc.)
- [ ] SSH access to server configured

### 2. Security Configuration ✓
- [ ] Generate secure JWT_SECRET: `openssl rand -base64 32`
- [ ] Change default admin password
- [ ] Update `.env` with production values
- [ ] Configure CORS with actual domain
- [ ] Set up firewall rules (ports 22, 80, 443)
- [ ] MongoDB authentication enabled

### 3. DNS Configuration ✓
- [ ] A Record: `@` → Server IP address
- [ ] A Record: `www` → Server IP address
- [ ] DNS propagation complete (check with `dig jewside.com`)
- [ ] Optional: Cloudflare configured for CDN/security

### 4. Code Preparation ✓
- [ ] All files uploaded to server
- [ ] Dependencies installed: `npm install --production`
- [ ] Environment variables configured
- [ ] Database seeded: `npm run seed`

### 5. Server Configuration ✓
- [ ] PM2 installed: `npm install -g pm2`
- [ ] Application started: `pm2 start server.js --name jewside`
- [ ] PM2 startup configured: `pm2 startup && pm2 save`
- [ ] Nginx installed and configured
- [ ] Nginx configuration tested: `nginx -t`
- [ ] Nginx restarted: `systemctl restart nginx`

### 6. SSL/HTTPS Setup ✓
- [ ] Certbot installed
- [ ] SSL certificate obtained: `certbot --nginx -d jewside.com -d www.jewside.com`
- [ ] Auto-renewal configured
- [ ] HTTPS redirect working
- [ ] Test SSL: https://www.ssllabs.com/ssltest/

### 7. Testing ✓
- [ ] Website accessible at https://jewside.com
- [ ] Website accessible at https://www.jewside.com
- [ ] All prayers loading correctly
- [ ] Admin login working
- [ ] Can create new prayer
- [ ] Can edit existing prayer
- [ ] Can delete prayer
- [ ] Mobile responsive design working
- [ ] All images loading
- [ ] No console errors in browser

### 8. Performance & Monitoring ✓
- [ ] Gzip compression enabled
- [ ] Static asset caching configured
- [ ] PM2 monitoring active: `pm2 monit`
- [ ] Application logs accessible: `pm2 logs jewside`
- [ ] Nginx logs accessible
- [ ] Database backup script created
- [ ] Automated backup scheduled

### 9. Post-Deployment ✓
- [ ] Change admin password via dashboard
- [ ] Add all required prayers
- [ ] Test from multiple devices
- [ ] Test from multiple browsers
- [ ] Share with team for review
- [ ] Document any custom configurations

---

## Quick Command Reference

### Server Management
```bash
# Start application
pm2 start server.js --name jewside

# Stop application
pm2 stop jewside

# Restart application
pm2 restart jewside

# View logs
pm2 logs jewside

# Monitor
pm2 monit
```

### Nginx
```bash
# Test configuration
sudo nginx -t

# Restart
sudo systemctl restart nginx

# View logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### MongoDB
```bash
# Status
sudo systemctl status mongod

# Restart
sudo systemctl restart mongod

# Backup
mongodump --db jewside --out /backup/$(date +%Y%m%d)

# Restore
mongorestore --db jewside /backup/20250101/jewside
```

### Updates
```bash
# Pull latest code
cd /var/www/jewside
git pull

# Install dependencies
npm install --production

# Restart
pm2 restart jewside
```

---

## Environment Variables Template

Create `.env` file with these values:

```env
# Server
PORT=3000
NODE_ENV=production

# Database (Choose one)
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/jewside

# Option 2: MongoDB Atlas (Recommended)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jewside?retryWrites=true&w=majority

# Security (CHANGE THESE!)
JWT_SECRET=PASTE_YOUR_GENERATED_SECRET_HERE
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YOUR_SECURE_PASSWORD_HERE

# Domain
ALLOWED_ORIGINS=https://jewside.com,https://www.jewside.com

# Session
SESSION_EXPIRY=24h
```

---

## Troubleshooting Common Issues

### Issue: Can't access website
- Check if application is running: `pm2 status`
- Check if Nginx is running: `systemctl status nginx`
- Check firewall: `sudo ufw status`
- Check DNS: `dig jewside.com`

### Issue: Admin login not working
- Verify credentials in `.env`
- Check if database is seeded: `mongo jewside --eval "db.admins.find()"`
- Check application logs: `pm2 logs jewside`

### Issue: Prayers not loading
- Check MongoDB connection: `systemctl status mongod`
- Check database has data: `mongo jewside --eval "db.prayers.count()"`
- Check API endpoint: `curl http://localhost:3000/api/prayers`

### Issue: SSL certificate error
- Verify domain points to server: `dig jewside.com`
- Re-run certbot: `sudo certbot --nginx -d jewside.com -d www.jewside.com`
- Check certificate expiry: `sudo certbot certificates`

---

## Support Contacts

- **Server Issues**: Contact hosting provider
- **Domain Issues**: Contact domain registrar
- **Application Issues**: Check logs and documentation
- **MongoDB Atlas**: https://support.mongodb.com

---

## Success Criteria

Your deployment is successful when:
- ✅ https://jewside.com loads without errors
- ✅ All prayers display correctly
- ✅ Admin can log in and manage prayers
- ✅ Site is responsive on mobile
- ✅ SSL certificate is valid
- ✅ No console errors
- ✅ Application stays running after server restart

---

**🎉 Once all items are checked, your JewSide website is live!**

