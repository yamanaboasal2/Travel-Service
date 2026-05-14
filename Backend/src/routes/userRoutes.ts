import { Router } from 'express';
import { body } from 'express-validator';
import * as userController from '../controllers/userController';
import { validationErrorHandler } from '../middleware/validators';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

router.use(protect, adminOnly);

router.get('/', userController.getAllUsers);
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters')
  ],
  validationErrorHandler,
  userController.createUser
);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
