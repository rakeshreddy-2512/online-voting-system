import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const tokenFor = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already exists' });

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashed, role: role || 'voter' });
  return res.status(201).json({ token: tokenFor(user._id), user: { id: user._id, name, email, role: user.role } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  return res.json({ token: tokenFor(user._id), user: { id: user._id, name: user.name, email, role: user.role } });
});

export default router;
