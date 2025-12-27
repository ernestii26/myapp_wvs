import express from 'express';
import * as postController from '../controllers/postController.js';
import { requireAuth } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
// router.post('/', upload.array('images', 5), postController.createPost);
router.post('/', upload.array('images', 5), postController.createPost);
router.put('/:id', requireAuth(), postController.updatePost);
router.delete('/:id', requireAuth(), postController.deletePost);

export default router;
