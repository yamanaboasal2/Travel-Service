# Backend Project Structure - Complete Overview

This file shows the complete structure of the Travel Service Backend.

## 📁 Full Directory Tree

```
Backend/
│
├── src/                                    # Source code
│   ├── controllers/
│   │   ├── authController.ts              # User registration, login, get current user
│   │   ├── serviceController.ts           # Services CRUD
│   │   ├── offerController.ts             # Offers CRUD
│   │   ├── bookingController.ts           # Bookings management
│   │   └── contactController.ts           # Contact messages
│   │
│   ├── models/
│   │   ├── User.ts                        # User schema (name, email, password, role)
│   │   ├── Service.ts                     # Service schema (title, price, description)
│   │   ├── Offer.ts                       # Offer schema (discount, expiry date)
│   │   ├── Booking.ts                     # Booking schema (date, travelers, status)
│   │   └── Contact.ts                     # Contact schema (message, status)
│   │
│   ├── routes/
│   │   ├── authRoutes.ts                  # Auth endpoints
│   │   ├── serviceRoutes.ts               # Service endpoints
│   │   ├── offerRoutes.ts                 # Offer endpoints
│   │   ├── bookingRoutes.ts               # Booking endpoints
│   │   └── contactRoutes.ts               # Contact endpoints
│   │
│   ├── middleware/
│   │   ├── auth.ts                        # JWT verification, role checking
│   │   ├── errorHandler.ts                # Global error handling
│   │   └── validators.ts                  # Validation middleware
│   │
│   └── server.ts                          # Main application entry point
│
├── dist/                                  # Compiled JavaScript (generated)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── node_modules/                          # Dependencies (generated after npm install)
│
├── .env                                   # Environment variables (local development)
├── .env.example                           # Environment template
├── .gitignore                             # Git ignore file
├── package.json                           # Dependencies and scripts
├── tsconfig.json                          # TypeScript configuration
│
└── Documentation Files (READ THESE):
    ├── INDEX.md                           # 📍 START HERE - Documentation guide
    ├── QUICKSTART.md                      # Quick setup (5 minutes)
    ├── README.md                          # Full API reference documentation
    ├── INTEGRATION_GUIDE.md               # Frontend integration examples
    ├── API_EXAMPLES.md                    # Real working examples with cURL
    ├── BACKEND_SUMMARY.md                 # Features overview
    ├── MONGODB_SETUP.md                   # Database setup guide
    ├── DEPLOYMENT_GUIDE.md                # Production deployment guide
    └── PROJECT_STRUCTURE.md               # This file
```

## 📊 File Count Summary

| Category | Count | Files |
|----------|-------|-------|
| Controllers | 5 | authController, serviceController, offerController, bookingController, contactController |
| Models | 5 | User, Service, Offer, Booking, Contact |
| Routes | 5 | authRoutes, serviceRoutes, offerRoutes, bookingRoutes, contactRoutes |
| Middleware | 3 | auth, errorHandler, validators |
| Config | 4 | .env, .env.example, .gitignore, tsconfig.json |
| Documentation | 8 | INDEX, QUICKSTART, README, INTEGRATION_GUIDE, API_EXAMPLES, BACKEND_SUMMARY, MONGODB_SETUP, DEPLOYMENT_GUIDE |
| **TOTAL** | **30** | **Complete Production-Ready Backend** |

## 🔄 Request Flow Diagram

```
Client (React App)
    ↓
GET/POST/PUT/DELETE http://localhost:5000/api/...
    ↓
Express Server (server.ts)
    ↓
CORS & Body Parsing Middleware
    ↓
Route Handler (e.g., /api/services)
    ├→ Service Routes (serviceRoutes.ts)
    │   ↓
    ├→ Validation Middleware
    │   ↓
    ├→ Auth Middleware (if protected)
    │   ↓
    └→ Controller (serviceController.ts)
        ↓
    MongoDB Models (Service.ts)
        ↓
    MongoDB Database
        ↓
    JSON Response
    ↓
Client Receives Response
```

## 📡 API Endpoint Structure

```
/api
├── /auth
│   ├── POST /register      (authController.register)
│   ├── POST /login         (authController.login)
│   └── GET /me             (authController.getCurrentUser) - Protected
├── /services
│   ├── GET /               (serviceController.getAllServices)
│   ├── GET /:id            (serviceController.getServiceById)
│   ├── POST /              (serviceController.createService) - Admin
│   ├── PUT /:id            (serviceController.updateService) - Admin
│   └── DELETE /:id         (serviceController.deleteService) - Admin
├── /offers
│   ├── GET /               (offerController.getAllOffers)
│   ├── GET /:id            (offerController.getOfferById)
│   ├── POST /              (offerController.createOffer) - Admin
│   ├── PUT /:id            (offerController.updateOffer) - Admin
│   └── DELETE /:id         (offerController.deleteOffer) - Admin
├── /bookings
│   ├── GET /               (bookingController.getAllBookings) - Admin
│   ├── GET /user/my-bookings (bookingController.getUserBookings) - Protected
│   ├── GET /:id            (bookingController.getBookingById) - Protected
│   ├── POST /              (bookingController.createBooking) - Protected
│   ├── PUT /:id            (bookingController.updateBooking) - Admin
│   └── PATCH /:id/cancel   (bookingController.cancelBooking) - Protected
└── /contact
    ├── POST /              (contactController.sendMessage)
    ├── GET /               (contactController.getAllMessages) - Admin
    ├── GET /:id            (contactController.getMessageById) - Admin
    ├── PATCH /:id/status   (contactController.updateMessageStatus) - Admin
    └── DELETE /:id         (contactController.deleteMessage) - Admin
```

## 🗄️ Database Schema Overview

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  createdAt: Date
}
```

### Service Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  price: Number,
  image: String,
  duration: String,
  createdAt: Date
}
```

### Offer Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  discount: Number (0-100),
  image: String,
  serviceId: ObjectId (ref: Service),
  expiryDate: Date,
  createdAt: Date
}
```

### Booking Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  serviceId: ObjectId (ref: Service),
  bookingDate: Date,
  travelers: Number,
  specialRequests: String,
  status: String (enum: ['pending', 'confirmed', 'cancelled', 'completed']),
  totalPrice: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  status: String (enum: ['new', 'read', 'replied']),
  createdAt: Date
}
```

## 🔐 Security Layers

```
1. CORS Middleware
   ↓ (Check origin)
2. Body Parser Middleware
   ↓ (Parse JSON)
3. Input Validation Middleware
   ↓ (Validate fields)
4. Authentication Middleware
   ↓ (Verify JWT token)
5. Authorization Middleware
   ↓ (Check role)
6. Controller Logic
   ↓ (Business logic)
7. Database Operations
   ↓ (MongoDB)
8. Error Handler Middleware
   ↓ (Catch errors)
9. Response Sent to Client
```

## 📦 Dependencies Tree

```
express
├── express-validator (input validation)
├── cors (cross-origin requests)
└── [built-in features for routing, middleware]

mongoose (MongoDB ODM)
└── Connects to MongoDB

jsonwebtoken (JWT tokens)
└── Token generation and verification

bcryptjs (password hashing)
└── Secure password storage

dotenv (environment variables)
└── Load .env configuration

nodemailer (optional - future email feature)
└── Email sending capability
```

## 🔄 Authentication Flow

```
1. User Registers/Logs In
   ↓
2. Password Hashed with Bcrypt
   ↓
3. User Saved to MongoDB
   ↓
4. JWT Token Generated
   ↓
5. Token Returned to Frontend
   ↓
6. Frontend Stores Token (localStorage)
   ↓
7. For Protected Requests:
   a) Frontend sends token in Authorization header
   b) Auth middleware verifies token
   c) Request proceeds if valid
   d) 401/403 if invalid/unauthorized
```

## 📝 Middleware Chain

```
Request → 
  ↓
Express App
  ↓
CORS Middleware
  ↓
Body Parser (JSON, URL-encoded)
  ↓
Route Handler
  ↓
Input Validation Middleware (if POST/PUT/PATCH)
  ↓
Auth Middleware (if protected route)
  ↓
Admin Check (if admin route)
  ↓
Controller Function
  ↓
Response or Error
  ↓
Error Handler Middleware
  ↓
Client Response
```

## 🎯 Development Workflow

```
1. Write Code (TypeScript in src/)
   ↓
2. npm run dev (auto-reload with nodemon)
   ↓
3. Test with cURL/Postman
   ↓
4. Fix bugs/issues
   ↓
5. Ready for production:
   npm run build (compile TypeScript → JavaScript)
   ↓
6. npm start (run compiled dist/server.js)
   ↓
7. Deploy to hosting platform
```

## 🚀 Scaling Architecture

```
Load Balancer (Nginx/HAProxy)
    ↙    ↓    ↘
    ↓    ↓    ↓
Backend 1  Backend 2  Backend 3
    ↓    ↓    ↓
    ↘    ↓    ↙
    MongoDB Cluster
    ↓ (with sharding)
    ↓
    Replica Sets (for high availability)
```

## 📊 Technology Stack

```
Runtime: Node.js (v16+)
Language: TypeScript
Framework: Express.js
Database: MongoDB
Authentication: JWT + Bcrypt
Validation: Express-validator
Logging: Console (can add Winston)
Testing: Jest (can be added)
Deployment: Heroku/AWS/Railway/DigitalOcean
```

## 🔧 Configuration Priority

```
Environment Variables (.env)
    ↓ (highest priority)
Environment Values
    ↓
Default Values in Code
    ↓ (lowest priority)
```

## 📈 Performance Considerations

```
1. Database Indexing
   - Email index on Users
   - UserId index on Bookings
   - ServiceId index on Bookings

2. Caching (future)
   - Redis for session storage
   - Cache popular services

3. Connection Pooling
   - MongoDB connection pool
   - Reuse connections

4. API Response Optimization
   - Lean queries
   - Field projection
```

## ✅ Deployment Checklist Structure

```
□ Code
  ├─ npm run build
  ├─ No console.logs in production
  └─ Error handling complete

□ Configuration
  ├─ All env variables set
  ├─ JWT_SECRET strong and private
  ├─ MONGODB_URI production
  └─ Frontend URL correct

□ Database
  ├─ MongoDB secure
  ├─ Backups configured
  ├─ Indexes created
  └─ Collections validated

□ Deployment
  ├─ Platform chosen
  ├─ Domain configured
  ├─ SSL/HTTPS enabled
  └─ Monitoring set up

□ Testing
  ├─ All endpoints tested
  ├─ Error cases handled
  ├─ Load testing done
  └─ Security audit complete
```

---

## 📚 File Organization

### By Purpose

**Authentication:**
- authController.ts
- authRoutes.ts
- auth.ts (middleware)

**Services:**
- serviceController.ts
- serviceRoutes.ts
- Service.ts (model)

**Bookings:**
- bookingController.ts
- bookingRoutes.ts
- Booking.ts (model)

**Contact:**
- contactController.ts
- contactRoutes.ts
- Contact.ts (model)

**Infrastructure:**
- server.ts
- errorHandler.ts
- validators.ts

### By Layer

**Presentation Layer:**
- routes/* (API endpoints)

**Business Logic Layer:**
- controllers/* (business logic)

**Data Layer:**
- models/* (database schemas)

**Middleware Layer:**
- middleware/* (cross-cutting concerns)

---

**Complete structure for scalable, maintainable backend! 🏗️**
