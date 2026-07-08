import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Sparkles, Activity, Database, Users, X, Heart, ExternalLink, ArrowUpRight } from 'lucide-react';
import NewAnalysis from './pages/NewAnalysis';
import CandidateVault from './pages/CandidateVault';
import TeamMatcher from './pages/TeamMatcher';

function AppContent() {
  const [showDonate, setShowDonate] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col relative text-slate-100 selection:bg-purple-500/30">
      {/* Background Layers */}
      <div className="fixed inset-0 bg-[#09090b] -z-30"></div>
      <div className="fixed inset-0 bg-grid -z-20 opacity-100"></div>
      <div className="fixed inset-0 bg-gradient-radial -z-10"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* ═══════ TOP NAV BAR ═══════ */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-wide text-white hidden sm:block" style={{fontFamily: "'Cinzel', serif"}}>
              ASTRAL HR
            </span>
          </NavLink>

          {/* Center Nav */}
          <nav className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-1.5 py-1">
            <NavLink to="/" end className={({isActive}) => `nav-pill ${isActive ? 'active' : ''}`}>
              <Activity className="w-4 h-4" />
              <span className="hidden md:inline">Analysis</span>
            </NavLink>
            <NavLink to="/vault" className={({isActive}) => `nav-pill ${isActive ? 'active' : ''}`}>
              <Database className="w-4 h-4" />
              <span className="hidden md:inline">Vault</span>
            </NavLink>
            <NavLink to="/matcher" className={({isActive}) => `nav-pill ${isActive ? 'active' : ''}`}>
              <Users className="w-4 h-4" />
              <span className="hidden md:inline">Team Synergy</span>
            </NavLink>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href="https://vrrobo-lp.vercel.app/#portfolio" 
              target="_blank" 
              rel="noreferrer" 
              className="hidden md:flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-cyan-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06]"
            >
              VRROBO2025
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <button 
              onClick={() => setShowDonate(true)} 
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20 text-purple-300 hover:text-purple-200 hover:border-purple-500/40 hover:bg-purple-500/20 transition-all"
            >
              <Heart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Support</span>
            </button>
          </div>
        </div>
      </header>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-8 relative z-10">
        <Routes>
          <Route path="/" element={<NewAnalysis />} />
          <Route path="/vault" element={<CandidateVault />} />
          <Route path="/matcher" element={<TeamMatcher />} />
        </Routes>
      </main>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="w-full border-t border-white/[0.06] z-20 mt-auto">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left: Copyright */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-purple-400/60" />
            </div>
            <span className="text-xs text-zinc-500 font-medium">
              © 2025 Astral HR Intelligence Platform
            </span>
          </div>

          {/* Center / Right: Links */}
          <div className="flex items-center gap-6">
            <a 
              href="https://vrrobo-lp.vercel.app/#portfolio" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-cyan-400 transition-colors"
            >
              VRROBO2025
              <ExternalLink className="w-3 h-3" />
            </a>
            <div className="divider"></div>
            <button 
              onClick={() => setShowDonate(true)} 
              className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-fuchsia-400 transition-colors"
            >
              <Heart className="w-3 h-3" />
              Support / Donate
            </button>
          </div>
        </div>
      </footer>

      {/* ═══════ DONATE MODAL ═══════ */}
      {showDonate && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDonate(false)}>
          <div 
            className="bg-[#141419] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 max-w-md w-full relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient top accent */}
            <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
            
            <div className="p-8">
              <button 
                onClick={() => setShowDonate(false)} 
                className="absolute top-5 right-5 text-zinc-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 rotate-3">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Dukung Kami!</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Aplikasi ini disediakan gratis. Jika Anda merasa terbantu, silakan dukung pengembangan kami via GoPay.
                  </p>
                </div>
                
                <div className="bg-black/40 border border-emerald-500/20 p-5 rounded-xl">
                  <p className="text-emerald-400 font-mono text-2xl tracking-[0.15em] font-bold">08121105212</p>
                  <p className="text-[11px] text-zinc-500 mt-2 uppercase tracking-[0.2em] font-semibold">GoPay / QRIS</p>
                </div>
                
                <button 
                  onClick={() => {navigator.clipboard.writeText('08121105212'); alert('Nomor GoPay disalin!')}} 
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 rounded-xl font-bold tracking-wider text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  SALIN NOMOR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
