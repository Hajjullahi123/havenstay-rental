---
description: Deploying HavenStay to Render.com
---

# Deploying HavenStay to Render

Render is an excellent platform for deploying full-stack Next.js applications. Follow these steps to get HavenStay live.

## 1. Prepare Your Database
Render provides Managed PostgreSQL.
1. Click **New +** on the Render dashboard and select **PostgreSQL**.
2. Name your database (e.g., `havenstay-db`) and create it.
3. Once created, copy the **Internal Database URL** (if deploying both on Render) or **External Database URL** (for local access).

## 2. Create the Web Service
1. Click **New +** and select **Web Service**.
2. Connect your GitHub/GitLab repository.
3. **Runtime**: Select `Node`.
4. **Build Command**: `npm run render:build`
5. **Start Command**: `npm run start`

## 3. Configure Environment Variables
In the **Advanced** section or **Env Vars** tab, add:
- `DATABASE_URL`: Your Render PostgreSQL URL.
- `NEXTAUTH_SECRET`: A secure random string.
- `NEXTAUTH_URL`: Your Render app URL (e.g., `https://havenstay.onrender.com`).
- `SMTP_HOST`: `smtp.mailtrap.io` (or your provider).
- `SMTP_PORT`: `2525`.
- `SMTP_USER`: Your SMTP username.
- `SMTP_PASS`: Your SMTP password.
*   `STRIPE_SECRET_KEY`: Your Stripe Secret Key.
*   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe Publishable Key.

## 4. Handle Persistent Asset Uploads (Crucial)
By default, Render has a transient filesystem. Files uploaded to `public/uploads` will disappear on redeploy.
1. Go to your Web Service settings.
2. Under **Disks**, click **Add Disk**.
3. **Name**: `uploads-disk`.
4. **Mount Path**: `/opt/render/project/src/public/uploads`.
5. **Size**: `1GB` (or as needed).
*Note: This ensures property images persist across deployments.*

## 5. Deployment
1. Click **Create Web Service**.
2. Render will run the `render:build` command which:
   - Installs dependencies.
   - Generates the Prisma client.
   - Pushes the schema to the database (`npx prisma db push`).
   - Builds the Next.js production bundle.

---
// turbo
### Health Check
Monitor the Render logs. If you see `Next.js build successful`, your app is live!
