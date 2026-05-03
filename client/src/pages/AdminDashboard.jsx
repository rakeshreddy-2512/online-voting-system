import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../api/client';

const socket = io('http://localhost:5000');

export default function AdminDashboard() {
  const [elections, setElections] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [liveEvents, setLiveEvents] = useState([]);

  useEffect(() => {
    api.get('/elections').then((res) => setElections(res.data));
    socket.on('vote:cast', (event) => setLiveEvents((prev) => [event, ...prev].slice(0, 10)));
    return () => socket.off('vote:cast');
  }, []);

  const loadAnalytics = async (electionId) => {
    const { data } = await api.get(`/admin/analytics/${electionId}`);
    setAnalytics(data);
  };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Admin Dashboard & Live Analytics</h2>
      <div className="bg-white rounded p-4 shadow">
        <h3 className="font-semibold mb-2">Elections</h3>
        <div className="flex gap-2 flex-wrap">
          {elections.map((e) => <button key={e._id} onClick={() => loadAnalytics(e._id)} className="px-3 py-1 bg-indigo-600 text-white rounded">Analyze {e.title}</button>)}
        </div>
      </div>
      {analytics && <pre className="bg-slate-900 text-slate-100 p-4 rounded overflow-auto">{JSON.stringify(analytics, null, 2)}</pre>}
      <div className="bg-white rounded p-4 shadow">
        <h3 className="font-semibold">Live Vote Events</h3>
        <ul className="list-disc pl-5 text-sm">{liveEvents.map((e, i) => <li key={i}>{e.electionId} at {e.timestamp}</li>)}</ul>
      </div>
    </div>
  );
}
