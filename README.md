# JewSide - Jewish Prayer Website

A beautiful, modern website for displaying and managing Jewish prayers with a secure admin dashboard. Built with Node.js, Express, MongoDB, and vanilla JavaScript.

![JewSide Logo](LOGO.png)

## ✨ Features

- 🎨 **Beautiful Design** - Inspired by the logo's blue color palette
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 🔐 **Secure Admin Dashboard** - JWT-based authentication
- ✏️ **Full CRUD Operations** - Create, Read, Update, and Delete prayers
- 💾 **MongoDB Database** - Persistent data storage
- 🌐 **Multi-language Support** - Hebrew text with transliteration and English translation
- 🚀 **Production Ready** - Complete deployment configuration
- 🔒 **Security Features** - Helmet, CORS, rate limiting, and more

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Clone or download this repository**
```bash
cd jewsideweb
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp env.example .env
```

Edit `.env` with your settings:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/jewside
JWT_SECRET=your_secure_random_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=jewside2025
ALLOWED_ORIGINS=http://localhost:3000
SESSION_EXPIRY=24h
```

4. **Start MongoDB** (if using local MongoDB)
```bash
mongod
```

5. **Seed the database with initial prayers**
```bash
npm run seed
```

6. **Start the server**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

7. **Open your browser**
```
http://localhost:3000
```

8. **Admin Login**
- Scroll to the footer at the bottom of the page
- Email: `admin@jewside.com`
- Password: `OriAdmin` (or your configured password)

## 📁 Project Structure

```
jewsideweb/
├── config/
│   └── database.js          # MongoDB connection
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── Admin.js             # Admin user model
│   └── Prayer.js            # Prayer model
├── routes/
│   ├── auth.js              # Authentication routes
│   └── prayers.js           # Prayer CRUD routes
├── public/
│   ├── index.html           # Main HTML file
│   ├── styles.css           # Styling
│   ├── app.js               # Frontend JavaScript
│   └── LOGO.png             # Logo image
├── server.js                # Express server
├── seed.js                  # Database seeding script
├── package.json             # Dependencies
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose setup
├── nginx.conf               # Nginx configuration
├── DEPLOYMENT.md            # Detailed deployment guide
└── README.md                # This file
```

## 🔌 API Endpoints

### Public Endpoints
- `GET /api/prayers` - Get all prayers
- `GET /api/prayers/:id` - Get single prayer
- `GET /api/health` - Health check

### Admin Endpoints (Requires Authentication)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/change-password` - Change password
- `POST /api/prayers` - Create new prayer
- `PUT /api/prayers/:id` - Update prayer
- `DELETE /api/prayers/:id` - Delete prayer

## 🎨 Color Scheme

Colors extracted from the JewSide logo:
- **Primary Blue:** #4A90E2
- **Light Blue:** #A8D5F7
- **Sky Blue:** #E3F2FD
- **Deep Blue:** #2E5F8F

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Helmet.js for HTTP headers
- CORS protection
- Rate limiting
- Input validation
- MongoDB injection prevention

## 📦 Deployment

### Option 1: Traditional Server (VPS)
See [DEPLOYMENT.md](DEPLOYMENT.md) for complete step-by-step instructions.

Quick summary:
1. Set up Ubuntu server
2. Install Node.js, MongoDB, Nginx
3. Upload code and configure
4. Start with PM2
5. Configure Nginx as reverse proxy
6. Set up SSL with Let's Encrypt

### Option 2: Docker
```bash
# Build and run
docker-compose up -d

# Seed database
docker-compose exec app npm run seed
```

### Option 3: Cloud Platforms
- **Heroku**: `git push heroku main`
- **DigitalOcean App Platform**: Connect GitHub repo
- **AWS EC2**: Follow VPS instructions
- **Vercel**: Use `vercel.json` configuration

## 🌍 Domain Setup for jewside.com

1. **Point DNS to your server:**
   - A Record: `@` → Your Server IP
   - A Record: `www` → Your Server IP

2. **Update environment variables:**
   ```env
   ALLOWED_ORIGINS=https://jewside.com,https://www.jewside.com
   ```

3. **Configure SSL:**
   ```bash
   sudo certbot --nginx -d jewside.com -d www.jewside.com
   ```

## 🛠️ Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm run seed` - Seed database with initial data

### Adding New Prayers
1. Log in as admin
2. Click "Add New Prayer"
3. Fill in the form:
   - Title
   - Category (Morning, Evening, Shabbat, Holidays, Blessings)
   - Hebrew text
   - Transliteration (optional)
   - English translation
4. Click "Save Prayer"

## 🔧 Configuration

### Change Admin Credentials
Edit `.env`:
```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
```

Then re-run the seed script or change via API.

### Add More Categories
Edit `models/Prayer.js`:
```javascript
category: {
    type: String,
    enum: ['Morning', 'Evening', 'Shabbat', 'Holidays', 'Blessings', 'YourNewCategory']
}
```

Update the dropdown in `public/index.html`.

## 📊 Monitoring

### View Logs (PM2)
```bash
pm2 logs jewside
```

### Monitor Performance
```bash
pm2 monit
```

### Database Backup
```bash
mongodump --db jewside --out /backup/$(date +%Y%m%d)
```

## 🐛 Troubleshooting

### Can't connect to MongoDB
```bash
# Check MongoDB status
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod
```

### Application won't start
```bash
# Check logs
pm2 logs jewside

# Restart application
pm2 restart jewside
```

### Port already in use
```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill the process
kill -9 <PID>
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

This is a private project for jewside.com. For changes or improvements, contact the administrator.

## 📄 License

© 2025 JewSide. All rights reserved.

## 📞 Support

For technical support or questions:
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment issues
- Review application logs
- Contact system administrator

---

## 🎉 Ready to Deploy!

Your JewSide website is fully configured and ready to deploy to jewside.com!

**Next Steps:**
1. Review [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions
2. Set up your production server or cloud platform
3. Configure your domain DNS
4. Deploy and enjoy!

**May your prayers be answered! 🙏**
