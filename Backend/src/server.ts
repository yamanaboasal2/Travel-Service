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
import destinationRoutes from './routes/destinationRoutes';
import settingsRoutes from './routes/settingsRoutes';
import userRoutes from './routes/userRoutes';
import commentRoutes from './routes/commentRoutes';
import { seedDatabase } from './utils/seedDatabase';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-service';
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_VERCEL = process.env.VERCEL === '1';
const CORS_ORIGIN = process.env.FRONTEND_URL || 'http://localhost:5174';
const allowedOrigins = [
  CORS_ORIGIN,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175',
];

let databaseConnectionPromise: Promise<typeof mongoose> | null = null;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(`[${new Date().toISOString()}] CORS configured for: ${CORS_ORIGIN}`);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  const readyState = mongoose.connection.readyState;
  const databaseStatusMap: Record<number, 'connected' | 'connecting' | 'disconnected' | 'disconnecting'> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  res.status(200).json({
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    database: {
      status: databaseStatusMap[readyState] || 'disconnected',
      healthy: readyState === 1,
    },
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

const connectDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (databaseConnectionPromise) {
    return databaseConnectionPromise;
  }

  try {
    console.log(`[${new Date().toISOString()}] Connecting to MongoDB...`);
    const atIndex = MONGODB_URI.indexOf('@');
    const safeUri = atIndex > -1 ? `${MONGODB_URI.substring(0, atIndex)}@...` : MONGODB_URI;
    console.log(`[${new Date().toISOString()}] MongoDB URI: ${safeUri}`);

    databaseConnectionPromise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    await databaseConnectionPromise;
    await seedDatabase();

    console.log(`[${new Date().toISOString()}] MongoDB connected successfully`);
    return mongoose;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[${new Date().toISOString()}] MongoDB connection failed:`, errorMessage);
    console.error(`[${new Date().toISOString()}] Backend will continue without database (some features may not work)`);
    databaseConnectionPromise = null;
    throw error;
  }
};

const startServer = () => {
  const server = app.listen(PORT, () => {
    console.log(`[${new Date().toISOString()}] Express server running on http://localhost:${PORT}`);
    console.log(`[${new Date().toISOString()}] Environment: ${NODE_ENV}`);
    console.log(`[${new Date().toISOString()}] CORS Origin: ${CORS_ORIGIN}`);
    console.log(`[${new Date().toISOString()}] Ready to accept requests`);
  });

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

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`[${new Date().toISOString()}] Port ${PORT} is already in use`);
      console.error(`Run: npx kill-port ${PORT}`);
    }
    process.exit(1);
  });
};

if (!IS_VERCEL) {
  startServer();
}

connectDatabase().catch(() => {
  // Keep the API available even if MongoDB is temporarily unavailable.
});

export default app;
