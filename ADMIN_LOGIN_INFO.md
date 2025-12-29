# 🔐 Admin Login Information

## Location
The admin login is now located at the **bottom of the page in the footer**.

Scroll down to the footer section to find the "Admin Access" login form.

---

## Default Credentials

**Email:** `admin@jewside.com`  
**Password:** `OriAdmin`

---

## How to Login

1. Open the website (http://localhost:3000 or https://jewside.com)
2. Scroll to the bottom of the page
3. Find the "Admin Access" section in the footer
4. Enter your credentials:
   - Email: `admin@jewside.com`
   - Password: `OriAdmin`
5. Click "Login"
6. The admin dashboard will open automatically

---

## Features

### Footer Login Benefits
✅ Always accessible - no need to click a button
✅ Discreet - doesn't clutter the main navigation
✅ Professional - standard placement for admin access
✅ Convenient - visible on every page scroll

### After Login
Once logged in, the footer will show:
- "Open Dashboard" button - Access the prayer management dashboard
- "Logout" button - Sign out of admin account

---

## Admin Dashboard Features

Once logged in, you can:
- ✏️ **Add New Prayers** - Create prayers with Hebrew, transliteration, and English
- 📝 **Edit Prayers** - Modify existing prayers
- 🗑️ **Delete Prayers** - Remove prayers from the website
- 📂 **Organize by Category** - Morning, Evening, Shabbat, Holidays, Blessings

---

## Security Notes

⚠️ **IMPORTANT FOR PRODUCTION:**

1. **Change the default password** before deploying to jewside.com
2. **Use a strong password** (at least 12 characters)
3. **Keep credentials secure** - don't share them publicly
4. **Use HTTPS** - Always access admin panel over secure connection

### How to Change Admin Credentials

**Option 1: Before First Deployment**
Edit `.env` file:
```env
ADMIN_USERNAME=your_email@jewside.com
ADMIN_PASSWORD=YourSecurePassword123!
```

Then run:
```bash
npm run seed
```

**Option 2: After Deployment**
Use the "Change Password" feature in the admin dashboard (coming soon) or update directly in the database.

---

## Troubleshooting

### Can't find the login?
- Scroll all the way to the bottom of the page
- Look for the dark blue footer section
- The "Admin Access" box should be on the right side

### Login not working?
- Make sure you're using the correct email: `admin@jewside.com`
- Password is case-sensitive: `OriAdmin`
- Check browser console for errors (F12)
- Verify the backend server is running

### Dashboard not opening?
- Check if you're logged in (footer should show "Open Dashboard" button)
- Try refreshing the page
- Clear browser cache and try again

---

## Visual Guide

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  [Website Header with Logo and Navigation]             │
│                                                         │
│  [Hero Section - Welcome to JewSide]                   │
│                                                         │
│  [Prayers Section - Prayer Cards]                      │
│                                                         │
│  [About Section]                                        │
│                                                         │
│  ┌────────────────────────────────────────────────┐    │
│  │ FOOTER (Dark Blue Background)                  │    │
│  │                                                │    │
│  │  © 2025 JewSide     │  Admin Access          │    │
│  │  All rights reserved│  ┌──────────────────┐  │    │
│  │                     │  │ Email:           │  │    │
│  │                     │  │ [input field]    │  │    │
│  │                     │  │ Password:        │  │    │
│  │                     │  │ [input field]    │  │    │
│  │                     │  │ [Login Button]   │  │    │
│  │                     │  └──────────────────┘  │    │
│  └────────────────────────────────────────────────┘    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Quick Reference

| Item | Value |
|------|-------|
| **Location** | Footer (bottom of page) |
| **Email** | admin@jewside.com |
| **Password** | OriAdmin |
| **Dashboard Access** | Automatic after login |
| **Logout** | Button in footer after login |

---

**🎉 Your admin login is ready to use!**

Scroll to the bottom of any page to access the admin panel.

