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
      const canvas = await html2canvas(reportElement, { scale: 2, useCORS: true, backgroundColor: '#fdf6ee' });
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
    <div className="w-full font-montserrat">

      {/* ── Page Header ── */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-white text-clay-orange-dark text-xs font-extrabold tracking-wider mb-6 shadow-clay-card">
          <Activity className="w-4 h-4 text-clay-orange animate-pulse" />
          PROFILING ENGINE
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-clay-dark tracking-tight leading-tight">
          Candidate Analysis
        </h1>
        <p className="text-clay-muted mt-5 text-[15px] leading-relaxed max-w-2xl font-semibold">
          Masukkan detail kelahiran kandidat untuk menghasilkan analisis profil esoterik multi-mesin yang lengkap. Hasil analisis otomatis disimpan ke dalam database local.
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
          <div className="card p-8 lg:p-10">
            {/* Card Header */}
            <div className="flex items-center gap-3.5 mb-8 pb-6 border-b border-clay-peach/40">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-white to-clay-peach flex items-center justify-center shadow-clay-card border-2 border-white">
                <UserPlus className="w-5 h-5 text-clay-orange" />
              </div>
              <div>
                <h3 className="text-base font-black text-clay-dark">Candidate Input</h3>
                <p className="text-xs text-clay-muted font-bold mt-0.5">Lengkapi profil kelahiran</p>
              </div>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-7">
              {/* Name */}
              <div>
                <label className="block text-xs font-extrabold text-clay-dark uppercase tracking-wider mb-2.5">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3.5 glass-input"
                  value={candidateData.name}
                  onChange={e => setCandidateData({...candidateData, name: e.target.value})}
                  placeholder="Nama Lengkap"
                  required
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold text-clay-dark uppercase tracking-wider mb-2.5">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3.5 glass-input"
                    value={candidateData.birth_date}
                    onChange={e => setCandidateData({...candidateData, birth_date: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-clay-dark uppercase tracking-wider mb-2.5">
                    Birth Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-4 py-3.5 glass-input"
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
                  className="w-full py-4 btn-primary font-black text-sm flex items-center justify-center gap-2"
                >
                  {loading && !batchProgress
                    ? <><Activity className="w-4 h-4 animate-spin text-white" /> Processing...</>
                    : <><Target className="w-4 h-4 text-white" /> Generate Report</>
                  }
                </button>

                <div className="relative w-full">
                  <input type="file" accept=".csv" onChange={handleCSVUpload} disabled={loading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <button type="button" className="w-full py-3.5 btn-secondary font-black text-sm flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    Batch Import (CSV)
                  </button>
                </div>

                <p className="text-[10px] text-clay-muted text-center font-mono font-bold">
                  CSV format: Name, YYYY-MM-DD, HH:MM
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
                className="card p-12 lg:p-16 text-center flex flex-col items-center justify-center min-h-[500px]"
              >
                <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-white to-clay-peach flex items-center justify-center mb-8 shadow-clay-card border-2 border-white">
                  <Compass className="w-10 h-10 text-clay-orange animate-[spin_40s_linear_infinite]" />
                </div>
                <h3 className="text-2xl font-black text-clay-dark mb-6" style={{fontFamily: "'Cinzel', serif"}}>
                  Cyclical Patterns of the Universe
                </h3>
                <div className="max-w-xl space-y-5 text-clay-muted text-[14px] leading-relaxed font-semibold">
                  <p>
                    Ilmu pembacaan karakter (Astrology, BaZi, Primbon, Falakiyah) bukanlah suatu hal yang magis atau gaib. Alam semesta bekerja berdasarkan hukum Tuhan yang bersifat universal dan <strong className="text-clay-dark font-extrabold">siklikal</strong>.
                  </p>
                  <p>
                    Sejalan dengan temuan dalam jurnal ilmiah <em className="text-clay-dark font-bold">Chronobiology</em> dan <em className="text-clay-dark font-bold">Personality and Individual Differences</em>, lingkungan awal dan siklus kosmik mempengaruhi temperamen dasar manusia secara biologis.
                  </p>
                  <p>
                    Hasil analisis ini memberikan kerangka probabilitas yang dapat dijadikan bahan pertimbangan strategis oleh divisi HRD.
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
                  <div className="absolute inset-0 border-4 border-t-clay-orange border-r-transparent border-b-clay-peach border-l-transparent rounded-full animate-spin"></div>
                  <Sparkles className="w-8 h-8 text-clay-orange animate-pulse" />
                </div>
                {batchProgress ? (
                  <>
                    <p className="tracking-[0.2em] text-xs text-clay-orange-dark uppercase font-black animate-pulse">
                      Batch Processing CSV...
                    </p>
                    <p className="mt-3 text-3xl font-black text-clay-dark">
                      {batchProgress.current} <span className="text-clay-peach-dark">/</span> {batchProgress.total}
                    </p>
                  </>
                ) : (
                  <p className="tracking-[0.2em] text-xs text-clay-orange-dark uppercase font-black animate-pulse">
                    Menganalisis Data Esoterik...
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
                    <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-white to-clay-peach flex items-center justify-center shrink-0 shadow-clay-card border-2 border-white transition-transform group-hover:scale-105">
                      <Users className="w-8 h-8 text-clay-orange" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] text-clay-muted uppercase font-black mb-1">Synergy Index</p>
                      <p className="text-5xl font-black text-clay-dark leading-none">
                        {analysisResult.overall_score}
                        <span className="text-lg text-clay-peach-dark font-bold ml-1">/100</span>
                      </p>
                    </div>
                  </div>

                  {/* Name + Tab Switcher */}
                  <div className="card p-8 rounded-2xl md:col-span-2 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div>
                      <h3 className="text-3xl font-black text-clay-dark tracking-tight">{analysisResult.name}</h3>
                      <p className="text-xs text-clay-muted mt-2 flex items-center gap-1.5 font-bold">
                        <Search className="w-4 h-4 text-clay-orange" />
                        Multi-Engine Profile Report
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button onClick={handleDownloadPDF} className="px-4 py-2.5 rounded-full btn-secondary flex items-center gap-2 text-xs font-black shadow-clay-btn-secondary">
                        <Download className="w-4 h-4" /> PDF
                      </button>
                      <div className="flex rounded-[20px] bg-clay-peach/40 border border-clay-peach/60 p-1 gap-1 shadow-inner">
                        <button onClick={() => setActiveTab('bazi')} className={`px-4 py-2.5 rounded-[16px] text-xs font-black transition-all ${activeTab === 'bazi' ? 'bg-gradient-to-r from-clay-orange-light to-clay-orange text-white shadow-clay-btn' : 'text-clay-muted hover:text-clay-dark'}`}>BaZi</button>
                        <button onClick={() => setActiveTab('primbon')} className={`px-4 py-2.5 rounded-[16px] text-xs font-black transition-all ${activeTab === 'primbon' ? 'bg-gradient-to-r from-clay-orange-light to-clay-orange text-white shadow-clay-btn' : 'text-clay-muted hover:text-clay-dark'}`}>Primbon</button>
                        <button onClick={() => setActiveTab('falakiyah')} className={`px-4 py-2.5 rounded-[16px] text-xs font-black transition-all ${activeTab === 'falakiyah' ? 'bg-gradient-to-r from-clay-orange-light to-clay-orange text-white shadow-clay-btn' : 'text-clay-muted hover:text-clay-dark'}`}>Falakiyah</button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* ── Holistic Synthesis ── */}
                {!analysisResult.error && analysisResult.results?.synthesis && (
                  <motion.div variants={itemVariants} className="card p-10 lg:p-12 bg-gradient-to-br from-white via-clay-peach/20 to-white border-white">
                    <h4 className="text-xs font-bold tracking-[0.25em] text-clay-orange-dark uppercase mb-8 flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-clay-orange" /> Holistic Synthesis & Conclusion
                    </h4>
                    <div className="space-y-6 text-clay-dark text-[15px] leading-relaxed font-semibold synthesis-prose">
                      {analysisResult.results.synthesis.split('\n\n').map((paragraph, idx) => {
                        const formattedHtml = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                        return <p key={idx} dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
                      })}
                    </div>
                  </motion.div>
                )}

                {/* ── Tab Content ── */}
                {analysisResult.error ? (
                  <motion.div variants={itemVariants} className="card p-12 flex flex-col items-center justify-center border-red-200 bg-red-50/50">
                    <Compass className="w-14 h-14 text-red-500/70 mb-5" />
                    <h3 className="text-lg font-black text-red-600">Analysis Error</h3>
                    <p className="text-clay-dark mt-3 text-center max-w-md text-sm leading-relaxed font-semibold">{analysisResult.error}</p>
                  </motion.div>
                ) : (
                  <motion.div variants={itemVariants} className="card p-8 lg:p-10">
                    <AnimatePresence mode="wait">

                      {/* BaZi Tab */}
                      {activeTab === 'bazi' && (
                        <motion.div key="tab-bazi" initial={{opacity: 0, y: 12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-12}} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                          <div className="space-y-10">
                            <div>
                              <h4 className="text-xs font-bold tracking-[0.2em] text-clay-orange-dark uppercase mb-6 flex items-center gap-2"><Hexagon className="w-4 h-4 text-clay-orange"/> Core BaZi Traits</h4>
                              <div className="flex flex-wrap gap-2.5">
                                {analysisResult.results.bazi.traits.map((t, i) => (
                                  <span key={i} className="px-4 py-2.5 rounded-[16px] text-xs font-bold bg-clay-peach/40 border border-clay-peach/60 text-clay-orange-dark shadow-inner">{t}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold tracking-[0.2em] text-clay-orange-dark uppercase mb-6 flex items-center gap-2"><Briefcase className="w-4 h-4 text-clay-orange"/> Ideal Roles</h4>
                              <ul className="space-y-3.5">
                                {analysisResult.results.bazi.best_roles.map((r, i) => (
                                  <li key={i} className="flex items-center gap-3.5 bg-clay-bg border border-clay-peach/30 p-4 rounded-2xl text-sm font-semibold text-clay-dark shadow-inner">
                                    <div className="w-2.5 h-2.5 rounded-full bg-clay-orange shadow-clay-btn shrink-0"></div>{r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="flex flex-col items-center bg-clay-bg rounded-[24px] p-8 border border-clay-peach/30 shadow-inner">
                            <h4 className="text-xs font-bold tracking-[0.2em] text-clay-orange-dark uppercase w-full text-center mb-1">Element Distribution</h4>
                            <p className="text-clay-muted text-xs mb-6 font-bold">Day Master: {analysisResult.results.bazi.day_master}</p>
                            <div className="w-full h-72">
                              <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                  <PolarGrid stroke="#faeae0" />
                                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#2d2d2d', fontSize: 11, fontWeight: 'bold' }} />
                                  <Radar dataKey="Value" stroke="#ff9a62" strokeWidth={2.5} fill="rgba(255, 154, 98, 0.15)" />
                                </RadarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Primbon Tab */}
                      {activeTab === 'primbon' && (
                        <motion.div key="tab-primbon" initial={{opacity: 0, y: 12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-12}} className="flex flex-col items-center text-center py-8 space-y-8">
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white to-clay-peach flex items-center justify-center shadow-clay-card border-2 border-white">
                            <BookOpen className="w-10 h-10 text-clay-orange" />
                          </div>
                          <div>
                            <p className="text-xs tracking-[0.25em] text-clay-muted uppercase font-bold mb-3">Javanese Weton</p>
                            <h2 className="text-4xl font-black text-clay-dark mb-3">{analysisResult.results.primbon.weton}</h2>
                            <p className="text-xs text-clay-orange-dark font-bold bg-clay-peach/40 border border-clay-peach/60 px-4 py-1.5 rounded-full shadow-inner">Neptu Score: {analysisResult.results.primbon.neptu_score}</p>
                          </div>

                          <div className="card p-8 rounded-2xl max-w-xl w-full text-left">
                            <h4 className="text-xs tracking-[0.2em] text-clay-orange-dark uppercase font-bold mb-4">Character Destiny</h4>
                            <p className="text-sm leading-relaxed text-clay-dark font-semibold">{analysisResult.results.primbon.character}</p>
                            <div className="mt-6 pt-6 border-t border-clay-peach/40 flex justify-between items-center">
                              <span className="text-xs font-bold text-clay-muted">Work Style</span>
                              <span className="font-extrabold text-clay-orange-dark text-xs bg-clay-peach/40 px-3 py-1.5 rounded-xl shadow-inner">{analysisResult.results.primbon.work_style}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Falakiyah Tab */}
                      {activeTab === 'falakiyah' && (
                        <motion.div key="tab-falakiyah" initial={{opacity: 0, y: 12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-12}} className="flex flex-col gap-10 w-full">

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Hisab Jummal */}
                            <div className="card p-8 bg-gradient-to-br from-white to-clay-peach/20 border-white flex flex-col justify-between">
                              <div>
                                <h4 className="text-xs font-bold tracking-[0.2em] text-clay-orange-dark uppercase mb-6 flex items-center gap-2"><Sun className="w-4 h-4 text-clay-orange"/> Hisab Jummal Numerology</h4>
                                <div className="mb-6 bg-clay-bg/70 p-4 rounded-xl font-mono text-xs text-clay-dark break-words leading-relaxed border border-clay-peach/40 shadow-inner">
                                  {analysisResult.results.falakiyah.numerology?.calculation}
                                </div>
                                <div className="flex justify-between items-center bg-clay-bg/50 p-4 rounded-xl border border-clay-peach/30 shadow-inner">
                                  <span className="text-xs font-bold text-clay-orange-dark">Reduction Rule:</span>
                                  <span className="font-bold text-clay-dark font-mono text-xs">{analysisResult.results.falakiyah.numerology?.modulo_rule}</span>
                                </div>
                              </div>
                              <div className="mt-8 flex items-center gap-4 border-t border-clay-peach/30 pt-6">
                                <span className="text-4xl">{analysisResult.results.falakiyah.numerology?.icon}</span>
                                <div>
                                  <p className="font-black text-clay-dark text-lg">{analysisResult.results.falakiyah.numerology?.element}</p>
                                  <p className="text-[10px] text-clay-muted uppercase tracking-widest mt-0.5 font-bold">Core Ruling Energy</p>
                                </div>
                              </div>
                            </div>

                            {/* Spiritual Patch */}
                            <div className="card p-8 bg-gradient-to-br from-white to-clay-peach/20 border-white flex flex-col justify-between">
                              <div>
                                <h4 className="text-xs font-bold tracking-[0.2em] text-clay-orange-dark uppercase mb-6 flex items-center gap-2"><Sparkles className="w-4 h-4 text-clay-orange"/> Spiritual Patch (Dhikr)</h4>
                                <p className="text-sm text-clay-muted mb-6 leading-relaxed font-semibold">
                                  Berdasarkan energi planet penguasa kandidat, berikut <strong className="text-clay-orange-dark">Asmaul Husna</strong> yang direkomendasikan untuk menyeimbangkan serta memaksimalkan potensi spiritualnya:
                                </p>
                              </div>
                              <div className="bg-clay-bg border border-clay-peach/40 p-6 rounded-2xl text-center shadow-inner">
                                <p className="text-2xl lg:text-3xl font-black text-clay-orange-dark tracking-wide">
                                  {analysisResult.results.falakiyah.numerology?.asmaul_husna}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* HR Insight */}
                          <div className="card p-8 bg-clay-bg/50 border-clay-peach/30 shadow-inner">
                            <h4 className="text-xs font-bold tracking-[0.2em] text-clay-muted uppercase mb-4">Astronomical HR Insight</h4>
                            <p className="text-clay-dark text-[15px] leading-relaxed font-semibold">{analysisResult.results.falakiyah.hr_insight}</p>
                          </div>

                          {/* Planetary Positions */}
                          <div>
                            <h4 className="text-xs font-bold tracking-[0.2em] text-clay-orange-dark uppercase mb-6 flex items-center gap-2"><Activity className="w-4 h-4 text-clay-orange"/> Planetary Impacts on Work Behavior</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {analysisResult.results.falakiyah.planetary_positions?.map((p, i) => (
                                <div key={i} className="card p-6 hover:border-clay-orange transition-all">
                                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-clay-peach/30">
                                    <span className="text-sm text-clay-dark font-extrabold">{p.name}</span>
                                    <span className="text-[10px] text-clay-orange-dark font-bold px-2.5 py-1.5 bg-clay-peach/40 border border-clay-peach/60 rounded-xl shadow-inner">{p.constellation}</span>
                                  </div>
                                  <p className="text-xs text-clay-muted leading-relaxed font-semibold">{p.implication}</p>
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
