# 🚀 HavenStay Deployment to Vercel + Neon - Step-by-Step Guide

## ✅ Status: Ready to Deploy!

Your code has been pushed to GitHub and is ready for deployment!

---

## 📋 Deployment Checklist

### Part 1: Set Up Neon Database (5 minutes)

#### Step 1.1: Create Neon Account & Project
1. 🌐 Open https://neon.tech in your browser
2. 🔐 Sign up with GitHub (recommended) or email
3. ➕ Click "Create a project"
4. ⚙️ Configure your project:
   - **Project Name**: `havenstay-db`
   - **Region**: Select closest to you (e.g., US East, EU West)
   - **PostgreSQL Version**: 16 (default)
5. ✅ Click "Create Project"

#### Step 1.2: Get Your Database Connection String
1. After project creation, you'll see a **Connection Details** panel
2. 📋 Copy the connection string - it looks like:
   ```
   postgresql://[user]:[password]@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
3. 💾 **IMPORTANT**: Save this somewhere safe! You'll need it for Vercel.

#### Step 1.3: Verify Database is Active
1. In Neon dashboard, click on **SQL Editor**
2. Run this test query:
   ```sql
   SELECT version();
   ```
3. If you see PostgreSQL version info, you're good! ✅

---

### Part 2: Deploy to Vercel (10 minutes)

#### Step 2.1: Create Vercel Account & Import Project
1. 🌐 Open https://vercel.com in your browser
2. 🔐 Click "Sign Up" → Choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. ➕ Click "Add New..." → "Project"
5. 🔍 Find and select **`Hajjullahi123/havenstay-rental`** repository
6. ✅ Click "Import"

#### Step 2.2: Configure Project Settings
Vercel will auto-detect Next.js. Verify these settings:

- **Framework Preset**: Next.js (should be auto-selected)
- **Root Directory**: `./` (leave as default)
- **Build Command**: Will use our `vercel.json` config ✅
- **Output Directory**: `.next` (auto-detected)

#### Step 2.3: Add Environment Variables 🔑

**CRITICAL STEP!** Before deploying, add these environment variables:

1. Scroll down to **"Environment Variables"** section
2. Click **"Add Environment Variable"**
3. Add the following variables one by one:

##### Required Variables:

**Variable 1: DATABASE_URL**
- **Key**: `DATABASE_URL`
- **Value**: Your Neon connection string from Step 1.2
- **Environment**: Production, Preview, Development (check all)

**Variable 2: NEXTAUTH_SECRET**
- **Key**: `NEXTAUTH_SECRET`
- **Value**: Generate using PowerShell:
  ```powershell
  # Run this in your terminal:
  .\generate-secret.ps1
  ```
  Copy the output and use it as the value
- **Environment**: Production, Preview, Development

**Variable 3: NEXTAUTH_URL** (IMPORTANT!)
- **Key**: `NEXTAUTH_URL`
- **Value**: `https://havenstay-rental.vercel.app` (temporary - we'll update this)
- **Environment**: Production only
- ⚠️ **Note**: After deployment, Vercel will give you the actual URL. You'll need to come back and update this!

##### Optional Variables (add these if you need the features):

**Email Configuration** (for notifications):
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=HavenStay <noreply@havenstay.com>
```

**Stripe** (for payments):
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

#### Step 2.4: Deploy! 🚀
1. After adding all environment variables, click **"Deploy"**
2. ⏱️ Wait 2-3 minutes for the build to complete
3. Watch the build logs - you should see:
   - ✅ Installing dependencies
   - ✅ Generating Prisma Client
   - ✅ Building Next.js application
   - ✅ Deployment successful!

---

### Part 3: Post-Deployment Setup (5 minutes)

#### Step 3.1: Get Your Deployment URL
1. After successful deployment, Vercel will show you the deployment URL
2. It will look like: `https://havenstay-rental-xxx.vercel.app`
3. 📋 Copy this URL!

#### Step 3.2: Update NEXTAUTH_URL
1. Go to **Vercel Dashboard** → **Your Project** → **Settings** → **Environment Variables**
2. Find **NEXTAUTH_URL**
3. Click **Edit** (pencil icon)
4. Replace with your actual Vercel URL from Step 3.1
5. ✅ Click **Save**
6. 🔄 Click **"Redeploy"** to apply the change

#### Step 3.3: Initialize Database Schema
Now we need to create the database tables:

**Option A: Using Vercel CLI** (Recommended)
```powershell
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run Prisma migration
npx prisma db push
```

**Option B: Using Local Environment**
1. Create a new file `.env.local` in your project
2. Add your Neon DATABASE_URL to it
3. Run:
   ```powershell
   npx prisma db push
   ```

#### Step 3.4: Verify Database Tables
1. Go back to **Neon Dashboard**
2. Open **SQL Editor**
3. Run this query to see all tables:
   ```sql
   SELECT tablename FROM pg_tables WHERE schemaname = 'public';
   ```
4. You should see: `User`, `Property`, `Booking`, `Payment`, `Favorite`

✅ If you see these tables, your database is set up correctly!

---

### Part 4: Testing & Verification (5 minutes)

#### Step 4.1: Test Your Deployment
1. 🌐 Open your Vercel URL in a browser
2. Test these features:
   - ✅ Landing page loads correctly
   - ✅ Click "Get Started" → Registration page appears
   - ✅ Register a new user
   - ✅ Login with the new user
   - ✅ Browse properties
   - ✅ View property details
   - ✅ Try to book a property (if logged in)

#### Step 4.2: Check Logs (if issues occur)
1. Go to **Vercel Dashboard** → **Your Project** → **Deployments**
2. Click on the latest deployment
3. Check two types of logs:
   - **Build Logs**: For deployment issues
   - **Runtime Logs**: For runtime errors

#### Step 4.3: Test Database Connection
1. Try to register a new user
2. If successful, go to **Neon Dashboard** → **SQL Editor**
3. Query users:
   ```sql
   SELECT * FROM "User";
   ```
4. You should see your registered user! ✅

---

## 🎉 Success Criteria

Your deployment is successful if:

- ✅ Vercel deployment shows "Ready"
- ✅ You can access the website at your Vercel URL
- ✅ User registration works
- ✅ User login works
- ✅ Properties are displayed
- ✅ Database queries work (can see data in Neon SQL Editor)

---

## 🐛 Troubleshooting Common Issues

### Issue 1: Build Failed
**Symptoms**: Deployment shows "Build Failed"
**Solution**:
1. Check Build Logs in Vercel
2. Most common: `DATABASE_URL` not set
3. Go to Settings → Environment Variables
4. Verify all required variables are added
5. Redeploy

### Issue 2: "Prisma Client did not initialize"
**Symptoms**: Error in runtime logs
**Solution**:
1. Ensure `vercel.json` is in your repo
2. It should have: `"buildCommand": "npx prisma generate && npm run build"`
3. Redeploy

### Issue 3: "Can't reach database server"
**Symptoms**: Database connection errors
**Solution**:
1. Verify Neon database is active (not paused)
2. Check `DATABASE_URL` in Vercel includes `?sslmode=require`
3. Test connection string in Neon SQL Editor first

### Issue 4: "Invalid NEXTAUTH_SECRET"
**Symptoms**: Authentication errors
**Solution**:
1. Generate a new secret: `.\generate-secret.ps1`
2. Update in Vercel → Settings → Environment Variables
3. Redeploy

### Issue 5: Pages show "500 Internal Server Error"
**Symptoms**: White screen or 500 errors
**Solution**:
1. Check Runtime Logs in Vercel
2. Verify database schema is created: `npx prisma db push`
3. Check all environment variables are set

---

## 📞 Need Help?

### Check These Resources:
1. **Vercel Docs**: https://vercel.com/docs
2. **Neon Docs**: https://neon.tech/docs
3. **Prisma Docs**: https://www.prisma.io/docs
4. **Your Deployment Logs**: Vercel Dashboard → Deployments → Latest → Logs

### Debug Commands:
```powershell
# Check Vercel deployment status
vercel ls

# View real-time logs
vercel logs

# Test database connection locally
npx prisma studio

# Rebuild Prisma client
npx prisma generate
```

---

## 🎯 Next Steps After Successful Deployment

1. **Add Seed Data** (optional):
   ```powershell
   npx prisma db seed
   ```

2. **Set up Custom Domain**:
   - Vercel Dashboard → Settings → Domains
   - Add your domain
   - Update DNS records
   - Update `NEXTAUTH_URL`

3. **Configure Payments**:
   - Set up Stripe account
   - Add Stripe environment variables
   - Test payment flow

4. **Enable Monitoring**:
   - Vercel Analytics (built-in)
   - Set up error tracking (Sentry)
   - Monitor database performance in Neon

5. **Set up Staging Environment**:
   - Create a preview branch
   - Vercel auto-deploys preview branches
   - Test changes before production

---

## 💰 Cost Overview

### Free Tier Limits:
- **Vercel Free**: 100GB bandwidth/month, unlimited deployments
- **Neon Free**: 0.5GB storage, 10GB data transfer/month

### You'll Stay Free If:
- Website gets < 100GB traffic/month
- Database stays under 0.5GB
- Perfect for testing and small-scale projects!

### When to Upgrade:
- **Vercel Pro** ($20/month): Better performance, more bandwidth
- **Neon Scale** ($19/month): More storage and compute
- Upgrade when you hit free tier limits

---

## ✅ Deployment Complete!

Congratulations! 🎉 Your HavenStay rental platform is now live on Vercel + Neon!

**Your Live URL**: `https://[your-project].vercel.app`

**Admin Panel**: `https://[your-project].vercel.app/admin`

**Database**: Managed on Neon

Share your deployment URL and start testing! 🚀
