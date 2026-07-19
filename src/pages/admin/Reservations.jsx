import { useState } from 'react';
import { FaCheck, FaTimes, FaUndo, FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from './AdminLayout';

const statusList = ['en attente', 'confirmée', 'terminée', 'annulée'];

const statusColors = {
  'en attente': 'bg-warning/15 text-warning border-warning/20',
  'confirmée': 'bg-success/15 text-success border-success/20',
  'terminée': 'bg-blue-400/15 text-blue-400 border-blue-400/20',
  'annulée': 'bg-red-400/15 text-red-400 border-red-400/20',
};

const emptyForm = { customer: '', email: '', phone: '', carId: '', carName: '' };

export default function AdminReservations() {
  const { reservations, cars, addReservation, updateReservation, updateReservationStatus, deleteReservation } = useAdmin();
  const [filter, setFilter] = useState('');
  const [editModal, setEditModal] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = filter ? reservations.filter(r => r.status === filter) : reservations;

  const statusLabel = { 'en attente': 'En attente', 'confirmée': 'Confirmée', 'terminée': 'Terminée', 'annulée': 'Annulée' };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-dark-text">Réservations</h1>
          <p className="text-sm text-gray-400 mt-1">{reservations.length} réservation{reservations.length > 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { setForm(emptyForm); setEditModal('add'); }} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-all cursor-pointer">
            <FaPlus size={12} /> Nouvelle
          </button>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="w-40 px-3 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all appearance-none cursor-pointer">
            <option value="">Tous les statuts</option>
            {statusList.map(s => <option key={s} value={s}>{statusLabel[s]}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-base">Aucune réservation trouvée.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(r => (
            <div key={r.id} className="bg-dark-card rounded-2xl border border-dark-border p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-dark-text">{r.customer}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{r.carName}</p>
                  <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-500">
                    <span>{r.email}</span>
                    <span>{r.phone}</span>
                    <span>Le {new Date(r.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border self-start sm:self-center ${statusColors[r.status] || ''}`}>
                  {statusLabel[r.status]}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-dark-border">
                {r.status !== 'confirmée' && (
                  <button onClick={() => updateReservationStatus(r.id, 'confirmée')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success/15 text-success text-xs font-semibold hover:bg-success/25 transition-all cursor-pointer">
                    <FaCheck size={10} /> Confirmer
                  </button>
                )}
                {r.status !== 'terminée' && (
                  <button onClick={() => updateReservationStatus(r.id, 'terminée')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-400/15 text-blue-400 text-xs font-semibold hover:bg-blue-400/25 transition-all cursor-pointer">
                    <FaCheck size={10} /> Terminer
                  </button>
                )}
                {r.status !== 'annulée' && (
                  <button onClick={() => updateReservationStatus(r.id, 'annulée')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-400/15 text-red-400 text-xs font-semibold hover:bg-red-400/25 transition-all cursor-pointer">
                    <FaTimes size={10} /> Annuler
                  </button>
                )}
                {r.status === 'annulée' && (
                  <button onClick={() => updateReservationStatus(r.id, 'en attente')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-warning/15 text-warning text-xs font-semibold hover:bg-warning/25 transition-all cursor-pointer">
                    <FaUndo size={10} /> Remettre en attente
                  </button>
                )}
                <div className="ml-auto flex items-center gap-2">
                  <button onClick={() => { setForm({ customer: r.customer, email: r.email, phone: r.phone, carId: r.carId, carName: r.carName }); setEditModal(r.id); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/15 text-accent text-xs font-semibold hover:bg-accent/25 transition-all cursor-pointer">
                    <FaEdit size={10} /> Modifier
                  </button>
                  <button onClick={() => setDeleteId(r.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-400/15 text-red-400 text-xs font-semibold hover:bg-red-400/25 transition-all cursor-pointer">
                    <FaTrash size={10} /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {editModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setEditModal(null)}>
          <div className="bg-dark-card rounded-2xl border border-dark-border w-full max-w-lg p-6 sm:p-8" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-dark-text mb-6">{editModal === 'add' ? 'Nouvelle réservation' : 'Modifier la réservation'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-medium">Client</label>
                <input type="text" value={form.customer} onChange={e => setForm(p => ({ ...p, customer: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">Téléphone</label>
                  <input type="text" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-medium">Véhicule</label>
                <select value={form.carId} onChange={e => { const c = cars.find(x => x.id === Number(e.target.value)); setForm(p => ({ ...p, carId: Number(e.target.value), carName: c ? c.name : '' })); }} className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all appearance-none cursor-pointer">
                  <option value="">Sélectionner un véhicule</option>
                  {cars.map(c => <option key={c.id} value={c.id}>{c.name} ({c.brand})</option>)}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-8 pt-4 border-t border-dark-border">
              <button onClick={() => setEditModal(null)} className="flex-1 px-4 py-2.5 rounded-xl bg-dark-bg text-dark-text text-sm font-semibold border border-dark-border hover:bg-dark-border transition-all cursor-pointer">Annuler</button>
              <button onClick={() => {
                if (!form.customer || !form.email || !form.phone || !form.carId) return;
                if (editModal === 'add') {
                  addReservation(form);
                } else {
                  updateReservation(editModal, form);
                }
                setEditModal(null);
              }} className="flex-1 px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-all cursor-pointer">
                {editModal === 'add' ? 'Ajouter' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setDeleteId(null)}>
          <div className="bg-dark-card rounded-2xl border border-dark-border w-full max-w-sm p-6 sm:p-8 text-center" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full bg-red-400/15 flex items-center justify-center mx-auto mb-4">
              <FaTrash className="text-red-400" size={16} />
            </div>
            <h2 className="text-lg font-bold text-dark-text mb-2">Supprimer cette réservation ?</h2>
            <p className="text-sm text-gray-400 mb-6">Cette action est irréversible.</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2.5 rounded-xl bg-dark-bg text-dark-text text-sm font-semibold border border-dark-border hover:bg-dark-border transition-all cursor-pointer">Annuler</button>
              <button onClick={() => { deleteReservation(deleteId); setDeleteId(null); }} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all cursor-pointer">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
