import React, { useState } from 'react';
import { ShieldAlert, Key, UserPlus, LogIn, Loader } from 'lucide-react';
import { playKeySound, playReturnSound } from '../utils/typewriterSound';

function Login({ onLoginSuccess, onCancel }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [pwStatus, setPwStatus] = useState('empty'); // empty, typing, correct, incorrect

  const handleSubmit = async (e) => {
    e.preventDefault();
    playReturnSound();
    if (!username || !password) {
      setError('Credentials cannot be empty.');
      setPwStatus('incorrect');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:9091';
      const endpoint = isSignUp ? '/auth/signup' : '/auth/login';
      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        if (isSignUp) {
          setSuccessMessage('Clearance approved. Operative credentials recorded. Please sign in below.');
          setPassword('');
          setPwStatus('empty');
          setIsSignUp(false);
        } else {
          setPwStatus('correct');
          setTimeout(() => {
            onLoginSuccess(data.token, data.username);
          }, 300); // Small delay to let the green LED shine!
        }
      } else {
        setError(data.detail || 'Authentication failure.');
        setPwStatus('incorrect');
      }
    } catch (err) {
      setError('Connection to security server failed.');
      setPwStatus('incorrect');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cia-bg font-typewriter flex items-center justify-center p-4">
      <div className="card max-w-md w-full bg-cia-card border-3 border-cia-dark shadow-cia-card p-8 relative slant-right">
        {/* Classified Stamp */}
        <div className="absolute -top-6 -left-4 stamp stamp-classified text-[11px] font-black rotate-[-6deg] bg-cia-card z-20">
          SECURE TERMINAL
        </div>
        <div className="absolute top-4 right-4 stamp stamp-restricted text-[9px] font-black rotate-[3deg] bg-cia-card">
          [ RESTRICTED ]
        </div>

        {/* Header */}
        <div className="text-center mb-8 mt-2">
          <div className="inline-flex items-center justify-center p-3 border-2 border-cia-dark bg-cia-bg mb-4">
            <Key className="w-6 h-6 text-cia-dark animate-pulse" />
          </div>
          <h2 className="text-lg font-black text-cia-dark tracking-widest font-stamp uppercase leading-none">
            ASTRAL-HR GATEWAY
          </h2>
          <p className="text-[9px] text-cia-muted font-bold uppercase mt-2">
            Central Intelligence Agency Archives Portal
          </p>
          <div className="border-t-2 border-double border-cia-dark my-4"></div>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-6 p-4 border border-cia-dark bg-cia-bg text-cia-dark text-xs font-bold flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-cia-dark shrink-0"></div>
            <span className="uppercase">{successMessage}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 border border-cia-red bg-cia-bg text-cia-red text-xs font-bold flex items-center gap-3">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span className="uppercase">{error}</span>
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-cia-dark uppercase mb-1.5">
              CLEARANCE ID / USERNAME:
            </label>
            <input
              type="text"
              className="w-full glass-input"
              placeholder="e.g. AGENT_007"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={playKeySound}
              disabled={loading}
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-cia-dark uppercase mb-1.5">
              SECRET PASSCODE / PASSWORD:
            </label>
            <div className="flex items-center gap-3">
              <input
                type="password"
                className="w-full glass-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value === '') {
                    setPwStatus('empty');
                  } else {
                    setPwStatus('typing');
                  }
                }}
                onKeyDown={playKeySound}
                disabled={loading}
                autoComplete="current-password"
              />
              {/* LED Status Light */}
              <div 
                className={`w-4 h-4 rounded-full border-2 border-cia-dark shrink-0 transition-all duration-300 ${
                  pwStatus === 'correct' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' :
                  pwStatus === 'incorrect' ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' :
                  pwStatus === 'typing' ? 'bg-yellow-500 shadow-[0_0_8px_#eab308]' :
                  'bg-gray-300'
                }`}
                title={`Passcode Status: ${pwStatus.toUpperCase()}`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : isSignUp ? (
              <>
                <UserPlus className="w-4 h-4" />
                <span>REQUEST CLEARANCE (SIGN UP)</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>VALIDATE CREDENTIALS (SIGN IN)</span>
              </>
            )}
          </button>
        </form>

        {/* Auth Toggle */}
        <div className="mt-8 pt-6 border-t border-dashed border-cia-dark/30 text-center space-y-3">
          <p className="text-[10px] text-cia-muted font-bold uppercase">
            {isSignUp ? "Already hold an active clearance?" : "New operative demanding terminal access?"}
          </p>
          <button
            type="button"
            onClick={() => {
              playReturnSound();
              setIsSignUp(!isSignUp);
              setError('');
              setSuccessMessage('');
              setPassword('');
              setPwStatus('empty');
            }}
            className="mt-2 text-xs font-bold text-cia-red hover:underline uppercase block mx-auto"
            disabled={loading}
          >
            {isSignUp ? "→ Switch to Archive Sign In" : "→ Request New operative Clearance"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={() => {
                playReturnSound();
                onCancel();
              }}
              className="text-[10px] font-bold text-cia-muted hover:text-cia-dark uppercase block mx-auto pt-2 hover:underline"
              disabled={loading}
            >
              ← Cancel & Return to Front Page
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
