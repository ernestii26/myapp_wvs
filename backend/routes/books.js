import express from 'express';
import * as bookController from '../controllers/bookController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);
router.post('/', requireAuth(), bookController.createBook);
router.put('/:id', requireAuth(), bookController.updateBook);
router.delete('/:id', requireAuth(), bookController.deleteBook);

export default router;
