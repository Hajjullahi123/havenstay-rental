# 🚀 Quick Start: Deploy HavenStay to Vercel + Supabase

## ⚡ 3-Step Deployment (15 minutes total)

---

## Step 1: Create Supabase Database (5 min)

### 🔗 Go to: https://supabase.com

1. **Sign up** with GitHub
2. **New Project** → Name: `havenstay-db`
3. **Set Password** (save it!)
4. **Choose Region** (closest to you)
5. **Wait 2-3 minutes** for setup

### 📋 Get Connection String:
- Settings → Database → **Connection Pooling** tab
- Copy the URL (replace `[YOUR-PASSWORD]` with your password):
  ```
  postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-region.pooler.supabase.com:6543/postgres
  ```

---

## Step 2: Deploy to Vercel (5 min)


### 🔗 Go to: https://vercel.com

1. **Sign up** with GitHub
2. **Add New → Project**
3. **Import**: `Hajjullahi123/havenstay-rental`
4. **Add Environment Variables:**

```env
DATABASE_URL=postgresql://postgres.xxxxx:YourPassword@aws-0-region.pooler.supabase.com:6543/postgres

NEXTAUTH_SECRET=h7LX7tsh0bTuL6uWZVM3b0xZWp61QjQpqmYh0bj067U=

NEXTAUTH_URL=https://havenstay-rental.vercel.app
```

5. **Click Deploy** 🚀
6. **Copy your URL** (e.g., `https://havenstay-rental-abc.vercel.app`)
7. **Update NEXTAUTH_URL**:
   - Settings → Environment Variables → Edit NEXTAUTH_URL
   - Use your actual Vercel URL
   - **Redeploy**

---

## Step 3: Setup Database (5 min)

### 💻 Run in PowerShell:

```powershell
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link to your project
cd c:\Users\IT-LAB\Desktop\Agency
vercel link

# Pull environment variables
vercel env pull .env.local

# Create database tables
npx prisma db push
```

### ✅ Verify in Supabase:
- Dashboard → Table Editor
- Should see: User, Property, Booking, Payment, Favorite

---

## 🎉 Done! Test Your App

**Open**: `https://your-app.vercel.app`

Test:
- ✅ Landing page loads
- ✅ Register new user
- ✅ Login
- ✅ Browse properties
- ✅ View property details

---

## 📝 Environment Variables Checklist

Required for Vercel:

- [ ] `DATABASE_URL` - Your Supabase connection string
- [ ] `NEXTAUTH_SECRET` - `h7LX7tsh0bTuL6uWZVM3b0xZWp61QjQpqmYh0bj067U=`
- [ ] `NEXTAUTH_URL` - Your actual Vercel URL

Optional:

- [ ] `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - Email
- [ ] `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Payments

---

## 🐛 Common Issues

### Build Failed
- ✅ Check all environment variables are set
- ✅ Verify DATABASE_URL is correct
- ✅ Check Build Logs in Vercel

### Can't Connect to Database
- ✅ Use **Connection Pooling** URL (not direct connection)
- ✅ Verify password in DATABASE_URL is correct
- ✅ Check Supabase database is not paused

### Authentication Errors
- ✅ Verify NEXTAUTH_SECRET is set
- ✅ Update NEXTAUTH_URL with actual Vercel URL
- ✅ Redeploy after updating

### Tables Not Created
- ✅ Run `npx prisma db push`
- ✅ Check Supabase Table Editor
- ✅ Verify DATABASE_URL is correct

---

## 💰 Free Tier Limits

**Vercel:**
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments

**Supabase:**
- ✅ 500MB database
- ✅ 2GB file storage
- ✅ 50,000 monthly active users
- ⚠️ Pauses after 7 days inactivity (just click Resume)

---

## 🔗 Important Links

- **Your App**: Check Vercel dashboard for URL
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://app.supabase.com
- **Full Guide**: `VERCEL_SUPABASE_DEPLOY.md`
- **Troubleshooting**: `DATABASE_OPTIONS_COMPARISON.md`

---

## 🆘 Need Detailed Help?

See the complete guide:
```
VERCEL_SUPABASE_DEPLOY.md
```

It includes:
- ✅ Detailed step-by-step instructions
- ✅ Screenshots and examples
- ✅ Complete troubleshooting guide
- ✅ Optional features setup
- ✅ Monitoring and optimization tips

---

**Good luck with your deployment! 🚀**
