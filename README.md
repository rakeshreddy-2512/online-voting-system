# Secure Online Voting System

A production-style full-stack Online Voting System built with **React + Tailwind CSS** (frontend) and **Node.js + Express + MongoDB** (backend), including:

- 🔐 End-to-end vote payload encryption (AES-256-GCM)
- 👤 JWT authentication + role-based authorization (voter/admin)
- 🗳️ One-voter-one-vote integrity checks
- 📊 Admin dashboard with live vote event stream
- 📈 Real-time election analytics
- 🛡️ Security hardening (Helmet, CORS policy, rate limiting)

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Socket.IO client

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcryptjs
- Socket.IO
- Node `crypto` for encrypted vote storage

---

## Project Structure

```
online-voting-system/
├─ client/
│  ├─ src/
│  │  ├─ pages/
│  │  ├─ context/
│  │  └─ api/
│  └─ package.json
├─ server/
│  ├─ src/
│  │  ├─ models/
│  │  ├─ routes/
│  │  ├─ middleware/
│  │  ├─ services/
│  │  └─ utils/
│  └─ package.json
└─ README.md
```

---

## Core Security Features

1. **Encrypted Votes**
   - Votes are never stored in plain text.
   - Each vote payload is encrypted with `AES-256-GCM` and persisted as `encryptedPayload`, `iv`, and `authTag`.

2. **Authentication & Authorization**
   - JWT-based auth for session identity.
   - Role guards enforce admin-only endpoints.

3. **Vote Integrity Controls**
   - One-vote-per-user enforcement.
   - Voting allowed only inside election time window.

4. **API Protection**
   - Rate limiting against abuse.
   - Helmet-secured headers.
   - Restrictive CORS configuration.

---

## Setup Instructions

## 1) Clone and install dependencies

```bash
git clone <your-repo-url>
cd online-voting-system

cd server && npm install
cd ../client && npm install
```

## 2) Configure environment

Create `server/.env` from `server/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/online_voting
JWT_SECRET=change_this_jwt_secret
VOTE_ENCRYPTION_KEY=12345678901234567890123456789012
CLIENT_ORIGIN=http://localhost:5173
```

> `VOTE_ENCRYPTION_KEY` must be exactly 32 characters for AES-256.

## 3) Run backend and frontend

Terminal 1:
```bash
cd server
npm run dev
```

Terminal 2:
```bash
cd client
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## API Overview

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Elections
- `GET /api/elections` (authenticated)
- `POST /api/elections` (admin only)

### Voting
- `POST /api/votes` (authenticated voter)

### Admin
- `GET /api/admin/dashboard` (admin only)
- `GET /api/admin/analytics/:electionId` (admin only)

---

## Live Analytics

- Backend emits `vote:cast` Socket.IO events after each successful ballot.
- Admin UI subscribes and updates a live event feed.
- Analytics endpoint decrypts vote payloads and calculates per-candidate totals.

---

## Production Recommendations

- Use HTTPS + secure cookies / token strategy.
- Store encryption keys in a secure secret manager (never hardcode).
- Add audit logs and immutable append-only voting ledger.
- Add 2FA and email/ID verification for voters.
- Add CI tests, linting, and SAST/DAST pipelines.

---

## License

MIT (see `LICENSE`)
