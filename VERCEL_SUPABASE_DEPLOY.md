# 🚀 Deploy HavenStay to Vercel + Supabase

## Complete Step-by-Step Deployment Guide

---

## 📋 What You'll Get

- ✅ **Free hosting** on Vercel
- ✅ **Free PostgreSQL database** on Supabase (500MB)
- ✅ **Free file storage** on Supabase (2GB) for property images
- ✅ **Auto-deployments** from GitHub
- ✅ **Global CDN** for fast loading
- ✅ **SSL certificate** (HTTPS)

**Total Cost:** $0/month 🎉

---

## Part 1: Set Up Supabase Database (5 minutes)

### Step 1.1: Create Supabase Account

1. 🌐 Go to **https://supabase.com**
2. Click **"Start your project"**
3. Click **"Sign in with GitHub"** (recommended)
4. Authorize Supabase to access your GitHub account

### Step 1.2: Create New Project

1. After logging in, click **"New Project"**
2. Select your organization (or create one)
3. Fill in project details:
   - **Name**: `havenstay-db`
   - **Database Password**: Create a strong password
     ```
     💡 TIP: Use this generator or create your own strong password
     Save it somewhere safe - you'll need it!
     ```
   - **Region**: Select closest to your users
     - **US East (Ohio)** - for US users
     - **Europe (Frankfurt)** - for EU users
     - **Southeast Asia (Singapore)** - for Asian users
   - **Pricing Plan**: Free (already selected)

4. Click **"Create new project"**
5. ⏱️ Wait 2-3 minutes for Supabase to set up your database

### Step 1.3: Get Database Connection String

1. Once your project is ready, go to **Settings** (⚙️ icon in sidebar)
2. Click **Database** (in the left menu under Settings)
3. Scroll down to **"Connection string"** section
4. Select **"Connection Pooling"** tab (important for Vercel!)
5. Copy the connection string - it looks like this:
   ```
   postgresql://postgres.abcdefghijklmnop:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
6. **Replace `[YOUR-PASSWORD]`** with the database password you created in Step 1.2
7. 💾 **Save this connection string** - you'll use it as `DATABASE_URL` in Vercel

**Example:**
```
Before: postgresql://postgres.abcdefghijklmnop:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres

After:  postgresql://postgres.abcdefghijklmnop:MyStr0ngP@ssw0rd@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### Step 1.4: Optional - Configure File Storage for Property Images

Supabase provides free file storage that you can use later for property images:

1. In Supabase dashboard, click **Storage** (📦 icon in sidebar)
2. Click **"Create a new bucket"**
3. Name it `property-images`
4. Set to **Public** (so property images are accessible)
5. Click **"Create bucket"**

*You can configure this later in your app to upload property images!*

---

## Part 2: Deploy to Vercel (10 minutes)

### Step 2.1: Create Vercel Account

1. 🌐 Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Click **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub account

### Step 2.2: Import Your Project

1. After logging in, click **"Add New..."** → **"Project"**
2. In the "Import Git Repository" section, find:
   ```
   Hajjullahi123/havenstay-rental
   ```
3. Click **"Import"** next to your repository

### Step 2.3: Configure Project Settings

Vercel will auto-detect Next.js. Verify these settings:

- **Framework Preset**: Next.js ✅ (auto-detected)
- **Root Directory**: `./` (leave as default)
- **Build Command**: Uses `vercel.json` config ✅
- **Output Directory**: `.next` ✅
- **Install Command**: `npm install` ✅

**Don't click Deploy yet!** ⚠️ We need to add environment variables first.

### Step 2.4: Add Environment Variables 🔑

This is the **most important step**! Scroll down to **"Environment Variables"** section.

#### Required Variables:

**1. DATABASE_URL**
- Click **"Add Environment Variable"**
- **Key**: `DATABASE_URL`
- **Value**: Your Supabase connection string from Step 1.3
  ```
  postgresql://postgres.abcdefghijklmnop:YourPassword@aws-0-us-east-1.pooler.supabase.com:6543/postgres
  ```
- **Environments**: Check all three:
  - ✅ Production
  - ✅ Preview
  - ✅ Development
- Click **"Add"**

**2. NEXTAUTH_SECRET**
- Click **"Add Environment Variable"**
- **Key**: `NEXTAUTH_SECRET`
- **Value**: Use this generated secret:
  ```
  h7LX7tsh0bTuL6uWZVM3b0xZWp61QjQpqmYh0bj067U=
  ```
  *(Or generate your own with: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`)
- **Environments**: Check all three:
  - ✅ Production
  - ✅ Preview
  - ✅ Development
- Click **"Add"**

**3. NEXTAUTH_URL**
- Click **"Add Environment Variable"**
- **Key**: `NEXTAUTH_URL`
- **Value**: For now, use a placeholder:
  ```
  https://havenstay-rental.vercel.app
  ```
  ⚠️ **Important**: We'll update this with the actual URL after deployment!
- **Environments**: Check ONLY:
  - ✅ Production
  - ❌ Preview (leave unchecked)
  - ❌ Development (leave unchecked)
- Click **"Add"**

#### Optional Variables (Add if using these features):

**Email Configuration** (for notifications):
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=HavenStay <noreply@havenstay.com>
```

**Stripe Configuration** (for online payments):
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Step 2.5: Deploy! 🚀

1. After adding all environment variables, click **"Deploy"**
2. ⏱️ Vercel will now:
   - Clone your repository
   - Install dependencies
   - Generate Prisma Client
   - Build your Next.js app
   - Deploy to global CDN
   
   This takes **2-4 minutes**

3. 🎉 Watch the deployment progress - you'll see:
   ```
   ✓ Building
   ✓ Generating Prisma Client
   ✓ Compiled successfully
   ✓ Deployment ready
   ```

### Step 2.6: Get Your Deployment URL

1. Once deployment is complete, you'll see **"Congratulations!"** 🎊
2. Vercel will show your deployment URL, like:
   ```
   https://havenstay-rental-abc123.vercel.app
   ```
3. 📋 **Copy this URL** - you'll need it for the next step!

---

## Part 3: Update NEXTAUTH_URL (2 minutes)

Now that we have the actual deployment URL, we need to update the environment variable:

### Step 3.1: Update Environment Variable

1. In Vercel dashboard, click on your project name
2. Go to **"Settings"** tab (top navigation)
3. Click **"Environment Variables"** (left sidebar)
4. Find **`NEXTAUTH_URL`** in the list
5. Click the **"⋯"** (three dots) → **"Edit"**
6. Replace the value with your actual Vercel URL from Step 2.6
   ```
   https://havenstay-rental-abc123.vercel.app
   ```
7. Click **"Save"**

### Step 3.2: Redeploy

1. Go to the **"Deployments"** tab
2. Click the **"⋯"** (three dots) on the latest deployment
3. Click **"Redeploy"**
4. Click **"Redeploy"** again to confirm
5. ⏱️ Wait 1-2 minutes for redeployment

---

## Part 4: Initialize Database Schema (5 minutes)

Now we need to create the database tables in Supabase.

### Method 1: Using Vercel CLI (Recommended)

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Link to your project (run in project directory)
cd c:\Users\IT-LAB\Desktop\Agency
vercel link

# Pull environment variables
vercel env pull .env.local

# Run Prisma migration to create tables
npx prisma db push
```

### Method 2: Using Local Environment

1. Open `.env` file in your project
2. Temporarily update `DATABASE_URL` with your Supabase connection string
3. Run:
   ```powershell
   npx prisma db push
   ```
4. Restore your `.env` file (don't commit Supabase credentials!)

### Step 4.1: Verify Database Schema

1. Go back to **Supabase Dashboard**
2. Click **"Table Editor"** (📊 icon in sidebar)
3. You should see these tables:
   - ✅ `User`
   - ✅ `Property`
   - ✅ `Booking`
   - ✅ `Payment`
   - ✅ `Favorite`

4. Or use **SQL Editor** and run:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

If you see all 5 tables, your database is ready! ✅

---

## Part 5: Testing Your Deployment (5 minutes)

### Step 5.1: Test the Application

1. 🌐 Open your Vercel URL in a browser:
   ```
   https://havenstay-rental-abc123.vercel.app
   ```

2. Test these features:

   **✅ Landing Page**
   - Should load with hero section, features, testimonials

   **✅ User Registration**
   - Click "Get Started" or "Sign Up"
   - Register a new account with email and password
   - Should redirect to dashboard after registration

   **✅ User Login**
   - Logout and try logging in with your credentials
   - Should successfully authenticate

   **✅ Browse Properties**
   - Go to properties page
   - Should see property listings

   **✅ Property Details**
   - Click on a property
   - Should show detailed property information

   **✅ Booking (if logged in)**
   - Try to book a property
   - Should create booking record

### Step 5.2: Verify Database Records

1. Go to **Supabase Dashboard** → **"Table Editor"**
2. Click on **`User`** table
3. You should see your registered user! ✅

### Step 5.3: Check Logs (If Issues Occur)

**Vercel Logs:**
1. Go to **Vercel Dashboard** → Your Project → **"Deployments"**
2. Click on latest deployment
3. Check **"Runtime Logs"** for errors

**Supabase Logs:**
1. Go to **Supabase Dashboard** → **"Logs"** (📜 icon)
2. Select **"Database"** logs
3. Look for any errors or warnings

---

## Part 6: Optional Enhancements

### 6.1: Add Custom Domain

1. In Vercel dashboard, go to **Settings** → **"Domains"**
2. Click **"Add"**
3. Enter your domain (e.g., `havenstay.com`)
4. Follow DNS configuration instructions
5. Update `NEXTAUTH_URL` environment variable to your custom domain
6. Redeploy

### 6.2: Configure Supabase Storage for Property Images

Update your app to use Supabase storage instead of local uploads:

1. Install Supabase client:
   ```powershell
   npm install @supabase/supabase-js
   ```

2. Get Supabase URL and Anon Key:
   - Supabase Dashboard → **Settings** → **API**
   - Copy **Project URL** and **anon public** key

3. Add to Vercel environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. Update image upload logic to use Supabase storage

*(We can implement this later if you want!)*

### 6.3: Enable Supabase Authentication (Optional)

Supabase has built-in auth that can replace NextAuth:
- Social logins (Google, GitHub, Facebook)
- Magic links (passwordless login)
- Phone number authentication

Let me know if you want to implement this!

---

## 🐛 Troubleshooting

### Issue 1: "Build Failed" in Vercel

**Symptoms:** Deployment shows "Build Failed"

**Solutions:**
1. Check Build Logs for specific error
2. Most common: Missing environment variables
3. Verify `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` are set
4. Check for typos in environment variable names
5. Redeploy after fixing

### Issue 2: "Prisma Client Not Found"

**Symptoms:** Error: `@prisma/client did not initialize`

**Solutions:**
1. Ensure `vercel.json` exists with:
   ```json
   {
     "buildCommand": "npx prisma generate && npm run build"
   }
   ```
2. Redeploy

### Issue 3: "Can't Connect to Database"

**Symptoms:** Database connection errors, timeout errors

**Solutions:**
1. Verify Supabase database is active (check dashboard)
2. Check `DATABASE_URL` includes correct password
3. Ensure using **Connection Pooling** URL (not direct connection)
4. Test connection in Supabase SQL Editor first
5. Verify no typos in connection string

### Issue 4: "Invalid NEXTAUTH_SECRET"

**Symptoms:** Authentication errors, "configuration error"

**Solutions:**
1. Verify `NEXTAUTH_SECRET` is set in Vercel
2. Regenerate secret if needed:
   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
3. Update in Vercel environment variables
4. Redeploy

### Issue 5: "Tables Not Found" / "relation does not exist"

**Symptoms:** Errors when accessing database

**Solutions:**
1. Run database migration:
   ```powershell
   npx prisma db push
   ```
2. Verify tables exist in Supabase Table Editor
3. Check Prisma schema matches database

### Issue 6: Supabase Database "Paused"

**Symptoms:** "Database is paused" message

**Solutions:**
1. Free tier databases pause after 7 days of inactivity
2. Go to Supabase Dashboard
3. Click "Resume" on your project
4. Database will activate in 1-2 minutes
5. **Tip**: Make a request daily to keep it active

---

## 📊 Monitoring Your Deployment

### Vercel Analytics
1. Go to **Vercel Dashboard** → Your Project → **"Analytics"**
2. See page views, performance metrics, visitor data
3. Free tier includes basic analytics

### Supabase Usage
1. Go to **Supabase Dashboard** → **"Settings"** → **"Usage"**
2. Monitor:
   - Database size (500MB limit on free tier)
   - Data transfer
   - Storage usage
   - API requests

---

## 💰 Staying on Free Tier

### Free Tier Limits:

**Vercel:**
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Unlimited projects

**Supabase:**
- ✅ 500MB database storage
- ✅ 2GB file storage
- ✅ 50,000 monthly active users
- ✅ Unlimited API requests
- ⚠️ Database pauses after 7 days of inactivity

### Tips to Stay Free:

1. **Optimize Images**: Use WebP format, compress images
2. **Monitor Database Size**: Run this query in Supabase SQL Editor:
   ```sql
   SELECT pg_size_pretty(pg_database_size('postgres'));
   ```
3. **Keep Database Active**: Make regular requests (or set up a cron job)
4. **Use Supabase Storage**: Don't store images in database, use Supabase storage bucket

---

## 🎉 Success! Your App is Live

**Your HavenStay rental platform is now deployed!**

### What You Have:
- ✅ Live website on Vercel
- ✅ PostgreSQL database on Supabase (500MB)
- ✅ File storage on Supabase (2GB)
- ✅ Auto-deployments from GitHub
- ✅ Global CDN for fast loading
- ✅ Free SSL certificate (HTTPS)
- ✅ Built-in analytics

### Access Points:
- **Website**: `https://your-project.vercel.app`
- **Admin Panel**: `https://your-project.vercel.app/admin`
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://app.supabase.com

### Next Steps:
1. ✅ Test all features thoroughly
2. ✅ Add seed data (properties, users)
3. ✅ Configure Stripe for payments
4. ✅ Set up email notifications
5. ✅ Add custom domain
6. ✅ Share with users and gather feedback!

---

## 🆘 Need Help?

### Resources:
- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Prisma Docs**: https://www.prisma.io/docs

### Quick Commands:
```powershell
# View Vercel deployments
vercel ls

# View real-time logs
vercel logs [deployment-url]

# Test database connection locally
npx prisma studio

# Rebuild Prisma client
npx prisma generate

# Reset database (WARNING: deletes all data!)
npx prisma db push --force-reset
```

---

**Congratulations on your deployment! 🚀🎉**
