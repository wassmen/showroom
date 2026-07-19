import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaPlus, FaTimes } from 'react-icons/fa';
import { brands } from '../../data/cars';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from './AdminLayout';

const fuelOptions = ['Essence', 'Diesel', 'Hybride', 'Électrique'];
const transmissionOptions = ['Automatique', 'Manuelle', 'DSG 7 vitesses', 'Automatique 8 vitesses', 'Automatique 9G-TRONIC', 'Automatique 6 vitesses', 'Automatique 10 vitesses'];
const statusOptions = ['disponible', 'réservée', 'vendue'];

export default function AdminCarForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars, addCar, updateCar } = useAdmin();
  const isEdit = !!id;
  const existing = isEdit ? cars.find(c => c.id === Number(id)) : null;

  const [form, setForm] = useState({
    brand: '', model: '', year: new Date().getFullYear(), mileage: '', fuel: 'Essence',
    transmission: 'Automatique', power: '', engine: '', price: '', status: 'disponible',
    description: '', images: [''],
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (existing) {
      setForm({
        brand: existing.brand, model: existing.model, year: existing.year,
        mileage: existing.mileage, fuel: existing.fuel, transmission: existing.transmission,
        power: existing.power, engine: existing.engine, price: existing.price,
        status: existing.status || 'disponible', description: existing.description || '',
        images: existing.images?.length ? [...existing.images] : [''],
      });
    }
  }, [existing]);

  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const addImage = () => setForm(prev => ({ ...prev, images: [...prev.images, ''] }));
  const removeImage = (i) => setForm(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }));
  const setImage = (i, val) => setForm(prev => {
    const imgs = [...prev.images];
    imgs[i] = val;
    return { ...prev, images: imgs };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.brand || !form.model || !form.price || !form.mileage) {
      setError('Merci de remplir tous les champs obligatoires.');
      return;
    }

    const data = {
      ...form,
      year: Number(form.year),
      mileage: Number(form.mileage),
      price: Number(form.price),
      images: form.images.filter(Boolean),
    };

    if (isEdit) {
      updateCar(Number(id), data);
      setSuccess('Voiture modifiée avec succès.');
    } else {
      addCar(data);
      setSuccess('Voiture ajoutée avec succès.');
      setForm({ brand: '', model: '', year: new Date().getFullYear(), mileage: '', fuel: 'Essence', transmission: 'Automatique', power: '', engine: '', price: '', status: 'disponible', description: '', images: [''] });
    }
  };

  const filteredModels = brands.find(b => b.name === form.brand)?.models || [];

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <button onClick={() => navigate('/admin/cars')} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-dark-text mb-4 transition-colors cursor-pointer">
          <FaArrowLeft size={11} /> Retour au stock
        </button>

        <h1 className="text-2xl font-extrabold text-dark-text mb-6">{isEdit ? 'Modifier la voiture' : 'Ajouter une voiture'}</h1>

        {success && <div className="bg-success/10 border border-success/20 text-success text-sm rounded-xl px-4 py-3 mb-4">{success}</div>}
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Marque *</label>
              <select value={form.brand} onChange={e => set('brand', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all appearance-none cursor-pointer">
                <option value="">Sélectionner…</option>
                {brands.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Modèle *</label>
              <input list="models" value={form.model} onChange={e => set('model', e.target.value)} placeholder="Ex: X5 M60i" className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all placeholder:text-gray-500" />
              <datalist id="models">
                {filteredModels.map(m => <option key={m} value={m} />)}
              </datalist>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Année *</label>
              <input type="number" value={form.year} onChange={e => set('year', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Kilométrage *</label>
              <input type="number" value={form.mileage} onChange={e => set('mileage', e.target.value)} placeholder="Ex: 12000" className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all placeholder:text-gray-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Prix *</label>
              <input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="Ex: 95000" className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all placeholder:text-gray-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Énergie</label>
              <select value={form.fuel} onChange={e => set('fuel', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all appearance-none cursor-pointer">
                {fuelOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Boîte de vitesses</label>
              <select value={form.transmission} onChange={e => set('transmission', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all appearance-none cursor-pointer">
                {transmissionOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Puissance</label>
              <input value={form.power} onChange={e => set('power', e.target.value)} placeholder="Ex: 530 CH" className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all placeholder:text-gray-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">Moteur</label>
              <input value={form.engine} onChange={e => set('engine', e.target.value)} placeholder="Ex: V8 4.4L TwinPower Turbo" className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all placeholder:text-gray-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Statut</label>
              <select value={form.status} onChange={e => set('status', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all appearance-none cursor-pointer">
                {statusOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all placeholder:text-gray-500 resize-none" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-400">Images (URL)</label>
              <button type="button" onClick={addImage} className="text-xs text-accent hover:underline flex items-center gap-1 cursor-pointer"><FaPlus size={9} /> Ajouter</button>
            </div>
            <div className="space-y-2">
              {form.images.map((img, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input value={img} onChange={e => setImage(i, e.target.value)} placeholder="/images.jfif" className="flex-1 px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all placeholder:text-gray-500" />
                  {form.images.length > 1 && (
                    <button type="button" onClick={() => removeImage(i)} className="text-gray-500 hover:text-red-400 cursor-pointer p-2"><FaTimes size={12} /></button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-all cursor-pointer">
              <FaSave size={13} /> {isEdit ? 'Enregistrer les modifications' : 'Ajouter la voiture'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
