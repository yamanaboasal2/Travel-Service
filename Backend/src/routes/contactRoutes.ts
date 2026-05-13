import { Router } from 'express';
import { body } from 'express-validator';
import * as contactController from '../controllers/contactController';
import { validationErrorHandler } from '../middleware/validators';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

// Send message (public)
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').notEmpty().withMessage('Message is required')
  ],
  validationErrorHandler,
  contactController.sendMessage
);

// Get all messages (admin only)
router.get('/', protect, adminOnly, contactController.getAllMessages);

// Get message by ID (admin only)
router.get('/:id', protect, adminOnly, contactController.getMessageById);

// Update message status (admin only)
router.patch(
  '/:id/status',
  protect,
  adminOnly,
  [
    body('status')
      .isIn(['new', 'read', 'replied'])
      .withMessage('Invalid status')
  ],
  validationErrorHandler,
  contactController.updateMessageStatus
);

// Delete message (admin only)
router.delete(
  '/:id',
  protect,
  adminOnly,
  contactController.deleteMessage
);

export default router;
