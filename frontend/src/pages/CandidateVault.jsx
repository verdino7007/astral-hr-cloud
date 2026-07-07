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
    if (!confirm('Are you sure you want to delete this candidate?')) return;
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
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Database className="w-8 h-8 text-blue-400" /> Candidate Vault
        </h2>
        <p className="text-slate-400 mt-2">Manage all esoteric profiles stored in the database.</p>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center"><Loader className="w-8 h-8 animate-spin text-purple-400" /></div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-xs tracking-wider uppercase text-slate-400">
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Birth Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Synergy Score</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-slate-500">No candidates stored yet.</td></tr>
              ) : (
                candidates.map((c) => (
                  <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-slate-500">#{c.id}</td>
                    <td className="p-4 font-bold text-white">
                      {editingId === c.id ? (
                        <input type="text" className="bg-black/40 border border-white/20 rounded px-2 py-1 w-full" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                      ) : c.name}
                    </td>
                    <td className="p-4 text-slate-300">
                      {editingId === c.id ? (
                        <input type="date" className="bg-black/40 border border-white/20 rounded px-2 py-1 w-full" value={editForm.birth_date} onChange={e => setEditForm({...editForm, birth_date: e.target.value})} />
                      ) : c.birth_date}
                    </td>
                    <td className="p-4 text-slate-300">
                      {editingId === c.id ? (
                        <input type="time" className="bg-black/40 border border-white/20 rounded px-2 py-1 w-full" value={editForm.birth_time} onChange={e => setEditForm({...editForm, birth_time: e.target.value})} />
                      ) : c.birth_time}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-bold">{c.overall_score}</span>
                    </td>
                    <td className="p-4 text-right">
                      {editingId === c.id ? (
                        <div className="flex justify-end gap-2">
                          <button onClick={handleSaveEdit} className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/40"><Save className="w-4 h-4" /></button>
                          <button onClick={() => setEditingId(null)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40"><X className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          <button onClick={() => startEdit(c)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/40 transition-colors" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(c.id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40 transition-colors" title="Delete">
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
        )}
      </div>
    </div>
  );
}

export default CandidateVault;
