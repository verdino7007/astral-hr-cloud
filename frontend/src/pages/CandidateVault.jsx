import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Trash2, Edit2, Loader, Save, X } from 'lucide-react';
import { playKeySound, playReturnSound } from '../utils/typewriterSound';

function CandidateVault() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', birth_date: '', birth_time: '' });

  const fetchCandidates = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:9091';
      const res = await fetch(`${apiUrl}/candidates`);
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
  }, []);

  const handleDelete = async (id) => {
    playReturnSound();
    if (!confirm('Apakah Anda yakin ingin menghapus arsip file kandidat ini?')) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:9091';
      await fetch(`${apiUrl}/candidates/${id}`, { method: 'DELETE' });
      setCandidates(candidates.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
    }
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
        headers: { 'Content-Type': 'application/json' },
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
    </div>
  );
}

export default CandidateVault;
