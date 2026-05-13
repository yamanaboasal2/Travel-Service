# Quick Start Guide - Travel Service Backend

## 📋 Summary

Complete backend setup for Travel Service Website with:
- ✅ User authentication (Register/Login with JWT)
- ✅ Services management (CRUD operations)
- ✅ Special offers management
- ✅ Booking system
- ✅ Contact form handling
- ✅ Admin dashboard endpoints
- ✅ Input validation
- ✅ Error handling

## 🚀 Getting Started (5 minutes)

### 1. Prerequisites
- Node.js 16+
- MongoDB (local or Atlas account)

### 2. Installation

```bash
# Navigate to Backend folder
cd "Travel Service Website Design/Backend"

# Install dependencies
npm install
```

### 3. Configuration

Copy environment file:
```bash
cp .env.example .env
```

Update `.env` with your MongoDB URI. For local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/travel-service
```

Or for MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travel-service
```

### 4. Start Server

```bash
npm run dev
```

You should see:
```
MongoDB connected successfully
Server running on port 5000
```

✅ Backend is ready at `http://localhost:5000`

## 📚 Quick API Test

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Get All Services
```bash
curl http://localhost:5000/api/services
```

## 🔑 Important Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | User login |
| GET | `/api/services` | No | Get all services |
| POST | `/api/services` | Admin | Create service |
| GET | `/api/offers` | No | Get all offers |
| POST | `/api/bookings` | User | Create booking |
| GET | `/api/bookings/user/my-bookings` | User | Get my bookings |
| POST | `/api/contact` | No | Send message |

## 📁 Folder Structure

```
Backend/
├── src/
│   ├── controllers/     # Business logic (5 files)
│   ├── models/          # Database schemas (5 files)
│   ├── routes/          # API routes (5 files)
│   ├── middleware/      # Auth, validation, error handling
│   └── server.ts        # Main entry point
├── .env                 # Environment variables
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── README.md            # Full documentation
```

## 🔐 Authentication

All protected routes require:
```
Authorization: Bearer <your-token>
```

Admin routes also require `role: 'admin'`

## 📖 For Detailed Information

- **Full API Documentation**: See `README.md`
- **Frontend Integration**: See `INTEGRATION_GUIDE.md`
- **Database Models**: Check `models/` folder
- **Controllers Logic**: Check `controllers/` folder

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| `ECONNREFUSED` | Start MongoDB or use Atlas connection |
| `No token provided` | Include Authorization header with token |
| `CORS error` | Backend is running on port 5000, check FRONTEND_URL in .env |
| `Port 5000 in use` | Change PORT in .env |

## 🛠️ Production Deployment

Before deploying:

1. **Change JWT_SECRET** to a strong random string
2. **Update MONGODB_URI** to production database
3. **Set NODE_ENV** to `production`
4. **Use HTTPS** for all endpoints
5. **Update FRONTEND_URL** to production frontend

Build for production:
```bash
npm run build
npm start
```

## 🎯 Next Steps

1. ✅ Backend is running
2. Set up Frontend (see INTEGRATION_GUIDE.md)
3. Start Frontend dev server
4. Test API connections from React components
5. Customize as needed

## 📞 Support

For detailed API documentation and examples, see `README.md`

---

**Happy coding! 🚀**
