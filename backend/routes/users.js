import express from 'express';
import * as userController from '../controllers/userController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', requireAuth(), userController.updateUser);
router.delete('/:id', requireAuth(), userController.deleteUser);

export default router;
