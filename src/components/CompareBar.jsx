import { useNavigate, useLocation } from 'react-router-dom';
import { FaTimes, FaBalanceScale } from 'react-icons/fa';
import { useCompare } from '../context/CompareContext';

export default function CompareBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { compareList, removeFromCompare, clearCompare, count } = useCompare();

  if (count < 1 || location.pathname === '/compare') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark-card/95 backdrop-blur-md border-t border-dark-border shadow-2xl transition-all duration-300 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0 overflow-x-auto scrollbar-none">
          {compareList.map(car => (
            <div key={car.id} className="flex items-center gap-1.5 sm:gap-2 bg-dark-bg/60 rounded-lg px-1.5 sm:px-2 py-1.5 border border-dark-border flex-shrink-0">
              <img
                src={car.images[0]}
                alt={`${car.brand} ${car.model}`}
                className="w-8 sm:w-10 h-6 sm:h-8 object-cover rounded flex-shrink-0"
              />
              <span className="text-[11px] sm:text-xs text-dark-text font-medium truncate max-w-[60px] sm:max-w-[100px]">
                {car.brand}
              </span>
              <button
                onClick={() => removeFromCompare(car.id)}
                className="text-gray-500 hover:text-accent transition-colors cursor-pointer flex-shrink-0 p-0.5"
                aria-label={`Retirer ${car.brand} ${car.model}`}
              >
                <FaTimes size={9} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <button
            onClick={clearCompare}
            className="text-[11px] sm:text-xs text-gray-400 hover:text-dark-text px-2 sm:px-3 py-2 rounded-full border border-dark-border hover:border-gray-500 transition-all cursor-pointer"
          >
            Effacer
          </button>
          <button
            onClick={() => navigate('/compare')}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-accent text-white text-[11px] sm:text-sm font-semibold hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            disabled={count < 2}
          >
            <FaBalanceScale size={12} />
            <span className="hidden xs:inline">Comparer</span> ({count})
          </button>
        </div>
      </div>
    </div>
  );
}
