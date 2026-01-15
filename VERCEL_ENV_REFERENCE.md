# Vercel + Neon Deployment - Environment Variables Reference

## Quick Start Checklist

### 🗄️ Step 1: Create Neon Database
1. Go to https://neon.tech
2. Create a new project called "havenstay-db"
3. Copy the connection string

### 🚀 Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Import from GitHub: `Hajjullahi123/havenstay-rental`
3. Add environment variables (see below)
4. Deploy!

---

## Required Environment Variables for Vercel

### 1. DATABASE_URL
**Value**: Your Neon PostgreSQL connection string
```
postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
```

**Where to get it**:
- Neon Dashboard → Your Project → Connection String
- Make sure to select "Pooled connection" for better performance

---

### 2. NEXTAUTH_SECRET
**Value**: A secure random string
```
# Generate using one of these methods:

# PowerShell (Windows):
.\generate-secret.ps1

# Online:
# Visit: https://generate-secret.vercel.app/32

# OpenSSL (macOS/Linux):
openssl rand -base64 32

# Example output:
dGhpc2lzYXNlY3VyZXJhbmRvbXN0cmluZzEyMzQ1Njc4OQ==
```

---

### 3. NEXTAUTH_URL
**Value**: Your Vercel deployment URL
```
# First deployment (Vercel will assign):
https://havenstay-rental.vercel.app

# After custom domain setup:
https://yourdomain.com
```

**Important**: Update this after first deployment with the actual URL Vercel provides!

---

## Optional Environment Variables

### Email Configuration (for notifications)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=HavenStay <noreply@havenstay.com>
```

### Stripe Payment Configuration
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Get these from: https://dashboard.stripe.com/apikeys

---

## How to Add Environment Variables in Vercel

### Option 1: During Initial Deployment
1. When importing the project, scroll to "Environment Variables"
2. Click "Add Environment Variable"
3. Add each variable one by one

### Option 2: After Deployment
1. Go to your Vercel Dashboard
2. Select your project
3. Navigate to "Settings" → "Environment Variables"
4. Click "Add New"
5. Enter key-value pairs
6. Click "Save"
7. Redeploy for changes to take effect

### Option 3: Using Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Add environment variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL

# Pull to local for testing
vercel env pull
```

---

## Verification Steps

### ✅ After Adding Environment Variables

1. **Check they're set correctly**:
   - Vercel Dashboard → Project → Settings → Environment Variables
   - Verify all required variables are present

2. **Trigger a new deployment**:
   - Go to Deployments tab
   - Click "Redeploy" on the latest deployment
   - OR push a new commit to GitHub

3. **Test the deployment**:
   - Visit your Vercel URL
   - Try to register/login
   - Check if database connections work

### 🔍 Troubleshooting

**Build fails with "DATABASE_URL not found"**
- Make sure you added DATABASE_URL in Vercel settings
- Redeploy after adding environment variables

**"Invalid connection string" error**
- Verify the Neon connection string is correct
- Ensure it includes `?sslmode=require`
- Check for any special characters that need encoding

**"NEXTAUTH_SECRET not configured"**
- Generate a new secret using the command above
- Add it to Vercel environment variables
- Redeploy

**"Failed to connect to database"**
- Check Neon database is active (not paused on free tier)
- Verify connection string is correct
- Try connecting with `npx prisma studio` locally using same DATABASE_URL

---

## Environment Variables Template

Copy this template and fill in your values:

```bash
# Required
DATABASE_URL="postgresql://[user]:[password]@[host]/[database]?sslmode=require"
NEXTAUTH_SECRET="[generate-with-openssl-rand-base64-32]"
NEXTAUTH_URL="https://[your-app].vercel.app"

# Optional - Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="HavenStay <noreply@havenstay.com>"

# Optional - Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

---

## Quick Commands

### Generate NEXTAUTH_SECRET (PowerShell)
```powershell
.\generate-secret.ps1
```

### Test Database Connection Locally
```bash
# Add Neon DATABASE_URL to .env
npx prisma db push
npx prisma studio
```

### Deploy to Vercel via CLI
```bash
vercel --prod
```

### View Logs
```bash
vercel logs [deployment-url]
```

---

## Next Steps After Deployment

1. ✅ Verify deployment at your Vercel URL
2. ✅ Run database migrations: `npx prisma db push`
3. ✅ Test user registration and login
4. ✅ Configure custom domain (optional)
5. ✅ Set up monitoring and alerts
6. ✅ Configure Stripe for payments (if needed)
