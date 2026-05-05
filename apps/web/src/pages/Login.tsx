import React, { useState } from 'react';
import { User, Lock, Shield, Fingerprint } from 'lucide-react';

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Normalize OUTSIDE try/catch so it's available everywhere
    const normalizedUsername = username.trim().toLowerCase();

    const roleMap = {
      op:    'OFFICIER',
      admin: 'SUPER_ADMIN',
      cd:    'COMMISSAIRE',
      dg:    'DG'
    };
    const nameMap = {
      op:    'Officier',
      admin: 'Super Administrateur',
      cd:    'Commissaire',
      dg:    'Délégué Général'
    };

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: normalizedUsername, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        setError('Identifiants invalides');
      }
    } catch {
      // Fallback local auth when backend is unreachable
      if (password === '9255' && roleMap[normalizedUsername]) {
        onLogin({
          id: '1',
          username: normalizedUsername,
          role: roleMap[normalizedUsername],
          name: nameMap[normalizedUsername]
        });
      } else {
        setError('Identifiants invalides');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">

        {/* Decorative top border */}
        <div className="flex justify-center gap-1 mb-4">
          <div className="w-8 h-px bg-gold-500/40"></div>
          <div className="w-4 h-px bg-gold-500/20"></div>
          <div className="w-2 h-px bg-gold-500/10"></div>
        </div>

        {/* Republic header */}
        <div className="text-center mb-2">
          <p className="text-xs text-gold-500/80 tracking-wider">RÉPUBLIQUE DU CAMEROUN</p>
          <p className="text-[10px] text-gold-500/60 mt-0.5">Paix - Travail - Patrie</p>
        </div>

        {/* Main Title */}
        <div className="text-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gold-500 tracking-wide">
            DÉLÉGATION GÉNÉRALE À LA<br />SÛRETÉ NATIONALE
          </h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mx-auto mt-3"></div>
        </div>

        {/* Logo */}
        <div className="flex justify-center items-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gold-500/5 rounded-full blur-xl"></div>
            <div className="relative w-36 h-36 md:w-40 md:h-40 flex items-center justify-center">
              <img
                src="/logo1.png"
                alt="République du Cameroun"
                className="w-full h-full object-contain"
                style={{ background: 'transparent', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="rounded-xl border-2 border-gold-500/30 shadow-2xl overflow-hidden" style={{ backgroundColor: '#03396c' }}>
          <div className="h-0.5 bg-gradient-to-r from-gold-500/0 via-gold-500 to-gold-500/0"></div>
          <div className="p-6">

            {/* NEXUS360 label + Shield icon */}
            <div className="flex flex-col items-center mb-5">
              <p className="text-gold-500 font-bold tracking-widest text-lg mb-3">NEXUS360</p>
              <div className="p-3 bg-gold-500/10 rounded-full border-2 border-gold-500/30">
                <Shield className="w-8 h-8 text-gold-500" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  <Fingerprint className="inline w-3 h-3 mr-1" /> IDENTIFIANT
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-gold-500/30 rounded-lg text-white text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30 transition-all"
                    placeholder="Nom d'utilisateur"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  <Lock className="inline w-3 h-3 mr-1" /> MOT DE PASSE
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-gold-500/30 rounded-lg text-white text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                  <p className="text-red-400 text-xs text-center">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-sm rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 shadow-lg shadow-gold-500/20"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-navy-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    CHARGEMENT...
                  </span>
                ) : (
                  'ACCÉDER À LA PLATEFORME'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Powered by */}
        <div className="text-center mt-5">
          <p className="text-[11px] text-gray-600">
            Powered by <span className="text-gold-500/70 font-medium">Analytix Engineering</span>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 pt-3 border-t border-gray-800/30">
          <p className="text-[10px] text-gray-700">
            © 2026 Délégation Générale à la Sûreté Nationale du Cameroun
          </p>
        </div>

      </div>
    </div>
  );
};
