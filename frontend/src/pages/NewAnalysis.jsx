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
      const canvas = await html2canvas(reportElement, { scale: 2, useCORS: true, backgroundColor: '#f8fafc' });
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
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pastel-pink-light border border-rose-200/50 text-rose-700 text-xs font-bold tracking-wider mb-6 shadow-pastel">
          <Activity className="w-4 h-4 text-pastel-pink-dark" />
          PROFILING ENGINE
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tight leading-tight">
          Candidate Analysis
        </h1>
        <p className="text-slate-600 mt-5 text-[15px] leading-relaxed max-w-2xl">
          Masukkan detail kelahiran kandidat untuk menghasilkan profil esoterik multi-mesin yang lengkap.
          Hasil analisis otomatis tersimpan ke dalam database Candidate Vault.
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
            <div className="flex items-center gap-3.5 mb-8 pb-6 border-b border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-pastel-pink-light flex items-center justify-center shadow-pastel">
                <UserPlus className="w-5 h-5 text-rose-700" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">Candidate Input</h3>
                <p className="text-xs text-slate-500 mt-0.5">Lengkapi profil kelahiran</p>
              </div>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-7">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2.5">
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
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2.5">
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
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2.5">
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
                  className="w-full py-4 rounded-xl btn-primary shadow-pastel-pink font-bold flex items-center justify-center gap-2"
                >
                  {loading && !batchProgress
                    ? <><Activity className="w-4 h-4 animate-spin" /> Processing...</>
                    : <><Target className="w-4 h-4" /> Generate Report</>
                  }
                </button>

                <div className="relative w-full">
                  <input type="file" accept=".csv" onChange={handleCSVUpload} disabled={loading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <button type="button" className="w-full py-3.5 rounded-xl btn-secondary shadow-pastel-mint font-bold flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    Batch Import (CSV)
                  </button>
                </div>

                <p className="text-[10px] text-slate-400 text-center font-mono">
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
                className="card p-12 lg:p-16 text-center flex flex-col items-center justify-center min-h-[500px] border-dashed border-slate-300"
              >
                <div className="w-20 h-20 rounded-2xl bg-pastel-pink-light flex items-center justify-center mb-8 shadow-pastel">
                  <Compass className="w-10 h-10 text-rose-600 animate-[spin_40s_linear_infinite]" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-6" style={{fontFamily: "'Cinzel', serif"}}>
                  Cyclical Patterns of the Universe
                </h3>
                <div className="max-w-xl space-y-5 text-slate-600 text-[14px] leading-relaxed">
                  <p>
                    Ilmu pembacaan karakter (Astrology, BaZi, Primbon, Falakiyah) bukanlah suatu hal yang magis atau gaib. Alam semesta bekerja berdasarkan hukum Tuhan yang bersifat universal dan <strong className="text-slate-800 font-bold">siklikal</strong>.
                  </p>
                  <p>
                    Sejalan dengan temuan dalam jurnal ilmiah <em className="text-slate-800 font-medium">Chronobiology</em> dan <em className="text-slate-800 font-medium">Personality and Individual Differences</em>, lingkungan awal dan siklus kosmik mempengaruhi temperamen dasar manusia secara biologis.
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
                  <div className="absolute inset-0 border-4 border-t-rose-300 border-r-transparent border-b-emerald-300 border-l-transparent rounded-full animate-spin"></div>
                  <Sparkles className="w-8 h-8 text-rose-500 animate-pulse" />
                </div>
                {batchProgress ? (
                  <>
                    <p className="tracking-[0.2em] text-xs text-rose-700 uppercase font-bold animate-pulse">
                      Batch Processing CSV...
                    </p>
                    <p className="mt-3 text-3xl font-black text-slate-800">
                      {batchProgress.current} <span className="text-slate-400">/</span> {batchProgress.total}
                    </p>
                  </>
                ) : (
                  <p className="tracking-[0.2em] text-xs text-rose-700 uppercase font-bold animate-pulse">
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
                    <div className="w-16 h-16 rounded-2xl bg-pastel-pink-light flex items-center justify-center shrink-0 shadow-pastel transition-transform group-hover:scale-105">
                      <Users className="w-8 h-8 text-rose-700" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] text-slate-400 uppercase font-bold mb-1">Synergy Index</p>
                      <p className="text-5xl font-black text-slate-800 leading-none">
                        {analysisResult.overall_score}
                        <span className="text-lg text-slate-400 font-bold ml-1">/100</span>
                      </p>
                    </div>
                  </div>

                  {/* Name + Tab Switcher */}
                  <div className="card p-8 rounded-2xl md:col-span-2 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div>
                      <h3 className="text-3xl font-black text-slate-800 tracking-tight">{analysisResult.name}</h3>
                      <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5 font-semibold">
                        <Search className="w-4 h-4 text-rose-500" />
                        Multi-Engine Profile Report
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button onClick={handleDownloadPDF} className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-2 text-xs font-bold transition-all shadow-pastel">
                        <Download className="w-4 h-4 text-slate-500" /> PDF
                      </button>
                      <div className="flex rounded-xl bg-slate-100 border border-slate-200 p-1 gap-1">
                        <button onClick={() => setActiveTab('bazi')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'bazi' ? 'bg-white text-rose-700 shadow-pastel' : 'text-slate-500 hover:text-slate-800'}`}>BaZi</button>
                        <button onClick={() => setActiveTab('primbon')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'primbon' ? 'bg-white text-emerald-700 shadow-pastel' : 'text-slate-500 hover:text-slate-800'}`}>Primbon</button>
                        <button onClick={() => setActiveTab('falakiyah')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'falakiyah' ? 'bg-white text-purple-700 shadow-pastel' : 'text-slate-500 hover:text-slate-800'}`}>Falakiyah</button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* ── Holistic Synthesis ── */}
                {!analysisResult.error && analysisResult.results?.synthesis && (
                  <motion.div variants={itemVariants} className="card p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-pastel-pink-light/40 via-pastel-lavender-light/30 to-pastel-blue-light/30 border-rose-200/50">
                    <h4 className="text-xs font-bold tracking-[0.25em] text-rose-800 uppercase mb-8 flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-rose-600" /> Holistic Synthesis & Conclusion
                    </h4>
                    <div className="space-y-6 text-slate-700 text-[15px] leading-relaxed synthesis-prose">
                      {analysisResult.results.synthesis.split('\n\n').map((paragraph, idx) => {
                        const formattedHtml = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                        return <p key={idx} dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
                      })}
                    </div>
                  </motion.div>
                )}

                {/* ── Tab Content ── */}
                {analysisResult.error ? (
                  <motion.div variants={itemVariants} className="card p-12 rounded-3xl flex flex-col items-center justify-center border-red-200 bg-red-50/50">
                    <Compass className="w-14 h-14 text-red-500/70 mb-5" />
                    <h3 className="text-lg font-bold text-red-600">Analysis Error</h3>
                    <p className="text-slate-600 mt-3 text-center max-w-md text-sm leading-relaxed">{analysisResult.error}</p>
                  </motion.div>
                ) : (
                  <motion.div variants={itemVariants} className="card p-8 lg:p-10 rounded-3xl">
                    <AnimatePresence mode="wait">

                      {/* BaZi Tab */}
                      {activeTab === 'bazi' && (
                        <motion.div key="tab-bazi" initial={{opacity: 0, y: 12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-12}} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                          <div className="space-y-10">
                            <div>
                              <h4 className="text-xs font-bold tracking-[0.2em] text-rose-700 uppercase mb-6 flex items-center gap-2"><Hexagon className="w-4 h-4 text-rose-500"/> Core BaZi Traits</h4>
                              <div className="flex flex-wrap gap-2.5">
                                {analysisResult.results.bazi.traits.map((t, i) => (
                                  <span key={i} className="px-4 py-2.5 rounded-xl text-xs font-bold bg-pastel-pink-light border border-rose-200/50 text-rose-800 shadow-pastel">{t}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold tracking-[0.2em] text-emerald-800 uppercase mb-6 flex items-center gap-2"><Briefcase className="w-4 h-4 text-emerald-600"/> Ideal Roles</h4>
                              <ul className="space-y-3.5">
                                {analysisResult.results.bazi.best_roles.map((r, i) => (
                                  <li key={i} className="flex items-center gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-200/50 text-sm font-semibold text-slate-700">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-pastel-mint shrink-0"></div>{r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="flex flex-col items-center bg-slate-50 rounded-2xl p-8 border border-slate-100">
                            <h4 className="text-xs font-bold tracking-[0.2em] text-purple-700 uppercase w-full text-center mb-1">Element Distribution</h4>
                            <p className="text-slate-400 text-xs mb-6 font-semibold">Day Master: {analysisResult.results.bazi.day_master}</p>
                            <div className="w-full h-72">
                              <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                  <PolarGrid stroke="#e2e8f0" />
                                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: 'bold' }} />
                                  <Radar dataKey="Value" stroke="#ec4899" strokeWidth={2} fill="rgba(244, 63, 94, 0.15)" />
                                </RadarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Primbon Tab */}
                      {activeTab === 'primbon' && (
                        <motion.div key="tab-primbon" initial={{opacity: 0, y: 12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-12}} className="flex flex-col items-center text-center py-8 space-y-8">
                          <div className="w-20 h-20 rounded-2xl bg-pastel-mint-light flex items-center justify-center shadow-pastel">
                            <BookOpen className="w-10 h-10 text-emerald-700" />
                          </div>
                          <div>
                            <p className="text-xs tracking-[0.25em] text-slate-400 uppercase font-bold mb-3">Javanese Weton</p>
                            <h2 className="text-4xl font-black text-slate-800 mb-3">{analysisResult.results.primbon.weton}</h2>
                            <p className="text-sm text-emerald-700 font-bold bg-pastel-mint-light/65 px-4 py-1.5 rounded-full border border-emerald-200/50">Neptu Score: {analysisResult.results.primbon.neptu_score}</p>
                          </div>

                          <div className="card p-8 rounded-2xl max-w-xl w-full text-left">
                            <h4 className="text-xs tracking-[0.2em] text-rose-700 uppercase font-bold mb-4">Character Destiny</h4>
                            <p className="text-sm leading-relaxed text-slate-700">{analysisResult.results.primbon.character}</p>
                            <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
                              <span className="text-xs font-semibold text-slate-400">Work Style</span>
                              <span className="font-bold text-emerald-700 text-sm bg-pastel-mint-light/50 px-3 py-1 rounded-lg">{analysisResult.results.primbon.work_style}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Falakiyah Tab */}
                      {activeTab === 'falakiyah' && (
                        <motion.div key="tab-falakiyah" initial={{opacity: 0, y: 12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-12}} className="flex flex-col gap-10 w-full">

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Hisab Jummal */}
                            <div className="card p-8 rounded-2xl bg-gradient-to-br from-pastel-pink-light/40 to-pastel-lavender-light/30 border-rose-200/50 flex flex-col justify-between">
                              <div>
                                <h4 className="text-xs font-bold tracking-[0.2em] text-rose-800 uppercase mb-6 flex items-center gap-2"><Sun className="w-4 h-4 text-rose-500"/> Hisab Jummal Numerology</h4>
                                <div className="mb-6 bg-white/70 p-4 rounded-xl font-mono text-xs text-slate-600 break-words leading-relaxed border border-slate-200/60 shadow-inner">
                                  {analysisResult.results.falakiyah.numerology?.calculation}
                                </div>
                                <div className="flex justify-between items-center bg-rose-50 p-4 rounded-xl border border-rose-100">
                                  <span className="text-xs font-bold text-rose-700">Reduction Rule:</span>
                                  <span className="font-bold text-rose-800 font-mono text-xs">{analysisResult.results.falakiyah.numerology?.modulo_rule}</span>
                                </div>
                              </div>
                              <div className="mt-8 flex items-center gap-4 border-t border-rose-200/30 pt-6">
                                <span className="text-4xl">{analysisResult.results.falakiyah.numerology?.icon}</span>
                                <div>
                                  <p className="font-extrabold text-slate-800 text-lg">{analysisResult.results.falakiyah.numerology?.element}</p>
                                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5 font-bold">Core Ruling Energy</p>
                                </div>
                              </div>
                            </div>

                            {/* Spiritual Patch */}
                            <div className="card p-8 rounded-2xl bg-gradient-to-br from-pastel-mint-light/40 to-pastel-blue-light/30 border-emerald-200/50 flex flex-col justify-between">
                              <div>
                                <h4 className="text-xs font-bold tracking-[0.2em] text-emerald-800 uppercase mb-6 flex items-center gap-2"><Sparkles className="w-4 h-4 text-emerald-600"/> Spiritual Patch (Dhikr)</h4>
                                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                                  Berdasarkan energi planet penguasa kandidat, berikut <strong className="text-emerald-700">Asmaul Husna</strong> yang direkomendasikan untuk menyeimbangkan serta memaksimalkan potensi spiritualnya:
                                </p>
                              </div>
                              <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 text-center shadow-pastel">
                                <p className="text-2xl lg:text-3xl font-black text-emerald-700 tracking-wide">
                                  {analysisResult.results.falakiyah.numerology?.asmaul_husna}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* HR Insight */}
                          <div className="card p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-inner">
                            <h4 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">Astronomical HR Insight</h4>
                            <p className="text-slate-700 text-[15px] leading-relaxed">{analysisResult.results.falakiyah.hr_insight}</p>
                          </div>

                          {/* Planetary Positions */}
                          <div>
                            <h4 className="text-xs font-bold tracking-[0.2em] text-rose-800 uppercase mb-6 flex items-center gap-2"><Activity className="w-4 h-4 text-rose-500"/> Planetary Impacts on Work Behavior</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {analysisResult.results.falakiyah.planetary_positions?.map((p, i) => (
                                <div key={i} className="card p-6 rounded-2xl hover:border-rose-200 transition-all">
                                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
                                    <span className="text-sm text-slate-800 font-bold">{p.name}</span>
                                    <span className="text-[10px] text-purple-700 font-bold px-2.5 py-1 bg-pastel-lavender-light border border-purple-200/50 rounded-lg">{p.constellation}</span>
                                  </div>
                                  <p className="text-xs text-slate-600 leading-relaxed">{p.implication}</p>
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
