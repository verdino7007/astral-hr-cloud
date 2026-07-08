import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, ShieldAlert, Sparkles, Eye, EyeOff,
  Briefcase, Hexagon, Compass, Search,
  Moon, Sun, BookOpen, Download, Upload, ArrowRight, ArrowLeft
} from 'lucide-react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { playKeySound, playBellSound, playReturnSound } from '../utils/typewriterSound';

function NewAnalysis({ token }) {
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
  const [revealSecrets, setRevealSecrets] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if(!candidateData.name || !candidateData.birth_date) return;

    playReturnSound();
    setLoading(true);
    setStep('results');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:9091';
      const response = await fetch(`${apiUrl}/analyze`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(candidateData),
      });
      const data = await response.json();
      setTimeout(() => {
        setAnalysisResult(data);
        setLoading(false);
        playBellSound();
      }, 1500);
    } catch (error) {
      console.error("Error analyzing:", error);
      setLoading(false);
      playBellSound();
    }
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    playReturnSound();
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
                  headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify({name, birth_date: date, birth_time: time}),
                });
                successCount++;
             } catch(err) { console.error(`Error row ${i}:`, err); }

             setBatchProgress({ current: i, total: lines.length - 1 });
         }
      }
      setLoading(false);
      setBatchProgress(null);
      playBellSound();
      alert(`Batch processing selesai! ${successCount} kandidat berhasil ditambahkan ke Vault.`);
      e.target.value = null;
      setStep('welcome'); // Go back to start
    };
    reader.readAsText(file);
  };

  const handleDownloadPDF = async () => {
    playReturnSound();
    const reportElement = document.getElementById('report-content');
    if (!reportElement) return;

    try {
      const canvas = await html2canvas(reportElement, { scale: 2, useCORS: true, backgroundColor: '#f4f2eb' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CIA_DOSSIER_${analysisResult.name}.pdf`);
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

  // Normalize BaZi results for backward compatibility
  const getBaziData = () => {
    if (!analysisResult?.results?.bazi) return null;
    const rawBazi = analysisResult.results.bazi;
    
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
        // Fallback for old string format like "甲子"
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

  const baziData = getBaziData();

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } } };

  return (
    <div className="w-full font-typewriter relative min-h-[600px] flex flex-col justify-center">

      <AnimatePresence mode="wait">
        
        {/* ════ STAGE 1: WELCOME/LANDING PAGE ════ */}
        {step === 'welcome' ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center space-y-10 relative z-10 py-6"
          >
            {/* Classified Stamp */}
            <div className="stamp stamp-classified text-2xl font-black px-6 py-2.5 tracking-[0.2em] mb-4">
              TOP SECRET
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-black text-cia-dark tracking-tight uppercase font-stamp">
                CLASSIFIED DOSSIER SYSTEM
              </h1>
              <div className="accent-bar max-w-lg mx-auto my-6"></div>
              <p className="text-cia-muted text-sm max-w-2xl mx-auto font-bold leading-relaxed">
                INTELLIGENCE INGESTION ENGINE FOR HUMAN RESOURCE CAPABILITIES. MAPPING COSMIC CHRONOLOGY, METEOROLOGICAL VECTORS (BAZI), JAVA CULTURAL CYCLES (WETON), AND HISAB CELESTIAL EQUATIONS (FALAKIYAH).
              </p>
            </div>

            <button
              onClick={() => { playReturnSound(); setStep('input'); }}
              className="px-8 py-4 btn-primary font-bold text-sm flex items-center gap-3 transition-transform"
            >
              INITIATE NEW PROFILE FILE <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick archival disclaimer */}
            <div className="pt-8 border-t-2 border-cia-dark/20 w-full max-w-xl text-[10px] text-cia-muted font-bold leading-relaxed uppercase">
              SECURITY WARNING: ALL COPIES ARE RECORDED. REPRODUCTION WITHOUT WRITTEN AGENCY CLEARANCE IS STRICTLY PROHIBITED.
            </div>
          </motion.div>
        ) : step === 'input' ? (
          
          /* ════ STAGE 2: INPUT SELECTION (MANUAL OR CSV) ════ */
          <motion.div
            key="input-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-xl mx-auto w-full relative z-10"
          >
            {/* Back to welcome */}
            <button
              onClick={() => { playReturnSound(); setStep('welcome'); }}
              className="inline-flex items-center gap-2 text-xs font-bold text-cia-muted hover:text-cia-dark mb-6 transition-colors uppercase"
            >
              <ArrowLeft className="w-4 h-4" /> [ CANCEL DOSSIER CREATION ]
            </button>

            <div className="card p-8 lg:p-10 shadow-cia-card relative">
              {/* Folder Stamp Header */}
              <div className="absolute top-4 right-6 text-[10px] font-bold text-cia-red uppercase font-stamp border-2 border-cia-red px-2 py-0.5 rotate-3">
                Restricted
              </div>

              {/* Title & toggle */}
              <div className="mb-8 mt-2 pb-4 border-b-2 border-cia-dark/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-black text-cia-dark font-stamp">INGESTION FORM</h3>
                  <p className="text-[10px] text-cia-muted font-bold mt-0.5 uppercase">SPECIFY INGEST METHOD</p>
                </div>
                
                {/* Method switcher */}
                <div className="flex border border-cia-dark bg-cia-bg p-0.5 rounded">
                  <button
                    onClick={() => { playReturnSound(); setInputType('manual'); }}
                    className={`px-3 py-1.5 text-xs font-bold transition-all ${inputType === 'manual' ? 'bg-cia-dark text-cia-bg' : 'text-cia-dark hover:bg-cia-dark/10'}`}
                  >
                    MANUAL
                  </button>
                  <button
                    onClick={() => { playReturnSound(); setInputType('csv'); }}
                    className={`px-3 py-1.5 text-xs font-bold transition-all ${inputType === 'csv' ? 'bg-cia-dark text-cia-bg' : 'text-cia-dark hover:bg-cia-dark/10'}`}
                  >
                    CSV IMPORT
                  </button>
                </div>
              </div>

              {/* Manual Input Form */}
              {inputType === 'manual' ? (
                <form onSubmit={handleAnalyze} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-cia-dark uppercase tracking-wider mb-2">
                      SUBJECT NAME
                    </label>
                    <input
                      type="text"
                      className="w-full glass-input"
                      value={candidateData.name}
                      onChange={e => setCandidateData({...candidateData, name: e.target.value})}
                      onKeyDown={playKeySound}
                      placeholder="ENTER FULL NAME"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-cia-dark uppercase tracking-wider mb-2">
                        DATE OF BIRTH
                      </label>
                      <input
                        type="date"
                        className="w-full glass-input"
                        value={candidateData.birth_date}
                        onChange={e => setCandidateData({...candidateData, birth_date: e.target.value})}
                        onKeyDown={playKeySound}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-cia-dark uppercase tracking-wider mb-2">
                        TIME OF BIRTH
                      </label>
                      <input
                        type="time"
                        className="w-full glass-input"
                        value={candidateData.birth_time}
                        onChange={e => setCandidateData({...candidateData, birth_time: e.target.value})}
                        onKeyDown={playKeySound}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 btn-primary font-bold text-xs flex items-center justify-center gap-2 mt-8 uppercase"
                  >
                    <Terminal className="w-4 h-4" /> GENERATE INTEL REPORT
                  </button>
                </form>
              ) : (
                /* CSV Drag and Drop / Selector */
                <div className="space-y-6 text-center py-6">
                  <div className="border-3 border-dashed border-cia-dark bg-cia-bg/30 p-8 flex flex-col items-center justify-center relative hover:bg-cia-bg/50 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleCSVUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <Upload className="w-10 h-10 text-cia-dark mb-4" />
                    <h4 className="text-xs font-bold text-cia-dark uppercase">DROP CSV DOSSIER FILE HERE</h4>
                    <p className="text-[10px] text-cia-muted mt-2 font-bold max-w-xs leading-relaxed uppercase">
                      OR CLICK TO SELECT. TARGET RECORD WILL BE AUTO-ARCHIVED INTO VAULT.
                    </p>
                  </div>

                  <div className="p-4 bg-cia-card border-2 border-cia-dark text-left">
                    <p className="text-[10px] font-bold text-cia-red uppercase tracking-wider mb-2">⚠️ DATA SCHEMA CONFIG</p>
                    <p className="text-[9px] text-cia-muted leading-relaxed font-bold uppercase">
                      FIRST LINE MUST BE HEADER EXACTLY: <code className="bg-cia-bg px-1.5 py-0.5 border border-cia-dark/30 font-mono text-cia-dark">Name, YYYY-MM-DD, HH:MM</code>.
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
                <div className="relative w-16 h-16 flex items-center justify-center mb-8">
                  <div className="absolute inset-0 border-4 border-t-cia-dark border-r-transparent border-b-cia-dark border-l-transparent animate-spin"></div>
                  <Terminal className="w-5 h-5 text-cia-dark animate-pulse" />
                </div>
                {batchProgress ? (
                  <>
                    <p className="tracking-[0.2em] text-xs text-cia-red uppercase font-bold animate-pulse">
                      // PROCESSING BATCH UPLOAD //
                    </p>
                    <p className="mt-3 text-3xl font-bold font-stamp text-cia-dark">
                      {batchProgress.current} <span className="text-cia-muted">/</span> {batchProgress.total}
                    </p>
                  </>
                ) : (
                  <p className="tracking-[0.2em] text-xs text-cia-dark uppercase font-bold animate-pulse">
                    // COMPUTING ESOTERIC CYCLES FROM RECORDS //
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
                      playReturnSound();
                      setAnalysisResult(null);
                      setStep('input');
                    }}
                    className="inline-flex items-center gap-2 text-xs font-bold text-cia-muted hover:text-cia-dark transition-colors uppercase"
                  >
                    <ArrowLeft className="w-4 h-4" /> [ INGEST NEW RECORD ]
                  </button>

                  <div className="flex gap-4">
                    <button
                      onClick={() => { playReturnSound(); setRevealSecrets(!revealSecrets); }}
                      className="px-4 py-2 bg-cia-card border-2 border-cia-dark text-xs font-bold flex items-center gap-2 hover:bg-cia-dark hover:text-cia-bg transition-all"
                    >
                      {revealSecrets ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {revealSecrets ? "HIDE SENSITIVE INFO" : "DE-CLASSIFY REDACTED TEXT"}
                    </button>
                  </div>
                </div>

                {/* Report Section */}
                <div id="report-content" className="flex flex-col gap-10 bg-cia-bg p-8 border-4 border-double border-cia-dark">
                  {/* Dossier Header Stamp */}
                  <div className="flex justify-between items-start border-b-2 border-cia-dark pb-6">
                    <div>
                      <div className="stamp stamp-classified text-sm font-black mb-3">SECRET</div>
                      <p className="text-[10px] text-cia-muted font-bold">CASE ID: CIA-HR-{analysisResult.name.slice(0, 3).toUpperCase()}-{Math.floor(1000 + Math.random() * 9000)}</p>
                      <p className="text-[10px] text-cia-muted font-bold">DATE FILED: 1965-07-08</p>
                    </div>
                    <div className="text-right">
                      <div className="stamp stamp-secret text-sm font-black mb-3">ARCHIVE DOSSIER</div>
                      <p className="text-[10px] text-cia-muted font-bold">CLEARANCE LEVEL: 3</p>
                    </div>
                  </div>

                  {/* ── Result Header (Layered Overlapping Layout) ── */}
                  <div className="relative z-20 flex flex-col md:flex-row gap-6 items-stretch">
                    {/* Score Card - Overlapping on top */}
                    <div className="card p-6 rounded-none flex items-center gap-6 shrink-0 md:w-64 bg-cia-card border-3 border-cia-dark shadow-cia-card slant-left md:-rotate-1 hover:rotate-0 transition-transform">
                      <div className="w-12 h-12 border-2 border-cia-dark flex items-center justify-center shrink-0 bg-cia-bg">
                        <Terminal className="w-6 h-6 text-cia-dark" />
                      </div>
                      <div>
                        <p className="text-[9px] tracking-wider text-cia-muted uppercase font-bold mb-1">CAPABILITY SCORE</p>
                        <p className="text-4xl font-black text-cia-dark leading-none font-stamp">
                          {analysisResult.overall_score}
                          <span className="text-sm text-cia-muted font-bold ml-1">/100</span>
                        </p>
                      </div>
                    </div>

                    {/* Name + Tab Switcher ── */}
                    <div className="card p-6 rounded-none flex-1 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 md:-ml-4 bg-cia-card border-3 border-cia-dark shadow-cia-card md:rotate-1 hover:rotate-0 transition-transform">
                      <div>
                        <h3 className="text-2xl font-black text-cia-dark tracking-tight font-stamp uppercase">SUBJECT: {analysisResult.name}</h3>
                        <p className="text-[10px] text-cia-muted mt-2 flex items-center gap-1.5 font-bold uppercase">
                          <Search className="w-3.5 h-3.5" />
                          COGNITIVE & ENERGY VECTOR REPORT
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2.5 z-30">
                        <button onClick={handleDownloadPDF} className="px-4 py-2.5 btn-secondary flex items-center gap-2 text-xs font-bold">
                          <Download className="w-3.5 h-3.5" /> PRINT DOSSIER
                        </button>
                        <div className="flex border-2 border-cia-dark bg-cia-bg p-0.5 rounded">
                          <button onClick={() => { playReturnSound(); setActiveTab('bazi'); }} className={`px-3 py-1.5 text-xs font-bold transition-all ${activeTab === 'bazi' ? 'bg-cia-dark text-cia-bg' : 'text-cia-dark hover:bg-cia-dark/10'}`}>BAZI</button>
                          <button onClick={() => { playReturnSound(); setActiveTab('primbon'); }} className={`px-3 py-1.5 text-xs font-bold transition-all ${activeTab === 'primbon' ? 'bg-cia-dark text-cia-bg' : 'text-cia-dark hover:bg-cia-dark/10'}`}>WETON</button>
                          <button onClick={() => { playReturnSound(); setActiveTab('falakiyah'); }} className={`px-3 py-1.5 text-xs font-bold transition-all ${activeTab === 'falakiyah' ? 'bg-cia-dark text-cia-bg' : 'text-cia-dark hover:bg-cia-dark/10'}`}>FALAKIYAH</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── Holistic Synthesis (CIA REDACTED dossier style) ── */}
                  {!analysisResult.error && analysisResult.results?.synthesis && (
                    <div className="card p-8 lg:p-10 bg-cia-card border-3 border-cia-dark relative z-10 shadow-cia-card slant-right slant-hover">
                      <div className="absolute -top-3.5 left-6 px-3 py-1.5 bg-cia-dark text-cia-bg text-[9px] font-bold tracking-widest uppercase">
                        [ SUMMARY REPORT ]
                      </div>
                      <h4 className="text-xs font-bold tracking-wider text-cia-red uppercase mb-8 mt-2 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-cia-red" /> INTEL SYNTHESIS & ANALYSIS VERDICT
                      </h4>
                      <div className="space-y-6 text-cia-dark text-sm leading-relaxed font-bold synthesis-prose">
                        {analysisResult.results.synthesis.split('\n\n').map((paragraph, idx) => {
                          // Apply typewriter styling and replace text to show CIA-style redacted info
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

                  {/* ── Tab Content ── */}
                  {analysisResult.error ? (
                    <div className="card p-10 flex flex-col items-center justify-center border-3 border-cia-dark bg-cia-card shadow-cia-card">
                      <ShieldAlert className="w-10 h-10 text-cia-red mb-4 animate-bounce" />
                      <h3 className="text-sm font-black text-cia-red uppercase font-stamp">RECORD PARSING ERROR</h3>
                      <p className="text-cia-dark mt-3 text-center max-w-md text-xs leading-relaxed font-bold">{analysisResult.error}</p>
                    </div>
                  ) : (
                    <div className="card p-8 bg-cia-card border-3 border-cia-dark shadow-cia-card relative z-0">
                      <AnimatePresence mode="wait">

                        {/* BaZi Tab */}
                        {activeTab === 'bazi' && (
                          <motion.div key="tab-bazi" initial={{opacity: 0, y: 5}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-5}} className="flex flex-col gap-10 w-full">
                            
                            {/* Day Master (Self) Header */}
                            <div className="card p-6 bg-cia-bg border-2 border-cia-dark shadow-cia-card relative">
                              <div className="absolute top-4 right-4 stamp stamp-classified text-[10px] font-black">
                                DAY MASTER (SELF)
                              </div>
                              <div className="flex flex-col sm:flex-row gap-6 items-center">
                                <div className="w-20 h-20 border-3 border-cia-dark bg-cia-card flex flex-col items-center justify-center rotate-[-3deg] shrink-0 shadow-cia-btn">
                                  <span className="text-4xl font-stamp font-black text-cia-red leading-none mt-1">
                                    {baziData.day_master.character}
                                  </span>
                                  <span className="text-xs font-bold text-cia-dark leading-none mt-1">
                                    {baziData.day_master.pinyin}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="text-sm font-black text-cia-dark uppercase font-stamp">
                                    CORE ELEMENT: {baziData.day_master.translation}
                                  </h4>
                                  <p className="text-[10px] text-cia-muted font-bold uppercase mt-1">
                                    SYMBOL: {baziData.day_master.symbol}
                                  </p>
                                  <p className="text-xs text-cia-dark mt-3 leading-relaxed font-semibold">
                                    {baziData.day_master.meaning}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* 4 Pillars of Destiny */}
                            <div>
                              <h4 className="text-xs font-bold tracking-wider text-cia-dark uppercase mb-6 flex items-center gap-2 font-stamp">
                                <Terminal className="w-4 h-4 text-cia-dark"/> THE FOUR PILLARS OF DESTINY (八字 - BAZI)
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {['year', 'month', 'day', 'time'].map((key) => {
                                  const pillar = baziData.pillars[key];
                                  if (!pillar) return null;
                                  return (
                                    <div key={key} className="card p-6 bg-cia-card border-2 border-cia-dark shadow-cia-card relative text-center flex flex-col justify-between">
                                      <div className="text-[9px] font-bold text-cia-muted uppercase border-b border-cia-dark/30 pb-2 mb-4">
                                        {key} pillar
                                      </div>
                                      
                                      {/* Heavenly Stem */}
                                      <div className="mb-4">
                                        <span className="text-[8px] text-cia-muted font-bold block uppercase mb-1">Heavenly Stem</span>
                                        <span className="text-4xl font-stamp font-black text-cia-red block">{pillar.stem.character}</span>
                                        <span className="text-xs font-bold text-cia-dark block">{pillar.stem.pinyin}</span>
                                        <span className="text-[9px] text-cia-muted font-bold block uppercase">{pillar.stem.translation}</span>
                                        <p className="text-[10px] text-cia-dark mt-3 border-t border-dashed border-cia-dark/20 pt-3 leading-relaxed font-semibold">
                                          {pillar.stem.meaning}
                                        </p>
                                      </div>
                                      
                                      <div className="border-t-2 border-double border-cia-dark my-4"></div>
                                      
                                      {/* Earthly Branch */}
                                      <div>
                                        <span className="text-[8px] text-cia-muted font-bold block uppercase mb-1">Earthly Branch</span>
                                        <span className="text-4xl font-stamp font-black text-cia-dark block">{pillar.branch.character}</span>
                                        <span className="text-xs font-bold text-cia-dark block">{pillar.branch.pinyin}</span>
                                        <span className="text-[9px] text-cia-muted font-bold block uppercase">{pillar.branch.zodiac} ({pillar.branch.element})</span>
                                        <p className="text-[10px] text-cia-dark mt-3 border-t border-dashed border-cia-dark/20 pt-3 leading-relaxed font-semibold">
                                          {pillar.branch.meaning}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Traits, Roles, and Element Distribution Chart */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
                              {/* Left side: Traits and Roles */}
                              <div className="space-y-8 flex flex-col justify-between">
                                <div className="card p-6 bg-cia-card border-2 border-cia-dark shadow-cia-card relative">
                                  <div className="absolute -top-3 right-4 px-2 py-0.5 border border-cia-dark bg-cia-bg text-[8px] font-bold uppercase tracking-wider">traits</div>
                                  <h4 className="text-xs font-bold tracking-wider text-cia-dark uppercase mb-6 flex items-center gap-2"><Hexagon className="w-4 h-4 text-cia-dark"/> PSYCHO-ENERGY VECTORS</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {baziData.traits.map((t, i) => (
                                      <span key={i} className="px-3 py-1.5 border border-cia-dark bg-cia-bg text-xs font-bold text-cia-dark">{t}</span>
                                    ))}
                                  </div>
                                </div>

                                <div className="card p-6 bg-cia-card border-2 border-cia-dark shadow-cia-card relative flex-1 mt-4">
                                  <div className="absolute -top-3 right-4 px-2 py-0.5 border border-cia-dark bg-cia-bg text-[8px] font-bold uppercase tracking-wider">placement</div>
                                  <h4 className="text-xs font-bold tracking-wider text-cia-dark uppercase mb-6 flex items-center gap-2"><Briefcase className="w-4 h-4 text-cia-dark"/> RECOMMENDED DEPLOYMENT</h4>
                                  <ul className="space-y-2">
                                    {baziData.best_roles.map((r, i) => (
                                      <li key={i} className="flex items-center gap-3 bg-cia-bg border border-cia-dark/30 p-3 rounded-none text-xs font-bold text-cia-dark">
                                        <div className="w-2 h-2 bg-cia-dark shrink-0"></div>{r}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              {/* Right side: Radar Chart */}
                              <div className="flex flex-col items-center bg-cia-bg border-2 border-cia-dark p-6 rounded-none shadow-cia-card relative">
                                <h4 className="text-xs font-bold tracking-wider text-cia-dark uppercase mt-2 mb-1 font-stamp">ELEMENT CHART RECORD</h4>
                                <p className="text-cia-muted text-[10px] mb-6 font-bold uppercase">DAY MASTER ELEMENT STRENGTH</p>
                                <div className="w-full h-64">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                      <PolarGrid stroke="#0f0f0f" strokeWidth={1} />
                                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#0f0f0f', fontSize: 11, fontWeight: 'bold' }} />
                                      <Radar dataKey="Value" stroke="#0f0f0f" strokeWidth={2.5} fill="rgba(15, 15, 15, 0.1)" />
                                    </RadarChart>
                                  </ResponsiveContainer>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Primbon Tab */}
                        {activeTab === 'primbon' && (
                          <motion.div key="tab-primbon" initial={{opacity: 0, y: 5}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-5}} className="flex flex-col items-center py-6 space-y-8 relative">
                            <div className="card p-6 bg-cia-bg border-3 border-cia-dark shadow-cia-card max-w-sm w-full text-center slant-left relative z-10">
                              <p className="text-[9px] tracking-wider text-cia-muted uppercase font-bold mb-2">GEOGRAPHIC CYCLE</p>
                              <h2 className="text-2xl font-black text-cia-dark mb-4 font-stamp">WETON: {analysisResult.results.primbon.weton}</h2>
                              <span className="inline-block text-xs text-cia-dark font-bold bg-cia-card border border-cia-dark px-3 py-1">NEPTU COEFFICIENT: {analysisResult.results.primbon.neptu_score}</span>
                            </div>

                            <div className="card p-6 rounded-none max-w-xl w-full text-left slant-right relative z-0 md:-mt-4 shadow-cia-card border-3 border-cia-dark bg-cia-card">
                              <div className="absolute -top-3.5 left-6 px-3 py-1 bg-cia-dark text-cia-bg text-[9px] font-bold tracking-widest uppercase">
                                [ DESTINY FILE ]
                              </div>
                              <h4 className="text-xs tracking-wider text-cia-dark uppercase font-bold mb-4 mt-2">BEHAVIORAL SPECTRUM</h4>
                              <p className="text-xs leading-relaxed text-cia-dark font-bold">
                                {analysisResult.results.primbon.character.replace(/(lemah|sensitif|kurang|buruk|bahaya|cacat|negatif|kelemahan)/gi, (match) => {
                                  return revealSecrets ? `<span class="border-b border-cia-red text-cia-red">${match}</span>` : `<span class="redacted">${match}</span>`;
                                })}
                              </p>
                              <div className="mt-6 pt-6 border-t-2 border-dashed border-cia-dark/30 flex justify-between items-center">
                                <span className="text-xs font-bold text-cia-muted">TACTICAL STYLE</span>
                                <span className="font-bold text-cia-dark text-xs bg-cia-bg border border-cia-dark px-3 py-1">{analysisResult.results.primbon.work_style}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Falakiyah Tab */}
                        {activeTab === 'falakiyah' && (
                          <motion.div key="tab-falakiyah" initial={{opacity: 0, y: 5}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-5}} className="flex flex-col gap-10 w-full">

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                              {/* Hisab Jummal */}
                              <div className="card p-6 bg-cia-card border-3 border-cia-dark flex flex-col justify-between shadow-cia-card slant-left relative z-10">
                                <div className="absolute -top-3.5 left-6 px-3 py-1 bg-cia-dark text-cia-bg text-[9px] font-bold tracking-widest uppercase">
                                  [ HISAB NUM ]
                                </div>
                                <div className="mt-2">
                                  <h4 className="text-xs font-bold tracking-wider text-cia-dark uppercase mb-6 flex items-center gap-2"><Sun className="w-4 h-4 text-cia-dark"/> CELESTIAL REDUCTION</h4>
                                  <div className="mb-6 bg-cia-bg p-4 font-mono text-xs text-cia-dark break-words leading-relaxed border border-cia-dark/30">
                                    {analysisResult.results.falakiyah.numerology?.calculation}
                                  </div>
                                  <div className="flex justify-between items-center bg-cia-bg p-3 border border-cia-dark/30">
                                    <span className="text-[10px] font-bold text-cia-muted">MODULO RULE:</span>
                                    <span className="font-bold text-cia-dark font-mono text-xs">{analysisResult.results.falakiyah.numerology?.modulo_rule}</span>
                                  </div>
                                </div>
                                <div className="mt-8 flex items-center gap-4 border-t border-cia-dark/30 pt-4">
                                  <span className="text-3xl">{analysisResult.results.falakiyah.numerology?.icon}</span>
                                  <div>
                                    <p className="font-bold text-cia-dark text-base uppercase font-stamp">{analysisResult.results.falakiyah.numerology?.element}</p>
                                    <p className="text-[9px] text-cia-muted uppercase tracking-wider mt-0.5 font-bold">RULING CELESTIAL ELEMENT</p>
                                  </div>
                                </div>
                              </div>

                              {/* Spiritual Patch */}
                              <div className="card p-6 bg-cia-card border-3 border-cia-dark flex flex-col justify-between shadow-cia-card slant-right relative z-0 md:-ml-4">
                                <div className="absolute -top-3.5 left-6 px-3 py-1 bg-cia-dark text-cia-bg text-[9px] font-bold tracking-widest uppercase">
                                  [ PATCH ]
                                </div>
                                <div className="mt-2">
                                  <h4 className="text-xs font-bold tracking-wider text-cia-dark uppercase mb-6 flex items-center gap-2"><Sparkles className="w-4 h-4 text-cia-dark"/> SPIRITUAL PATCH</h4>
                                  <p className="text-xs text-cia-muted mb-6 leading-relaxed font-semibold uppercase">
                                    TO COUNTERBALANCE ENERGY VECTORS AND DEFICIENCIES, INCORPORATE THE RECOMMENDED VIBRATIONAL FREQUENCY:
                                  </p>
                                </div>
                                <div className="bg-cia-bg border-2 border-cia-dark p-6 text-center">
                                  <p className="text-xl font-black text-cia-red tracking-wider font-stamp">
                                    {analysisResult.results.falakiyah.numerology?.asmaul_husna}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* HR Insight */}
                            <div className="card p-6 bg-cia-bg border-2 border-cia-dark shadow-inner slant-left relative">
                              <div className="absolute -top-3 right-4 px-2 py-0.5 border border-cia-dark bg-cia-card text-[8px] font-bold tracking-wider uppercase">insight</div>
                              <h4 className="text-xs font-bold tracking-wider text-cia-muted uppercase mb-4">TACTICAL AGENCY VERDICT</h4>
                              <p className="text-cia-dark text-xs leading-relaxed font-bold">
                                {analysisResult.results.falakiyah.hr_insight.replace(/(lemah|sensitif|konflik|kurang|buruk|bahaya|cacat|negatif|kelemahan)/gi, (match) => {
                                  return revealSecrets ? `<span class="border-b border-cia-red text-cia-red">${match}</span>` : `<span class="redacted">${match}</span>`;
                                })}
                              </p>
                            </div>

                            {/* Planetary Positions */}
                            <div>
                              <h4 className="text-xs font-bold tracking-wider text-cia-dark uppercase mb-8 flex items-center gap-2"><Activity className="w-4 h-4 text-cia-dark"/> PLANETARY RADIAL IMPACTS ON RECORDED SUBJECT</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {analysisResult.results.falakiyah.planetary_positions?.map((p, i) => {
                                  const slantClass = i % 2 === 0 ? "slant-left" : "slant-right";
                                  const offsetClass = i % 2 === 0 ? "md:-mt-1" : "md:mt-1";
                                  return (
                                    <div key={i} className={`card p-6 shadow-cia-card hover:border-cia-dark hover:rotate-0 transition-transform bg-cia-card border-2 border-cia-dark ${slantClass} ${offsetClass}`}>
                                      <div className="flex justify-between items-center mb-4 pb-4 border-b border-cia-dark/20">
                                        <span className="text-xs text-cia-dark font-bold font-stamp uppercase">{p.name}</span>
                                        <span className="text-[9px] text-cia-dark font-bold px-2 py-0.5 bg-cia-bg border border-cia-dark">{p.constellation}</span>
                                      </div>
                                      <p className="text-[11px] text-cia-muted leading-relaxed font-bold">
                                        {p.implication.replace(/(lemah|sensitif|konflik|kurang|buruk|bahaya|cacat|negatif|kelemahan)/gi, (match) => {
                                          return revealSecrets ? `<span class="border-b border-cia-red text-cia-red">${match}</span>` : `<span class="redacted">${match}</span>`;
                                        })}
                                      </p>
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
