import { Router } from 'express';
import { body } from 'express-validator';
import * as bookingController from '../controllers/bookingController';
import { validationErrorHandler } from '../middleware/validators';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

// Get all bookings (admin only)
router.get('/', protect, adminOnly, bookingController.getAllBookings);

// Get user's bookings
router.get('/user/my-bookings', protect, bookingController.getUserBookings);

// Get booking by ID
router.get('/:id', protect, bookingController.getBookingById);

// Create booking
router.post(
  '/',
  [
    body('serviceId').optional().notEmpty().withMessage('Service ID is required'),
    body('packageId').optional().notEmpty().withMessage('Package ID is required'),
    body('bookingDate').isISO8601().withMessage('Valid booking date is required'),
    body('travelers').isInt({ min: 1 }).withMessage('Travelers must be at least 1')
  ],
  validationErrorHandler,
  bookingController.createBooking
);

// Update booking (admin only)
router.put(
  '/:id',
  protect,
  adminOnly,
  bookingController.updateBooking
);

// Cancel booking (protected)
router.patch(
  '/:id/cancel',
  protect,
  bookingController.cancelBooking
);

// Delete booking (admin only)
router.delete(
  '/:id',
  protect,
  adminOnly,
  bookingController.deleteBooking
);

export default router;
