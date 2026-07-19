import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaCheck, FaTimes } from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from './AdminLayout';

function ConfirmModal({ show, title, message, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={onCancel}>
      <div className="bg-dark-card rounded-2xl border border-dark-border p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-dark-text mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-dark-border text-sm font-medium text-gray-300 hover:bg-dark-bg transition-all cursor-pointer">Annuler</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all cursor-pointer">Supprimer</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminCars() {
  const navigate = useNavigate();
  const { cars, updateCar, deleteCar } = useAdmin();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingPrice, setEditingPrice] = useState(null);
  const [priceValue, setPriceValue] = useState('');

  const filtered = cars.filter(c => {
    const matchSearch = !search || `${c.brand} ${c.model}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleQuickPrice = (car) => {
    setEditingPrice(car.id);
    setPriceValue(String(car.price));
  };

  const savePrice = (id) => {
    const num = Number(priceValue);
    if (!isNaN(num) && num > 0) {
      updateCar(id, { price: num });
    }
    setEditingPrice(null);
  };

  const statusColors = {
    'disponible': 'bg-success/15 text-success border-success/20',
    'réservée': 'bg-warning/15 text-warning border-warning/20',
    'vendue': 'bg-blue-400/15 text-blue-400 border-blue-400/20',
  };

  return (
    <AdminLayout>
      <ConfirmModal
        show={!!deleteTarget}
        title="Supprimer cette voiture ?"
        message={`Es-tu sûr de vouloir supprimer ${deleteTarget?.brand} ${deleteTarget?.model} ? Cette action est irréversible.`}
        onConfirm={() => { deleteCar(deleteTarget.id); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-dark-text">Stock / Voitures</h1>
          <p className="text-sm text-gray-400 mt-1">{cars.length} véhicules au total</p>
        </div>
        <button onClick={() => navigate('/admin/cars/new')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-all cursor-pointer">
          <FaPlus size={12} /> Ajouter
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={13} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par marque ou modèle…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all placeholder:text-gray-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="w-full sm:w-44 px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all appearance-none cursor-pointer"
        >
          <option value="">Tous les statuts</option>
          <option value="disponible">Disponible</option>
          <option value="réservée">Réservée</option>
          <option value="vendue">Vendue</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-base">Aucun véhicule trouvé.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(car => (
            <div key={car.id} className="bg-dark-card rounded-2xl border border-dark-border p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:border-accent/30 transition-all">
              <img src={car.images[0]} alt={car.model} className="w-14 h-10 sm:w-16 sm:h-12 rounded-xl object-cover flex-shrink-0" />

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-dark-text truncate">{car.brand} {car.model}</p>
                <p className="text-xs text-gray-500 truncate">{car.year} · {car.mileage.toLocaleString('fr-FR')} km · {car.fuel}</p>
              </div>

              <div className="hidden sm:block">
                {editingPrice === car.id ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={priceValue}
                      onChange={e => setPriceValue(e.target.value)}
                      className="w-24 px-2 py-1 rounded-lg bg-dark-bg border border-accent text-dark-text text-sm outline-none"
                      autoFocus
                      onKeyDown={e => { if (e.key === 'Enter') savePrice(car.id); if (e.key === 'Escape') setEditingPrice(null); }}
                    />
                    <button onClick={() => savePrice(car.id)} className="text-success hover:text-success/80 cursor-pointer p-1"><FaCheck size={12} /></button>
                    <button onClick={() => setEditingPrice(null)} className="text-gray-500 hover:text-gray-300 cursor-pointer p-1"><FaTimes size={12} /></button>
                  </div>
                ) : (
                  <button onClick={() => handleQuickPrice(car)} className="text-sm font-extrabold text-accent hover:underline cursor-pointer">
                    {car.price.toLocaleString('fr-FR')} €
                  </button>
                )}
              </div>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 hidden sm:inline ${statusColors[car.status] || statusColors['disponible']}`}>
                {car.status || 'disponible'}
              </span>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => navigate(`/admin/cars/${car.id}/edit`)} className="w-8 h-8 rounded-lg bg-dark-bg border border-dark-border flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition-all cursor-pointer" title="Modifier">
                  <FaEdit size={13} />
                </button>
                <button onClick={() => setDeleteTarget(car)} className="w-8 h-8 rounded-lg bg-dark-bg border border-dark-border flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-all cursor-pointer" title="Supprimer">
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
