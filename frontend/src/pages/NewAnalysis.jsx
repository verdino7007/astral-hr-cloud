import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, Users, Target, UserPlus, Sparkles,
  Briefcase, Hexagon, Compass, Search,
  Moon, Sun, BookOpen, Download, Upload, ArrowRight, ArrowLeft
} from 'lucide-react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function NewAnalysis() {
  const [step, setStep] = useState('welcome'); // welcome, input, results
  const [inputType, setInputType] = useState('manual'); // manual, csv
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
    setStep('results');
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
      setStep('results');
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
      setStep('welcome'); // Go back to start
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
    <div className="w-full font-montserrat relative min-h-[600px] flex flex-col justify-center">

      <AnimatePresence mode="wait">
        
        {/* ════ STAGE 1: WELCOME/LANDING PAGE ════ */}
        {step === 'welcome' ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, cubicBezier: [0.175, 0.885, 0.32, 1.275] }}
            className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center space-y-10 relative z-10"
          >
            {/* Big floating logo icon */}
            <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-white to-clay-peach flex items-center justify-center shadow-clay-card border-2 border-white floating-slow mb-4">
              <Sparkles className="w-12 h-12 text-clay-orange animate-pulse" />
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-white text-clay-orange-dark text-xs font-black tracking-wider shadow-clay-card">
                <Activity className="w-4 h-4 text-clay-orange animate-pulse" />
                COSMIC PROFILING PLATFORM
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-clay-dark tracking-tight leading-tight uppercase" style={{fontFamily: "'Montserrat', sans-serif"}}>
                Astral HR
              </h1>
              <p className="text-clay-muted text-base md:text-lg max-w-2xl mx-auto font-bold leading-relaxed">
                Platform intelijen SDM berbasis siklus kosmik universal (BaZi, Primbon Weton, Falakiyah) untuk memetakan kepribadian, gaya kerja, dan sinergi tim secara holistik.
              </p>
            </div>

            <button
              onClick={() => setStep('input')}
              className="px-10 py-5 btn-primary font-black text-base flex items-center gap-3 shadow-clay-btn transition-transform hover:scale-105"
            >
              Start Analysis <ArrowRight className="w-5 h-5" />
            </button>

            {/* Quick scientific disclaimer */}
            <div className="pt-8 border-t border-clay-peach/40 w-full max-w-xl text-xs text-clay-muted font-semibold leading-relaxed">
              Ilmu pembacaan karakter ini didasarkan pada perhitungan probabilitas siklus kosmik, membantu menyusun keputusan strategis penempatan kerja secara objektif.
            </div>
          </motion.div>
        ) : step === 'input' ? (
          
          /* ════ STAGE 2: INPUT SELECTION (MANUAL OR CSV) ════ */
          <motion.div
            key="input-form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto w-full relative z-10"
          >
            {/* Back to welcome */}
            <button
              onClick={() => setStep('welcome')}
              className="inline-flex items-center gap-2 text-xs font-extrabold text-clay-muted hover:text-clay-orange mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Start
            </button>

            <div className="card p-8 lg:p-10 shadow-clay-card slant-left relative">
              {/* Floating stiker */}
              <div className="absolute -top-3.5 left-8 px-4 py-1.5 bg-gradient-to-r from-clay-orange to-clay-orange-dark text-white text-[10px] font-black rounded-full shadow-clay-btn tracking-widest uppercase">
                ⚙️ Method
              </div>

              {/* Title & toggle */}
              <div className="mb-8 mt-2 pb-6 border-b border-clay-peach/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-black text-clay-dark">Candidate Data</h3>
                  <p className="text-xs text-clay-muted font-bold mt-0.5">Pilih metode input</p>
                </div>
                
                {/* Method switcher */}
                <div className="flex rounded-[16px] bg-clay-peach/40 p-1 border border-clay-peach/50 shadow-inner">
                  <button
                    onClick={() => setInputType('manual')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${inputType === 'manual' ? 'bg-white text-clay-orange shadow-clay-card' : 'text-clay-muted hover:text-clay-dark'}`}
                  >
                    Input Manual
                  </button>
                  <button
                    onClick={() => setInputType('csv')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${inputType === 'csv' ? 'bg-white text-clay-orange shadow-clay-card' : 'text-clay-muted hover:text-clay-dark'}`}
                  >
                    CSV File
                  </button>
                </div>
              </div>

              {/* Manual Input Form */}
              {inputType === 'manual' ? (
                <form onSubmit={handleAnalyze} className="space-y-6">
                  <div>
                    <label className="block text-xs font-extrabold text-clay-dark uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3.5 glass-input"
                      value={candidateData.name}
                      onChange={e => setCandidateData({...candidateData, name: e.target.value})}
                      placeholder="Nama Lengkap Kandidat"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-clay-dark uppercase tracking-wider mb-2">
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
                      <label className="block text-xs font-extrabold text-clay-dark uppercase tracking-wider mb-2">
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

                  <button
                    type="submit"
                    className="w-full py-4 btn-primary font-black text-sm flex items-center justify-center gap-2 mt-6"
                  >
                    <Target className="w-4 h-4 text-white" /> Mulai Analisa
                  </button>
                </form>
              ) : (
                /* CSV Drag and Drop / Selector */
                <div className="space-y-6 text-center py-6">
                  <div className="border-4 border-dashed border-clay-peach rounded-[24px] p-8 bg-clay-bg/30 flex flex-col items-center justify-center relative hover:bg-clay-bg/50 transition-colors">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleCSVUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <Upload className="w-12 h-12 text-clay-orange mb-4 animate-bounce" />
                    <h4 className="text-sm font-extrabold text-clay-dark">Unggah File CSV Anda</h4>
                    <p className="text-xs text-clay-muted mt-2 font-bold max-w-xs leading-relaxed">
                      Klik atau seret file CSV ke kotak ini. Data akan otomatis masuk ke Candidate Vault.
                    </p>
                  </div>

                  <div className="p-4 bg-clay-peach/30 border border-clay-peach/50 rounded-xl text-left">
                    <p className="text-xs font-bold text-clay-orange-dark uppercase tracking-wider mb-2">📋 Petunjuk Format CSV</p>
                    <p className="text-[11px] text-clay-muted leading-relaxed font-semibold">
                      Gunakan baris pertama untuk header kolom: <code className="bg-white px-1.5 py-0.5 rounded border border-clay-peach/50 font-mono text-clay-dark font-extrabold">Name, YYYY-MM-DD, HH:MM</code>. 
                      Satu baris mewakili satu kandidat.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          
          /* ════ STAGE 3: RUNNING OR RESULTS DASHBOARD ════ */
          <motion.div
            key="results-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            {loading ? (
              /* Loading screen within results */
              <div className="min-h-[500px] flex flex-col items-center justify-center">
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
              </div>
            ) : (
              /* Main Results Presentation */
              <div className="flex flex-col gap-10">
                {/* Back navigation on top */}
                <div className="flex justify-between items-center relative z-20">
                  <button
                    onClick={() => {
                      setAnalysisResult(null);
                      setStep('input');
                    }}
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-clay-muted hover:text-clay-orange transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> New Profile Analysis
                  </button>
                </div>

                {/* Report Section */}
                <div id="report-content" className="flex flex-col gap-10">
                  {/* ── Result Header (Layered Overlapping Layout) ── */}
                  <div className="relative z-20 flex flex-col md:flex-row gap-6 items-stretch">
                    {/* Score Card - Overlapping on top */}
                    <div className="card p-8 rounded-3xl flex items-center gap-6 group shrink-0 md:w-64 bg-gradient-to-br from-white to-clay-peach/20 border-white shadow-clay-card slant-left md:-rotate-2 hover:rotate-0 transition-transform">
                      <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-white to-clay-peach flex items-center justify-center shrink-0 shadow-clay-card border-2 border-white">
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

                    {/* Name + Tab Switcher ── */}
                    <div className="card p-8 rounded-3xl flex-1 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 md:-ml-4 border-white shadow-clay-card md:rotate-1 hover:rotate-0 transition-transform">
                      <div>
                        <h3 className="text-3xl font-black text-clay-dark tracking-tight">{analysisResult.name}</h3>
                        <p className="text-xs text-clay-muted mt-2 flex items-center gap-1.5 font-bold">
                          <Search className="w-4 h-4 text-clay-orange" />
                          Multi-Engine Profile Report
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3 z-30">
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
                  </div>

                  {/* ── Holistic Synthesis ── */}
                  {!analysisResult.error && analysisResult.results?.synthesis && (
                    <div className="card p-10 lg:p-12 bg-gradient-to-br from-white via-clay-peach/20 to-white border-white md:-mt-4 relative z-10 shadow-clay-card slant-right slant-hover">
                      <div className="absolute -top-3.5 left-8 px-4 py-1.5 bg-gradient-to-r from-clay-orange to-clay-orange-dark text-white text-[10px] font-black rounded-full shadow-clay-btn tracking-widest uppercase">
                        🎯 Synthesis
                      </div>
                      <h4 className="text-xs font-bold tracking-[0.25em] text-clay-orange-dark uppercase mb-8 mt-2 flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-clay-orange" /> Holistic Synthesis & Conclusion
                      </h4>
                      <div className="space-y-6 text-clay-dark text-[15px] leading-relaxed font-semibold synthesis-prose">
                        {analysisResult.results.synthesis.split('\n\n').map((paragraph, idx) => {
                          const formattedHtml = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                          return <p key={idx} dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── Tab Content ── */}
                  {analysisResult.error ? (
                    <div className="card p-12 flex flex-col items-center justify-center border-red-200 bg-red-50/50 shadow-clay-card">
                      <Compass className="w-14 h-14 text-red-500/70 mb-5 animate-bounce" />
                      <h3 className="text-lg font-black text-red-600">Analysis Error</h3>
                      <p className="text-clay-dark mt-3 text-center max-w-md text-sm leading-relaxed font-semibold">{analysisResult.error}</p>
                    </div>
                  ) : (
                    <div className="card p-8 lg:p-10 shadow-clay-card md:-mt-2 relative z-0">
                      <AnimatePresence mode="wait">

                        {/* BaZi Tab */}
                        {activeTab === 'bazi' && (
                          <motion.div key="tab-bazi" initial={{opacity: 0, y: 12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-12}} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-10">
                              <div className="card p-6 bg-white border border-clay-peach/30 shadow-clay-card slant-left slant-hover relative">
                                <div className="absolute -top-3 right-4 px-3 py-1 bg-rose-100 border border-rose-200 text-rose-700 text-[9px] font-black rounded-full tracking-wider uppercase">Traits</div>
                                <h4 className="text-xs font-bold tracking-[0.2em] text-clay-orange-dark uppercase mb-6 flex items-center gap-2"><Hexagon className="w-4 h-4 text-clay-orange"/> Core BaZi Traits</h4>
                                <div className="flex flex-wrap gap-2.5">
                                  {analysisResult.results.bazi.traits.map((t, i) => (
                                    <span key={i} className="px-4 py-2.5 rounded-[16px] text-xs font-bold bg-clay-peach/40 border border-clay-peach/60 text-clay-orange-dark shadow-inner">{t}</span>
                                  ))}
                                </div>
                              </div>
                              <div className="card p-6 bg-white border border-clay-peach/30 shadow-clay-card slant-right slant-hover relative">
                                <div className="absolute -top-3 right-4 px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-700 text-[9px] font-black rounded-full tracking-wider uppercase">Roles</div>
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
                            <div className="flex flex-col items-center bg-white rounded-[32px] p-8 border-2 border-white shadow-clay-card slant-right slant-hover relative">
                              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-clay-peach/60 border border-clay-peach/80 rounded-lg shadow-inner flex items-center justify-center font-bold text-[9px] text-clay-muted tracking-widest uppercase">Charts</div>
                              <h4 className="text-xs font-bold tracking-[0.2em] text-clay-orange-dark uppercase w-full text-center mt-4 mb-1">Element Distribution</h4>
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
                          <motion.div key="tab-primbon" initial={{opacity: 0, y: 12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-12}} className="flex flex-col items-center py-8 space-y-10 relative">
                            <div className="card p-8 bg-gradient-to-br from-white to-clay-peach/10 border-white shadow-clay-card max-w-md w-full text-center slant-left relative z-10">
                              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-white to-clay-peach flex items-center justify-center shadow-clay-card border-2 border-white mb-6">
                                <BookOpen className="w-8 h-8 text-clay-orange" />
                              </div>
                              <p className="text-xs tracking-[0.25em] text-clay-muted uppercase font-bold mb-2">Javanese Weton</p>
                              <h2 className="text-3xl font-black text-clay-dark mb-4">{analysisResult.results.primbon.weton}</h2>
                              <span className="inline-block text-xs text-clay-orange-dark font-bold bg-clay-peach/40 border border-clay-peach/60 px-4 py-1.5 rounded-full shadow-inner">Neptu Score: {analysisResult.results.primbon.neptu_score}</span>
                            </div>

                            <div className="card p-8 rounded-3xl max-w-xl w-full text-left slant-right relative z-0 md:-mt-6 shadow-clay-card border-white">
                              <div className="absolute -top-3.5 left-8 px-4 py-1.5 bg-gradient-to-r from-clay-orange to-clay-orange-dark text-white text-[10px] font-black rounded-full shadow-clay-btn tracking-widest uppercase">
                                Character
                              </div>
                              <h4 className="text-xs tracking-[0.2em] text-clay-orange-dark uppercase font-bold mb-4 mt-2">Character Destiny</h4>
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

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
                              {/* Hisab Jummal */}
                              <div className="card p-8 bg-gradient-to-br from-white to-clay-peach/20 border-white flex flex-col justify-between shadow-clay-card slant-left slant-hover relative z-10">
                                <div className="absolute -top-3.5 left-6 px-3 py-1 bg-gradient-to-r from-clay-orange to-clay-orange-dark text-white text-[9px] font-black rounded-full shadow-clay-btn tracking-widest uppercase">
                                  🔢 Hisab
                                </div>
                                <div className="mt-2">
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
                              <div className="card p-8 bg-gradient-to-br from-white to-clay-peach/20 border-white flex flex-col justify-between shadow-clay-card slant-right slant-hover relative z-0 md:-ml-4">
                                <div className="absolute -top-3.5 left-6 px-3 py-1 bg-gradient-to-r from-clay-orange to-clay-orange-dark text-white text-[9px] font-black rounded-full shadow-clay-btn tracking-widest uppercase">
                                  📿 Dhikr
                                </div>
                                <div className="mt-2">
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
                            <div className="card p-8 bg-clay-bg/50 border-clay-peach/30 shadow-inner slant-left slant-hover relative">
                              <div className="absolute -top-3 right-4 px-3 py-1 bg-clay-peach/60 border border-clay-peach text-clay-orange-dark text-[9px] font-black rounded-full tracking-wider uppercase">Verdict</div>
                              <h4 className="text-xs font-bold tracking-[0.2em] text-clay-muted uppercase mb-4">Astronomical HR Insight</h4>
                              <p className="text-clay-dark text-[15px] leading-relaxed font-semibold">{analysisResult.results.falakiyah.hr_insight}</p>
                            </div>

                            {/* Planetary Positions */}
                            <div>
                              <h4 className="text-xs font-bold tracking-[0.2em] text-clay-orange-dark uppercase mb-8 flex items-center gap-2"><Activity className="w-4 h-4 text-clay-orange"/> Planetary Impacts on Work Behavior</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {analysisResult.results.falakiyah.planetary_positions?.map((p, i) => {
                                  const slantClass = i % 2 === 0 ? "slant-left" : "slant-right";
                                  const offsetClass = i % 2 === 0 ? "md:-mt-2" : "md:mt-2";
                                  return (
                                    <div key={i} className={`card p-6 shadow-clay-card hover:border-clay-orange hover:rotate-0 transition-transform ${slantClass} ${offsetClass}`}>
                                      <div className="flex justify-between items-center mb-4 pb-4 border-b border-clay-peach/30">
                                        <span className="text-sm text-clay-dark font-extrabold">{p.name}</span>
                                        <span className="text-[10px] text-clay-orange-dark font-bold px-2.5 py-1.5 bg-clay-peach/40 border border-clay-peach/60 rounded-xl shadow-inner">{p.constellation}</span>
                                      </div>
                                      <p className="text-xs text-clay-muted leading-relaxed font-semibold">{p.implication}</p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NewAnalysis;
