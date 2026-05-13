import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyOptions } from 'jsonwebtoken';

interface AuthRequest extends Request {
  userId?: string;
  userRole?: string;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'dev-secret-key-change-in-production-12345678';
    const decoded = jwt.verify(token, secret) as { userId: string; role: string };
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin only.' });
  }
  next();
};
