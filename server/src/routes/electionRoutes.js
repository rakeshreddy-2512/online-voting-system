import express from 'express';
import Election from '../models/Election.js';
import { adminOnly, protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, async (_req, res) => {
  const elections = await Election.find().sort({ createdAt: -1 });
  res.json(elections);
});

router.post('/', protect, adminOnly, async (req, res) => {
  const election = await Election.create(req.body);
  res.status(201).json(election);
});

export default router;
