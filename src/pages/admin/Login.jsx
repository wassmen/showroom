import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <FaCar className="text-accent" size={28} />
          </div>
          <h1 className="text-2xl font-extrabold text-dark-text">Auto Showroom</h1>
          <p className="text-sm text-gray-400 mt-1">Connectez-vous à l'administration</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-dark-card rounded-2xl border border-dark-border p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@showroom.fr" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">Mot de passe</label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all" />
              <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-dark-text cursor-pointer">
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full py-3 rounded-xl bg-accent text-white text-sm font-bold hover:bg-accent/90 transition-all cursor-pointer">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
