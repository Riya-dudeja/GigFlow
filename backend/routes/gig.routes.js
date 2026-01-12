import express from 'express';
import {
  getGigs,
  getGig,
  createGig,
  updateGig,
  deleteGig,
  getMyGigs
} from '../controllers/gig.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getGigs);
router.get('/my/posted', protect, getMyGigs);
router.get('/:id', getGig);
router.post('/', protect, createGig);
router.put('/:id', protect, updateGig);
router.delete('/:id', protect, deleteGig);

export default router;
