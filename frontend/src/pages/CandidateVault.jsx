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
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pastel-blue-light border border-blue-200/50 text-blue-700 text-xs font-bold tracking-wider mb-6 shadow-pastel">
          <Database className="w-4 h-4 text-pastel-blue-dark" />
          DATABASE REPOSITORY
        </div>
        <h2 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tight leading-tight">
          Candidate Vault
        </h2>
        <p className="text-slate-600 mt-5 text-[15px] leading-relaxed max-w-2xl">
          Kelola semua data profil esoterik kandidat yang tersimpan di database lokal Anda.
        </p>
      </div>

      {/* Main Table Container */}
      <div className="card overflow-hidden shadow-pastel">
        {loading ? (
          <div className="p-20 flex justify-center items-center">
            <Loader className="w-8 h-8 animate-spin text-pastel-blue-dark" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold tracking-wider uppercase text-slate-500">
                  <th className="p-6">ID</th>
                  <th className="p-6">Nama</th>
                  <th className="p-6">Tanggal Lahir</th>
                  <th className="p-6">Waktu Lahir</th>
                  <th className="p-6">Skor Sinergi</th>
                  <th className="p-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-slate-400 font-semibold">
                      Belum ada kandidat tersimpan.
                    </td>
                  </tr>
                ) : (
                  candidates.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-6 text-slate-400 font-mono text-xs">#{c.id}</td>
                      
                      {/* Name */}
                      <td className="p-6 font-bold text-slate-800 text-sm">
                        {editingId === c.id ? (
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-300"
                            value={editForm.name}
                            onChange={e => setEditForm({...editForm, name: e.target.value})}
                          />
                        ) : c.name}
                      </td>

                      {/* Birth Date */}
                      <td className="p-6 text-slate-600 text-sm font-semibold">
                        {editingId === c.id ? (
                          <input
                            type="date"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-300"
                            value={editForm.birth_date}
                            onChange={e => setEditForm({...editForm, birth_date: e.target.value})}
                          />
                        ) : c.birth_date}
                      </td>

                      {/* Birth Time */}
                      <td className="p-6 text-slate-600 text-sm font-mono">
                        {editingId === c.id ? (
                          <input
                            type="time"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-300"
                            value={editForm.birth_time}
                            onChange={e => setEditForm({...editForm, birth_time: e.target.value})}
                          />
                        ) : c.birth_time}
                      </td>

                      {/* Score Badge */}
                      <td className="p-6">
                        <span className="px-3.5 py-1.5 bg-pastel-pink-light border border-rose-200/50 text-rose-800 rounded-full text-xs font-bold shadow-pastel">
                          {c.overall_score}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-6 text-right">
                        {editingId === c.id ? (
                          <div className="flex justify-end gap-2.5">
                            <button
                              onClick={handleSaveEdit}
                              className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl border border-emerald-200/40 shadow-pastel transition-all"
                              title="Simpan"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl border border-rose-200/40 shadow-pastel transition-all"
                              title="Batal"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2.5">
                            <button
                              onClick={() => startEdit(c)}
                              className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200/40 shadow-pastel transition-all"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(c.id)}
                              className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl border border-rose-200/40 shadow-pastel transition-all"
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
