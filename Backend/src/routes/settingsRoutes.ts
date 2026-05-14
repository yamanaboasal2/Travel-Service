import { Router } from 'express';
import * as settingsController from '../controllers/settingsController';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

router.get('/', settingsController.getSettings);
router.put('/', protect, adminOnly, settingsController.updateSettings);

export default router;
