import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Sparkles, Activity, Database, Users, X, Heart, ExternalLink, ChevronRight } from 'lucide-react';
import NewAnalysis from './pages/NewAnalysis';
import CandidateVault from './pages/CandidateVault';
import TeamMatcher from './pages/TeamMatcher';

function AppContent() {
  const [showDonate, setShowDonate] = useState(false);

  return (
    <div className="min-h-screen flex flex-col text-clay-dark relative font-montserrat">
      {/* Background Layers */}
      <div className="scene-bg"></div>
      <div className="scene-grid"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 border-b border-clay-peach/40">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="h-20 flex items-center justify-between">
            
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-white to-clay-peach flex items-center justify-center shadow-clay-card border-2 border-white transition-transform group-hover:scale-105">
                <Sparkles className="w-5 h-5 text-clay-orange" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-clay-orange-dark to-clay-orange" style={{fontFamily: "'Montserrat', sans-serif"}}>
                  ASTRAL HR
                </span>
                <p className="text-[9px] text-clay-muted font-bold uppercase tracking-[0.25em] -mt-0.5">Intelligence Platform</p>
              </div>
            </NavLink>

            {/* Navigation */}
            <nav className="flex items-center gap-2 px-2.5 py-2 rounded-[24px] bg-clay-peach/50 border border-white/80 shadow-inner">
              <NavLink to="/" end className={({ isActive }) =>
                `flex items-center gap-2 px-5 py-2.5 rounded-[20px] text-xs font-bold tracking-wide transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-clay-orange-light to-clay-orange text-white shadow-clay-btn border border-white/20' : 'text-clay-muted hover:text-clay-dark'}`
              }>
                <Activity className="w-4 h-4" />
                <span className="hidden md:inline">New Analysis</span>
              </NavLink>

              <NavLink to="/vault" className={({ isActive }) =>
                `flex items-center gap-2 px-5 py-2.5 rounded-[20px] text-xs font-bold tracking-wide transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-clay-orange-light to-clay-orange text-white shadow-clay-btn border border-white/20' : 'text-clay-muted hover:text-clay-dark'}`
              }>
                <Database className="w-4 h-4" />
                <span className="hidden md:inline">Candidate Vault</span>
              </NavLink>

              <NavLink to="/matcher" className={({ isActive }) =>
                `flex items-center gap-2 px-5 py-2.5 rounded-[20px] text-xs font-bold tracking-wide transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-clay-orange-light to-clay-orange text-white shadow-clay-btn border border-white/20' : 'text-clay-muted hover:text-clay-dark'}`
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
                className="hidden lg:flex items-center gap-2 text-xs font-bold tracking-wider text-clay-muted hover:text-clay-orange transition-colors"
              >
                VRROBO2025
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setShowDonate(true)}
                className="px-5 py-3 rounded-full text-xs font-bold btn-primary"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
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
      <footer className="w-full border-t border-clay-peach/40 mt-auto relative z-20 bg-white/40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Branding */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white border border-clay-peach flex items-center justify-center shadow-clay-card">
              <Sparkles className="w-3.5 h-3.5 text-clay-orange" />
            </div>
            <div>
              <p className="text-xs text-clay-dark font-bold">© 2025 Astral HR Intelligence</p>
              <p className="text-[10px] text-clay-muted font-medium">Powered by BaZi · Primbon · Falakiyah</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a
              href="https://vrrobo-lp.vercel.app/#portfolio"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-xs font-bold tracking-wider text-clay-muted hover:text-clay-dark transition-colors"
            >
              VRROBO2025
              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <div className="w-px h-4 bg-clay-peach"></div>
            <button
              onClick={() => setShowDonate(true)}
              className="group flex items-center gap-2 text-xs font-bold tracking-wider text-clay-muted hover:text-clay-orange transition-colors"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              Support / Donate
              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </footer>

      {/* Donate Modal */}
      {showDonate && (
        <div className="fixed inset-0 bg-clay-dark/30 backdrop-blur-md z-50 flex items-center justify-center p-6" onClick={() => setShowDonate(false)}>
          <div className="w-full max-w-md bg-white border-2 border-white rounded-[32px] shadow-clay-card relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="h-2 w-full bg-gradient-to-r from-clay-orange-light via-clay-peach to-clay-orange"></div>
            <div className="p-10">
              <button onClick={() => setShowDonate(false)} className="absolute top-4 right-4 text-clay-muted hover:text-clay-dark transition-colors p-2 rounded-xl hover:bg-clay-bg">
                <X className="w-4 h-4" />
              </button>
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-white to-clay-peach flex items-center justify-center shadow-clay-card border-2 border-white">
                  <Heart className="w-8 h-8 text-clay-orange fill-current" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-clay-dark">Dukung Kami!</h3>
                  <p className="text-clay-muted text-sm mt-2 max-w-xs mx-auto leading-relaxed">
                    Aplikasi ini disediakan gratis. Jika Anda merasa terbantu, silakan dukung pengembangan kami via GoPay.
                  </p>
                </div>
                <div className="bg-clay-bg border border-clay-peach/50 p-6 rounded-2xl">
                  <p className="text-clay-orange-dark font-mono text-2xl tracking-widest font-extrabold">08121105212</p>
                  <p className="text-[10px] text-clay-muted mt-2 uppercase tracking-widest font-bold">GoPay / QRIS</p>
                </div>
                <button onClick={() => { navigator.clipboard.writeText('08121105212'); alert('Nomor GoPay disalin!'); }} className="w-full py-4 bg-gradient-to-r from-clay-orange-light to-clay-orange text-white font-bold rounded-full transition-all shadow-clay-btn">
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
