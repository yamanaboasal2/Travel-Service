import { Router } from 'express';
import { body } from 'express-validator';
import * as commentController from '../controllers/commentController';
import { validationErrorHandler } from '../middleware/validators';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

router.get('/', commentController.getPublishedComments);
router.get('/admin/all', protect, adminOnly, commentController.getAllComments);

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('city').trim().notEmpty().withMessage('City is required'),
    body('comment').trim().notEmpty().withMessage('Comment is required')
  ],
  validationErrorHandler,
  commentController.createComment
);

router.put('/:id', protect, adminOnly, commentController.updateComment);
router.delete('/:id', protect, adminOnly, commentController.deleteComment);

export default router;
