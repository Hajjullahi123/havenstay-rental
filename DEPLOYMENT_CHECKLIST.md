# 🚀 HavenStay Deployment Checklist

## Prerequisites
- [ ] GitHub account created
- [ ] Render account created at [render.com](https://render.com)
- [ ] Code pushed to GitHub repository

## Phase 1: Prepare GitHub Repository

### 1.1 Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit: HavenStay Rental Platform"
```

### 1.2 Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `havenstay-rental`
3. Keep it **Private** (recommended) or Public
4. Click **Create repository**

### 1.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/havenstay-rental.git
git branch -M main
git push -u origin main
```

---

## Phase 2: Deploy PostgreSQL Database on Render

### 2.1 Create PostgreSQL Instance
1. Login to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **PostgreSQL**
3. Configure:
   - **Name:** `havenstay-db`
   - **Database:** `havenstay`
   - **User:** (auto-generated)
   - **Region:** Choose closest to your users
   - **Plan:** Free (for testing) or Paid (for production)
4. Click **Create Database**

### 2.2 Get Database URL
- After creation, find the **Internal Database URL** in the database dashboard
- Format: `postgresql://user:password@dpg-xxx.region.render.com/database`
- **Save this URL** - you'll need it for the web service

---

## Phase 3: Deploy Web Service on Render

### 3.1 Create Web Service
1. Click **New +** → **Web Service**
2. Connect your GitHub account and select `havenstay-rental` repository
3. Configure:
   - **Name:** `havenstay-app`
   - **Region:** Same as database
   - **Branch:** `main`
   - **Root Directory:** (leave empty)
   - **Runtime:** `Node`
   - **Build Command:** `npm run render:build`
   - **Start Command:** `npm run start`

### 3.2 Configure Environment Variables
Click **Advanced** → **Add Environment Variable** and add:

| Key | Value | Notes |
|-----|-------|-------|
| `DATABASE_URL` | *Your Internal Database URL* | From Phase 2.2 |
| `NEXTAUTH_SECRET` | *Generate random string* | Run: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | *Your Render app URL* | e.g., `https://havenstay-app.onrender.com` |
| `SMTP_HOST` | `smtp.mailtrap.io` | Optional - for emails |
| `SMTP_PORT` | `2525` | Optional |
| `SMTP_USER` | *Your SMTP username* | Optional |
| `SMTP_PASS` | *Your SMTP password* | Optional |
| `STRIPE_SECRET_KEY` | *Your Stripe secret key* | Optional - for payments |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | *Your Stripe public key* | Optional |

### 3.3 Configure Persistent Storage for Uploads
1. In your web service settings, go to **Disks**
2. Click **Add Disk**
3. Configure:
   - **Name:** `uploads-disk`
   - **Mount Path:** `/opt/render/project/src/public/uploads`
   - **Size:** `1 GB` (or as needed)
4. Click **Save**

**Important:** This ensures uploaded property images persist across deployments!

### 3.4 Deploy
1. Click **Create Web Service**
2. Render will:
   - Clone your repository
   - Run `npm install`
   - Generate Prisma client
   - Push database schema
   - Build Next.js app
   - Start the server

---

## Phase 4: Post-Deployment Steps

### 4.1 Monitor Deployment
- Watch the **Logs** tab for build progress
- Look for: `✓ Ready in Xms`
- Your app will be live at: `https://havenstay-app.onrender.com`

### 4.2 Create Admin Account
1. Visit your app URL
2. Click "Sign Up" and create an account
3. Manually update the user role in the database:
   - Go to Render Dashboard → PostgreSQL → **Shell**
   - Run:
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
   ```

### 4.3 Test Core Features
- [ ] Homepage loads correctly
- [ ] User can sign up/login
- [ ] Admin can access `/admin` dashboard
- [ ] Admin can add properties
- [ ] Users can view properties
- [ ] Users can create bookings
- [ ] Payment flows work (if configured)

---

## Phase 5: Optional Enhancements

### 5.1 Custom Domain
1. In Render dashboard, go to **Settings**
2. Under **Custom Domain**, click **Add Custom Domain**
3. Follow DNS configuration instructions

### 5.2 Enable Auto-Deploy
Already enabled by default! Render will auto-deploy when you push to `main` branch.

### 5.3 Set up Monitoring
- Enable **Health Check Path:** `/` 
- Set up alerts in Render dashboard

---

## 🎉 Deployment Complete!

Your HavenStay platform is now live! Share your URL with users.

## Common Issues & Solutions

### Build Fails
- **Check logs** for specific errors
- Ensure `package.json` has `render:build` script
- Verify all dependencies are in `package.json`

### Database Connection Errors
- Verify `DATABASE_URL` is the **Internal** URL (for services on Render)
- Check if database is in same region as web service

### Images Not Loading
- Verify the **Disk** is properly mounted at `/opt/render/project/src/public/uploads`
- Check file upload paths in your code

### App Shows 404
- Ensure `NEXTAUTH_URL` matches your actual Render URL
- Check that build completed successfully

---

**Need Help?** Check Render documentation at [docs.render.com](https://docs.render.com)
