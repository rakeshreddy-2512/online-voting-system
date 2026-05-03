import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema(
  {
    election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election', required: true },
    voter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    encryptedPayload: { type: String, required: true },
    iv: { type: String, required: true },
    authTag: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Vote', voteSchema);
