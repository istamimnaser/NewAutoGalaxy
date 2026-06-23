import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLogin() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (user) navigate('/admin/dashboard', { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const err = await signIn(email, password);
    if (err) { setError(err); setLoading(false); }
    else navigate('/admin/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <img src="/logo.jpg" alt="Logo" className="w-16 h-16 rounded-full border-2 object-cover mb-4" style={{ borderColor: '#C8962A' }} />
          <div className="text-white text-sm tracking-widest uppercase">Admin Portal</div>
          <div className="text-white/30 text-xs mt-1">New Auto Galaxy</div>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111] border border-white/5 rounded-2xl p-8 space-y-5">
          <div>
            <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8962A]/60 transition-colors"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8962A]/60 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-sm font-medium text-black transition-all disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #C8962A, #E8B84B)' }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
