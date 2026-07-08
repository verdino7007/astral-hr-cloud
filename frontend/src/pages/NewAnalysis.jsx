import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Users, Target, UserPlus, Sparkles, 
  Briefcase, Hexagon, Compass, Search, 
  Moon, Sun, BookOpen, Download, Upload
} from 'lucide-react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function NewAnalysis() {
  const [candidateData, setCandidateData] = useState({
    name: '',
    birth_date: '',
    birth_time: '12:00',
  });
  
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [batchProgress, setBatchProgress] = useState(null);
  const [activeTab, setActiveTab] = useState('bazi');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if(!candidateData.name || !candidateData.birth_date) return;
    
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:9091';
      const response = await fetch(`${apiUrl}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(candidateData),
      });
      const data = await response.json();
      setTimeout(() => {
        setAnalysisResult(data);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error analyzing:", error);
      setLoading(false);
    }
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if(lines.length <= 1) {
         alert("File CSV kosong atau tidak valid. Format: Nama, YYYY-MM-DD, HH:MM");
         return;
      }
      
      setLoading(true);
      setBatchProgress({ current: 0, total: lines.length - 1 });
      let successCount = 0;
      
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:9091';
      
      for (let i = 1; i < lines.length; i++) {
         const parts = lines[i].split(',');
         if(parts.length >= 2) {
             const name = parts[0].trim();
             const date = parts[1].trim();
             const time = parts[2] ? parts[2].trim() : '12:00';
             try {
                await fetch(`${apiUrl}/analyze`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({name, birth_date: date, birth_time: time}),
                });
                successCount++;
             } catch(err) { console.error(`Error row ${i}:`, err); }
             
             setBatchProgress({ current: i, total: lines.length - 1 });
         }
      }
      setLoading(false);
      setBatchProgress(null);
      alert(`Batch processing selesai! ${successCount} kandidat berhasil ditambahkan ke Vault.`);
      e.target.value = null; // reset input
    };
    reader.readAsText(file);
  };

  const handleDownloadPDF = async () => {
    const reportElement = document.getElementById('report-content');
    if (!reportElement) return;
    
    try {
      const canvas = await html2canvas(reportElement, { scale: 2, useCORS: true, backgroundColor: '#0f172a' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`AstralHR_${analysisResult.name}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
  };

  const baziElements = analysisResult?.results?.bazi?.elements || {};
  const radarData = Object.keys(baziElements).map((key) => ({
    subject: key,
    Value: baziElements[key],
    fullMark: 50,
  }));

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="badge badge-purple">
            <Activity className="w-3.5 h-3.5" /> Engine
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Profiling Engine</h2>
        <p className="text-zinc-400 mt-2 text-[15px] max-w-xl leading-relaxed">Enter candidate details to run a multi-layered esoteric analysis and store insights into the vault.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="xl:col-span-4 h-fit">
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex items-center gap-2 mb-6">
              <UserPlus className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-semibold text-white">Candidate Input</h3>
            </div>
            <form onSubmit={handleAnalyze} className="space-y-5">
              <div className="group">
                <label className="block text-xs font-medium text-zinc-400 mb-2">Full Name</label>
                <input type="text" className="w-full px-4 py-3 glass-input" value={candidateData.name} onChange={e => setCandidateData({...candidateData, name: e.target.value})} placeholder="e.g. John Doe" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-xs font-medium text-zinc-400 mb-2">Birth Date</label>
                  <input type="date" className="w-full px-4 py-3 glass-input" value={candidateData.birth_date} onChange={e => setCandidateData({...candidateData, birth_date: e.target.value})} required />
                </div>
                <div className="group">
                  <label className="block text-xs font-medium text-zinc-400 mb-2">Birth Time</label>
                  <input type="time" className="w-full px-4 py-3 glass-input" value={candidateData.birth_time} onChange={e => setCandidateData({...candidateData, birth_time: e.target.value})} />
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-sm font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="flex items-center justify-center gap-2">
                    {loading && !batchProgress ? <><Activity className="w-4 h-4 animate-spin" /> Processing...</> : <><Target className="w-4 h-4" /> Generate Report</>}
                  </span>
                </button>
                
                <div className="relative w-full">
                  <input type="file" accept=".csv" onChange={handleCSVUpload} disabled={loading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className="btn-ghost w-full py-3 text-xs font-semibold flex items-center justify-center gap-2">
                     <Upload className="w-4 h-4" /> Batch Import (CSV)
                  </div>
                </div>
                <p className="text-[11px] text-zinc-500 text-center font-mono">Format: Name, YYYY-MM-DD, HH:MM</p>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Right Dashboard */}
        <div className="xl:col-span-8 min-h-[500px] relative">
          <AnimatePresence mode="wait">
            {!analysisResult && !loading ? (
              <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-full flex flex-col items-center justify-center glass-card rounded-2xl p-12 text-center border-dashed border border-white/[0.08]">
                <Compass className="w-12 h-12 text-purple-500/40 mb-5 animate-[spin_30s_linear_infinite]" />
                <h3 className="text-2xl font-semibold text-zinc-200 mb-3" style={{fontFamily: "'Cinzel', serif"}}>Cyclical Patterns of the Universe</h3>
                <div className="max-w-xl space-y-3 text-zinc-400 text-sm leading-relaxed">
                  <p>Ilmu pembacaan karakter (Astrology, BaZi, Primbon, Falakiyah) bukanlah suatu hal yang magis atau gaib. Alam semesta bekerja berdasarkan hukum Tuhan yang bersifat universal dan <strong className="text-zinc-300">siklikal</strong> (memiliki pola yang berulang).</p>
                  <p>Sejalan dengan temuan dalam jurnal <em>Chronobiology</em> dan <em>Personality and Individual Differences</em>, lingkungan awal dan siklus kosmik terbukti mempengaruhi temperamen dasar manusia secara biologis.</p>
                  <p>Karena polanya tetap, probabilitas dari suatu karakter dapat dipetakan. Hasil analisis ini memberikan kerangka probabilitas yang dapat dijadikan bahan pertimbangan strategis oleh HRD.</p>
                </div>
              </motion.div>
            ) : loading ? (
               <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full min-h-[400px] flex flex-col items-center justify-center">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-t-purple-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
                  <Sparkles className="w-6 h-6 text-white animate-pulse" />
                </div>
                {batchProgress ? (
                   <>
                     <p className="mt-8 tracking-widest text-sm text-purple-300 uppercase animate-pulse">Batch Processing CSV...</p>
                     <p className="mt-2 text-2xl font-bold text-white">{batchProgress.current} / {batchProgress.total}</p>
                   </>
                ) : (
                   <p className="mt-8 tracking-widest text-sm text-purple-300 uppercase animate-pulse">Aggregating Esoteric Databanks...</p>
                )}
              </motion.div>
            ) : (
              <motion.div key="results" id="report-content" variants={containerVariants} initial="hidden" animate="show" className="h-full flex flex-col gap-6">
                
                {/* Top Header & Synergy */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="glass-panel p-8 rounded-[2rem] flex items-center gap-8 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500"><Users className="w-32 h-32" /></div>
                    <div className="relative z-10">
                      <p className="text-sm tracking-[0.2em] text-slate-400 uppercase mb-2 font-medium">Synergy Index</p>
                      <p className="text-6xl font-black text-white drop-shadow-lg">{analysisResult.overall_score}<span className="text-2xl text-purple-400 font-bold">/100</span></p>
                    </div>
                  </div>
                  
                  <div className="glass-panel p-8 rounded-[2rem] md:col-span-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                     <div>
                       <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 tracking-tight">{analysisResult.name}</h3>
                       <p className="text-base text-purple-300 mt-3 flex items-center gap-2 font-medium tracking-wide"><Search className="w-5 h-5" /> Comprehensive Multi-Engine Profile</p>
                     </div>
                     
                     <div className="flex flex-wrap gap-4 w-full md:w-auto">
                       <button onClick={handleDownloadPDF} className="px-6 py-3 bg-purple-500/20 text-purple-300 hover:bg-purple-500/40 rounded-2xl flex items-center gap-3 text-base font-bold transition-all hover:scale-105 active:scale-95">
                         <Download className="w-5 h-5" /> PDF Report
                       </button>
                       <div className="flex bg-black/40 rounded-2xl p-1.5 border border-white/5 w-full md:w-auto">
                          <button onClick={() => setActiveTab('bazi')} className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-base font-bold transition-all ${activeTab === 'bazi' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' : 'text-slate-400 hover:text-white'}`}>BaZi</button>
                          <button onClick={() => setActiveTab('primbon')} className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-base font-bold transition-all ${activeTab === 'primbon' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:text-white'}`}>Primbon</button>
                          <button onClick={() => setActiveTab('falakiyah')} className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-base font-bold transition-all ${activeTab === 'falakiyah' ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-900/50' : 'text-slate-400 hover:text-white'}`}>Falakiyah</button>
                       </div>
                     </div>
                  </div>
                </motion.div>

                {/* Holistic Synthesis */}
                {!analysisResult.error && analysisResult.results?.synthesis && (
                   <motion.div variants={itemVariants} className="glass-panel p-10 lg:p-12 rounded-[2.5rem] bg-gradient-to-br from-blue-900/20 via-indigo-900/10 to-cyan-900/20 border-indigo-500/30 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full"></div>
                     <h4 className="text-base font-bold tracking-[0.25em] text-cyan-400 uppercase mb-8 flex items-center gap-3">
                       <Sparkles className="w-6 h-6"/> Holistic Synthesis & Conclusion
                     </h4>
                     <div className="space-y-6 text-slate-200 text-xl leading-loose synthesis-prose relative z-10 font-medium">
                       {analysisResult.results.synthesis.split('\n\n').map((paragraph, idx) => {
                         const formattedHtml = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                         return <p key={idx} dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
                       })}
                     </div>
                   </motion.div>
                )}

                {analysisResult.error ? (
                  <motion.div variants={itemVariants} className="glass-panel p-8 rounded-3xl flex-1 flex flex-col items-center justify-center border-red-500/30">
                    <Compass className="w-16 h-16 text-red-500/50 mb-4" />
                    <h3 className="text-xl font-bold text-red-400">Analysis Error</h3>
                    <p className="text-slate-300 mt-2 text-center max-w-md">{analysisResult.error}</p>
                  </motion.div>
                ) : (
                  <motion.div variants={itemVariants} className="glass-panel p-8 rounded-3xl flex-1 flex flex-col">
                    <AnimatePresence mode="wait">
                      {activeTab === 'bazi' && (
                        <motion.div key="tab-bazi" initial={{opacity: 0, y: 10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
                          <div className="space-y-10">
                            <div>
                               <h4 className="text-sm font-bold tracking-[0.2em] text-fuchsia-400 uppercase mb-6 flex items-center gap-3"><Hexagon className="w-5 h-5"/> Core BaZi Traits</h4>
                               <div className="flex flex-wrap gap-3">
                                 {analysisResult.results.bazi.traits.map((t, i) => (
                                   <span key={i} className="px-5 py-3 rounded-full text-base font-semibold bg-purple-500/10 border border-purple-400/30 text-purple-100 shadow-lg shadow-purple-900/20">{t}</span>
                                 ))}
                               </div>
                            </div>
                            <div>
                               <h4 className="text-sm font-bold tracking-[0.2em] text-blue-400 uppercase mb-6 flex items-center gap-3"><Briefcase className="w-5 h-5"/> Ideal Roles</h4>
                               <ul className="space-y-4">
                                 {analysisResult.results.bazi.best_roles.map((r, i) => (
                                   <li key={i} className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/5 text-lg text-slate-200"><div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>{r}</li>
                                 ))}
                               </ul>
                            </div>
                          </div>
                          <div className="flex flex-col items-center bg-black/10 rounded-3xl p-8 border border-white/5 relative">
                            <h4 className="text-sm font-bold tracking-[0.2em] text-emerald-400 uppercase w-full text-center mb-6">Element Distribution<br/><span className="text-slate-400 text-xs mt-2 block">Day Master: {analysisResult.results.bazi.day_master}</span></h4>
                            <div className="w-full h-80 mt-2">
                              <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                  <PolarGrid stroke="rgba(255,255,255,0.15)" />
                                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#e2e8f0', fontSize: 13, fontWeight: 'bold' }} />
                                  <Radar dataKey="Value" stroke="#c084fc" strokeWidth={3} fill="rgba(192,132,252,0.4)" />
                                </RadarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'primbon' && (
                        <motion.div key="tab-primbon" initial={{opacity: 0, y: 10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="h-full flex flex-col justify-center items-center text-center space-y-6">
                           <BookOpen className="w-16 h-16 text-blue-400 mb-4" />
                           <h4 className="text-lg tracking-widest text-slate-300 uppercase">Javanese Weton</h4>
                           <h2 className="text-5xl font-bold text-white mb-2">{analysisResult.results.primbon.weton}</h2>
                           <p className="text-xl text-blue-300">Neptu Score: {analysisResult.results.primbon.neptu_score}</p>
                           
                           <div className="glass-card p-6 rounded-2xl max-w-xl w-full text-left mt-8">
                             <h4 className="text-sm tracking-[0.2em] text-fuchsia-400 uppercase mb-2">Character Destiny</h4>
                             <p className="text-lg leading-relaxed text-slate-200">{analysisResult.results.primbon.character}</p>
                             <div className="mt-4 pt-4 border-t border-white/10 flex justify-between">
                               <span className="text-sm text-slate-400">Work Style</span>
                               <span className="font-bold text-blue-400">{analysisResult.results.primbon.work_style}</span>
                             </div>
                           </div>
                        </motion.div>
                      )}

                      {activeTab === 'falakiyah' && (
                        <motion.div key="tab-falakiyah" initial={{opacity: 0, y: 10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="h-full flex flex-col gap-8 w-full">
                          
                          {/* Top Info Cards */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="glass-panel p-8 rounded-[2rem] bg-gradient-to-br from-fuchsia-900/20 to-purple-900/10 border-fuchsia-500/20 shadow-lg">
                              <h4 className="text-sm font-bold tracking-[0.2em] text-fuchsia-400 uppercase mb-6 flex items-center gap-3"><Sun className="w-5 h-5"/> Hisab Jummal Numerology</h4>
                              
                              <div className="mb-6 bg-black/40 p-5 rounded-2xl font-mono text-sm text-slate-300 break-words leading-relaxed shadow-inner border border-white/5">
                                {analysisResult.results.falakiyah.numerology?.calculation}
                              </div>
                              <div className="flex justify-between items-center bg-fuchsia-900/30 p-5 rounded-2xl border border-fuchsia-500/30">
                                <span className="text-sm font-bold text-fuchsia-300">Reduction Rule:</span>
                                <span className="font-bold text-white font-mono">{analysisResult.results.falakiyah.numerology?.modulo_rule}</span>
                              </div>
                              <div className="mt-6 flex items-center gap-5">
                                <span className="text-5xl drop-shadow-lg">{analysisResult.results.falakiyah.numerology?.icon}</span>
                                <div>
                                  <p className="font-bold text-white text-2xl">{analysisResult.results.falakiyah.numerology?.element}</p>
                                  <p className="text-xs text-slate-400 uppercase tracking-[0.2em] mt-1 font-semibold">Core Ruling Energy</p>
                                </div>
                              </div>
                            </div>

                            <div className="glass-panel p-8 rounded-[2rem] bg-gradient-to-br from-emerald-900/20 to-teal-900/10 border-emerald-500/20 flex flex-col justify-between shadow-lg">
                              <div>
                                <h4 className="text-sm font-bold tracking-[0.2em] text-emerald-400 uppercase mb-6 flex items-center gap-3"><Sparkles className="w-5 h-5"/> Spiritual Patch (Dhikr)</h4>
                                <p className="text-base text-slate-300 mb-6 leading-loose">
                                  Based on the candidate's core planetary energy, the following <strong className="text-emerald-300">Asma Allah</strong> are recommended to balance and maximize their potential:
                                </p>
                              </div>
                              <div className="bg-emerald-900/30 p-8 rounded-2xl border border-emerald-500/30 text-center shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]">
                                <p className="text-2xl md:text-3xl font-black text-emerald-300 drop-shadow-md">
                                  {analysisResult.results.falakiyah.numerology?.asmaul_husna}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* HR Insight */}
                          <div className="bg-gradient-to-r from-black/40 to-black/20 p-8 rounded-[2rem] border border-white/5 shadow-inner">
                            <h4 className="text-sm font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">Astronomical HR Insight</h4>
                            <p className="text-slate-200 text-xl leading-relaxed">{analysisResult.results.falakiyah.hr_insight}</p>
                          </div>
                          
                          {/* Planetary Positions List */}
                          <div>
                            <h4 className="text-sm font-bold tracking-[0.2em] text-purple-400 uppercase mb-6 flex items-center gap-3"><Activity className="w-5 h-5"/> Planetary Impacts on Work Behavior</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {analysisResult.results.falakiyah.planetary_positions?.map((p, i) => (
                                <div key={i} className="flex flex-col gap-3 p-6 bg-purple-900/10 rounded-2xl border border-purple-500/10 hover:border-purple-500/30 transition-all hover:bg-purple-900/20">
                                  <div className="flex justify-between items-center border-b border-purple-500/20 pb-3">
                                    <span className="text-lg text-slate-300 font-black">{p.name}</span>
                                    <span className="text-base text-fuchsia-300 font-bold px-3 py-1 bg-fuchsia-500/10 rounded-lg">{p.constellation}</span>
                                  </div>
                                  <p className="text-base text-slate-300 leading-relaxed mt-1 font-medium">{p.implication}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default NewAnalysis;
