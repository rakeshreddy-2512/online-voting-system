import { useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isRegister, setIsRegister] = useState(false);
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? '/auth/register' : '/auth/login';
    const payload = isRegister ? { ...form, name: form.email.split('@')[0] } : form;
    const { data } = await api.post(endpoint, payload);
    login(data);
    window.location.reload();
  };

  return (
    <div className="max-w-md mx-auto mt-24 bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Secure Voting Portal</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <button className="text-blue-600 mt-3" onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'Have account? Login' : 'New user? Register'}</button>
    </div>
  );
}
