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
    <div className="p-8 lg:p-12 xl:p-16 max-w-[2000px] mx-auto h-full flex flex-col">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold flex items-center gap-4">
          <Users className="w-10 h-10 md:w-12 md:h-12 text-fuchsia-400" /> Team Synergy Matcher
        </h2>
        <p className="text-slate-400 mt-4 text-lg max-w-2xl">Select multiple candidates to calculate their combined esoteric compatibility and team dynamics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 flex-1">
        {/* Selection Area */}
        <div className="glass-panel p-10 lg:p-12 rounded-[2rem] flex flex-col shadow-2xl">
          <h3 className="text-base font-bold tracking-[0.2em] uppercase text-slate-300 mb-8 border-b border-white/10 pb-4">Team Composition</h3>
          
          {loading ? (
            <div className="flex justify-center p-8"><Loader className="w-8 h-8 animate-spin text-fuchsia-400" /></div>
          ) : (
            <div className="flex-1 flex flex-col gap-6">
              {/* Dropdown & Add Button */}
              <div className="flex gap-4">
                <select 
                  className="flex-1 px-5 py-4 rounded-2xl glass-input text-lg font-medium appearance-none cursor-pointer"
                  id="candidate-select"
                  defaultValue=""
                >
                  <option value="" disabled>-- Select a candidate --</option>
                  {candidates.filter(c => !selectedIds.includes(c.id)).map(c => (
                    <option key={c.id} value={c.id} className="bg-slate-900 text-white">{c.name}</option>
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
                  className="px-8 py-4 bg-fuchsia-600 hover:bg-fuchsia-500 rounded-2xl font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-fuchsia-900/50"
                >
                  Add
                </button>
              </div>

              {/* Selected Candidates List */}
              <div className="mt-4 flex-1">
                <h4 className="text-sm font-semibold tracking-wider text-slate-400 mb-4">Selected Team Members ({selectedIds.length})</h4>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {selectedIds.length === 0 ? (
                    <p className="text-slate-500 text-center py-6 bg-black/20 rounded-2xl border border-white/5 border-dashed">No members added yet.</p>
                  ) : (
                    selectedIds.map(id => {
                      const c = candidates.find(can => can.id === id);
                      if (!c) return null;
                      return (
                        <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} key={id} className="flex justify-between items-center p-5 rounded-2xl bg-gradient-to-r from-fuchsia-900/20 to-purple-900/20 border border-fuchsia-500/30 shadow-lg">
                          <div>
                            <p className="font-bold text-white text-xl">{c.name}</p>
                            <p className="text-sm text-fuchsia-300 font-medium mt-1">ID: #{c.id}</p>
                          </div>
                          <button 
                            onClick={() => toggleSelect(id)}
                            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 font-bold rounded-xl transition-all"
                            title="Remove"
                          >
                            Remove
                          </button>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-white/10">
            <button 
              disabled={selectedIds.length < 2 || calculating}
              onClick={handleCalculate}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 font-bold text-white text-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3 shadow-[0_0_40px_-10px_rgba(192,132,252,0.6)]"
            >
              {calculating ? <Loader className="w-6 h-6 animate-spin" /> : <Target className="w-6 h-6" />}
              {calculating ? 'CALCULATING SYNERGY...' : `CALCULATE SYNERGY`}
            </button>
            {selectedIds.length < 2 && <p className="text-sm text-center text-slate-500 mt-4 font-medium">Add at least 2 candidates to calculate</p>}
          </div>
        </div>

        {/* Result Area */}
        <div className="glass-panel p-10 lg:p-12 rounded-[2rem] relative overflow-hidden flex flex-col justify-center items-center shadow-2xl">
          <AnimatePresence mode="wait">
            {!synergyResult ? (
              <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-center opacity-50">
                <Users className="w-32 h-32 mx-auto mb-6 text-slate-600 animate-pulse" />
                <p className="text-xl font-medium">Awaiting Team Selection</p>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} className="text-center w-full">
                {synergyResult.error ? (
                  <div className="text-red-400 bg-red-900/20 p-8 rounded-3xl border border-red-500/30">
                    <AlertTriangle className="w-20 h-20 mx-auto mb-6" />
                    <p className="text-lg font-bold">{synergyResult.error}</p>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-base font-bold tracking-[0.3em] uppercase text-fuchsia-400 mb-4">Team Synergy Score</h4>
                    <div className="text-8xl font-black text-white mb-10 drop-shadow-2xl">
                      {synergyResult.team_synergy_score}<span className="text-3xl text-slate-500 font-bold">/100</span>
                    </div>
                    
                    <div className="glass-card p-8 rounded-[2rem] mx-auto w-full text-left bg-gradient-to-br from-black/40 to-black/10">
                       <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                         {synergyResult.team_synergy_score > 70 ? (
                           <ShieldCheck className="w-8 h-8 text-emerald-400" />
                         ) : (
                           <AlertTriangle className="w-8 h-8 text-amber-400" />
                         )}
                         <span className="font-bold text-xl text-slate-200 uppercase tracking-widest">Analysis Verdict</span>
                       </div>
                       <p className="text-slate-300 text-lg leading-loose">{synergyResult.details}</p>
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
