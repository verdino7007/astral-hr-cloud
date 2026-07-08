import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Sparkles, Activity, Database, Users, X, Heart, ExternalLink, ChevronRight } from 'lucide-react';
import NewAnalysis from './pages/NewAnalysis';
import CandidateVault from './pages/CandidateVault';
import TeamMatcher from './pages/TeamMatcher';

function AppContent() {
  const [showDonate, setShowDonate] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative text-zinc-100">
      {/* ── Background Layers ── */}
      <div className="scene-bg"></div>
      <div className="scene-grid"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* ════════════════════════════════════════
          TOP NAVIGATION BAR
          ════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-[#05050a]/70 border-b border-white/[0.05]">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
          <div className="h-[72px] flex items-center justify-between">

            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-4 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-900/30 group-hover:shadow-purple-700/50 transition-all group-hover:scale-105">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-[18px] font-bold tracking-[0.15em] bg-gradient-to-r from-purple-200 via-fuchsia-200 to-blue-200 bg-clip-text text-transparent" style={{fontFamily: "'Cinzel', serif"}}>
                  ASTRAL HR
                </span>
                <p className="text-[10px] text-zinc-500 font-medium tracking-[0.3em] uppercase -mt-0.5">Intelligence Platform</p>
              </div>
            </NavLink>

            {/* Center Navigation */}
            <nav className="flex items-center gap-2 px-2 py-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <NavLink to="/" end className={({isActive}) =>
                `flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300
                ${isActive
                  ? 'bg-gradient-to-r from-purple-600/90 to-fuchsia-600/90 text-white shadow-lg shadow-purple-900/40'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                }`
              }>
                <Activity className="w-4 h-4" />
                <span className="hidden md:inline">New Analysis</span>
              </NavLink>

              <NavLink to="/vault" className={({isActive}) =>
                `flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300
                ${isActive
                  ? 'bg-gradient-to-r from-blue-600/90 to-cyan-600/90 text-white shadow-lg shadow-blue-900/40'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                }`
              }>
                <Database className="w-4 h-4" />
                <span className="hidden md:inline">Candidate Vault</span>
              </NavLink>

              <NavLink to="/matcher" className={({isActive}) =>
                `flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300
                ${isActive
                  ? 'bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white shadow-lg shadow-emerald-900/40'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                }`
              }>
                <Users className="w-4 h-4" />
                <span className="hidden md:inline">Team Synergy</span>
              </NavLink>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-4 shrink-0">
              <a
                href="https://vrrobo-lp.vercel.app/#portfolio"
                target="_blank" rel="noreferrer"
                className="hidden lg:flex items-center gap-2 text-[12px] font-semibold text-zinc-500 hover:text-cyan-400 transition-colors"
              >
                VRROBO2025
                <ExternalLink className="w-3 h-3" />
              </a>
              <div className="hidden lg:block w-px h-5 bg-white/[0.08]"></div>
              <button
                onClick={() => setShowDonate(true)}
                className="flex items-center gap-2 text-[12px] font-bold px-5 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600/15 to-purple-600/15 border border-fuchsia-500/20 text-fuchsia-300 hover:border-fuchsia-500/40 hover:from-fuchsia-600/25 hover:to-purple-600/25 transition-all"
              >
                <Heart className="w-3.5 h-3.5" />
                Support
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════
          MAIN CONTENT
          ════════════════════════════════════════ */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-8 lg:px-12 py-12 lg:py-16 relative z-10">
        <Routes>
          <Route path="/" element={<NewAnalysis />} />
          <Route path="/vault" element={<CandidateVault />} />
          <Route path="/matcher" element={<TeamMatcher />} />
        </Routes>
      </main>

      {/* ════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════ */}
      <footer className="w-full border-t border-white/[0.04] mt-auto relative z-20">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-12 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Left: Branding */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600/30 to-blue-600/30 border border-purple-500/15 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-purple-400/50" />
              </div>
              <div>
                <p className="text-[12px] text-zinc-500 font-medium">© 2025 Astral HR Intelligence</p>
                <p className="text-[11px] text-zinc-600">Powered by BaZi · Primbon · Falakiyah</p>
              </div>
            </div>

            {/* Right: Links */}
            <div className="flex items-center gap-8">
              <a
                href="https://vrrobo-lp.vercel.app/#portfolio"
                target="_blank" rel="noreferrer"
                className="group flex items-center gap-2 text-[12px] font-medium text-zinc-500 hover:text-cyan-400 transition-colors"
              >
                VRROBO2025
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <div className="w-px h-4 bg-white/[0.06]"></div>
              <button
                onClick={() => setShowDonate(true)}
                className="group flex items-center gap-2 text-[12px] font-medium text-zinc-500 hover:text-fuchsia-400 transition-colors"
              >
                <Heart className="w-3 h-3" />
                Support / Donate
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ════════════════════════════════════════
          DONATE MODAL
          ════════════════════════════════════════ */}
      {showDonate && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-6" onClick={() => setShowDonate(false)}>
          <div
            className="w-full max-w-[440px] bg-[#0e0e16] border border-white/[0.08] rounded-3xl shadow-2xl shadow-black/60 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient accent */}
            <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500"></div>

            <div className="p-10">
              <button
                onClick={() => setShowDonate(false)}
                className="absolute top-6 right-6 text-zinc-600 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/[0.05]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-8">
                {/* Icon */}
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-500/20 rotate-3 hover:rotate-0 transition-transform">
                  <Heart className="w-9 h-9 text-white" />
                </div>

                {/* Text */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white">Dukung Kami!</h3>
                  <p className="text-zinc-400 text-[15px] leading-relaxed max-w-sm mx-auto">
                    Aplikasi ini disediakan gratis. Jika Anda merasa terbantu, silakan dukung pengembangan kami via GoPay.
                  </p>
                </div>

                {/* Number */}
                <div className="bg-black/50 border border-emerald-500/15 p-6 rounded-2xl">
                  <p className="text-emerald-400 font-mono text-2xl tracking-[0.2em] font-bold">08121105212</p>
                  <p className="text-[11px] text-zinc-500 mt-3 uppercase tracking-[0.25em] font-semibold">GoPay / QRIS</p>
                </div>

                {/* Button */}
                <button
                  onClick={() => {navigator.clipboard.writeText('08121105212'); alert('Nomor GoPay disalin!')}}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 rounded-xl font-bold tracking-wider text-[14px] transition-all shadow-lg shadow-emerald-900/30 hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0"
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
