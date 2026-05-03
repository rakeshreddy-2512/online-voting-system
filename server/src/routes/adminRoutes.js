import express from 'express';
import { adminOnly, protect } from '../middleware/auth.js';
import Election from '../models/Election.js';
import User from '../models/User.js';
import { getElectionAnalytics } from '../services/analyticsService.js';

const router = express.Router();

router.get('/dashboard', protect, adminOnly, async (_req, res) => {
  const [users, elections] = await Promise.all([User.countDocuments(), Election.countDocuments()]);
  res.json({ users, elections });
});

router.get('/analytics/:electionId', protect, adminOnly, async (req, res) => {
  const analytics = await getElectionAnalytics(req.params.electionId);
  res.json(analytics);
});

export default router;
