import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Request, Response } from 'express';
import User from '../models/User';

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'yamanabuasal20@gmail.com';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '123';

const generateToken = (userId: string, role: string): string => {
  const secret = (process.env.JWT_SECRET || 'dev-secret-key-change-in-production-12345678') as string;
  return jwt.sign(
    { userId, role },
    secret,
    { expiresIn: process.env.JWT_EXPIRE || '7d' } as any
  );
};

const hashResetToken = (token: string) => crypto.createHash('sha256').update(token).digest('hex');

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    await user.save();

    const token = generateToken(user._id.toString(), user.role);

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during registration' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const isDefaultAdminLogin = normalizedEmail === DEFAULT_ADMIN_EMAIL.toLowerCase() && password === DEFAULT_ADMIN_PASSWORD;

    // Find user and include password
    let user: any = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user && isDefaultAdminLogin) {
      const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
      user = await User.create({
        name: 'Yaman Abu Asal',
        email: normalizedEmail,
        password: hashedPassword,
        role: 'admin',
        status: 'active'
      });
      user = await User.findById(user._id).select('+password');
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (isDefaultAdminLogin && (user.role !== 'admin' || user.status !== 'active')) {
      user.role = 'admin';
      user.status = 'active';
      user.password = await bcrypt.hash(password, await bcrypt.genSalt(10));
    }

    if (user.status === 'blocked') {
      return res.status(403).json({ error: 'This account is blocked' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = generateToken(user._id.toString(), user.role);

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during login' });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Please provide an email' });
    }

    const user: any = await User.findOne({ email: email.trim().toLowerCase() }).select('+resetPasswordToken +resetPasswordExpires');

    if (!user) {
      return res.status(404).json({ error: 'No account found with this email' });
    }

    const resetToken = crypto.randomBytes(24).toString('hex');
    user.resetPasswordToken = hashResetToken(resetToken);
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    return res.status(200).json({
      message: 'Password reset verified. You can set a new password now.',
      resetToken
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during password reset request' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: 'Reset token and new password are required' });
    }

    if (password.length < 3) {
      return res.status(400).json({ error: 'Password must be at least 3 characters' });
    }

    const user: any = await User.findOne({
      resetPasswordToken: hashResetToken(token),
      resetPasswordExpires: { $gt: new Date() }
    }).select('+password +resetPasswordToken +resetPasswordExpires');

    if (!user) {
      return res.status(400).json({ error: 'Reset link is invalid or expired' });
    }

    user.password = await bcrypt.hash(password, await bcrypt.genSalt(10));
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    user.status = 'active';
    await user.save();

    const authToken = generateToken(user._id.toString(), user.role);

    return res.status(200).json({
      message: 'Password reset successfully',
      token: authToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during password reset' });
  }
};
