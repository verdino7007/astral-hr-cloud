import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Trash2, Edit2, Loader, Save, X, Eye, FileText, 
  Terminal, Hexagon, Briefcase, ShieldAlert, Compass, Sun, Moon, BookOpen
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer 
} from 'recharts';
import { playKeySound, playReturnSound } from '../utils/typewriterSound';

function CandidateVault({ token }) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', birth_date: '', birth_time: '' });

  // Report viewing states
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [activeTab, setActiveTab] = useState('bazi');
  const [revealSecrets, setRevealSecrets] = useState(false);

  const fetchCandidates = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:9091';
      const res = await fetch(`${apiUrl}/candidates`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setCandidates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [token]);

  const handleDelete = async (id) => {
    playReturnSound();
    if (!confirm('Apakah Anda yakin ingin menghapus arsip file kandidat ini?')) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:9091';
      await fetch(`${apiUrl}/candidates/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCandidates(candidates.filter(c => c.id !== id));
      if (selectedCandidate?.id === id) {
        setSelectedCandidate(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenReport = (c) => {
    playReturnSound();
    setSelectedCandidate(c);
    setActiveTab('bazi');
  };

  const startEdit = (c) => {
    playReturnSound();
    setEditingId(c.id);
    setEditForm({ name: c.name, birth_date: c.birth_date, birth_time: c.birth_time });
  };

  const handleSaveEdit = async () => {
    playReturnSound();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:9091';
      const res = await fetch(`${apiUrl}/candidates/${editingId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        setEditingId(null);
        fetchCandidates();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full font-typewriter relative">
      {/* Decorative Stamp */}
      <div className="absolute -top-10 -right-6 stamp stamp-classified text-sm font-black rotate-12 bg-cia-card">
        RESTRICTED ARCHIVES
      </div>

      {/* Page Header */}
      <div className="mb-12 text-center md:text-left relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-cia-dark bg-cia-card text-cia-dark text-xs font-bold mb-6">
          <Database className="w-4 h-4 text-cia-dark" />
          RECORD INGESTION DIRECTORY
        </div>
        <h2 className="text-3xl lg:text-5xl font-black text-cia-dark tracking-tight leading-tight uppercase font-stamp">
          Subject Archives Vault
        </h2>
        <div className="accent-bar max-w-lg my-4"></div>
        <p className="text-cia-muted mt-5 text-sm leading-relaxed max-w-2xl font-bold uppercase">
          DIRECTORY OF REGISTERED PROFILE FILES AND COGNITIVE METRICS RECORDED WITHIN PROJECT ASTRAL-HR.
        </p>
      </div>

      {/* Main Table Container (Dossier Sheet style) */}
      <div className="card overflow-hidden shadow-cia-card relative z-10 slant-left slant-hover bg-cia-card border-3 border-cia-dark p-6 lg:p-8">
        <div className="absolute top-4 right-6 text-[10px] font-bold text-cia-red uppercase font-stamp border-2 border-cia-red px-2 py-0.5 rotate-[-2deg]">
          Secret File
        </div>

        {loading ? (
          <div className="p-20 flex justify-center items-center">
            <Loader className="w-6 h-6 animate-spin text-cia-dark" />
          </div>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cia-bg border-b-2 border-cia-dark text-[10px] font-bold tracking-wider uppercase text-cia-muted">
                  <th className="p-4 border-r border-cia-dark/20">RECORD ID</th>
                  <th className="p-4 border-r border-cia-dark/20">SUBJECT NAME</th>
                  <th className="p-4 border-r border-cia-dark/20">BIRTH DATE (FILE)</th>
                  <th className="p-4 border-r border-cia-dark/20">BIRTH TIME</th>
                  <th className="p-4 border-r border-cia-dark/20">METRIC SCORE</th>
                  <th className="p-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cia-dark/25">
                {candidates.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-cia-muted font-bold uppercase">
                      NO REGISTERED COGNITIVE DOSSIERS FOUND IN THE ARCHIVE DATABASE.
                    </td>
                  </tr>
                ) : (
                  candidates.map((c) => (
                    <tr key={c.id} className="hover:bg-cia-bg transition-colors font-bold text-xs">
                      <td className="p-4 border-r border-cia-dark/10 text-cia-muted font-mono font-bold">#CIA-{c.id}</td>
                      
                      {/* Name */}
                      <td className="p-4 border-r border-cia-dark/10 text-cia-dark uppercase">
                        {editingId === c.id ? (
                          <input
                            type="text"
                            className="w-full glass-input text-xs"
                            value={editForm.name}
                            onChange={e => setEditForm({...editForm, name: e.target.value})}
                            onKeyDown={playKeySound}
                          />
                        ) : c.name}
                      </td>

                      {/* Birth Date */}
                      <td className="p-4 border-r border-cia-dark/10 text-cia-muted">
                        {editingId === c.id ? (
                          <input
                            type="date"
                            className="w-full glass-input text-xs"
                            value={editForm.birth_date}
                            onChange={e => setEditForm({...editForm, birth_date: e.target.value})}
                            onKeyDown={playKeySound}
                          />
                        ) : c.birth_date}
                      </td>

                      {/* Birth Time */}
                      <td className="p-4 border-r border-cia-dark/10 text-cia-muted font-mono">
                        {editingId === c.id ? (
                          <input
                            type="time"
                            className="w-full glass-input text-xs"
                            value={editForm.birth_time}
                            onChange={e => setEditForm({...editForm, birth_time: e.target.value})}
                            onKeyDown={playKeySound}
                          />
                        ) : c.birth_time}
                      </td>

                      {/* Score Badge */}
                      <td className="p-4 border-r border-cia-dark/10">
                        <span className="px-2.5 py-1 border border-cia-dark bg-cia-bg text-cia-dark rounded-none font-bold shadow-inner">
                          {c.overall_score}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        {editingId === c.id ? (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={handleSaveEdit}
                              className="p-2 border border-cia-dark bg-cia-dark text-cia-bg transition-colors"
                              title="Commit Save"
                            >
                              <Save className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => { playReturnSound(); setEditingId(null); }}
                              className="p-2 border border-cia-dark bg-cia-card text-cia-dark transition-colors"
                              title="Discard"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleOpenReport(c)}
                              className="p-2 border border-cia-dark bg-cia-dark text-cia-bg hover:bg-cia-card hover:text-cia-dark transition-colors"
                              title="View Dossier Report"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => startEdit(c)}
                              className="p-2 border border-cia-dark bg-cia-card text-cia-orange hover:bg-cia-dark hover:text-cia-bg transition-colors"
                              title="Edit Record"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(c.id)}
                              className="p-2 border border-cia-red bg-cia-card text-cia-red hover:bg-cia-red hover:text-cia-bg transition-colors"
                              title="Expunge File"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Helper function to parse/normalize BaZi */}
      {(() => {
        return null;
      })()}

      {/* ════ CLASSIFIED REPORT VIEW OVERLAY MODAL ════ */}
      {selectedCandidate && (() => {
        // Define helper inline to get normalized BaZi
        const getBaziData = (c) => {
          if (!c?.analysis_data?.bazi) return null;
          const rawBazi = c.analysis_data.bazi;
          
          // Normalize Day Master
          let normalizedDm = { character: '?', pinyin: '', element: '', polarity: '', translation: '', symbol: '', meaning: '' };
          if (typeof rawBazi.day_master === 'object' && rawBazi.day_master !== null) {
            normalizedDm = { ...normalizedDm, ...rawBazi.day_master };
          } else if (typeof rawBazi.day_master === 'string') {
            normalizedDm.character = rawBazi.day_master;
            normalizedDm.translation = `Element: ${rawBazi.day_master}`;
          }
          
          // Normalize Pillars
          const normalizedPillars = {};
          const keys = ['year', 'month', 'day', 'time'];
          keys.forEach((key) => {
            const p = rawBazi.pillars?.[key];
            if (typeof p === 'object' && p !== null) {
              normalizedPillars[key] = p;
            } else if (typeof p === 'string') {
              const stemChar = p.charAt(0) || '?';
              const branchChar = p.charAt(1) || '?';
              normalizedPillars[key] = {
                character: p,
                stem: { character: stemChar, pinyin: '', element: '', polarity: '', translation: '', symbol: '', meaning: '' },
                branch: { character: branchChar, pinyin: '', zodiac: '', element: '', meaning: '' }
              };
            } else {
              normalizedPillars[key] = {
                character: '??',
                stem: { character: '?', pinyin: '', element: '', polarity: '', translation: '', symbol: '', meaning: '' },
                branch: { character: '?', pinyin: '', zodiac: '', element: '', meaning: '' }
              };
            }
          });
          
          return {
            ...rawBazi,
            day_master: normalizedDm,
            pillars: normalizedPillars
          };
        };

        const baziData = getBaziData(selectedCandidate);

        return (
          <div className="fixed inset-0 bg-cia-dark/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => { playReturnSound(); setSelectedCandidate(null); }}>
            <div className="w-full max-w-4xl bg-cia-bg border-3 border-cia-dark shadow-cia-card relative my-8" onClick={e => e.stopPropagation()}>
              {/* Folder Header */}
              <div className="bg-cia-dark text-cia-bg text-center py-2.5 text-xs font-bold tracking-[0.2em] uppercase relative font-stamp">
                // CLASSIFIED REPORT FILE // RECORD ID: #CIA-{selectedCandidate.id} //
                <button 
                  onClick={() => { playReturnSound(); setSelectedCandidate(null); }} 
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cia-bg hover:text-cia-red transition-all p-1"
                  title="Close File"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-6 md:p-8 space-y-8 max-h-[80vh] overflow-y-auto text-cia-dark">
                
                {/* Profile Details header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-cia-dark pb-6 gap-4">
                  <div>
                    <h3 className="text-xl font-black text-cia-dark font-stamp uppercase">
                      SUBJECT DOSSIER: {selectedCandidate.name}
                    </h3>
                    <p className="text-[10px] text-cia-muted font-bold uppercase mt-1">
                      Ingested date: {selectedCandidate.birth_date} @ {selectedCandidate.birth_time}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] text-cia-muted font-bold uppercase">REDACTION:</span>
                    <button 
                      onClick={() => { playReturnSound(); setRevealSecrets(!revealSecrets); }} 
                      className="px-3 py-1.5 border border-cia-dark bg-cia-card text-cia-dark text-[10px] font-bold hover:bg-cia-dark hover:text-cia-bg transition-all uppercase"
                    >
                      {revealSecrets ? 'RE-CLASSIFY' : 'DE-CLASSIFY'}
                    </button>
                  </div>
                </div>

                {/* Holistic Synthesis */}
                {selectedCandidate.analysis_data?.synthesis && (
                  <div className="card p-6 bg-cia-card border-2 border-cia-dark relative z-10 shadow-cia-btn">
                    <div className="absolute -top-3.5 left-6 px-3 py-1.5 bg-cia-dark text-cia-bg text-[8px] font-bold tracking-widest uppercase">
                      [ VERDICT REPORT ]
                    </div>
                    <div className="space-y-4 text-cia-dark text-xs leading-relaxed font-bold mt-2">
                      {selectedCandidate.analysis_data.synthesis.split('\n\n').map((paragraph, idx) => {
                        const formattedHtml = paragraph
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/(lemah|sensitif|konflik|kurang|buruk|bahaya|cacat|negatif|kelemahan)/gi, (match) => {
                            return revealSecrets ? `<span class="border-b border-cia-red text-cia-red">${match}</span>` : `<span class="redacted">${match}</span>`;
                          });
                        return <p key={idx} dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
                      })}
                    </div>
                  </div>
                )}

                {/* Tabs selector */}
                <div className="flex border-b-2 border-cia-dark">
                  <button 
                    onClick={() => { playReturnSound(); setActiveTab('bazi'); }} 
                    className={`px-4 py-2 text-xs font-bold transition-all border-t-2 border-x-2 ${activeTab === 'bazi' ? 'bg-cia-card text-cia-dark border-cia-dark' : 'bg-cia-bg text-cia-muted border-transparent hover:text-cia-dark'}`}
                  >
                    BAZI
                  </button>
                  <button 
                    onClick={() => { playReturnSound(); setActiveTab('primbon'); }} 
                    className={`px-4 py-2 text-xs font-bold transition-all border-t-2 border-x-2 ${activeTab === 'primbon' ? 'bg-cia-card text-cia-dark border-cia-dark' : 'bg-cia-bg text-cia-muted border-transparent hover:text-cia-dark'}`}
                  >
                    WETON
                  </button>
                  <button 
                    onClick={() => { playReturnSound(); setActiveTab('falakiyah'); }} 
                    className={`px-4 py-2 text-xs font-bold transition-all border-t-2 border-x-2 ${activeTab === 'falakiyah' ? 'bg-cia-card text-cia-dark border-cia-dark' : 'bg-cia-bg text-cia-muted border-transparent hover:text-cia-dark'}`}
                  >
                    FALAKIYAH
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="pt-2">
                  {/* BAZI */}
                  {activeTab === 'bazi' && (() => {
                    if (!baziData) return <p className="text-xs font-bold text-cia-muted uppercase">No BaZi records found.</p>;
                    
                    const baziElements = baziData.elements || {};
                    const radarData = Object.keys(baziElements).map((key) => ({
                      subject: key,
                      Value: baziElements[key],
                      fullMark: 50,
                    }));

                    return (
                      <div className="flex flex-col gap-8 w-full">
                        {/* Day Master */}
                        <div className="card p-6 bg-cia-bg border-2 border-cia-dark shadow-cia-card relative">
                          <div className="absolute top-4 right-4 stamp stamp-classified text-[9px] font-black">
                            DAY MASTER
                          </div>
                          <div className="flex flex-col sm:flex-row gap-6 items-center">
                            <div className="w-16 h-16 border-2 border-cia-dark bg-cia-card flex flex-col items-center justify-center rotate-[-3deg] shrink-0 shadow-cia-btn">
                              <span className="text-3xl font-stamp font-black text-cia-red leading-none mt-1">
                                {baziData.day_master.character}
                              </span>
                              <span className="text-[10px] font-bold text-cia-dark leading-none mt-1">
                                {baziData.day_master.pinyin}
                              </span>
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-cia-dark uppercase font-stamp">
                                CORE ELEMENT: {baziData.day_master.translation}
                              </h4>
                              <p className="text-[9px] text-cia-muted font-bold uppercase mt-1">
                                SYMBOL: {baziData.day_master.symbol}
                              </p>
                              <p className="text-[11px] text-cia-dark mt-2.5 leading-relaxed font-semibold">
                                {baziData.day_master.meaning}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* 4 Pillars Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          {['year', 'month', 'day', 'time'].map((key) => {
                            const pillar = baziData.pillars[key];
                            if (!pillar) return null;
                            return (
                              <div key={key} className="card p-4 bg-cia-card border-2 border-cia-dark shadow-cia-btn text-center flex flex-col justify-between">
                                <div className="text-[8px] font-bold text-cia-muted uppercase border-b border-cia-dark/20 pb-1.5 mb-3">
                                  {key} pillar
                                </div>
                                <div className="mb-3">
                                  <span className="text-3xl font-stamp font-black text-cia-red block">{pillar.stem.character}</span>
                                  <span className="text-[10px] font-bold text-cia-dark block">{pillar.stem.pinyin}</span>
                                  <span className="text-[8px] text-cia-muted font-bold block uppercase">{pillar.stem.translation}</span>
                                  <p className="text-[9px] text-cia-dark mt-2 border-t border-dashed border-cia-dark/15 pt-2 leading-relaxed font-semibold">
                                    {pillar.stem.meaning}
                                  </p>
                                </div>
                                <div className="border-t border-cia-dark/30 my-2.5"></div>
                                <div>
                                  <span className="text-3xl font-stamp font-black text-cia-dark block">{pillar.branch.character}</span>
                                  <span className="text-[10px] font-bold text-cia-dark block">{pillar.branch.pinyin}</span>
                                  <span className="text-[8px] text-cia-muted font-bold block uppercase">{pillar.branch.zodiac}</span>
                                  <p className="text-[9px] text-cia-dark mt-2 border-t border-dashed border-cia-dark/15 pt-2 leading-relaxed font-semibold">
                                    {pillar.branch.meaning}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Traits, Deployment & Radar */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                          <div className="space-y-6 flex flex-col justify-between">
                            <div className="card p-5 bg-cia-card border-2 border-cia-dark shadow-cia-btn relative">
                              <h4 className="text-[10px] font-bold text-cia-dark uppercase mb-4 flex items-center gap-1.5"><Hexagon className="w-3.5 h-3.5"/> PSYCHO-ENERGY VECTORS</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {baziData.traits?.map((t, i) => (
                                  <span key={i} className="px-2 py-1 border border-cia-dark bg-cia-bg text-[10px] font-bold text-cia-dark">{t}</span>
                                ))}
                              </div>
                            </div>
                            <div className="card p-5 bg-cia-card border-2 border-cia-dark shadow-cia-btn relative flex-1">
                              <h4 className="text-[10px] font-bold text-cia-dark uppercase mb-4 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5"/> RECOMMENDED DEPLOYMENT</h4>
                              <ul className="space-y-2">
                                {baziData.best_roles?.map((r, i) => (
                                  <li key={i} className="flex items-center gap-2 bg-cia-bg border border-cia-dark/20 p-2 text-[10px] font-bold text-cia-dark">
                                    <div className="w-1.5 h-1.5 bg-cia-dark shrink-0"></div>{r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="flex flex-col items-center bg-cia-bg border-2 border-cia-dark p-4 shadow-cia-btn">
                            <h4 className="text-[10px] font-bold text-cia-dark uppercase mb-4 font-stamp">ELEMENT CHART</h4>
                            <div className="w-full h-48">
                              <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                                  <PolarGrid stroke="#0f0f0f" strokeWidth={1} />
                                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#0f0f0f', fontSize: 10, fontWeight: 'bold' }} />
                                  <Radar dataKey="Value" stroke="#0f0f0f" strokeWidth={2} fill="rgba(15, 15, 15, 0.1)" />
                                </RadarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* PRIMBON/WETON */}
                  {activeTab === 'primbon' && selectedCandidate.analysis_data?.primbon && (
                    <div className="flex flex-col items-center py-4 space-y-6">
                      <div className="card p-5 bg-cia-bg border-2 border-cia-dark shadow-cia-btn max-w-sm w-full text-center">
                        <h2 className="text-xl font-black text-cia-dark mb-2 font-stamp">WETON: {selectedCandidate.analysis_data.primbon.weton}</h2>
                        <span className="inline-block text-[10px] text-cia-dark font-bold bg-cia-card border border-cia-dark px-2.5 py-1">NEPTU: {selectedCandidate.analysis_data.primbon.neptu_score}</span>
                      </div>
                      <div className="card p-6 max-w-xl w-full text-left shadow-cia-btn border-2 border-cia-dark bg-cia-card relative">
                        <h4 className="text-[10px] text-cia-dark uppercase font-bold mb-3">BEHAVIORAL SPECTRUM</h4>
                        <p className="text-xs leading-relaxed text-cia-dark font-semibold">
                          {selectedCandidate.analysis_data.primbon.character.replace(/(lemah|sensitif|konflik|kurang|buruk|bahaya|cacat|negatif|kelemahan)/gi, (match) => {
                            return revealSecrets ? `<span class="border-b border-cia-red text-cia-red">${match}</span>` : `<span class="redacted">${match}</span>`;
                          })}
                        </p>
                        <div className="mt-4 pt-4 border-t border-dashed border-cia-dark/30 flex justify-between items-center">
                          <span className="text-[10px] font-bold text-cia-muted">TACTICAL STYLE</span>
                          <span className="font-bold text-cia-dark text-[10px] bg-cia-bg border border-cia-dark px-2.5 py-1">{selectedCandidate.analysis_data.primbon.work_style}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FALAKIYAH */}
                  {activeTab === 'falakiyah' && selectedCandidate.analysis_data?.falakiyah && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                      <div className="card p-6 bg-cia-card border-2 border-cia-dark shadow-cia-btn flex flex-col justify-between">
                        <div>
                          <h4 className="text-[10px] text-cia-dark uppercase font-bold mb-4 flex items-center gap-1.5"><Compass className="w-3.5 h-3.5"/> HISAB NUMEROLOGY MATRIX</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-cia-bg border border-cia-dark/20 p-3 text-center">
                              <span className="text-[9px] text-cia-muted font-bold block uppercase mb-1">Total Abjad</span>
                              <span className="text-xl font-mono font-bold text-cia-dark">{selectedCandidate.analysis_data.falakiyah.numerology?.abjad_value || 0}</span>
                            </div>
                            <div className="bg-cia-bg border border-cia-dark/20 p-3 text-center">
                              <span className="text-[9px] text-cia-muted font-bold block uppercase mb-1">Ruling Element</span>
                              <span className="text-xl font-bold text-cia-red font-stamp">{selectedCandidate.analysis_data.falakiyah.numerology?.element || 'Unknown'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 border-t border-dashed border-cia-dark/25 pt-4">
                          <span className="text-[9px] text-cia-muted font-bold block uppercase mb-1.5">PLANETARY ASSOCIATION</span>
                          <p className="text-xs text-cia-dark font-bold uppercase">{selectedCandidate.analysis_data.falakiyah.astronomy?.planet || 'Unknown'}</p>
                        </div>
                      </div>

                      <div className="card p-6 bg-cia-card border-2 border-cia-dark shadow-cia-btn">
                        <h4 className="text-[10px] text-cia-dark uppercase font-bold mb-4 flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5"/> ESOTERIC ZIKIR REMEDY</h4>
                        <p className="text-xs leading-relaxed text-cia-dark font-semibold">
                          Siklus falakiyah menyarankan zikir harian berikut untuk menyeimbangkan ruling element subjek:
                        </p>
                        <div className="bg-cia-bg border-2 border-cia-dark p-4 text-center my-4">
                          <p className="text-sm font-black text-cia-red tracking-wider font-stamp uppercase">{selectedCandidate.analysis_data.falakiyah.spiritual?.recommendation || 'Zikir Asmaul Husna'}</p>
                        </div>
                        <p className="text-[10px] text-cia-muted font-semibold uppercase leading-relaxed">
                          Lakukan repetisi zikir setelah berkas investigasi disetujui, untuk meredam bias kognitif negatif dari elemen ruling.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Close Button */}
                <div className="border-t border-cia-dark/30 pt-6 flex justify-end">
                  <button 
                    onClick={() => { playReturnSound(); setSelectedCandidate(null); }} 
                    className="px-5 py-2 border-2 border-cia-dark bg-cia-dark text-cia-bg text-xs font-bold hover:bg-cia-bg hover:text-cia-dark transition-all uppercase"
                  >
                    Close Dossier File
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export default CandidateVault;
