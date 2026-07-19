import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaGasPump, FaCogs, FaCheck } from 'react-icons/fa';
import { useCompare } from '../context/CompareContext';

const badgeStyles = {
  'Promotion': 'bg-accent text-white',
  'Nouveau': 'bg-success text-white',
  'Meilleure vente': 'bg-warning text-white',
};

export default function CarCard({ car, className = '' }) {
  const navigate = useNavigate();
  const { toggleCompare, isInCompare, isMaxed } = useCompare();
  const selected = isInCompare(car.id);

  return (
    <div
      className={`group bg-white dark:bg-dark-card rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${className} ${
        selected
          ? 'border-accent shadow-lg shadow-accent/10'
          : 'border-gray-200 dark:border-dark-border shadow-sm hover:shadow-xl hover:-translate-y-1.5'
      }`}
    >
      <div className="relative overflow-hidden">
        <div onClick={() => navigate(`/car/${car.id}`)}>
          <img src={car.images[0]} alt={`${car.brand} ${car.model}`} className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        </div>
        {car.badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${badgeStyles[car.badge] || 'bg-accent text-white'}`}>
            {car.badge}
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); toggleCompare(car.id); }}
          disabled={!selected && isMaxed}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
            selected
              ? 'bg-accent text-white shadow-md'
              : 'bg-white/80 dark:bg-dark-bg/80 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-dark-border hover:bg-accent hover:text-white hover:border-accent'
          }`}
          aria-label={selected ? 'Retirer de la comparaison' : 'Ajouter à la comparaison'}
        >
          {selected ? <FaCheck size={12} /> : <span className="text-xs font-bold">+</span>}
        </button>
      </div>
      <div onClick={() => navigate(`/car/${car.id}`)} className="p-5">
        <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold">{car.brand}</p>
        <h3 className="text-lg font-bold mt-1 mb-2 text-gray-900 dark:text-dark-text">{car.model}</h3>
        <div>
          <span className="text-xl font-extrabold text-accent">{car.price.toLocaleString('fr-FR')} €</span>
          {car.originalPrice && <span className="text-sm text-gray-400 line-through ml-2">{car.originalPrice.toLocaleString('fr-FR')} €</span>}
        </div>
        <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100 dark:border-dark-border text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1"><FaCalendarAlt className="text-xs" /> {car.year}</span>
          <span className="flex items-center gap-1"><FaGasPump className="text-xs" /> {car.fuel}</span>
          <span className="flex items-center gap-1"><FaCogs className="text-xs" /> {car.transmission.split(' ')[0]}</span>
        </div>
      </div>
    </div>
  );
}
