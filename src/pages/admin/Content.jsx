import { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from './AdminLayout';

export default function AdminContent() {
  const { content, updateContent } = useAdmin();
  const [form, setForm] = useState({ ...content });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateContent(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-extrabold text-dark-text mb-2">Contenu du site</h1>
      <p className="text-sm text-gray-400 mb-6">Modifiez les informations affichées sur le site vitrine.</p>

      {saved && (
        <div className="bg-success/10 border border-success/20 text-success text-sm rounded-xl px-4 py-3 mb-4">
          Informations enregistrées avec succès.
        </div>
      )}

      <div className="bg-dark-card rounded-2xl border border-dark-border p-5 sm:p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Email de contact</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Téléphone</label>
          <input
            type="text"
            value={form.phone}
            onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Adresse</label>
          <input
            type="text"
            value={form.address}
            onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Ville / Code postal</label>
          <input
            type="text"
            value={form.city}
            onChange={e => setForm(prev => ({ ...prev, city: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Latitude (GPS)</label>
            <input
              type="number" step="any"
              value={form.gps.lat}
              onChange={e => setForm(prev => ({ ...prev, gps: { ...prev.gps, lat: Number(e.target.value) } }))}
              className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Longitude (GPS)</label>
            <input
              type="number" step="any"
              value={form.gps.lng}
              onChange={e => setForm(prev => ({ ...prev, gps: { ...prev.gps, lng: Number(e.target.value) } }))}
              className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
            />
          </div>
        </div>

        <div className="pt-2">
          <button onClick={handleSave} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-all cursor-pointer">
            <FaSave size={13} /> Enregistrer
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
