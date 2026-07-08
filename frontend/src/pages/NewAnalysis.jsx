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
      e.target.value = null;
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

      {/* ── Page Header ── */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[12px] font-semibold tracking-wide mb-6">
          <Activity className="w-3.5 h-3.5" />
          PROFILING ENGINE
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15]">
          Candidate Analysis
        </h1>
        <p className="text-zinc-400 mt-5 text-[16px] leading-[1.8] max-w-2xl">
          Enter candidate details to generate a comprehensive multi-engine esoteric profile.
          All results are automatically stored in the Candidate Vault.
        </p>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-14">

        {/* ════ LEFT: INPUT FORM ════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="xl:col-span-4 h-fit"
        >
          <div className="card p-9 lg:p-10">
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/[0.05]">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-white">Candidate Input</h3>
                <p className="text-[12px] text-zinc-500 mt-0.5">Fill in birth details below</p>
              </div>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-7">
              {/* Name */}
              <div>
                <label className="block text-[13px] font-medium text-zinc-300 mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-5 py-4 glass-input text-[16px]"
                  value={candidateData.name}
                  onChange={e => setCandidateData({...candidateData, name: e.target.value})}
                  placeholder="e.g. Ahmad Fauzi"
                  required
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-medium text-zinc-300 mb-3">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-5 py-4 glass-input text-[15px]"
                    value={candidateData.birth_date}
                    onChange={e => setCandidateData({...candidateData, birth_date: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-zinc-300 mb-3">
                    Birth Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-5 py-4 glass-input text-[15px]"
                    value={candidateData.birth_time}
                    onChange={e => setCandidateData({...candidateData, birth_time: e.target.value})}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-semibold text-white text-[15px] tracking-wide transition-all hover:shadow-xl hover:shadow-purple-900/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <span className="flex items-center justify-center gap-3">
                    {loading && !batchProgress
                      ? <><Activity className="w-5 h-5 animate-spin" /> Processing...</>
                      : <><Target className="w-5 h-5" /> Generate Report</>
                    }
                  </span>
                </button>

                <div className="relative w-full">
                  <input type="file" accept=".csv" onChange={handleCSVUpload} disabled={loading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className="w-full py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-zinc-400 text-[13px] font-semibold flex items-center justify-center gap-2.5 hover:bg-white/[0.06] hover:text-white transition-all cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Batch Import (CSV)
                  </div>
                </div>

                <p className="text-[11px] text-zinc-600 text-center font-mono tracking-wide">
                  Format: Name, YYYY-MM-DD, HH:MM
                </p>
              </div>
            </form>
          </div>
        </motion.div>

        {/* ════ RIGHT: RESULTS DASHBOARD ════ */}
        <div className="xl:col-span-8 relative">
          <AnimatePresence mode="wait">

            {/* Empty State */}
            {!analysisResult && !loading ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="card rounded-2xl p-14 lg:p-16 text-center flex flex-col items-center justify-center min-h-[500px] border-dashed"
              >
                <div className="w-20 h-20 rounded-2xl bg-purple-500/8 border border-purple-500/10 flex items-center justify-center mb-8">
                  <Compass className="w-10 h-10 text-purple-500/40 animate-[spin_30s_linear_infinite]" />
                </div>
                <h3 className="text-2xl font-semibold text-zinc-200 mb-5" style={{fontFamily: "'Cinzel', serif"}}>
                  Cyclical Patterns of the Universe
                </h3>
                <div className="max-w-lg space-y-5 text-zinc-400 text-[15px] leading-[1.9]">
                  <p>
                    Ilmu pembacaan karakter (Astrology, BaZi, Primbon, Falakiyah) bukanlah suatu hal yang magis atau gaib. Alam semesta bekerja berdasarkan hukum Tuhan yang bersifat universal dan <strong className="text-zinc-200 font-medium">siklikal</strong>.
                  </p>
                  <p>
                    Sejalan dengan temuan dalam jurnal <em className="text-zinc-300">Chronobiology</em> dan <em className="text-zinc-300">Personality and Individual Differences</em>, lingkungan awal dan siklus kosmik mempengaruhi temperamen dasar manusia secara biologis.
                  </p>
                  <p>
                    Hasil analisis ini memberikan kerangka probabilitas yang dapat dijadikan bahan pertimbangan strategis oleh HRD.
                  </p>
                </div>
              </motion.div>

            ) : loading ? (
              /* Loading State */
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-[500px] flex flex-col items-center justify-center"
              >
                <div className="relative w-24 h-24 flex items-center justify-center mb-8">
                  <div className="absolute inset-0 border-2 border-t-purple-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
                  <Sparkles className="w-7 h-7 text-white animate-pulse" />
                </div>
                {batchProgress ? (
                  <>
                    <p className="tracking-[0.25em] text-[13px] text-purple-300 uppercase animate-pulse font-semibold">
                      Batch Processing CSV...
                    </p>
                    <p className="mt-3 text-3xl font-bold text-white">
                      {batchProgress.current} <span className="text-zinc-500">/</span> {batchProgress.total}
                    </p>
                  </>
                ) : (
                  <p className="tracking-[0.25em] text-[13px] text-purple-300 uppercase animate-pulse font-semibold">
                    Aggregating Esoteric Databanks...
                  </p>
                )}
              </motion.div>

            ) : (
              /* Results */
              <motion.div
                key="results"
                id="report-content"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-10"
              >

                {/* ── Result Header ── */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Score Card */}
                  <div className="card p-8 rounded-2xl flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Users className="w-7 h-7 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-[12px] tracking-[0.2em] text-zinc-500 uppercase font-semibold mb-1">Synergy Index</p>
                      <p className="text-5xl font-black text-white leading-none">
                        {analysisResult.overall_score}
                        <span className="text-xl text-purple-400/70 font-bold ml-1">/100</span>
                      </p>
                    </div>
                  </div>

                  {/* Name + Tab Switcher */}
                  <div className="card p-8 rounded-2xl md:col-span-2 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">{analysisResult.name}</h3>
                      <p className="text-[14px] text-zinc-400 mt-2 flex items-center gap-2 font-medium">
                        <Search className="w-4 h-4 text-purple-400" />
                        Multi-Engine Profile Report
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button onClick={handleDownloadPDF} className="px-5 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-zinc-300 hover:bg-white/[0.08] hover:text-white flex items-center gap-2 text-[13px] font-semibold transition-all">
                        <Download className="w-4 h-4" /> PDF
                      </button>
                      <div className="flex rounded-xl bg-black/30 border border-white/[0.05] p-1 gap-1">
                        <button onClick={() => setActiveTab('bazi')} className={`px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${activeTab === 'bazi' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' : 'text-zinc-500 hover:text-white'}`}>BaZi</button>
                        <button onClick={() => setActiveTab('primbon')} className={`px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${activeTab === 'primbon' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-zinc-500 hover:text-white'}`}>Primbon</button>
                        <button onClick={() => setActiveTab('falakiyah')} className={`px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${activeTab === 'falakiyah' ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-900/40' : 'text-zinc-500 hover:text-white'}`}>Falakiyah</button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* ── Holistic Synthesis ── */}
                {!analysisResult.error && analysisResult.results?.synthesis && (
                  <motion.div variants={itemVariants} className="card p-10 lg:p-12 rounded-2xl bg-gradient-to-br from-blue-950/30 via-indigo-950/20 to-cyan-950/20 border-indigo-500/15 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>
                    <h4 className="text-[12px] font-bold tracking-[0.25em] text-cyan-400 uppercase mb-8 flex items-center gap-3">
                      <Sparkles className="w-5 h-5" /> Holistic Synthesis & Conclusion
                    </h4>
                    <div className="space-y-6 text-zinc-200 text-[17px] leading-[2] synthesis-prose relative z-10">
                      {analysisResult.results.synthesis.split('\n\n').map((paragraph, idx) => {
                        const formattedHtml = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                        return <p key={idx} dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
                      })}
                    </div>
                  </motion.div>
                )}

                {/* ── Tab Content ── */}
                {analysisResult.error ? (
                  <motion.div variants={itemVariants} className="card p-12 rounded-2xl flex flex-col items-center justify-center border-red-500/20">
                    <Compass className="w-14 h-14 text-red-500/40 mb-5" />
                    <h3 className="text-xl font-bold text-red-400">Analysis Error</h3>
                    <p className="text-zinc-400 mt-3 text-center max-w-md text-[15px] leading-relaxed">{analysisResult.error}</p>
                  </motion.div>
                ) : (
                  <motion.div variants={itemVariants} className="card p-10 rounded-2xl flex-1">
                    <AnimatePresence mode="wait">

                      {/* BaZi Tab */}
                      {activeTab === 'bazi' && (
                        <motion.div key="tab-bazi" initial={{opacity: 0, y: 12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-12}} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                          <div className="space-y-10">
                            <div>
                              <h4 className="text-[12px] font-bold tracking-[0.2em] text-fuchsia-400 uppercase mb-6 flex items-center gap-3"><Hexagon className="w-4 h-4"/> Core BaZi Traits</h4>
                              <div className="flex flex-wrap gap-3">
                                {analysisResult.results.bazi.traits.map((t, i) => (
                                  <span key={i} className="px-5 py-3 rounded-xl text-[14px] font-semibold bg-purple-500/8 border border-purple-400/20 text-purple-100">{t}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-[12px] font-bold tracking-[0.2em] text-blue-400 uppercase mb-6 flex items-center gap-3"><Briefcase className="w-4 h-4"/> Ideal Roles</h4>
                              <ul className="space-y-4">
                                {analysisResult.results.bazi.best_roles.map((r, i) => (
                                  <li key={i} className="flex items-center gap-4 bg-white/[0.02] p-5 rounded-xl border border-white/[0.04] text-[15px] text-zinc-200 leading-relaxed">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 shrink-0"></div>{r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="flex flex-col items-center bg-white/[0.015] rounded-2xl p-8 border border-white/[0.04]">
                            <h4 className="text-[12px] font-bold tracking-[0.2em] text-emerald-400 uppercase w-full text-center mb-2">Element Distribution</h4>
                            <p className="text-zinc-500 text-[12px] mb-6">Day Master: {analysisResult.results.bazi.day_master}</p>
                            <div className="w-full h-72">
                              <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: '500' }} />
                                  <Radar dataKey="Value" stroke="#c084fc" strokeWidth={2} fill="rgba(192,132,252,0.2)" />
                                </RadarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Primbon Tab */}
                      {activeTab === 'primbon' && (
                        <motion.div key="tab-primbon" initial={{opacity: 0, y: 12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-12}} className="flex flex-col items-center text-center py-8 space-y-8">
                          <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center">
                            <BookOpen className="w-9 h-9 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-[12px] tracking-[0.25em] text-zinc-500 uppercase font-semibold mb-3">Javanese Weton</p>
                            <h2 className="text-4xl font-bold text-white mb-3">{analysisResult.results.primbon.weton}</h2>
                            <p className="text-[16px] text-blue-300 font-medium">Neptu Score: {analysisResult.results.primbon.neptu_score}</p>
                          </div>

                          <div className="card p-8 rounded-2xl max-w-lg w-full text-left">
                            <h4 className="text-[12px] tracking-[0.2em] text-fuchsia-400 uppercase font-semibold mb-4">Character Destiny</h4>
                            <p className="text-[16px] leading-[1.9] text-zinc-200">{analysisResult.results.primbon.character}</p>
                            <div className="mt-6 pt-6 border-t border-white/[0.05] flex justify-between items-center">
                              <span className="text-[13px] text-zinc-500">Work Style</span>
                              <span className="font-bold text-blue-400 text-[14px]">{analysisResult.results.primbon.work_style}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Falakiyah Tab */}
                      {activeTab === 'falakiyah' && (
                        <motion.div key="tab-falakiyah" initial={{opacity: 0, y: 12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-12}} className="flex flex-col gap-10 w-full">

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Hisab Jummal */}
                            <div className="card p-9 rounded-2xl bg-gradient-to-br from-fuchsia-950/20 to-purple-950/10 border-fuchsia-500/10">
                              <h4 className="text-[12px] font-bold tracking-[0.2em] text-fuchsia-400 uppercase mb-7 flex items-center gap-3"><Sun className="w-4 h-4"/> Hisab Jummal Numerology</h4>

                              <div className="mb-7 bg-black/30 p-5 rounded-xl font-mono text-[13px] text-zinc-400 break-words leading-[1.8] border border-white/[0.03]">
                                {analysisResult.results.falakiyah.numerology?.calculation}
                              </div>
                              <div className="flex justify-between items-center bg-fuchsia-900/20 p-5 rounded-xl border border-fuchsia-500/15">
                                <span className="text-[13px] font-semibold text-fuchsia-300">Reduction Rule:</span>
                                <span className="font-bold text-white font-mono">{analysisResult.results.falakiyah.numerology?.modulo_rule}</span>
                              </div>
                              <div className="mt-7 flex items-center gap-5">
                                <span className="text-4xl">{analysisResult.results.falakiyah.numerology?.icon}</span>
                                <div>
                                  <p className="font-bold text-white text-xl">{analysisResult.results.falakiyah.numerology?.element}</p>
                                  <p className="text-[11px] text-zinc-500 uppercase tracking-[0.2em] mt-1 font-semibold">Core Ruling Energy</p>
                                </div>
                              </div>
                            </div>

                            {/* Spiritual Patch */}
                            <div className="card p-9 rounded-2xl bg-gradient-to-br from-emerald-950/20 to-teal-950/10 border-emerald-500/10 flex flex-col justify-between">
                              <div>
                                <h4 className="text-[12px] font-bold tracking-[0.2em] text-emerald-400 uppercase mb-7 flex items-center gap-3"><Sparkles className="w-4 h-4"/> Spiritual Patch (Dhikr)</h4>
                                <p className="text-[15px] text-zinc-300 mb-7 leading-[1.9]">
                                  Based on the candidate's core planetary energy, the following <strong className="text-emerald-300">Asma Allah</strong> are recommended to balance and maximize their potential:
                                </p>
                              </div>
                              <div className="bg-emerald-900/20 p-8 rounded-xl border border-emerald-500/15 text-center">
                                <p className="text-2xl lg:text-3xl font-black text-emerald-300">
                                  {analysisResult.results.falakiyah.numerology?.asmaul_husna}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* HR Insight */}
                          <div className="card p-9 rounded-2xl bg-gradient-to-r from-black/30 to-black/10">
                            <h4 className="text-[12px] font-bold tracking-[0.2em] text-zinc-400 uppercase mb-5">Astronomical HR Insight</h4>
                            <p className="text-zinc-200 text-[17px] leading-[2]">{analysisResult.results.falakiyah.hr_insight}</p>
                          </div>

                          {/* Planetary Positions */}
                          <div>
                            <h4 className="text-[12px] font-bold tracking-[0.2em] text-purple-400 uppercase mb-7 flex items-center gap-3"><Activity className="w-4 h-4"/> Planetary Impacts on Work Behavior</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {analysisResult.results.falakiyah.planetary_positions?.map((p, i) => (
                                <div key={i} className="card p-7 rounded-2xl hover:border-purple-500/20 transition-all">
                                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/[0.04]">
                                    <span className="text-[15px] text-zinc-200 font-bold">{p.name}</span>
                                    <span className="text-[12px] text-fuchsia-300 font-semibold px-3 py-1.5 bg-fuchsia-500/8 rounded-lg border border-fuchsia-500/15">{p.constellation}</span>
                                  </div>
                                  <p className="text-[14px] text-zinc-400 leading-[1.8]">{p.implication}</p>
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
