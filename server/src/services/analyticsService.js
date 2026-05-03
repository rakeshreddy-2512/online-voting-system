import Vote from '../models/Vote.js';
import Election from '../models/Election.js';
import { decryptVote } from '../utils/crypto.js';

export const getElectionAnalytics = async (electionId) => {
  const election = await Election.findById(electionId);
  const votes = await Vote.find({ election: electionId });

  const counts = Object.fromEntries(election.candidates.map((c) => [c._id.toString(), 0]));
  for (const vote of votes) {
    const data = decryptVote(vote);
    counts[data.candidateId] = (counts[data.candidateId] || 0) + 1;
  }

  return {
    electionId,
    totalVotes: votes.length,
    participationRate: votes.length,
    candidateBreakdown: election.candidates.map((c) => ({
      candidateId: c._id,
      name: c.name,
      party: c.party,
      votes: counts[c._id.toString()] || 0
    }))
  };
};
