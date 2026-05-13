# Full Stack Setup - Deployment Checklist

## ✅ FIXES APPLIED (April 24, 2026)

### Backend Fixes
- ✅ Updated `.env` FRONTEND_URL from `http://localhost:5173` to `http://localhost:5174`
- ✅ Updated `server.ts` CORS configuration to use `localhost:5174`
- ✅ Enhanced server logging to show correct CORS origin
- ✅ Added PATCH method to CORS allowed methods

### Frontend Fixes
- ✅ Enhanced `apiService.ts` with better error messages
- ✅ Improved `Auth.tsx` error handling with emoji logging
- ✅ `.env` correctly points to `http://localhost:5000/api`

---

## 🚀 START EVERYTHING FROM SCRATCH

### Step 1: Kill any existing processes

**PowerShell:**
```powershell
# Kill port 5000 (backend)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Kill port 5174 (frontend)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5174).OwningProcess | Stop-Process
```

**Or use:**
```bash
npx kill-port 5000 5174
```

---

### Step 2: Start Backend

**Terminal 1 - Backend:**
```bash
cd "Travel Service Website Design/Backend"
npm install  # First time only
npm run dev
```

**Expected Output:**
```
[2026-04-24T...] 🌐 CORS configured for: http://localhost:5174
[2026-04-24T...] ✅ Express Server running on http://localhost:5000
[2026-04-24T...] Environment: development
[2026-04-24T...] CORS Origin: http://localhost:5174
[2026-04-24T...] 🎯 Ready to accept requests!
[2026-04-24T...] ✅ MongoDB connected successfully
```

---

### Step 3: Start Frontend

**Terminal 2 - Frontend:**
```bash
cd "Travel Service Website Design/Frontend"
npm install  # First time only
npm run dev
```

**Expected Output:**
```
VITE v... ready in ... ms

➜  Local:   http://localhost:5174/
➜  press h + enter to show help
```

---

## 🧪 TESTING CHECKLIST

### Backend Testing

1. **Health Check:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Expected:
   ```json
   {
     "message": "Server is running",
     "timestamp": "2026-04-24T...",
     "environment": "development"
   }
   ```

2. **Get Services (should return empty initially):**
   ```bash
   curl http://localhost:5000/api/services
   ```
   Expected:
   ```json
   {
     "message": "Services retrieved successfully",
     "count": 0,
     "data": []
   }
   ```

---

### Frontend Login/Register Testing

1. **Open Frontend:**
   - URL: `http://localhost:5174`
   - Should load without errors

2. **Test Registration:**
   - Click "Sign Up" tab
   - Fill in:
     - Name: `Test User`
     - Email: `test@example.com`
     - Password: `password123`
     - Confirm Password: `password123`
   - Click "Sign Up"
   - Should redirect to home page
   - Check browser DevTools Console for:
     ```
     🔐 Starting registration with: { name: "Test User", email: "test@example.com" }
     ✅ Registration successful: { ... }
     ```

3. **Test Login:**
   - Click "Login" tab
   - Fill in:
     - Email: `test@example.com`
     - Password: `password123`
   - Click "Login"
   - Should redirect to home page
   - Check browser DevTools Console for:
     ```
     🔐 Starting login with: { email: "test@example.com" }
     ✅ Login successful: { ... }
     ```

---

## 🔍 DEBUGGING: Frontend/Backend Connection

### If Registration/Login Fails:

**1. Check DevTools Console (Frontend):**
   - Open `http://localhost:5174`
   - Press `F12` to open Developer Tools
   - Go to "Console" tab
   - Look for error messages

**2. Check Backend Logs:**
   - Look at Terminal 1 where backend is running
   - Should see API requests like:
     ```
     [2026-04-24T...] GET http://localhost:5000/api/health
     [2026-04-24T...] POST http://localhost:5000/api/auth/register
     ```

**3. Check Network Tab (Frontend):**
   - In DevTools, click "Network" tab
   - Try login/register
   - Look for requests to `localhost:5000`
   - Check response status (should be 200 or 201 for success)
   - Check response body for errors

**4. Verify CORS:**
   - In Network tab, click the failed request
   - Go to "Response Headers"
   - Should see:
     ```
     Access-Control-Allow-Origin: http://localhost:5174
     Access-Control-Allow-Credentials: true
     ```

---

## 📝 Configuration Summary

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/travel-service
FRONTEND_URL=http://localhost:5174  # ✅ UPDATED
JWT_SECRET=travel-service-secret-key-change-in-production-12345678
JWT_EXPIRE=7d
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api  # ✅ Correct
```

### Server CORS (server.ts)
```typescript
const CORS_ORIGIN = process.env.FRONTEND_URL || 'http://localhost:5174';  // ✅ Updated
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## 🛑 Common Issues & Solutions

### Issue 1: "Failed to fetch" or "Failed to connect to server"
**Cause:** Backend is not running
**Solution:**
```bash
cd Backend
npm run dev
```

### Issue 2: CORS error in browser console
**Cause:** Frontend port is not 5174 or CORS not configured correctly
**Solution:**
1. Frontend should be on port 5174
2. Backend .env should have `FRONTEND_URL=http://localhost:5174`
3. Restart backend after changing .env
4. Clear browser cache (`Ctrl+Shift+Delete`)

### Issue 3: Port 5000 already in use
**Solution:**
```bash
npx kill-port 5000
npm run dev
```

### Issue 4: "Cannot find module" errors in backend
**Solution:**
```bash
cd Backend
npm install
npm run dev
```

### Issue 5: Module is cache, but was not found (TypeScript)
**Solution:**
```bash
# Clear ts-node cache
npx ts-node --showConfig
# Delete node_modules and reinstall
rm -r node_modules
npm install
npm run dev
```

---

## 📊 API Endpoints (for testing)

### Auth Endpoints
```
POST   http://localhost:5000/api/auth/register
POST   http://localhost:5000/api/auth/login
GET    http://localhost:5000/api/auth/me
```

### Service Endpoints
```
GET    http://localhost:5000/api/services
GET    http://localhost:5000/api/services/:id
POST   http://localhost:5000/api/services (admin)
PUT    http://localhost:5000/api/services/:id (admin)
DELETE http://localhost:5000/api/services/:id (admin)
```

### Booking Endpoints
```
GET    http://localhost:5000/api/bookings/user/my-bookings
POST   http://localhost:5000/api/bookings
GET    http://localhost:5000/api/bookings/:id
```

### Contact Endpoints
```
POST   http://localhost:5000/api/contact
```

---

## 🎯 Success Criteria

✅ Backend runs without errors on port 5000
✅ Frontend runs without errors on port 5174
✅ Console shows "🌐 CORS configured for: http://localhost:5174"
✅ Console shows "✅ MongoDB connected successfully"
✅ Frontend can register a new user
✅ Frontend can login with registered credentials
✅ No CORS errors in browser console
✅ No "Failed to fetch" errors
✅ Redirects to home page after successful login/register

---

## 🔄 Quick Restart Guide

When you want to restart everything:

```bash
# Terminal 1 - Backend
cd "Travel Service Website Design/Backend"
npm run dev

# Terminal 2 - Frontend (new terminal)
cd "Travel Service Website Design/Frontend"
npm run dev
```

Then open: `http://localhost:5174`

---

## 📞 Still Having Issues?

1. **Check backend terminal** - Does it show all the green checkmarks?
2. **Check frontend DevTools** (F12) - What error message is shown?
3. **Check .env files** - Are ports correct?
4. **Restart everything** - Kill processes and start from scratch
5. **Clear caches** - Browser cache, node_modules, npm cache

---

**All fixes applied! 🚀 Your full-stack should now work perfectly!**
