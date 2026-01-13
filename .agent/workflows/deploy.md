---
description: How to deploy the HavenStay Rental Platform
---

# Deployment Guide: HavenStay

This guide covers the deployment of the HavenStay Rental Platform using **Vercel** for the frontend/API and **Railway** (or any PostgreSQL provider) for the database.

## 1. Database Setup (Railway)
1. Go to [Railway.app](https://railway.app).
2. Create a new project and select **Provision PostgreSQL**.
3. Once the database is ready, go to the **Variables** tab and copy the `DATABASE_URL`.
4. It should look like: `postgresql://user:password@host:port/dbname`.

## 2. Prepare Environment Variables
You will need the following variables for production:
- `DATABASE_URL`: Your Railway Postgres URL.
- `NEXTAUTH_SECRET`: Generate a random string (e.g., `openssl rand -base64 32`).
- `NEXTAUTH_URL`: Your production URL (e.g., `https://havenstay.vercel.app`).
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`: For email notifications.
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: For real payments.

## 3. Deployment to Vercel
1. Push your code to a **GitHub** repository.
2. Go to [Vercel](https://vercel.com) and click **New Project**.
3. Import your GitHub repository.
4. **Environment Variables**: Add all the variables prepared in Step 2.
5. **Build Command**: Vercel should automatically detect Next.js.
6. **Install Command**: `npm install`.
7. **Production Environment**:
   - Ensure you run `npx prisma generate` during the build step.
   - You can add `prisma generate && next build` as your Build Command in Vercel settings.

## 4. Database Migration
In your local terminal (connected to the production DB) or via a CI/CD script:
```bash
npx prisma db push
```
Or use the script provided in `package.json` if available.

## 5. Stripe Webhooks (Optional)
If using real Stripe payments, set up a webhook in the Stripe Dashboard pointing to `https://your-domain.com/api/webhooks/stripe`.

---
// turbo
### Quick Connectivity Check
Run `npx prisma db pull` locally with the production `DATABASE_URL` to verify connectivity before the final push.
