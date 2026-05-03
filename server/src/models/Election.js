import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  party: { type: String, required: true },
  manifesto: { type: String, default: '' }
});

const electionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    candidates: [candidateSchema],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Election', electionSchema);
