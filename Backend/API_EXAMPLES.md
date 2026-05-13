# API Examples - Real Working Requests

Use these examples to test the API with cURL, Postman, or Insomnia.

## Authentication Examples

### 1. Register New User

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@email.com",
    "password": "SecurePass123"
  }'
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzlhMzQ5ZDJjZjMzMjAwMTJmNDU2YzAiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3MDkyMzU2MCwiZXhwIjoxNjcxNTI4MzYwfQ.xyz",
  "user": {
    "id": "639a349d2cf33200012f456c0",
    "name": "John Doe",
    "email": "john.doe@email.com",
    "role": "user"
  }
}
```

---

### 2. Login User

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@email.com",
    "password": "SecurePass123"
  }'
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "639a349d2cf33200012f456c0",
    "name": "John Doe",
    "email": "john.doe@email.com",
    "role": "user"
  }
}
```

**Save the token for protected requests:**
```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 3. Get Current User

**Request:**
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/auth/me
```

**Response (200):**
```json
{
  "user": {
    "id": "639a349d2cf33200012f456c0",
    "name": "John Doe",
    "email": "john.doe@email.com",
    "role": "user"
  }
}
```

---

## Services Endpoints

### 1. Get All Services

**Request:**
```bash
curl http://localhost:5000/api/services
```

**Response (200):**
```json
{
  "message": "Services retrieved successfully",
  "count": 3,
  "data": [
    {
      "_id": "639a349d2cf33200012f456c1",
      "title": "Paris City Tour",
      "description": "Experience the magic of Paris with our comprehensive 3-day city tour",
      "price": 599.99,
      "image": "https://example.com/paris.jpg",
      "duration": "3 days",
      "createdAt": "2023-01-15T10:30:00Z"
    },
    {
      "_id": "639a349d2cf33200012f456c2",
      "title": "Swiss Alps Adventure",
      "description": "Mountain hiking and scenic views in the Swiss Alps",
      "price": 799.99,
      "image": "https://example.com/alps.jpg",
      "duration": "5 days",
      "createdAt": "2023-01-15T10:30:00Z"
    }
  ]
}
```

---

### 2. Get Service by ID

**Request:**
```bash
curl http://localhost:5000/api/services/639a349d2cf33200012f456c1
```

**Response (200):**
```json
{
  "message": "Service retrieved successfully",
  "data": {
    "_id": "639a349d2cf33200012f456c1",
    "title": "Paris City Tour",
    "description": "Experience the magic of Paris with our comprehensive 3-day city tour",
    "price": 599.99,
    "image": "https://example.com/paris.jpg",
    "duration": "3 days",
    "createdAt": "2023-01-15T10:30:00Z"
  }
}
```

---

### 3. Create Service (Admin Only)

First, create an admin account or update a user to admin role in MongoDB.

**Request:**
```bash
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{
    "title": "Tokyo Japan Adventure",
    "description": "Explore ancient temples, modern technology, and delicious cuisine",
    "price": 1299.99,
    "image": "https://example.com/tokyo.jpg",
    "duration": "7 days"
  }'
```

**Response (201):**
```json
{
  "message": "Service created successfully",
  "data": {
    "_id": "639a349d2cf33200012f456c3",
    "title": "Tokyo Japan Adventure",
    "description": "Explore ancient temples, modern technology, and delicious cuisine",
    "price": 1299.99,
    "image": "https://example.com/tokyo.jpg",
    "duration": "7 days",
    "createdAt": "2023-01-16T10:30:00Z"
  }
}
```

---

### 4. Update Service (Admin Only)

**Request:**
```bash
curl -X PUT http://localhost:5000/api/services/639a349d2cf33200012f456c3 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{
    "price": 1399.99,
    "duration": "8 days"
  }'
```

**Response (200):**
```json
{
  "message": "Service updated successfully",
  "data": {
    "_id": "639a349d2cf33200012f456c3",
    "title": "Tokyo Japan Adventure",
    "description": "Explore ancient temples, modern technology, and delicious cuisine",
    "price": 1399.99,
    "image": "https://example.com/tokyo.jpg",
    "duration": "8 days",
    "createdAt": "2023-01-16T10:30:00Z"
  }
}
```

---

### 5. Delete Service (Admin Only)

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/services/639a349d2cf33200012f456c3 \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**Response (200):**
```json
{
  "message": "Service deleted successfully"
}
```

---

## Offers Endpoints

### 1. Get All Offers

**Request:**
```bash
curl http://localhost:5000/api/offers
```

**Response (200):**
```json
{
  "message": "Offers retrieved successfully",
  "count": 2,
  "data": [
    {
      "_id": "639a349d2cf33200012f456d1",
      "title": "Summer Discount 2024",
      "description": "Get 20% off on all summer travel packages",
      "discount": 20,
      "image": "https://example.com/summer-offer.jpg",
      "serviceId": "639a349d2cf33200012f456c1",
      "expiryDate": "2024-08-31T23:59:59Z",
      "createdAt": "2023-06-01T10:30:00Z"
    }
  ]
}
```

---

### 2. Create Offer (Admin Only)

**Request:**
```bash
curl -X POST http://localhost:5000/api/offers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{
    "title": "Early Bird Special",
    "description": "Book 3 months in advance and save 25%",
    "discount": 25,
    "image": "https://example.com/early-bird.jpg",
    "serviceId": "639a349d2cf33200012f456c1",
    "expiryDate": "2024-12-31"
  }'
```

**Response (201):**
```json
{
  "message": "Offer created successfully",
  "data": {
    "_id": "639a349d2cf33200012f456d2",
    "title": "Early Bird Special",
    "description": "Book 3 months in advance and save 25%",
    "discount": 25,
    "image": "https://example.com/early-bird.jpg",
    "serviceId": "639a349d2cf33200012f456c1",
    "expiryDate": "2024-12-31T00:00:00Z",
    "createdAt": "2023-06-01T10:30:00Z"
  }
}
```

---

## Booking Endpoints

### 1. Get User's Bookings

**Request:**
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/bookings/user/my-bookings
```

**Response (200):**
```json
{
  "message": "User bookings retrieved successfully",
  "count": 2,
  "data": [
    {
      "_id": "639a349d2cf33200012f456e1",
      "userId": "639a349d2cf33200012f456c0",
      "serviceId": {
        "_id": "639a349d2cf33200012f456c1",
        "title": "Paris City Tour",
        "price": 599.99
      },
      "bookingDate": "2024-06-15T00:00:00Z",
      "travelers": 2,
      "specialRequests": "Window seats preferred, vegetarian meals",
      "status": "confirmed",
      "totalPrice": 1199.98,
      "createdAt": "2023-06-01T10:30:00Z",
      "updatedAt": "2023-06-01T10:30:00Z"
    }
  ]
}
```

---

### 2. Create Booking

**Request:**
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "serviceId": "639a349d2cf33200012f456c1",
    "bookingDate": "2024-07-15",
    "travelers": 3,
    "specialRequests": "Hotel near Eiffel Tower, breakfast included"
  }'
```

**Response (201):**
```json
{
  "message": "Booking created successfully",
  "data": {
    "_id": "639a349d2cf33200012f456e2",
    "userId": "639a349d2cf33200012f456c0",
    "serviceId": {
      "_id": "639a349d2cf33200012f456c1",
      "title": "Paris City Tour",
      "price": 599.99
    },
    "bookingDate": "2024-07-15T00:00:00Z",
    "travelers": 3,
    "specialRequests": "Hotel near Eiffel Tower, breakfast included",
    "status": "pending",
    "totalPrice": 1799.97,
    "createdAt": "2023-06-01T10:30:00Z",
    "updatedAt": "2023-06-01T10:30:00Z"
  }
}
```

---

### 3. Update Booking (Admin Only)

**Request:**
```bash
curl -X PUT http://localhost:5000/api/bookings/639a349d2cf33200012f456e2 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{
    "status": "confirmed",
    "travelers": 4
  }'
```

**Response (200):**
```json
{
  "message": "Booking updated successfully",
  "data": {
    "_id": "639a349d2cf33200012f456e2",
    "userId": "639a349d2cf33200012f456c0",
    "serviceId": "639a349d2cf33200012f456c1",
    "bookingDate": "2024-07-15T00:00:00Z",
    "travelers": 4,
    "specialRequests": "Hotel near Eiffel Tower, breakfast included",
    "status": "confirmed",
    "totalPrice": 2399.96,
    "createdAt": "2023-06-01T10:30:00Z",
    "updatedAt": "2023-06-02T10:30:00Z"
  }
}
```

---

### 4. Cancel Booking

**Request:**
```bash
curl -X PATCH http://localhost:5000/api/bookings/639a349d2cf33200012f456e2/cancel \
  -H "Authorization: Bearer $TOKEN"
```

**Response (200):**
```json
{
  "message": "Booking cancelled successfully",
  "data": {
    "_id": "639a349d2cf33200012f456e2",
    "userId": "639a349d2cf33200012f456c0",
    "serviceId": "639a349d2cf33200012f456c1",
    "bookingDate": "2024-07-15T00:00:00Z",
    "travelers": 4,
    "specialRequests": "Hotel near Eiffel Tower, breakfast included",
    "status": "cancelled",
    "totalPrice": 2399.96,
    "createdAt": "2023-06-01T10:30:00Z",
    "updatedAt": "2023-06-02T11:00:00Z"
  }
}
```

---

## Contact Endpoints

### 1. Send Contact Message

**Request:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah Smith",
    "email": "sarah@example.com",
    "subject": "Inquiry about group bookings",
    "message": "Hi, I am interested in organizing a group trip for 50 people. Can you provide more information about group discounts and packages?"
  }'
```

**Response (201):**
```json
{
  "message": "Message sent successfully",
  "data": {
    "_id": "639a349d2cf33200012f456f1",
    "name": "Sarah Smith",
    "email": "sarah@example.com",
    "subject": "Inquiry about group bookings",
    "message": "Hi, I am interested in organizing a group trip for 50 people. Can you provide more information about group discounts and packages?",
    "status": "new",
    "createdAt": "2023-06-02T10:30:00Z"
  }
}
```

---

### 2. Get All Messages (Admin Only)

**Request:**
```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  http://localhost:5000/api/contact
```

**Response (200):**
```json
{
  "message": "Messages retrieved successfully",
  "count": 5,
  "data": [
    {
      "_id": "639a349d2cf33200012f456f1",
      "name": "Sarah Smith",
      "email": "sarah@example.com",
      "subject": "Inquiry about group bookings",
      "message": "Hi, I am interested in organizing a group trip for 50 people...",
      "status": "new",
      "createdAt": "2023-06-02T10:30:00Z"
    }
  ]
}
```

---

### 3. Update Message Status (Admin Only)

**Request:**
```bash
curl -X PATCH http://localhost:5000/api/contact/639a349d2cf33200012f456f1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{
    "status": "replied"
  }'
```

**Response (200):**
```json
{
  "message": "Message status updated successfully",
  "data": {
    "_id": "639a349d2cf33200012f456f1",
    "name": "Sarah Smith",
    "email": "sarah@example.com",
    "subject": "Inquiry about group bookings",
    "message": "Hi, I am interested in organizing a group trip for 50 people...",
    "status": "replied",
    "createdAt": "2023-06-02T10:30:00Z"
  }
}
```

---

## Error Examples

### 1. Missing Required Field

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "password": "SecurePass123"
  }'
```

**Response (400):**
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

---

### 2. Unauthorized Access

**Request (without token):**
```bash
curl http://localhost:5000/api/auth/me
```

**Response (401):**
```json
{
  "error": "No token provided"
}
```

---

### 3. Admin Only Route

**Request (non-admin user trying to create service):**
```bash
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -d '{
    "title": "Test Service",
    "description": "Test",
    "price": 100
  }'
```

**Response (403):**
```json
{
  "error": "Access denied. Admin only."
}
```

---

### 4. Not Found

**Request:**
```bash
curl http://localhost:5000/api/services/invalid-id
```

**Response (404):**
```json
{
  "error": "Service not found"
}
```

---

## Testing Workflow

1. **Register a user**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@test.com","password":"password123"}'
   ```
   Save the token

2. **Get all services**
   ```bash
   curl http://localhost:5000/api/services
   ```

3. **Create a booking**
   ```bash
   curl -X POST http://localhost:5000/api/bookings \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"serviceId":"<service-id>","bookingDate":"2024-07-15","travelers":2}'
   ```

4. **Get your bookings**
   ```bash
   curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:5000/api/bookings/user/my-bookings
   ```

5. **Send a contact message**
   ```bash
   curl -X POST http://localhost:5000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test message"}'
   ```

---

**Happy testing! 🚀**
