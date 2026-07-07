import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Sparkles, Activity, Database, Users, X, Heart } from 'lucide-react';
import NewAnalysis from './pages/NewAnalysis';
import CandidateVault from './pages/CandidateVault';
import TeamMatcher from './pages/TeamMatcher';

function App() {
  const [showDonate, setShowDonate] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex relative font-sans text-slate-100 selection:bg-purple-500/30">
        <div className="fixed inset-0 bg-[#05050A] -z-20"></div>
        <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 -z-10 mix-blend-screen"></div>
        <div className="orb orb-1"></div><div className="orb orb-2"></div><div className="orb orb-3"></div>

        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col z-20">
          <div className="p-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30">
                <Sparkles className="text-purple-400 w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-blue-300" style={{fontFamily: "'Cinzel', serif"}}>
                  ASTRAL HR
                </h1>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-8 flex flex-col gap-2">
            <NavLink to="/" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <Activity className="w-5 h-5" /> New Analysis
            </NavLink>
            <NavLink to="/vault" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <Database className="w-5 h-5" /> Candidate Vault
            </NavLink>
            <NavLink to="/matcher" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <Users className="w-5 h-5" /> Team Synergy
            </NavLink>
          </nav>

          {/* Footer Navigation */}
          <div className="p-4 border-t border-white/5">
            <div className="bg-black/20 p-4 rounded-2xl border border-white/5 space-y-3">
              <a href="https://vrrobo-lp.vercel.app/#portfolio" target="_blank" rel="noreferrer" className="flex items-center justify-between group">
                <span className="text-xs font-bold text-slate-400 group-hover:text-cyan-400 transition-colors uppercase tracking-widest">VRROBO2025</span>
                <Sparkles className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </a>
              <div className="h-[1px] bg-white/5 w-full"></div>
              <button onClick={() => setShowDonate(true)} className="w-full flex items-center justify-between group">
                <span className="text-xs font-bold text-slate-400 group-hover:text-fuchsia-400 transition-colors uppercase tracking-widest text-left">Support / Donate</span>
                <span className="text-lg group-hover:scale-110 transition-transform">💖</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 relative z-10 overflow-y-auto">
          <Routes>
            <Route path="/" element={<NewAnalysis />} />
            <Route path="/vault" element={<CandidateVault />} />
            <Route path="/matcher" element={<TeamMatcher />} />
          </Routes>
        </main>

        {/* Donate Modal */}
        {showDonate && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900/90 border border-purple-500/30 p-8 rounded-2xl shadow-2xl max-w-sm w-full relative">
              <button onClick={() => setShowDonate(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-900/50">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Dukung Kami!</h3>
                  <p className="text-slate-400 text-sm">Aplikasi ini gratis. Jika Anda merasa terbantu, silakan dukung via GoPay ke nomor berikut:</p>
                </div>
                <div className="bg-black/50 border border-green-500/30 p-4 rounded-xl">
                  <p className="text-green-400 font-mono text-xl tracking-wider font-bold">08121105212</p>
                  <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest">GoPay</p>
                </div>
                <button onClick={() => {navigator.clipboard.writeText('08121105212'); alert('Nomor GoPay disalin!')}} className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-xl font-bold transition-all shadow-lg shadow-green-900/30">
                  Salin Nomor
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
