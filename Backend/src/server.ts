import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';
import serviceRoutes from './routes/serviceRoutes';
import offerRoutes from './routes/offerRoutes';
import bookingRoutes from './routes/bookingRoutes';
import contactRoutes from './routes/contactRoutes';

// Load environment variables FIRST
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-service';
const NODE_ENV = process.env.NODE_ENV || 'development';
const CORS_ORIGIN = process.env.FRONTEND_URL || 'http://localhost:5174';

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration - IMPORTANT FOR FRONTEND
console.log(`[${new Date().toISOString()}] 🌐 CORS configured for: ${CORS_ORIGIN}`);
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler middleware
app.use(errorHandler);

// Non-blocking Database Connection
const connectDatabase = async () => {
  try {
    console.log(`[${new Date().toISOString()}] Connecting to MongoDB...`);
    console.log(`[${new Date().toISOString()}] MongoDB URI: ${MONGODB_URI.substring(0, MONGODB_URI.indexOf('@'))}@...`);
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`[${new Date().toISOString()}] ✅ MongoDB connected successfully`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[${new Date().toISOString()}] ⚠️  MongoDB Connection Failed:`, errorMessage);
    console.error(`[${new Date().toISOString()}] 📝 Backend will continue without database (some features may not work)`);
  }
};

// Start Express Server FIRST (non-blocking)
const startServer = () => {
  const server = app.listen(PORT, () => {
    console.log(`[${new Date().toISOString()}] ✅ Express Server running on http://localhost:${PORT}`);
    console.log(`[${new Date().toISOString()}] Environment: ${NODE_ENV}`);
    console.log(`[${new Date().toISOString()}] CORS Origin: ${CORS_ORIGIN}`);
    console.log(`[${new Date().toISOString()}] 🎯 Ready to accept requests!`);
  });

  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    console.log(`[${new Date().toISOString()}] SIGTERM signal received: closing HTTP server`);
    server.close(async () => {
      console.log(`[${new Date().toISOString()}] HTTP server closed`);
      try {
        await mongoose.connection.close();
        console.log(`[${new Date().toISOString()}] MongoDB connection closed`);
      } catch (err) {
        console.log(`[${new Date().toISOString()}] MongoDB not connected`);
      }
      process.exit(0);
    });
  });

  // Handle errors on the server
  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`[${new Date().toISOString()}] ❌ Port ${PORT} is already in use!`);
      console.error(`Run: npx kill-port ${PORT}`);
    }
    process.exit(1);
  });
};

// Start the server
startServer();

// Connect to database asynchronously (non-blocking)
connectDatabase();
