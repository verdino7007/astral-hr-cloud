import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ShieldAlert, Terminal, Eye, Sparkles, X, Heart, ExternalLink, ChevronRight } from 'lucide-react';
import NewAnalysis from './pages/NewAnalysis';
import CandidateVault from './pages/CandidateVault';
import TeamMatcher from './pages/TeamMatcher';
import Login from './pages/Login';
import { playKeySound, playReturnSound } from './utils/typewriterSound';

function AppContent() {
  const [token, setToken] = useState(localStorage.getItem('astral_hr_token') || '');
  const [username, setUsername] = useState(localStorage.getItem('astral_hr_username') || '');
  const [showDonate, setShowDonate] = useState(false);

  const handleLoginSuccess = (userToken, userNm) => {
    localStorage.setItem('astral_hr_token', userToken);
    localStorage.setItem('astral_hr_username', userNm);
    setToken(userToken);
    setUsername(userNm);
  };

  const handleLogout = () => {
    playReturnSound();
    localStorage.removeItem('astral_hr_token');
    localStorage.removeItem('astral_hr_username');
    setToken('');
    setUsername('');
  };

  const handleOpenDonate = () => {
    playReturnSound();
    setShowDonate(true);
  };

  const handleCloseDonate = () => {
    playReturnSound();
    setShowDonate(false);
  };

  if (!token) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen flex flex-col text-cia-dark relative font-typewriter">
      {/* Background Layers */}
      <div className="scene-bg"></div>
      <div className="scene-grid"></div>

      {/* Top Secret Header Stamp */}
      <div className="w-full bg-cia-dark text-cia-bg text-center py-2.5 text-xs font-bold tracking-[0.3em] uppercase relative z-50">
        // SECURE CONSOLE // OPERATIVE: {username.toUpperCase()} // PROFILE SYSTEM
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-cia-bg border-b-4 border-double border-cia-dark">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="h-24 flex flex-col md:flex-row items-center justify-between py-4 md:py-0 gap-4">
            
            {/* Logo (Dossier Stamp style) */}
            <NavLink to="/" onClick={playReturnSound} className="flex items-center gap-3 shrink-0">
              <div className="border-3 border-cia-dark px-3 py-1.5 font-stamp text-xl font-black rotate-[-2deg] bg-cia-card stamp stamp-secret tracking-tighter">
                CIA-HR
              </div>
              <div className="hidden sm:block">
                <span className="text-sm font-black tracking-widest text-cia-dark">
                  DOSSIER SYSTEM
                </span>
                <p className="text-[9px] text-cia-muted font-bold uppercase tracking-[0.2em] -mt-0.5">Project: Astral-HR</p>
              </div>
            </NavLink>

            {/* Navigation (Index card style tabs) */}
            <nav className="flex items-center gap-1.5 p-1 bg-cia-dark/5 border-2 border-cia-dark rounded">
              <NavLink to="/" onClick={playReturnSound} end className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wide transition-all border ${isActive ? 'bg-cia-dark text-cia-bg border-cia-dark shadow-none' : 'bg-cia-card text-cia-dark border-transparent hover:border-cia-dark'}`
              }>
                <Terminal className="w-4 h-4" />
                <span>New Dossier</span>
              </NavLink>

              <NavLink to="/vault" onClick={playReturnSound} className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wide transition-all border ${isActive ? 'bg-cia-dark text-cia-bg border-cia-dark shadow-none' : 'bg-cia-card text-cia-dark border-transparent hover:border-cia-dark'}`
              }>
                <Terminal className="w-4 h-4" />
                <span>Candidate Vault</span>
              </NavLink>

              <NavLink to="/matcher" onClick={playReturnSound} className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wide transition-all border ${isActive ? 'bg-cia-dark text-cia-bg border-cia-dark shadow-none' : 'bg-cia-card text-cia-dark border-transparent hover:border-cia-dark'}`
              }>
                <Terminal className="w-4 h-4" />
                <span>Team Matcher</span>
              </NavLink>
            </nav>
            
            {/* Operative Info & Revoke Access */}
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLogout} 
                className="px-3 py-1.5 border border-cia-red text-cia-red hover:bg-cia-red hover:text-cia-bg text-[10px] font-bold transition-all font-stamp uppercase"
              >
                REVOKE ACCESS
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 lg:px-12 py-12 lg:py-16 relative z-10">
        <Routes>
          <Route path="/" element={<NewAnalysis token={token} />} />
          <Route path="/vault" element={<CandidateVault token={token} />} />
          <Route path="/matcher" element={<TeamMatcher token={token} />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="w-full border-t-4 border-cia-dark mt-auto relative z-20 bg-cia-bg">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Branding */}
          <div className="flex items-center gap-3">
            <div className="border-2 border-cia-dark px-2.5 py-1 font-stamp text-xs bg-cia-card rotate-1">
              SECRET
            </div>
            <div>
              <p className="text-xs text-cia-dark font-bold">© 1965 Astral HR Dossier</p>
              <p className="text-[10px] text-cia-muted font-bold">Classified Intelligence System · Weton/BaZi/Falakiyah</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://vrrobo-lp.vercel.app/#portfolio"
              target="_blank"
              rel="noreferrer"
              onClick={playReturnSound}
              className="flex items-center gap-2 text-xs font-bold tracking-wider text-cia-muted hover:text-cia-dark transition-colors"
            >
              VRROBO2025
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div className="w-px h-4 bg-cia-dark/30"></div>
            <button
              onClick={handleOpenDonate}
              className="flex items-center gap-2 text-xs font-bold tracking-wider text-cia-muted hover:text-cia-dark transition-colors"
            >
              GoPay Donate
            </button>
          </div>
        </div>
      </footer>

      {/* Classified Donate Modal */}
      {showDonate && (
        <div className="fixed inset-0 bg-cia-dark/45 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={handleCloseDonate}>
          <div className="w-full max-w-md bg-cia-card border-[3px] border-cia-dark shadow-cia-card relative overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Top warning line */}
            <div className="bg-cia-red text-white text-center py-2 text-[10px] font-bold tracking-[0.2em] uppercase">
              ⚠️ RESTRICTED ACCESS // LEVEL 3 CLEARANCE REQUIRED
            </div>
            
            <div className="p-8">
              <button onClick={handleCloseDonate} className="absolute top-12 right-6 text-cia-muted hover:text-cia-dark transition-colors p-1.5 border border-transparent hover:border-cia-dark">
                <X className="w-4 h-4" />
              </button>
              
              <div className="text-center space-y-6">
                <div className="stamp stamp-classified text-xl font-black tracking-widest mx-auto block w-fit">
                  CONFIDENTIAL
                </div>
                
                <div>
                  <h3 className="text-lg font-black text-cia-dark">SUPPORT MISSION FUND</h3>
                  <p className="text-cia-muted text-xs mt-2 max-w-xs mx-auto leading-relaxed font-semibold uppercase">
                    Operasional sistem ini dibiayai mandiri. Salurkan dana bantuan operasional via nomor di bawah.
                  </p>
                </div>
                
                <div className="bg-cia-bg border-2 border-cia-dark p-6 relative">
                  <div className="absolute -top-3 left-4 px-2 bg-cia-card text-[9px] font-black uppercase text-cia-red">GoPay Account</div>
                  <p className="text-cia-red font-bold text-2xl tracking-widest font-mono">08121105212</p>
                  <p className="text-[9px] text-cia-muted mt-2 font-bold uppercase tracking-widest">Click below to copy target details</p>
                </div>
                
                <button 
                  onClick={() => { playReturnSound(); navigator.clipboard.writeText('08121105212'); alert('GoPay details copied successfully.'); }} 
                  className="w-full py-3.5 btn-primary font-bold text-xs"
                >
                  COPY DOSSIER NUMBER
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
