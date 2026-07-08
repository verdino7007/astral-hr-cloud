import React from 'react';
import { ShieldAlert, Terminal, ArrowRight, Lock } from 'lucide-react';
import { playReturnSound } from '../utils/typewriterSound';

function Landing({ onStart }) {
  const handleInitiate = () => {
    playReturnSound();
    onStart();
  };

  return (
    <div className="min-h-screen bg-cia-bg font-typewriter flex flex-col justify-between p-6 md:p-12 relative overflow-hidden">
      {/* Background Layers */}
      <div className="scene-bg"></div>
      <div className="scene-grid"></div>

      {/* Outer dossier border */}
      <div className="absolute inset-4 md:inset-8 border-[6px] border-double border-cia-dark pointer-events-none z-0"></div>

      {/* Header Stamp */}
      <div className="w-full flex justify-between items-start z-10">
        <div className="border-3 border-cia-dark px-3 py-1 text-xs font-black rotate-[-2deg] bg-cia-card stamp stamp-secret">
          DEPARTMENT OF PSYCHO-LOGISTICS
        </div>
        <div className="border-3 border-cia-red text-cia-red px-3 py-1 text-xs font-black rotate-[3deg] bg-cia-card stamp stamp-classified">
          TOP SECRET
        </div>
      </div>

      {/* Main Folder Plate */}
      <div className="max-w-3xl w-full mx-auto my-auto z-10 py-12 px-4">
        <div className="card bg-cia-card border-[3px] border-cia-dark p-8 md:p-12 shadow-cia-card relative slant-right">
          {/* Internal folder stamp */}
          <div className="absolute -top-5 left-8 stamp stamp-classified text-[10px] font-black tracking-widest px-3 bg-cia-card">
            ARCHIVE NO: A-HR-1965
          </div>

          <div className="space-y-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <Terminal className="w-6 h-6 text-cia-dark animate-pulse" />
                <span className="text-[10px] text-cia-muted font-bold tracking-[0.2em] uppercase">SYSTEM ONLINE // VER: 4.8.1-1965</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-cia-dark uppercase tracking-tighter leading-none font-stamp">
                ASTRAL-HR
              </h1>
              <p className="text-sm font-bold text-cia-muted uppercase mt-2 tracking-widest">
                Cognitive Mapping & Synergy Synthesizer
              </p>
            </div>

            <div className="border-t-2 border-double border-cia-dark my-4"></div>

            {/* Typewritten Overview */}
            <div className="bg-cia-bg/50 border border-cia-dark/20 p-6 space-y-4 text-xs leading-relaxed text-cia-dark font-mono text-left">
              <p className="uppercase">
                <span className="font-bold underline">WARNING:</span> THIS COMPUTER TERMINAL IS RESTRICTED TO AUTHORIZED CENTRAL INTELLIGENCE AGENCY OPERATIVES.
              </p>
              <p className="uppercase">
                THIS SYSTEM FORMULATES COMPREHENSIVE PSYCHIC PROFILE DOSSIERS BY CORRELATING:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1">
                <li>COSMIC 4-PILLAR BAZI STEMS & DAY MASTER VIBRATIONS</li>
                <li>JAVANESE PRIMBON WETON CYCLICAL HARMONICS</li>
                <li>FALAKIYAH LUNAR ILLUMINATION & PLANETARY TRANSITS</li>
              </ul>
              <p className="uppercase">
                ALL RETRIEVED DATA AND TEAM SYNERGY CALCULATIONS ARE CLASSIFIED LEVEL 3 SECURE. AUTHORIZATION CREDENTIALS REQUIRED FOR CONTINUATING INGESTION.
              </p>
            </div>

            {/* Ingress Button */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
              <div className="flex items-center gap-2.5 text-cia-red">
                <Lock className="w-4 h-4 animate-pulse shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-left">
                  Secured by SHA-256 operative clearance
                </span>
              </div>

              <button
                onClick={handleInitiate}
                className="w-full md:w-auto btn-primary px-8 py-4 flex items-center justify-center gap-3 text-sm font-bold tracking-widest"
              >
                <span>INITIATE OPERATIVE SESSION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer warning details */}
      <div className="w-full text-center space-y-2 z-10">
        <div className="flex items-center justify-center gap-2 text-cia-muted text-[9px] font-bold uppercase">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>SECURITY LOGGING RUNNING ON PORT 9091 // ALL CONNECTIONS ENCRYPTED</span>
        </div>
        <p className="text-[8px] text-cia-muted uppercase tracking-widest font-mono">
          Central Intelligence Agency Archives Portal · Langley, Virginia
        </p>
      </div>
    </div>
  );
}

export default Landing;
