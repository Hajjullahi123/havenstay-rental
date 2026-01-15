# 🛤️ Critical Railway Deployment Checklist

Follow these steps to ensure your HavenStay platform is 100% production-ready on Railway.

## 1. Environment Variables
You MUST set these in the Railway **Variables** tab for your service:

| Variable | Importance | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | **CRITICAL** | Your Supabase connection string (Session Pooler - Port 5432). |
| `NEXTAUTH_SECRET` | **CRITICAL** | A random 32-character string. |
| `NEXTAUTH_URL` | **CRITICAL** | Your Railway URL (e.g., `https://havenstay-production.up.railway.app`). |
| `SMTP_HOST` | Required | e.g., `smtp.gmail.com` |
| `SMTP_PORT` | Required | e.g., `465` or `587` |
| `SMTP_USER` | Required | Your email address. |
| `SMTP_PASS` | Required | Your email app password. |
| `SMTP_FROM` | Required | e.g., `HavenStay <hello@yourdomain.com>` |
| `STRIPE_SECRET_KEY` | Optional | For production online payments. |

## 2. Infrastructure Settings
- **Build Command**: Railway should detect this automatically, but ensure it is `npm run build`.
- **Start Command**: `npm run start`.
- **Health Check Path**: `/` (Success if response is 200).
- **Restart Policy**: Always.

## 3. Database Initialization
After your first successful build, Railway will show the app as live, but the database might be empty.
1. Connect to your Supabase project.
2. Ensure you have run `npx prisma db push` locally once to create the tables.
3. Run `npx prisma db seed` if you want to populate the properties.

## 4. Troubleshooting
- **Build Hangs**: Ensure you are not running in "Turbopack" mode. The current configuration forces Webpack for stability.
- **P1012 Error**: Double-check your `DATABASE_URL`. It must be URL-encoded (especially the password).
- **Images Missing**: Note that images uploaded to `public/uploads` are **ephemeral** on Railway. For production, consider using **Supabase Storage**.

---
*HavenStay - Premium Real Estate Rental Platform*
