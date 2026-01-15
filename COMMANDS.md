# 🚀 Quick Deployment Commands

## Initial Setup Commands

### 1. Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: HavenStay Rental Platform"
```

### 2. Connect to GitHub
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/havenstay-rental.git
git branch -M main
git push -u origin main
```

### 3. Generate NextAuth Secret
```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }) -as [byte[]])
```

## Database Commands

### PostgreSQL Setup (Local)
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Open Prisma Studio (Database GUI)
npx prisma studio
```

### Update Database Schema
```bash
# After modifying schema.prisma
npx prisma generate
npx prisma db push
```

### Seed Database (if you have seed data)
```bash
npm run seed
```

## Development Commands

### Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Build for Production (Local Test)
```bash
npm run build
npm run start
```

## Git Workflow

### Commit Changes
```bash
git add .
git commit -m "Your descriptive commit message"
git push
```

### Check Status
```bash
git status
```

### View Commit History
```bash
git log --oneline
```

## Render-Specific Commands

### Test Render Build Locally
```bash
npm run render:build
```
This runs:
1. `npm install` - Install dependencies
2. `npx prisma generate` - Generate Prisma client
3. `npx prisma db push` - Update database schema
4. `npm run build` - Build Next.js app

### Manual Database Migration on Render
Access Render PostgreSQL Shell and run:
```sql
-- Create admin user (after signup)
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';

-- Check all users
SELECT id, email, role FROM "User";

-- Check properties
SELECT id, title, price, status FROM "Property";

-- Check bookings
SELECT b.id, u.email, p.title, b.status 
FROM "Booking" b
JOIN "User" u ON b."userId" = u.id
JOIN "Property" p ON b."propertyId" = p.id;
```

## Environment Variables Management

### Local Development (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/havenstay"
NEXTAUTH_SECRET="generate-using-command-above"
NEXTAUTH_URL="http://localhost:3000"
```

### Production on Render
Set these in Render Dashboard → Environment Variables:
- `DATABASE_URL` - Use Internal Database URL from Render PostgreSQL
- `NEXTAUTH_URL` - Your app URL (e.g., `https://havenstay-app.onrender.com`)
- `NEXTAUTH_SECRET` - Same as local (or generate new one)

## Troubleshooting Commands

### Clear Next.js Cache
```bash
# Delete build artifacts
Remove-Item -Recurse -Force .next
npm run build
```

### Reset Local Database
```bash
# Delete existing database
Remove-Item prisma\dev.db

# Recreate
npx prisma db push
```

### Check Node/npm Versions
```bash
node --version
npm --version
```
Required: Node 18+

### View Application Logs (Render)
Go to Render Dashboard → Your Service → Logs

## Useful Scripts in package.json

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Start development server |
| `build` | `next build` | Build for production |
| `start` | `next start` | Start production server |
| `lint` | `next lint` | Run ESLint |
| `render:build` | Custom | Render deployment build |

## Quick Health Checks

### Before Pushing to GitHub
- [ ] No sensitive data in code (API keys, passwords)
- [ ] `.env` is in `.gitignore`
- [ ] All features work locally
- [ ] No console errors

### Before Deploying to Render
- [ ] Code pushed to GitHub
- [ ] PostgreSQL database created on Render
- [ ] All environment variables set
- [ ] Disk configured for uploads
- [ ] Build command is `npm run render:build`
- [ ] Start command is `npm run start`

### After Deployment
- [ ] Check Render logs for errors
- [ ] Visit app URL - site loads
- [ ] Test signup/login
- [ ] Test admin access
- [ ] Test property creation
- [ ] Test booking flow

---

**Need More Help?**
- 📖 [Full Deployment Guide](./DEPLOYMENT_CHECKLIST.md)
- 📚 [Render Documentation](https://docs.render.com)
- 🔗 [Next.js Docs](https://nextjs.org/docs)
- 🗃️ [Prisma Docs](https://www.prisma.io/docs)
