import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Sparkles, Activity, Database, Users, X, Heart, ExternalLink, ChevronRight } from 'lucide-react';
import NewAnalysis from './pages/NewAnalysis';
import CandidateVault from './pages/CandidateVault';
import TeamMatcher from './pages/TeamMatcher';

function AppContent() {
  const [showDonate, setShowDonate] = useState(false);

  return (
    <div className="min-h-screen flex flex-col text-slate-800 relative">
      {/* Background Layers */}
      <div className="scene-bg"></div>
      <div className="scene-grid"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/75 border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="h-20 flex items-center justify-between">
            
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-pastel-pink-light flex items-center justify-center shadow-pastel transition-transform group-hover:scale-105">
                <Sparkles className="w-5 h-5 text-pastel-pink-dark" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-pastel-pink-dark to-pastel-mint-dark" style={{fontFamily: "'Cinzel', serif"}}>
                  ASTRAL HR
                </span>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-[0.25em] -mt-0.5">Intelligence Platform</p>
              </div>
            </NavLink>

            {/* Navigation */}
            <nav className="flex items-center gap-2 px-2 py-1.5 rounded-2xl bg-slate-100 border border-slate-200">
              <NavLink to="/" end className={({ isActive }) =>
                `flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[13px] font-semibold tracking-wide transition-colors ${isActive ? 'bg-white text-rose-700 shadow-pastel' : 'text-slate-600 hover:text-slate-900'}`
              }>
                <Activity className="w-4 h-4" />
                <span className="hidden md:inline">New Analysis</span>
              </NavLink>

              <NavLink to="/vault" className={({ isActive }) =>
                `flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[13px] font-semibold tracking-wide transition-colors ${isActive ? 'bg-white text-emerald-700 shadow-pastel' : 'text-slate-600 hover:text-slate-900'}`
              }>
                <Database className="w-4 h-4" />
                <span className="hidden md:inline">Candidate Vault</span>
              </NavLink>

              <NavLink to="/matcher" className={({ isActive }) =>
                `flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[13px] font-semibold tracking-wide transition-colors ${isActive ? 'bg-white text-purple-700 shadow-pastel' : 'text-slate-600 hover:text-slate-900'}`
              }>
                <Users className="w-4 h-4" />
                <span className="hidden md:inline">Team Synergy</span>
              </NavLink>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4 shrink-0">
              <a
                href="https://vrrobo-lp.vercel.app/#portfolio"
                target="_blank"
                rel="noreferrer"
                className="hidden lg:flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-500 hover:text-slate-800 transition-colors"
              >
                VRROBO2025
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setShowDonate(true)}
                className="px-5 py-2.5 rounded-xl text-[13px] btn-primary flex items-center gap-2 shadow-pastel-pink"
              >
                <Heart className="w-3.5 h-3.5" />
                Support
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 lg:px-12 py-12 lg:py-16 relative z-10">
        <Routes>
          <Route path="/" element={<NewAnalysis />} />
          <Route path="/vault" element={<CandidateVault />} />
          <Route path="/matcher" element={<TeamMatcher />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/50 mt-auto relative z-20 bg-white/40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Branding */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-pastel-pink-light flex items-center justify-center shadow-pastel">
              <Sparkles className="w-3.5 h-3.5 text-pastel-pink-dark" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">© 2025 Astral HR Intelligence</p>
              <p className="text-[11px] text-slate-400">Powered by BaZi · Primbon · Falakiyah</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a
              href="https://vrrobo-lp.vercel.app/#portfolio"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-500 hover:text-slate-800 transition-colors"
            >
              VRROBO2025
              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <div className="w-px h-4 bg-slate-200"></div>
            <button
              onClick={() => setShowDonate(true)}
              className="group flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-500 hover:text-rose-600 transition-colors"
            >
              <Heart className="w-3.5 h-3.5" />
              Support / Donate
              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </footer>

      {/* Donate Modal */}
      {showDonate && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-6" onClick={() => setShowDonate(false)}>
          <div className="w-full max-w-md bg-white border border-slate-200/50 rounded-3xl shadow-xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="h-1.5 w-full bg-gradient-to-r from-pastel-pink via-pastel-lavender to-pastel-blue"></div>
            <div className="p-10">
              <button onClick={() => setShowDonate(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-xl hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-pastel-pink-light flex items-center justify-center shadow-pastel-pink">
                  <Heart className="w-8 h-8 text-pastel-pink-dark" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Dukung Kami!</h3>
                  <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto leading-relaxed">
                    Aplikasi ini disediakan gratis. Jika Anda merasa terbantu, silakan dukung pengembangan kami via GoPay.
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <p className="text-rose-600 font-mono text-2xl tracking-widest font-bold">08121105212</p>
                  <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-bold">GoPay / QRIS</p>
                </div>
                <button onClick={() => { navigator.clipboard.writeText('08121105212'); alert('Nomor GoPay disalin!'); }} className="w-full py-3.5 bg-pastel-pink-light hover:bg-rose-200 text-rose-800 font-bold rounded-xl transition-all shadow-pastel">
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
