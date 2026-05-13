# Frontend-Backend Integration Guide

This guide explains how to connect your React frontend with the Node.js/Express backend.

## Backend URL Configuration

Create a utility file for API calls. Create a file `src/utils/api.ts` in your Frontend:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  // Auth endpoints
  auth: {
    register: async (name: string, email: string, password: string) => {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      return response.json();
    },
    login: async (email: string, password: string) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return response.json();
    },
    getCurrentUser: async (token: string) => {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.json();
    }
  },

  // Services endpoints
  services: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/services`);
      return response.json();
    },
    getById: async (id: string) => {
      const response = await fetch(`${API_URL}/services/${id}`);
      return response.json();
    },
    create: async (data: any, token: string) => {
      const response = await fetch(`${API_URL}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    update: async (id: string, data: any, token: string) => {
      const response = await fetch(`${API_URL}/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    delete: async (id: string, token: string) => {
      const response = await fetch(`${API_URL}/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.json();
    }
  },

  // Offers endpoints
  offers: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/offers`);
      return response.json();
    },
    getById: async (id: string) => {
      const response = await fetch(`${API_URL}/offers/${id}`);
      return response.json();
    },
    create: async (data: any, token: string) => {
      const response = await fetch(`${API_URL}/offers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    update: async (id: string, data: any, token: string) => {
      const response = await fetch(`${API_URL}/offers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    delete: async (id: string, token: string) => {
      const response = await fetch(`${API_URL}/offers/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.json();
    }
  },

  // Bookings endpoints
  bookings: {
    getUserBookings: async (token: string) => {
      const response = await fetch(`${API_URL}/bookings/user/my-bookings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.json();
    },
    getById: async (id: string, token: string) => {
      const response = await fetch(`${API_URL}/bookings/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.json();
    },
    create: async (data: any, token: string) => {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    update: async (id: string, data: any, token: string) => {
      const response = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    cancel: async (id: string, token: string) => {
      const response = await fetch(`${API_URL}/bookings/${id}/cancel`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.json();
    }
  },

  // Contact endpoints
  contact: {
    send: async (data: any) => {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    }
  }
};
```

## Environment Variables for Frontend

Create a `.env` file in the Frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## Example: Connecting Home Page

```typescript
// src/app/pages/Home.tsx
import { useEffect, useState } from 'react';
import { api } from '../utils/api';

export default function Home() {
  const [services, setServices] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesRes = await api.services.getAll();
        const offersRes = await api.offers.getAll();
        
        setServices(servicesRes.data || []);
        setOffers(offersRes.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Featured Services</h1>
      {services.map(service => (
        <div key={service._id}>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <p>${service.price}</p>
        </div>
      ))}

      <h1>Special Offers</h1>
      {offers.map(offer => (
        <div key={offer._id}>
          <h3>{offer.title}</h3>
          <p>Discount: {offer.discount}%</p>
        </div>
      ))}
    </div>
  );
}
```

## Example: Authentication in Auth Page

```typescript
// src/app/pages/Auth.tsx
import { useState } from 'react';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      
      if (isLogin) {
        response = await api.auth.login(formData.email, formData.password);
      } else {
        response = await api.auth.register(formData.name, formData.email, formData.password);
      }

      if (response.token) {
        // Store token in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Redirect to home
        navigate('/');
      } else {
        setError(response.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Server error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isLogin && (
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required={!isLogin}
        />
      )}
      
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        required
      />

      {error && <p style={{color: 'red'}}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
      </button>

      <button 
        type="button"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Need to register?' : 'Already have account?'}
      </button>
    </form>
  );
}
```

## Example: Creating a Booking

```typescript
// src/app/pages/Booking.tsx
import { useState } from 'react';
import { api } from '../utils/api';

export default function Booking({ serviceId }: { serviceId: string }) {
  const [formData, setFormData] = useState({
    serviceId,
    bookingDate: '',
    travelers: 1,
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to make a booking');
        return;
      }

      const response = await api.bookings.create(formData, token);
      
      if (response.data) {
        setSuccess(true);
        alert('Booking created successfully!');
      } else {
        alert(response.error || 'Booking failed');
      }
    } catch (error) {
      alert('Error creating booking');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={formData.bookingDate}
        onChange={(e) => setFormData({...formData, bookingDate: e.target.value})}
        required
      />

      <input
        type="number"
        min="1"
        value={formData.travelers}
        onChange={(e) => setFormData({...formData, travelers: parseInt(e.target.value)})}
        required
      />

      <textarea
        placeholder="Special requests"
        value={formData.specialRequests}
        onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Booking...' : 'Book Now'}
      </button>

      {success && <p style={{color: 'green'}}>Booking confirmed!</p>}
    </form>
  );
}
```

## Example: Submitting Contact Form

```typescript
// src/app/pages/Contact.tsx
import { useState } from 'react';
import { api } from '../utils/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.contact.send(formData);
      
      if (response.data) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        alert('Thank you for your message!');
      } else {
        alert(response.error || 'Failed to send message');
      }
    } catch (error) {
      alert('Error sending message');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />

      <input
        type="email"
        placeholder="Your email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />

      <input
        type="text"
        placeholder="Subject"
        value={formData.subject}
        onChange={(e) => setFormData({...formData, subject: e.target.value})}
        required
      />

      <textarea
        placeholder="Your message"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>

      {submitted && <p style={{color: 'green'}}>Message sent successfully!</p>}
    </form>
  );
}
```

## Authentication Context (Optional but Recommended)

Create a reusable auth context:

```typescript
// src/utils/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isAuthenticated: !!token
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

## Running Backend and Frontend Together

1. **Terminal 1 - Backend:**

```bash
cd Backend
npm run dev
```

Backend runs on `http://localhost:5000`

2. **Terminal 2 - Frontend:**

```bash
cd Frontend
npm run dev
```

Frontend runs on `http://localhost:5173`

## CORS Configuration

The backend already has CORS configured to accept requests from `http://localhost:5173`.

To allow a different frontend URL, update Backend `.env`:

```env
FRONTEND_URL=http://your-frontend-url:port
```

## Token Storage and Security

Currently using localStorage. For production, consider:

- **HttpOnly Cookies**: More secure, not accessible via JavaScript
- **Secure tokens**: Use refresh tokens for longer sessions
- **Token refresh**: Automatically refresh expired tokens

## Common Issues

### CORS Errors

```
Access to XMLHttpRequest at 'http://localhost:5000/api/...' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution**: Ensure backend CORS is properly configured and backend is running.

### 401 Unauthorized

```json
{ "error": "No token provided" }
```

**Solution**: Include valid token in Authorization header:

```javascript
headers: { 'Authorization': `Bearer ${token}` }
```

### 404 Not Found

```json
{ "error": "Route not found" }
```

**Solution**: Verify API URL and endpoint path. Check if backend is running.

### MongoDB Connection Error

```
MongoServerError: connect ECONNREFUSED
```

**Solution**: Ensure MongoDB is running or use MongoDB Atlas connection string.

## Next Steps

1. Set up MongoDB locally or use MongoDB Atlas
2. Install backend dependencies: `npm install` in Backend folder
3. Start backend: `npm run dev`
4. Update frontend API utility with backend endpoints
5. Test API calls from frontend components
6. Store authentication tokens properly
7. Handle errors and loading states in UI
