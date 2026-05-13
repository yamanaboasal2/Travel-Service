# Travel Service Website Backend

A complete Node.js/Express backend for a Travel Service Website with MongoDB, JWT authentication, and full CRUD operations.

## Features

- 🔐 **JWT Authentication** with bcrypt password hashing
- 👥 **User Management** with roles (admin/user)
- ✈️ **Service Management** - Create, read, update, delete travel services
- 🎁 **Offers Management** - Manage travel offers and discounts
- 📅 **Booking System** - Complete booking creation and management
- 💌 **Contact Form** - Message submission and management
- ✅ **Input Validation** - Express-validator for all inputs
- 🛡️ **Error Handling** - Global error handling middleware
- 🔒 **Protected Routes** - Admin-only and user-protected endpoints

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. **Clone or navigate to the Backend folder**

```bash
cd Backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update `.env` with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel-service
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
Backend/
├── src/
│   ├── controllers/          # Business logic
│   │   ├── authController.ts
│   │   ├── serviceController.ts
│   │   ├── offerController.ts
│   │   ├── bookingController.ts
│   │   └── contactController.ts
│   ├── models/              # MongoDB schemas
│   │   ├── User.ts
│   │   ├── Service.ts
│   │   ├── Offer.ts
│   │   ├── Booking.ts
│   │   └── Contact.ts
│   ├── routes/              # API routes
│   │   ├── authRoutes.ts
│   │   ├── serviceRoutes.ts
│   │   ├── offerRoutes.ts
│   │   ├── bookingRoutes.ts
│   │   └── contactRoutes.ts
│   ├── middleware/          # Custom middleware
│   │   ├── auth.ts          # JWT authentication & authorization
│   │   ├── errorHandler.ts  # Global error handling
│   │   └── validators.ts    # Validation error handling
│   └── server.ts            # Main server file
├── .env                     # Environment variables
├── .env.example            # Example environment file
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript configuration
```

## API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User

```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: 201
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login

```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Get Current User

```
GET /auth/me
Authorization: Bearer <token>

Response: 200
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Service Endpoints

#### Get All Services

```
GET /services

Response: 200
{
  "message": "Services retrieved successfully",
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Paris City Tour",
      "description": "3-day tour of Paris",
      "price": 499.99,
      "image": "url-to-image",
      "duration": "3 days",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Get Service by ID

```
GET /services/:id

Response: 200
{
  "message": "Service retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Paris City Tour",
    "description": "3-day tour of Paris",
    "price": 499.99,
    "image": "url-to-image",
    "duration": "3 days",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Create Service (Admin Only)

```
POST /services
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Paris City Tour",
  "description": "3-day tour of Paris with guided tours",
  "price": 499.99,
  "image": "url-to-image",
  "duration": "3 days"
}

Response: 201
{
  "message": "Service created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    ...
  }
}
```

#### Update Service (Admin Only)

```
PUT /services/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 599.99
}

Response: 200
{
  "message": "Service updated successfully",
  "data": { ... }
}
```

#### Delete Service (Admin Only)

```
DELETE /services/:id
Authorization: Bearer <admin-token>

Response: 200
{
  "message": "Service deleted successfully"
}
```

### Offer Endpoints

#### Get All Offers

```
GET /offers

Response: 200
{
  "message": "Offers retrieved successfully",
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Summer Discount",
      "description": "Get 20% off on summer travels",
      "discount": 20,
      "image": "url-to-image",
      "serviceId": "507f1f77bcf86cd799439012",
      "expiryDate": "2024-08-31T00:00:00Z",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Create Offer (Admin Only)

```
POST /offers
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Summer Discount",
  "description": "Get 20% off on summer travels",
  "discount": 20,
  "image": "url-to-image",
  "serviceId": "507f1f77bcf86cd799439012",
  "expiryDate": "2024-08-31"
}

Response: 201
{
  "message": "Offer created successfully",
  "data": { ... }
}
```

#### Update Offer (Admin Only)

```
PUT /offers/:id
Authorization: Bearer <admin-token>

Response: 200
{
  "message": "Offer updated successfully",
  "data": { ... }
}
```

#### Delete Offer (Admin Only)

```
DELETE /offers/:id
Authorization: Bearer <admin-token>

Response: 200
{
  "message": "Offer deleted successfully"
}
```

### Booking Endpoints

#### Get User's Bookings

```
GET /bookings/user/my-bookings
Authorization: Bearer <token>

Response: 200
{
  "message": "User bookings retrieved successfully",
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439001",
      "serviceId": {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Paris City Tour",
        "price": 499.99
      },
      "bookingDate": "2024-06-01T00:00:00Z",
      "travelers": 2,
      "specialRequests": "Window seats preferred",
      "status": "confirmed",
      "totalPrice": 999.98,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Get All Bookings (Admin Only)

```
GET /bookings
Authorization: Bearer <admin-token>

Response: 200
{
  "message": "Bookings retrieved successfully",
  "count": 15,
  "data": [ ... ]
}
```

#### Create Booking

```
POST /bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "serviceId": "507f1f77bcf86cd799439012",
  "bookingDate": "2024-06-01",
  "travelers": 2,
  "specialRequests": "Window seats preferred"
}

Response: 201
{
  "message": "Booking created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    ...
  }
}
```

#### Update Booking (Admin Only)

```
PUT /bookings/:id
Authorization: Bearer <admin-token>

{
  "status": "confirmed",
  "travelers": 3
}

Response: 200
{
  "message": "Booking updated successfully",
  "data": { ... }
}
```

#### Cancel Booking

```
PATCH /bookings/:id/cancel
Authorization: Bearer <token>

Response: 200
{
  "message": "Booking cancelled successfully",
  "data": { ... }
}
```

### Contact Endpoints

#### Send Message

```
POST /contact
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Inquiry about services",
  "message": "I would like to know more about your services..."
}

Response: 201
{
  "message": "Message sent successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Inquiry about services",
    "message": "I would like to know more about your services...",
    "status": "new",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Get All Messages (Admin Only)

```
GET /contact
Authorization: Bearer <admin-token>

Response: 200
{
  "message": "Messages retrieved successfully",
  "count": 10,
  "data": [ ... ]
}
```

#### Update Message Status (Admin Only)

```
PATCH /contact/:id/status
Authorization: Bearer <admin-token>

{
  "status": "replied"
}

Response: 200
{
  "message": "Message status updated successfully",
  "data": { ... }
}
```

#### Delete Message (Admin Only)

```
DELETE /contact/:id
Authorization: Bearer <admin-token>

Response: 200
{
  "message": "Message deleted successfully"
}
```

## Response Formats

### Success Response

```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "error": "Error message describing what went wrong"
}
```

### Validation Error Response

```json
{
  "error": "Validation failed",
  "details": [
    {
      "param": "email",
      "msg": "Valid email is required"
    }
  ]
}
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Role-Based Access Control

- **Admin Routes**: `/services/*` (create, update, delete), `/offers/*` (create, update, delete), `/bookings` (get all), `/contact/*`
- **User Routes**: `/bookings` (create, get own), `/auth/me`
- **Public Routes**: `/services` (get), `/offers` (get), `/contact` (send message), `/auth` (register, login)

## Testing with cURL

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

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Protected Route

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your-token>"
```

### Get All Services

```bash
curl -X GET http://localhost:5000/api/services
```

### Create a Service (Admin)

```bash
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{
    "title": "Paris Tour",
    "description": "3-day Paris tour",
    "price": 499.99,
    "duration": "3 days"
  }'
```

## MongoDB Setup

### Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service
3. Update `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/travel-service
```

### MongoDB Atlas (Cloud)

1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Update `.env`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/travel-service
```

## Troubleshooting

### "MongoServerError: connect ECONNREFUSED"

- Ensure MongoDB is running locally OR use MongoDB Atlas
- Check your MONGODB_URI in .env

### "JWT token invalid"

- Token has expired - user needs to login again
- Token is malformed - ensure correct format in Authorization header

### "Cannot find module"

- Run `npm install`
- Ensure you're in the Backend directory

### CORS errors

- Update FRONTEND_URL in .env if frontend is on different port
- Ensure frontend sends requests to correct backend URL

## Security Best Practices

1. **Change JWT_SECRET** in production to a strong, random string
2. **Use HTTPS** in production
3. **Store sensitive data** in .env (never in git)
4. **Validate all inputs** (already implemented with express-validator)
5. **Use strong passwords** (minimum 6 characters enforced)
6. **Implement rate limiting** for production
7. **Use environment variables** for all sensitive configs

## Future Enhancements

- [ ] Email notifications for bookings
- [ ] Payment integration (Stripe, PayPal)
- [ ] Review and rating system
- [ ] Search and filtering
- [ ] User profile management
- [ ] Admin dashboard
- [ ] Booking analytics
- [ ] Password reset functionality
- [ ] Two-factor authentication

## Support

For issues or questions, ensure:

1. MongoDB is running
2. All dependencies are installed (`npm install`)
3. .env file is properly configured
4. Node.js version is 16 or higher
5. Port 5000 is available
