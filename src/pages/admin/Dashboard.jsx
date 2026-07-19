import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaCheckCircle, FaTag, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from './AdminLayout';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { stats, cars } = useAdmin();
  const [openId, setOpenId] = useState(null);

  const statCards = [
    { label: 'Total en stock', value: stats.total, icon: FaCar, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Disponibles', value: stats.disponibles, icon: FaCheckCircle, color: 'text-success', bg: 'bg-success/10' },
    { label: 'Vendues', value: stats.vendues, icon: FaTag, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  ];

  const soldCars = cars.filter(c => c.status === 'vendue');

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-dark-text">Tableau de bord</h1>
          <p className="text-sm text-gray-400 mt-1">Bienvenue dans votre espace d'administration</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
        {statCards.map(card => (
          <div key={card.label} className="bg-dark-card rounded-2xl border border-dark-border p-6 sm:p-8 hover:border-accent/30 transition-all">
            <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mb-4`}>
              <card.icon className={card.color} size={22} />
            </div>
            <p className="text-4xl sm:text-5xl font-extrabold text-dark-text">{card.value}</p>
            <p className="text-sm sm:text-base text-gray-400 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-card rounded-2xl border border-dark-border p-5">
          <h2 className="text-sm font-bold text-dark-text mb-4">Dernières ventes</h2>
          {soldCars.length === 0 ? (
            <p className="text-sm text-gray-500">Aucune voiture vendue pour le moment.</p>
          ) : (
            <div className="space-y-1">
              {soldCars.map(car => (
                <div key={car.id}>
                  <button
                    onClick={() => setOpenId(openId === car.id ? null : car.id)}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-dark-bg transition-all cursor-pointer text-left"
                  >
                    <span className="text-sm font-medium text-dark-text">{car.brand} {car.model}</span>
                    {openId === car.id ? <FaChevronUp className="text-gray-500 flex-shrink-0" size={11} /> : <FaChevronDown className="text-gray-500 flex-shrink-0" size={11} />}
                  </button>
                  {openId === car.id && (
                    <div className="flex items-center justify-between px-3 py-2 mb-1 bg-dark-bg rounded-xl text-sm ml-2">
                      <span className="text-gray-400">ID <span className="text-dark-text font-medium">{car.id}</span></span>
                      <span className="text-accent font-extrabold">{car.price.toLocaleString('fr-FR')} €</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-dark-card rounded-2xl border border-dark-border p-5">
          <h2 className="text-sm font-bold text-dark-text mb-4">Actions rapides</h2>
          <div className="space-y-2">
            <button onClick={() => navigate('/admin/cars')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-dark-bg hover:bg-accent/10 text-gray-300 hover:text-accent transition-all text-sm cursor-pointer text-left">
              <FaCar size={12} className="flex-shrink-0" /> Modifier le stock
            </button>
            <button onClick={() => navigate('/admin/content')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-dark-bg hover:bg-accent/10 text-gray-300 hover:text-accent transition-all text-sm cursor-pointer text-left">
              <FaTag size={12} className="flex-shrink-0" /> Modifier les informations du site
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
