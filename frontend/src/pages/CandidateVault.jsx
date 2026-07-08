import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Trash2, Edit2, Loader, Save, X } from 'lucide-react';

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
    if (!confirm('Apakah Anda yakin ingin menghapus kandidat ini?')) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:9091';
      await fetch(`${apiUrl}/candidates/${id}`, { method: 'DELETE' });
      setCandidates(candidates.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (c) => {
    setEditingId(c.id);
    setEditForm({ name: c.name, birth_date: c.birth_date, birth_time: c.birth_time });
  };

  const handleSaveEdit = async () => {
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
    <div className="w-full font-montserrat">
      {/* Page Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-white text-clay-orange-dark text-xs font-extrabold tracking-wider mb-6 shadow-clay-card">
          <Database className="w-4 h-4 text-clay-orange" />
          DATABASE REPOSITORY
        </div>
        <h2 className="text-4xl lg:text-5xl font-black text-clay-dark tracking-tight leading-tight">
          Candidate Vault
        </h2>
        <p className="text-clay-muted mt-5 text-[15px] leading-relaxed max-w-2xl font-semibold">
          Kelola semua data profil esoterik kandidat yang tersimpan di database local Anda.
        </p>
      </div>

      {/* Main Table Container */}
      <div className="card overflow-hidden shadow-clay-card">
        {loading ? (
          <div className="p-20 flex justify-center items-center">
            <Loader className="w-8 h-8 animate-spin text-clay-orange" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-clay-bg/75 border-b border-clay-peach/40 text-[10px] font-extrabold tracking-wider uppercase text-clay-muted">
                  <th className="p-6">ID</th>
                  <th className="p-6">Nama</th>
                  <th className="p-6">Tanggal Lahir</th>
                  <th className="p-6">Waktu Lahir</th>
                  <th className="p-6">Skor Sinergi</th>
                  <th className="p-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-clay-peach/20">
                {candidates.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-clay-muted font-bold">
                      Belum ada kandidat tersimpan.
                    </td>
                  </tr>
                ) : (
                  candidates.map((c) => (
                    <tr key={c.id} className="hover:bg-clay-bg/30 transition-colors">
                      <td className="p-6 text-clay-muted font-mono text-xs font-bold">#{c.id}</td>
                      
                      {/* Name */}
                      <td className="p-6 font-extrabold text-clay-dark text-sm">
                        {editingId === c.id ? (
                          <input
                            type="text"
                            className="w-full px-3 py-2 glass-input"
                            value={editForm.name}
                            onChange={e => setEditForm({...editForm, name: e.target.value})}
                          />
                        ) : c.name}
                      </td>

                      {/* Birth Date */}
                      <td className="p-6 text-clay-muted text-sm font-bold">
                        {editingId === c.id ? (
                          <input
                            type="date"
                            className="w-full px-3 py-2 glass-input"
                            value={editForm.birth_date}
                            onChange={e => setEditForm({...editForm, birth_date: e.target.value})}
                          />
                        ) : c.birth_date}
                      </td>

                      {/* Birth Time */}
                      <td className="p-6 text-clay-muted text-sm font-mono font-bold">
                        {editingId === c.id ? (
                          <input
                            type="time"
                            className="w-full px-3 py-2 glass-input"
                            value={editForm.birth_time}
                            onChange={e => setEditForm({...editForm, birth_time: e.target.value})}
                          />
                        ) : c.birth_time}
                      </td>

                      {/* Score Badge */}
                      <td className="p-6">
                        <span className="px-4 py-1.5 bg-clay-peach/40 border border-clay-peach/60 text-clay-orange-dark rounded-xl text-xs font-extrabold shadow-inner">
                          {c.overall_score}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-6 text-right">
                        {editingId === c.id ? (
                          <div className="flex justify-end gap-2.5">
                            <button
                              onClick={handleSaveEdit}
                              className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl border border-emerald-200/40 shadow-inner transition-all"
                              title="Simpan"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl border border-rose-200/40 shadow-inner transition-all"
                              title="Batal"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2.5">
                            <button
                              onClick={() => startEdit(c)}
                              className="p-2.5 btn-secondary rounded-xl text-clay-orange shadow-clay-btn-secondary hover:text-clay-orange-dark transition-all"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(c.id)}
                              className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl border border-rose-200/40 shadow-inner transition-all"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
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
