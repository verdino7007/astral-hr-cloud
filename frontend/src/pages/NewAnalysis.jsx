import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Users, Target, UserPlus, Sparkles, 
  Briefcase, Hexagon, Compass, Search, 
  Moon, Sun, BookOpen, Download
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
    <div className="p-8 lg:p-12 xl:p-16 max-w-[2000px] mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold flex items-center gap-4">
          <Activity className="w-10 h-10 md:w-12 md:h-12 text-fuchsia-400" /> Profiling Engine
        </h2>
        <p className="text-slate-400 mt-4 text-lg max-w-2xl">Enter candidate details to run a multi-layered esoteric analysis and automatically store the insights into the secure vault.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-16">
        
        {/* Left Form */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="xl:col-span-4 h-fit">
          <div className="glass-panel p-10 lg:p-12 rounded-[2rem] shadow-2xl">
            <form onSubmit={handleAnalyze} className="space-y-8">
              <div className="group">
                <label className="block text-sm font-semibold tracking-[0.15em] text-purple-300/70 uppercase mb-3 ml-2">Candidate Name</label>
                <div className="relative">
                  <UserPlus className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                  <input type="text" className="w-full pl-14 pr-5 py-4 rounded-2xl glass-input text-xl font-medium tracking-wide" value={candidateData.name} onChange={e => setCandidateData({...candidateData, name: e.target.value})} placeholder="e.g. John Doe" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold tracking-[0.15em] text-purple-300/70 uppercase mb-3 ml-2">Birth Date</label>
                  <input type="date" className="w-full px-5 py-4 rounded-2xl glass-input text-lg font-medium" value={candidateData.birth_date} onChange={e => setCandidateData({...candidateData, birth_date: e.target.value})} required />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold tracking-[0.15em] text-purple-300/70 uppercase mb-3 ml-2">Birth Time</label>
                  <input type="time" className="w-full px-5 py-4 rounded-2xl glass-input text-lg font-medium" value={candidateData.birth_time} onChange={e => setCandidateData({...candidateData, birth_time: e.target.value})} />
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full mt-8 group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 font-bold text-white text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_50px_-10px_rgba(139,92,246,0.7)] disabled:opacity-70 disabled:cursor-not-allowed">
                <span className="relative flex items-center justify-center gap-3">
                  {loading ? <><Activity className="w-6 h-6 animate-spin" /> SYNCHRONIZING ENGINES...</> : <><Target className="w-6 h-6" /> GENERATE REPORT</>}
                </span>
              </button>
            </form>
          </div>
        </motion.div>

        {/* Right Dashboard */}
        <div className="xl:col-span-8 min-h-[700px] relative">
          <AnimatePresence mode="wait">
            {!analysisResult && !loading ? (
              <motion.div key="empty" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute inset-0 flex flex-col items-center justify-center glass-panel rounded-3xl p-12 text-center border-dashed border-2 border-white/10 overflow-y-auto">
                <Compass className="w-16 h-16 text-purple-500/50 mb-6 animate-[spin_20s_linear_infinite]" />
                <h3 className="text-3xl font-light text-slate-300 mb-4" style={{fontFamily: "'Cinzel', serif"}}>Cyclical Patterns of the Universe</h3>
                <div className="max-w-2xl space-y-4 text-slate-400 text-lg leading-relaxed">
                  <p>Ilmu pembacaan karakter (Astrology, BaZi, Primbon, Falakiyah) bukanlah suatu hal yang magis atau gaib. Alam semesta bekerja berdasarkan hukum Tuhan yang bersifat universal dan <strong>siklikal</strong> (memiliki pola yang berulang).</p>
                  <p>Sejalan dengan temuan dalam jurnal <em>Chronobiology</em> dan <em>Personality and Individual Differences</em>, lingkungan awal dan siklus kosmik terbukti mempengaruhi temperamen dasar manusia secara biologis.</p>
                  <p>Karena polanya tetap, probabilitas dari suatu karakter dapat dipetakan. Hasil analisis ini tidak memastikan masa depan secara mutlak, melainkan memberikan kerangka probabilitas yang dapat dijadikan bahan pertimbangan strategis oleh HRD.</p>
                </div>
              </motion.div>
            ) : loading ? (
               <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-t-purple-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
                  <Sparkles className="w-8 h-8 text-white animate-pulse" />
                </div>
                <p className="mt-8 tracking-widest text-sm text-purple-300 uppercase animate-pulse">Aggregating Esoteric Databanks...</p>
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
                        <motion.div key="tab-falakiyah" initial={{opacity: 0, y: 10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                           <div className="space-y-6">
                             <h4 className="text-sm tracking-[0.2em] text-amber-300 uppercase flex items-center gap-2"><Sun className="w-5 h-5"/> Spiritual Astronomy</h4>
                             
                             <div className="grid grid-cols-2 gap-4">
                               <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
                                 <p className="text-xs text-slate-400 uppercase mb-1">Sun Sign</p>
                                 <p className="text-2xl font-bold text-amber-400">{analysisResult.results.falakiyah.sun_sign}</p>
                               </div>
                               <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
                                 <p className="text-xs text-slate-400 uppercase mb-1">Moon Sign</p>
                                 <p className="text-2xl font-bold text-slate-300">{analysisResult.results.falakiyah.moon_sign}</p>
                               </div>
                             </div>
                             
                             <div className="glass-card p-6 rounded-2xl mt-4">
                               <h4 className="text-sm tracking-[0.2em] text-fuchsia-400 uppercase mb-2">HR Insight</h4>
                               <p className="text-lg text-slate-200">{analysisResult.results.falakiyah.hr_insight}</p>
                             </div>
                             
                             <div className="pt-2">
                               <h4 className="text-sm tracking-[0.2em] text-blue-400 uppercase mb-4 flex items-center gap-2"><Moon className="w-4 h-4"/> Planetary Positions</h4>
                               <div className="space-y-3">
                                 {Object.entries(analysisResult.results.falakiyah.planetary_positions).map(([planet, constellation]) => (
                                   <div key={planet} className="flex justify-between items-center p-3 border-b border-white/10">
                                     <span className="font-bold text-slate-300">{planet}</span>
                                     <span className="text-fuchsia-300">{constellation}</span>
                                   </div>
                                 ))}
                               </div>
                             </div>
                           </div>
                           
                           <div>
                             <h4 className="text-sm tracking-[0.2em] text-emerald-400 uppercase mb-4 flex items-center gap-2">
                               <BookOpen className="w-5 h-5"/> Hisab Jummal (Name Numerology)
                             </h4>
                             <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border-emerald-500/20">
                               <div className="flex justify-between items-start mb-6">
                                 <div>
                                   <p className="text-xs text-emerald-400 uppercase tracking-widest mb-1">Dominant Element</p>
                                   <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                                     {analysisResult.results.falakiyah.numerology?.icon} {analysisResult.results.falakiyah.numerology?.element}
                                   </h3>
                                 </div>
                                 <div className="text-right">
                                   <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Abjad Weight</p>
                                   <p className="text-2xl font-bold text-emerald-300">{analysisResult.results.falakiyah.numerology?.weight}</p>
                                 </div>
                               </div>
                               
                               <div className="space-y-4">
                                 <div>
                                   <p className="text-xs text-slate-400 uppercase mb-1">Suitable Job Roles</p>
                                   <p className="text-slate-200 bg-black/40 p-3 rounded-lg">{analysisResult.results.falakiyah.numerology?.suitable_jobs}</p>
                                 </div>
                                 <div>
                                   <p className="text-xs text-slate-400 uppercase mb-1">Team Compatibility</p>
                                   <p className="text-slate-200 bg-black/40 p-3 rounded-lg">{analysisResult.results.falakiyah.numerology?.team_compatibility}</p>
                                 </div>
                               </div>
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
