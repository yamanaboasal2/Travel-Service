import { Router } from 'express';
import { body } from 'express-validator';
import * as destinationController from '../controllers/destinationController';
import { validationErrorHandler } from '../middleware/validators';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

router.get('/', destinationController.getAllDestinations);
router.get('/:id', destinationController.getDestinationById);

router.post(
  '/',
  protect,
  adminOnly,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('country').trim().notEmpty().withMessage('Country is required'),
    body('description').trim().notEmpty().withMessage('Description is required')
  ],
  validationErrorHandler,
  destinationController.createDestination
);

router.put('/:id', protect, adminOnly, destinationController.updateDestination);
router.delete('/:id', protect, adminOnly, destinationController.deleteDestination);

export default router;
