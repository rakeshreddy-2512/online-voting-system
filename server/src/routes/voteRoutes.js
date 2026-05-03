import express from 'express';
import Vote from '../models/Vote.js';
import User from '../models/User.js';
import Election from '../models/Election.js';
import { protect } from '../middleware/auth.js';
import { encryptVote } from '../utils/crypto.js';

const router = express.Router();

export default (io) => {
  router.post('/', protect, async (req, res) => {
    const { electionId, candidateId } = req.body;
    const user = await User.findById(req.user.id);
    if (user.hasVoted) return res.status(400).json({ message: 'You have already voted' });

    const election = await Election.findById(electionId);
    if (!election || !election.isActive) return res.status(404).json({ message: 'Election not found or inactive' });

    const now = new Date();
    if (now < election.startAt || now > election.endAt) {
      return res.status(400).json({ message: 'Voting window closed' });
    }

    const encrypted = encryptVote({ electionId, candidateId, voterId: req.user.id, castAt: now.toISOString() });
    await Vote.create({ election: electionId, voter: req.user.id, ...encrypted });
    user.hasVoted = true;
    await user.save();

    io.emit('vote:cast', { electionId, timestamp: now.toISOString() });
    res.status(201).json({ message: 'Vote cast successfully' });
  });

  return router;
};
