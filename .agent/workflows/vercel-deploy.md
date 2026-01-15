---
description: Deploy HavenStay to Vercel + Neon
---

# Deploy HavenStay Rental Platform to Vercel + Neon

This workflow guides you through deploying the HavenStay rental platform to Vercel (hosting) and Neon (PostgreSQL database).

## Prerequisites
- GitHub account with the repository pushed
- Vercel account (free tier available at https://vercel.com)
- Neon account (free tier available at https://neon.tech)

## Part 1: Set Up Neon Database

### 1. Create Neon Database
1. Go to https://neon.tech and sign up or log in
2. Click "Create Project"
3. Enter project details:
   - Project name: `havenstay-db`
   - Region: Choose closest to your users
   - PostgreSQL version: 16 (latest)
4. Click "Create Project"

### 2. Get Database Connection String
1. After project creation, you'll see the connection string
2. Copy the connection string (it looks like: `postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`)
3. Save this for later - you'll need it for Vercel environment variables

## Part 2: Deploy to Vercel

### 1. Push Code to GitHub (if not already done)
// turbo
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Import Project to Vercel
1. Go to https://vercel.com and sign up or log in
2. Click "Add New" → "Project"
3. Import your GitHub repository: `Hajjullahi123/havenstay-rental`
4. Vercel will auto-detect Next.js configuration

### 3. Configure Environment Variables
Before deploying, add these environment variables in Vercel:

**Required Variables:**
- `DATABASE_URL`: Your Neon connection string from Part 1
- `NEXTAUTH_SECRET`: Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL`: `https://your-project-name.vercel.app` (Vercel will provide this URL)

**Optional Variables (add if using these features):**
- `SMTP_HOST`: Your SMTP host
- `SMTP_PORT`: Your SMTP port
- `SMTP_USER`: Your SMTP username
- `SMTP_PASS`: Your SMTP password
- `SMTP_FROM`: Sender email address
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key

### 4. Configure Build Settings
Vercel should auto-detect these, but verify:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Install Command**: `npm install`
- **Output Directory**: `.next`
- **Root Directory**: `./`

### 5. Add Build Command for Prisma
In the Vercel dashboard, update the build command to:
```bash
npx prisma generate && npm run build
```

Or add a `vercel.json` file to your project (see Part 3).

### 6. Deploy
1. Click "Deploy"
2. Wait for the deployment to complete (usually 2-3 minutes)
3. Vercel will provide a deployment URL

## Part 3: Post-Deployment Configuration

### 1. Run Database Migrations
After the first deployment, you need to set up the database schema:

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Make sure `DATABASE_URL` is set correctly
4. Use Vercel CLI or run migrations locally:

**Option A: Using Vercel CLI**
// turbo
```bash
npm install -g vercel
vercel login
vercel env pull
npx prisma db push
```

**Option B: Run locally pointing to Neon**
1. Update your local `.env` file with the Neon DATABASE_URL
// turbo
```bash
npx prisma db push
```

### 2. Update NEXTAUTH_URL
1. Copy your Vercel deployment URL (e.g., `https://havenstay.vercel.app`)
2. Update the `NEXTAUTH_URL` environment variable in Vercel settings
3. Redeploy the application

### 3. Seed Database (Optional)
If you have a seed file:
// turbo
```bash
npx prisma db seed
```

## Part 4: Create vercel.json Configuration

Create a `vercel.json` file in the project root for optimal configuration:

```json
{
  "buildCommand": "npx prisma generate && npm run build",
  "env": {
    "SKIP_ENV_VALIDATION": "1"
  },
  "regions": ["iad1"],
  "installCommand": "npm install"
}
```

## Part 5: Verification

### 1. Test the Deployment
1. Visit your Vercel URL
2. Test these features:
   - Landing page loads
   - User registration/login
   - Property browsing
   - Booking functionality
   - Payment processing (if configured)

### 2. Check Logs
If something doesn't work:
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Check the "Runtime Logs" and "Build Logs"

### 3. Database Verification
1. Go to Neon Dashboard
2. Navigate to your project
3. Use the SQL Editor to verify tables were created:
```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```

## Part 6: Custom Domain (Optional)

### 1. Add Custom Domain
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Click "Add"
3. Enter your domain name
4. Follow the DNS configuration instructions
5. Update `NEXTAUTH_URL` to use your custom domain

## Troubleshooting

### Build Failures
- Check environment variables are set correctly
- Ensure `DATABASE_URL` is accessible from Vercel
- Review build logs for specific errors

### Database Connection Issues
- Verify Neon database is running
- Check connection string includes `?sslmode=require`
- Ensure IP allowlist in Neon allows Vercel IPs (usually not needed with Neon)

### Runtime Errors
- Check Runtime Logs in Vercel
- Verify all environment variables are set
- Test database connection from Vercel CLI

## Benefits of Vercel + Neon

✅ **Vercel Benefits:**
- Automatic deployments from GitHub
- Global CDN for fast loading
- Edge functions support
- Zero-config Next.js deployment
- Free SSL certificates
- Generous free tier

✅ **Neon Benefits:**
- Serverless PostgreSQL
- Auto-scaling
- Instant database branching
- Free tier: 0.5GB storage, 10GB transfer
- No cold starts
- Point-in-time restore

## Cost Expectations

**Free Tier Limits:**
- **Vercel**: 100GB bandwidth, unlimited projects
- **Neon**: 0.5GB storage, 10GB data transfer

**Paid Plans:**
- **Vercel Pro**: $20/month (better performance, more bandwidth)
- **Neon Pro**: $19/month (more storage and compute)

## Next Steps

1. Set up monitoring and analytics
2. Configure custom domain
3. Set up email notifications
4. Configure Stripe for payments
5. Add staging environment for testing
