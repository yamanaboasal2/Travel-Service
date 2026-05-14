import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    return res.status(200).json({
      message: 'Users retrieved successfully',
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = 'user', phone = '', status = 'active' } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const user = await User.create({ name, email, password: hashedPassword, role, phone, status });

    return res.status(201).json({
      message: 'User created successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        status: user.status
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during user creation' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { password, ...updates } = req.body;
    const payload: Record<string, unknown> = { ...updates };

    if (password) {
      payload.password = await bcrypt.hash(password, await bcrypt.genSalt(10));
    }

    const user = await User.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during user update' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during user deletion' });
  }
};
