import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { HiLockClosed } from 'react-icons/hi';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) { setError(error); setLoading(false); }
    else navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d11] p-4">
      <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold"><span className="gradient-text">Admin</span></h1>
          <p className="text-gray-500 font-body text-sm mt-2">Sign in to manage your portfolio</p>
        </div>
        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6">
          {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-body">{error}</div>}
          <div>
            <label className="block text-sm text-gray-400 font-body mb-2">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 glass text-white rounded-xl focus:outline-none focus:border-purple-500/30 font-body" placeholder="aniket@example.com" required />
          </div>
          <div>
            <label className="block text-sm text-gray-400 font-body mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 glass text-white rounded-xl focus:outline-none focus:border-purple-500/30 font-body" placeholder="••••••••" required />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><HiLockClosed /> Sign In</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
