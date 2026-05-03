import { useEffect, useState } from 'react';
import api from '../api/client';

export default function VoterDashboard() {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    api.get('/elections').then((res) => setElections(res.data));
  }, []);

  const vote = async (electionId, candidateId) => {
    await api.post('/votes', { electionId, candidateId });
    alert('Vote submitted with encryption.');
  };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Active Elections</h2>
      {elections.map((e) => (
        <div key={e._id} className="bg-white shadow rounded p-4">
          <h3 className="text-xl font-semibold">{e.title}</h3>
          <p className="text-sm text-slate-600 mb-3">{e.description}</p>
          <div className="grid gap-2">
            {e.candidates.map((c) => (
              <button key={c._id} onClick={() => vote(e._id, c._id)} className="border p-2 rounded hover:bg-slate-50 text-left">
                {c.name} - {c.party}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
