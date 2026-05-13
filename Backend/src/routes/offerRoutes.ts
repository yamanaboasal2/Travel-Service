import { Router } from 'express';
import { body } from 'express-validator';
import * as offerController from '../controllers/offerController';
import { validationErrorHandler } from '../middleware/validators';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

// Get all offers
router.get('/', offerController.getAllOffers);

// Get offer by ID
router.get('/:id', offerController.getOfferById);

// Create offer (admin only)
router.post(
  '/',
  protect,
  adminOnly,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('discount')
      .isInt({ min: 0, max: 100 })
      .withMessage('Discount must be between 0 and 100'),
    body('expiryDate').isISO8601().withMessage('Valid expiry date is required')
  ],
  validationErrorHandler,
  offerController.createOffer
);

// Update offer (admin only)
router.put(
  '/:id',
  protect,
  adminOnly,
  offerController.updateOffer
);

// Delete offer (admin only)
router.delete(
  '/:id',
  protect,
  adminOnly,
  offerController.deleteOffer
);

export default router;
