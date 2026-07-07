import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Loader, Target, AlertTriangle, ShieldCheck } from 'lucide-react';

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
    <div className="p-8 h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Users className="w-8 h-8 text-fuchsia-400" /> Team Synergy Matcher
        </h2>
        <p className="text-slate-400 mt-2">Select multiple candidates to calculate their combined esoteric compatibility.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Selection Area */}
        <div className="glass-panel p-6 rounded-3xl flex flex-col">
          <h3 className="text-sm tracking-widest uppercase text-slate-300 mb-6 border-b border-white/10 pb-4">Available Candidates</h3>
          
          {loading ? (
            <div className="flex justify-center p-8"><Loader className="w-6 h-6 animate-spin text-fuchsia-400" /></div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {candidates.length === 0 ? (
                <p className="text-slate-500 text-center mt-8">No candidates available. Please add some first.</p>
              ) : (
                candidates.map(c => (
                  <div 
                    key={c.id} 
                    onClick={() => toggleSelect(c.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedIds.includes(c.id) ? 'bg-fuchsia-500/20 border-fuchsia-400/50' : 'bg-black/20 border-white/5 hover:bg-white/5'}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-white">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.analysis_data?.bazi?.day_master || 'Unknown Element'}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedIds.includes(c.id) ? 'border-fuchsia-400 bg-fuchsia-400' : 'border-slate-600'}`}>
                        {selectedIds.includes(c.id) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-white/10">
            <button 
              disabled={selectedIds.length < 2 || calculating}
              onClick={handleCalculate}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 font-bold text-white transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-[0_0_30px_-5px_rgba(192,132,252,0.5)]"
            >
              {calculating ? <Loader className="w-5 h-5 animate-spin" /> : <Target className="w-5 h-5" />}
              {calculating ? 'CALCULATING SYNERGY...' : `CALCULATE TEAM SYNERGY (${selectedIds.length} SELECTED)`}
            </button>
            {selectedIds.length < 2 && <p className="text-xs text-center text-slate-500 mt-3">Select at least 2 candidates</p>}
          </div>
        </div>

        {/* Result Area */}
        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            {!synergyResult ? (
              <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-center opacity-50">
                <Users className="w-24 h-24 mx-auto mb-4 text-slate-600" />
                <p>Awaiting Team Selection</p>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} className="text-center w-full">
                {synergyResult.error ? (
                  <div className="text-red-400">
                    <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
                    <p>{synergyResult.error}</p>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-sm tracking-[0.3em] uppercase text-fuchsia-400 mb-2">Team Synergy Score</h4>
                    <div className="text-7xl font-bold text-white mb-6">
                      {synergyResult.team_synergy_score}<span className="text-2xl text-slate-500">/100</span>
                    </div>
                    
                    <div className="glass-card p-6 rounded-2xl mx-auto max-w-sm text-left">
                       <div className="flex items-center gap-3 mb-3">
                         {synergyResult.team_synergy_score > 70 ? (
                           <ShieldCheck className="w-6 h-6 text-emerald-400" />
                         ) : (
                           <AlertTriangle className="w-6 h-6 text-amber-400" />
                         )}
                         <span className="font-bold text-slate-200">Analysis Verdict</span>
                       </div>
                       <p className="text-slate-300 leading-relaxed">{synergyResult.details}</p>
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
