import LoginPage from './pages/LoginPage';
import { useAuth } from './context/AuthContext';
import VoterDashboard from './pages/VoterDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const { user, logout } = useAuth();

  if (!user) return <LoginPage />;

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Online Voting System</h1>
        <button onClick={logout} className="bg-rose-600 text-white px-3 py-1 rounded">Logout</button>
      </div>
      {user.role === 'admin' ? <AdminDashboard /> : <VoterDashboard />}
    </main>
  );
}
