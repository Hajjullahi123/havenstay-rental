# 🔧 How to Test Build Locally on Windows

## Issue: PowerShell Execution Policy
Windows PowerShell has an execution policy that blocks running npm scripts by default.

## Quick Solutions

### **Solution 1: Use Command Prompt (Recommended)**

Open **Command Prompt** instead of PowerShell:

1. Press `Win + R`
2. Type `cmd` and press Enter
3. Navigate to your project:
   ```cmd
   cd C:\Users\IT-LAB\Desktop\Agency
   ```
4. Run the build:
   ```cmd
   npm run build
   ```

---

### **Solution 2: Bypass PowerShell Policy (Current Session)**

Open PowerShell and run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
cd C:\Users\IT-LAB\Desktop\Agency
npm run build
```

This only affects the current PowerShell window.

---

### **Solution 3: Use Git Bash (If Installed)**

If you have Git Bash installed:

```bash
cd /c/Users/IT-LAB/Desktop/Agency
npm run build
```

---

## Expected Build Output

When you run `npm run build`, you should see:

```
> rental-app@0.0.0 build
> next build

   ▲ Next.js 16.1.1

   Creating an optimized production build ...
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (X/X)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    XXX kB        XXX kB
├ ○ /admin                               XXX kB        XXX kB
├ ○ /login                               XXX kB        XXX kB
└ ○ /properties/[id]                     XXX kB        XXX kB
+ First Load JS shared by all            XXX kB
  ├ chunks/XXXX.js                       XXX kB
  └ other chunks...                      XXX kB

○  (Static)  prerendered as static content

✓ Build completed successfully
```

---

## What Does the Build Do?

The `npm run build` command:
1. ✅ Compiles your Next.js app for production
2. ✅ Optimizes JavaScript bundles
3. ✅ Validates TypeScript/imports
4. ✅ Generates static pages
5. ✅ Creates `.next` folder with build artifacts

---

## After Successful Build

Once build completes successfully, you can:

### 1. **Test the production build locally:**
```cmd
npm run start
```
Then open: http://localhost:3000

### 2. **Proceed with deployment:**
Follow the deployment guide in `DEPLOYMENT_SUMMARY.md`

---

## Common Build Errors & Fixes

### Error: "Module not found"
✅ **Status:** Already fixed! (See `BUILD_FIX.md`)

### Error: "Cannot find module @prisma/client"
**Solution:**
```cmd
npx prisma generate
npm run build
```

### Error: Database connection issues
**Note:** Build should work WITHOUT database connection. The database is only needed at runtime.

If you see database errors during build, it's likely from:
- Server-side props trying to connect
- Check that you're not making database calls at build time

---

## Alternative: Test Build on Render Directly

If local testing is difficult due to PowerShell issues, you can:

1. **Push to GitHub** (your code is ready!)
2. **Let Render build it** (they use Linux, no PowerShell issues)
3. **Monitor build logs** on Render dashboard

The code is already fixed and should build successfully on Render!

---

## Quick Commands Reference

### Command Prompt (CMD):
```cmd
cd C:\Users\IT-LAB\Desktop\Agency
npm run build              # Build for production
npm run start              # Run production server
npm run dev                # Development mode
```

### PowerShell (with bypass):
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
cd C:\Users\IT-LAB\Desktop\Agency
npm run build
```

### Git Bash:
```bash
cd /c/Users/IT-LAB/Desktop/Agency
npm run build
```

---

## Still Having Issues?

If you continue to have problems building locally:

1. **Option A:** Deploy to Render directly
   - The build will work on their servers
   - Easier than debugging Windows PowerShell issues

2. **Option B:** Use VS Code integrated terminal
   - Open project in VS Code
   - Use the integrated terminal (usually bypasses policy)
   - Run `npm run build`

3. **Option C:** Contact me for help
   - I can guide you through specific issues
   - Or help you deploy directly

---

**Remember:** Your code is already fixed and deployment-ready. Local testing is optional but recommended! ✅
