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
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pastel-lavender-light border border-purple-200/50 text-purple-700 text-xs font-bold tracking-wider mb-6 shadow-pastel">
          <Users className="w-4 h-4 text-pastel-lavender-dark" />
          TEAM ALIGNMENT
        </div>
        <h2 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tight leading-tight">
          Team Synergy Matcher
        </h2>
        <p className="text-slate-600 mt-5 text-[15px] leading-relaxed max-w-2xl">
          Pilih beberapa kandidat untuk menghitung persentase kecocokan esoterik dan sinergi dinamika kelompok mereka.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 flex-1">
        
        {/* Selection Area */}
        <div className="card p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3.5 mb-8 pb-6 border-b border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-pastel-lavender-light flex items-center justify-center shadow-pastel">
                <Users className="w-5 h-5 text-purple-700" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">Team Composition</h3>
                <p className="text-xs text-slate-500 mt-0.5">Atur anggota divisi kerja</p>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center p-8">
                <Loader className="w-8 h-8 animate-spin text-pastel-lavender-dark" />
              </div>
            ) : (
              <div className="flex-1 flex flex-col gap-6">
                {/* Dropdown & Add Button */}
                <div className="flex gap-4">
                  <select 
                    className="flex-1 px-4 py-3.5 rounded-2xl glass-input text-sm font-semibold appearance-none cursor-pointer"
                    id="candidate-select"
                    defaultValue=""
                  >
                    <option value="" disabled>-- Pilih kandidat --</option>
                    {candidates.filter(c => !selectedIds.includes(c.id)).map(c => (
                      <option key={c.id} value={c.id} className="text-slate-800 bg-white">{c.name}</option>
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
                    className="px-6 py-3.5 bg-pastel-lavender-light border border-purple-200 text-purple-800 font-bold rounded-xl shadow-pastel hover:bg-purple-200 transition-all text-sm shrink-0"
                  >
                    Add Member
                  </button>
                </div>

                {/* Selected Candidates List */}
                <div className="mt-4 flex-1">
                  <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-4">Selected Team Members ({selectedIds.length})</h4>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {selectedIds.length === 0 ? (
                      <p className="text-slate-400 text-center py-8 bg-slate-50 rounded-2xl border border-slate-200/50 border-dashed text-sm font-semibold">
                        Belum ada anggota tim yang terpilih.
                      </p>
                    ) : (
                      selectedIds.map(id => {
                        const c = candidates.find(can => can.id === id);
                        if (!c) return null;
                        return (
                          <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} key={id} className="flex justify-between items-center p-5 rounded-2xl bg-white border border-slate-200/80 shadow-pastel">
                            <div>
                              <p className="font-extrabold text-slate-800 text-base">{c.name}</p>
                              <p className="text-xs text-slate-400 font-semibold mt-1">ID: #{c.id}</p>
                            </div>
                            <button 
                              onClick={() => toggleSelect(id)}
                              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl border border-rose-200/40 text-xs shadow-pastel transition-all"
                              title="Hapus"
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
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200/60">
            <button 
              disabled={selectedIds.length < 2 || calculating}
              onClick={handleCalculate}
              className="w-full py-4 rounded-xl btn-primary shadow-pastel-pink font-bold flex justify-center items-center gap-2"
            >
              {calculating ? <Loader className="w-5 h-5 animate-spin text-rose-700" /> : <Target className="w-5 h-5 text-rose-700" />}
              {calculating ? 'CALCULATING SYNERGY...' : `CALCULATE SYNERGY`}
            </button>
            {selectedIds.length < 2 && <p className="text-xs text-center text-slate-400 mt-4 font-bold uppercase tracking-wider">Pilih minimal 2 kandidat untuk mulai analisa</p>}
          </div>
        </div>

        {/* Result Area */}
        <div className="card p-8 lg:p-10 flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            {!synergyResult ? (
              <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-center opacity-60">
                <Users className="w-24 h-24 mx-auto mb-6 text-slate-300" />
                <p className="text-base font-bold text-slate-400 uppercase tracking-widest">Menunggu Pemilihan Anggota Tim</p>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="text-center w-full">
                {synergyResult.error ? (
                  <div className="text-red-700 bg-red-50 p-8 rounded-3xl border border-red-200 shadow-pastel">
                    <AlertTriangle className="w-16 h-16 mx-auto mb-6 text-red-500" />
                    <p className="text-base font-bold leading-relaxed">{synergyResult.error}</p>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-purple-700 mb-4">Team Synergy Score</h4>
                    <div className="text-8xl font-black text-slate-800 mb-8 drop-shadow-sm leading-none">
                      {synergyResult.team_synergy_score}<span className="text-3xl text-slate-400 font-bold">/100</span>
                    </div>
                    
                    <div className="card p-8 rounded-2xl mx-auto w-full text-left bg-gradient-to-br from-pastel-lavender-light/40 to-white border-purple-200/50">
                       <div className="flex items-center gap-3.5 mb-6 border-b border-purple-200/30 pb-4">
                         {synergyResult.team_synergy_score > 70 ? (
                           <ShieldCheck className="w-7 h-7 text-emerald-600" />
                         ) : (
                           <AlertTriangle className="w-7 h-7 text-amber-500" />
                         )}
                         <span className="font-bold text-sm text-slate-700 uppercase tracking-wider">Analysis Verdict</span>
                       </div>
                       <p className="text-slate-600 text-sm leading-relaxed">{synergyResult.details}</p>
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
