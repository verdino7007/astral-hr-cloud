import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Loader, Target, ShieldAlert, Shield } from 'lucide-react';

function TeamMatcher() {
  const [candidates, setCandidates] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [synergyResult, setSynergyResult] = useState(null);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:9091';
    fetch(`${apiUrl}/candidates`)
      .then(res => res.json())
      .then(data => {
        setCandidates(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleCalculate = async () => {
    if (selectedIds.length < 2) return;
    setCalculating(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:9091';
      const res = await fetch(`${apiUrl}/synergy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate_ids: selectedIds })
      });
      const data = await res.json();
      setTimeout(() => {
        setSynergyResult(data);
        setCalculating(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      setCalculating(false);
    }
  };

  return (
    <div className="w-full font-typewriter relative">
      {/* Page Header */}
      <div className="mb-12 text-center md:text-left relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-cia-dark bg-cia-card text-cia-dark text-xs font-bold mb-6">
          <Users className="w-4 h-4 text-cia-dark" />
          TEAM COMPATIBILITY ALIGNMENT
        </div>
        <h2 className="text-3xl lg:text-5xl font-black text-cia-dark tracking-tight leading-tight uppercase font-stamp">
          Team Synergy Matrix
        </h2>
        <div className="accent-bar max-w-lg my-4"></div>
        <p className="text-cia-muted mt-5 text-sm leading-relaxed max-w-2xl font-bold uppercase">
          CALCULATE SYNERGY MATRIX AND ESOTERIC INTERACTION METRICS BETWEEN MULTIPLE CLASSIFIED CANDIDATES.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 flex-1 relative z-10 items-stretch">
        
        {/* Selection Area */}
        <div className="card p-8 lg:p-10 flex flex-col justify-between slant-left shadow-cia-card relative bg-cia-card border-3 border-cia-dark">
          {/* Decorative stamp tag */}
          <div className="absolute top-4 right-6 text-[10px] font-bold text-cia-red uppercase font-stamp border-2 border-cia-red px-2 py-0.5 rotate-3">
            Dossiers
          </div>

          <div>
            <div className="flex items-center gap-3.5 mb-8 pb-4 border-b-2 border-cia-dark/30 mt-2">
              <div className="w-10 h-10 border-2 border-cia-dark bg-cia-bg flex items-center justify-center">
                <Users className="w-5 h-5 text-cia-dark" />
              </div>
              <div>
                <h3 className="text-sm font-black text-cia-dark font-stamp">TEAM COMPOSITION</h3>
                <p className="text-[9px] text-cia-muted font-bold mt-0.5 uppercase">SPECIFY TEAM MEMBER FILES</p>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center p-8">
                <Loader className="w-6 h-6 animate-spin text-cia-dark" />
              </div>
            ) : (
              <div className="flex-1 flex flex-col gap-6">
                {/* Dropdown & Add Button */}
                <div className="flex gap-4">
                  <select 
                    className="flex-1 px-3 py-2 border-2 border-cia-dark bg-cia-bg text-xs font-bold appearance-none cursor-pointer"
                    id="candidate-select"
                    defaultValue=""
                  >
                    <option value="" disabled className="uppercase">-- CHOOSE SUBJECT FILE --</option>
                    {candidates.filter(c => !selectedIds.includes(c.id)).map(c => (
                      <option key={c.id} value={c.id} className="text-cia-dark bg-cia-card uppercase">{c.name}</option>
                    ))}
                  </select>
                  <button 
                    onClick={() => {
                      const select = document.getElementById('candidate-select');
                      if (select.value) {
                        toggleSelect(parseInt(select.value));
                        select.value = "";
                      }
                    }}
                    className="px-4 py-2 btn-secondary text-xs font-bold"
                  >
                    DEPLOY MEMBER
                  </button>
                </div>

                {/* Selected Candidates List */}
                <div className="mt-4 flex-1">
                  <h4 className="text-[10px] font-bold tracking-wider text-cia-muted uppercase mb-4">DEPLOYED ASSETS ({selectedIds.length})</h4>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {selectedIds.length === 0 ? (
                      <p className="text-cia-muted text-center py-8 bg-cia-bg border-2 border-dashed border-cia-dark/30 text-xs font-bold uppercase">
                        NO ASSET FILES CURRENTLY DEPLOYED FOR SYNERGY COMPARISON.
                      </p>
                    ) : (
                      selectedIds.map(id => {
                        const c = candidates.find(can => can.id === id);
                        if (!c) return null;
                        return (
                          <motion.div initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} key={id} className="flex justify-between items-center p-4 border border-cia-dark bg-cia-bg hover:scale-102 transition-transform">
                            <div>
                              <p className="font-bold text-cia-dark text-sm uppercase">{c.name}</p>
                              <p className="text-[9px] text-cia-muted font-bold mt-1">RECORD ID: #CIA-{c.id}</p>
                            </div>
                            <button 
                              onClick={() => toggleSelect(id)}
                              className="px-3 py-1 border border-cia-red bg-cia-card hover:bg-cia-red hover:text-cia-bg text-cia-red font-bold text-[10px] transition-all uppercase"
                              title="Hapus"
                            >
                              DISCARD
                            </button>
                          </motion.div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t-2 border-cia-dark/30">
            <button 
              disabled={selectedIds.length < 2 || calculating}
              onClick={handleCalculate}
              className="w-full py-4 btn-primary font-bold text-xs flex justify-center items-center gap-2 uppercase"
            >
              {calculating ? <Loader className="w-4 h-4 animate-spin text-cia-bg" /> : <Target className="w-4 h-4 text-cia-bg" />}
              {calculating ? 'CALCULATING SYNERGY VECTORS...' : `COMPUTE SYNERGY MATRIX`}
            </button>
            {selectedIds.length < 2 && <p className="text-[9px] text-center text-cia-muted mt-4 font-bold uppercase tracking-wider">DEPLOY AT LEAST 2 SUBJECT FILES TO RUN MATRIX ANALYSIS</p>}
          </div>
        </div>

        {/* Result Area */}
        <div className="card p-8 lg:p-10 flex flex-col justify-center items-center slant-right shadow-cia-card relative bg-cia-card border-3 border-cia-dark">
          {/* Decorative tag */}
          <div className="absolute top-4 right-6 text-[10px] font-bold text-cia-red uppercase font-stamp border-2 border-cia-red px-2 py-0.5 rotate-[-2deg]">
            Verdict
          </div>

          <AnimatePresence mode="wait">
            {!synergyResult ? (
              <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-center opacity-60 mt-2">
                <Users className="w-20 h-20 mx-auto mb-6 text-cia-muted/30" />
                <p className="text-[10px] font-bold text-cia-muted uppercase tracking-wider">AWAITING MATRIX COMPONENT SPECIFICATION</p>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} className="text-center w-full mt-2">
                {synergyResult.error ? (
                  <div className="text-cia-red bg-cia-bg p-6 border-2 border-cia-red shadow-cia-card">
                    <ShieldAlert className="w-12 h-12 mx-auto mb-4 text-cia-red" />
                    <p className="text-xs font-bold uppercase leading-relaxed">{synergyResult.error}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <h4 className="text-[10px] font-bold tracking-wider uppercase text-cia-red mb-4">SYNERGY COMPATIBILITY MATRIX INDEX</h4>
                    
                    {/* Floating 3D score box */}
                    <div className="text-6xl font-black text-cia-dark mb-8 leading-none bg-cia-bg border-3 border-cia-dark shadow-cia-card px-8 py-5 relative z-10 slant-left font-stamp">
                      {synergyResult.team_synergy_score}<span className="text-xl text-cia-muted font-bold font-typewriter">/100</span>
                    </div>
                    
                    {/* Verdict overlaps the score box slightly */}
                    <div className="card p-6 rounded-none mx-auto w-full text-left bg-cia-card border-3 border-cia-dark shadow-cia-card md:-mt-4 relative z-0 slant-right">
                       <div className="flex items-center gap-3.5 mb-4 border-b border-cia-dark/30 pb-3">
                         <Shield className="w-5 h-5 text-cia-dark" />
                         <span className="font-bold text-[9px] text-cia-muted uppercase tracking-wider">TACTICAL INTEGRATION ANALYSIS</span>
                       </div>
                       <p className="text-cia-dark text-xs leading-relaxed font-bold uppercase">
                         {synergyResult.details.replace(/(lemah|sensitif|konflik|kurang|buruk|bahaya|cacat|negatif|kelemahan)/gi, (match) => {
                           return `<span class="redacted">${match}</span>`;
                         })}
                       </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default TeamMatcher;
