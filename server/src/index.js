import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import electionRoutes from './routes/electionRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import voteRoutes from './routes/voteRoutes.js';

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_ORIGIN } });

app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(helmet());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/elections', electionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/votes', voteRoutes(io));

io.on('connection', (socket) => {
  socket.emit('server:ready', { connectedAt: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => server.listen(PORT, () => console.log(`Server running on ${PORT}`)));
