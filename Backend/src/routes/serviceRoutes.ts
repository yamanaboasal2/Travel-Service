import { Router } from 'express';
import { body } from 'express-validator';
import * as serviceController from '../controllers/serviceController';
import { validationErrorHandler } from '../middleware/validators';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

// Get all services
router.get('/', serviceController.getAllServices);

// Get service by ID
router.get('/:id', serviceController.getServiceById);

// Create service (admin only)
router.post(
  '/',
  protect,
  adminOnly,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number')
  ],
  validationErrorHandler,
  serviceController.createService
);

// Update service (admin only)
router.put(
  '/:id',
  protect,
  adminOnly,
  serviceController.updateService
);

// Delete service (admin only)
router.delete(
  '/:id',
  protect,
  adminOnly,
  serviceController.deleteService
);

export default router;
