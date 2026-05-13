import { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/authController';
import { validationErrorHandler } from '../middleware/validators';
import { protect } from '../middleware/auth';

const router = Router();

// Register
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  validationErrorHandler,
  authController.register
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validationErrorHandler,
  authController.login
);

// Get current user
router.get('/me', protect, authController.getCurrentUser);

export default router;
