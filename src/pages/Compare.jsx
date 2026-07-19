import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaCalendarAlt, FaGasPump, FaCogs, FaTachometerAlt, FaBolt, FaCog } from 'react-icons/fa';
import { useCompare } from '../context/CompareContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const rows = [
  { key: 'image', label: '' },
  { key: 'brand', label: 'Marque / Modèle' },
  { key: 'price', label: 'Prix' },
  { key: 'year', label: 'Année' },
  { key: 'mileage', label: 'Kilométrage' },
  { key: 'fuel', label: 'Énergie' },
  { key: 'transmission', label: 'Boîte de vitesses' },
  { key: 'power', label: 'Puissance' },
  { key: 'engine', label: 'Moteur' },
  { key: 'contact', label: '' },
];

const rowIcons = {
  year: FaCalendarAlt,
  fuel: FaGasPump,
  transmission: FaCogs,
  mileage: FaTachometerAlt,
  power: FaBolt,
  engine: FaCog,
};

function getValue(car, key) {
  switch (key) {
    case 'brand': return `${car.brand} ${car.model}`;
    case 'price': return `${car.price.toLocaleString('fr-FR')} €`;
    case 'mileage': return `${car.mileage.toLocaleString('fr-FR')} km`;
    default: return car[key];
  }
}

function getBestValues(cars) {
  const best = {};
  const prices = cars.map(c => c.price);
  const mileages = cars.map(c => c.mileage);
  const years = cars.map(c => c.year);
  const powers = cars.map(c => parseInt(c.power));

  best.price = Math.min(...prices);
  best.mileage = Math.min(...mileages);
  best.year = Math.max(...years);
  best.power = Math.max(...powers);
  return best;
}

function isBest(car, key, bestValues) {
  if (key === 'price') return car.price === bestValues.price;
  if (key === 'mileage') return car.mileage === bestValues.mileage;
  if (key === 'year') return car.year === bestValues.year;
  if (key === 'power') return parseInt(car.power) === bestValues.power;
  return false;
}

export default function Compare() {
  const navigate = useNavigate();
  const { compareList, count, clearCompare } = useCompare();
  const [accordionOpen, setAccordionOpen] = useState(null);

  if (count < 2) {
    return (
      <div>
        <Header showSearch={false} />
        <div className="pt-32 pb-16 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-lg mb-4">
            Veuillez sélectionner au moins 2 véhicules à comparer.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent-hover transition-all cursor-pointer"
          >
            Retour au catalogue
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const bestValues = getBestValues(compareList);

  const renderDesktopView = () => (
    <div className="overflow-x-auto -mx-1 lg:mx-0">
      <div className="inline-flex min-w-full gap-4 px-1 lg:px-0 pb-4" style={{ minWidth: count === 2 ? '600px' : '800px' }}>
        <div className="w-36 lg:w-48 flex-shrink-0">
          {rows.map(row => {
            if (row.key === 'image') return <div key={row.key} className="h-48 lg:h-56 mb-3" />;
            if (row.key === 'contact') return <div key={row.key} className="h-14" />;
            const Icon = rowIcons[row.key];
            return (
              <div key={row.key} className="flex items-center gap-2 h-12 mb-3 bg-gray-50 dark:bg-dark-bg-alt rounded-xl px-4">
                {Icon && <Icon className="text-xs text-gray-400" />}
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {row.label}
                </span>
              </div>
            );
          })}
        </div>

        {compareList.map(car => (
          <div key={car.id} className="flex-1 min-w-0 max-w-sm">
            <div className="h-48 lg:h-56 mb-3 rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card">
              <img src={car.images[0]} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
            </div>

            {rows.slice(1).map(row => {
              if (row.key === 'contact') {
                return (
                  <div key={row.key} className="h-14 mb-3 flex items-center">
                    <button onClick={() => navigate('/contact')} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer">
                      <FaEnvelope /> Nous contacter
                    </button>
                  </div>
                );
              }

              const value = getValue(car, row.key);
              const best = isBest(car, row.key, bestValues);

              return (
                <div
                  key={row.key}
                  className={`flex items-center h-12 mb-3 rounded-xl px-4 text-sm font-medium border transition-colors ${
                    best
                      ? 'bg-accent/10 text-accent border-accent/20'
                      : 'bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text border-gray-100 dark:border-dark-border'
                  }`}
                >
                  <span className={`truncate ${best ? 'font-bold' : ''}`}>{value}</span>
                  {best && <span className="ml-auto text-[10px] font-bold text-accent flex-shrink-0">Meilleur</span>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  const renderAccordionView = () => (
    <div className="space-y-4 lg:hidden">
      {rows.filter(r => r.key !== 'image' && r.key !== 'contact').map(row => {
        const Icon = rowIcons[row.key];
        const values = compareList.map(car => ({
          car,
          value: getValue(car, row.key),
          best: isBest(car, row.key, bestValues),
        }));
        const allSame = values.every(v => v.value === values[0].value);

        return (
          <div key={row.key} className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border overflow-hidden">
            <button
              onClick={() => setAccordionOpen(accordionOpen === row.key ? null : row.key)}
              className="w-full flex items-center gap-2 min-h-[44px] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-dark-bg-alt hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors cursor-pointer"
            >
              {Icon && <Icon className="text-xs" />}
              <span className="flex-1">{row.label}</span>
              <svg className={`w-3 h-3 transition-transform flex-shrink-0 ${accordionOpen === row.key ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
            </button>
            {accordionOpen === row.key && (
              <div className="divide-y divide-gray-100 dark:divide-dark-border">
                {values.map((v, i) => (
                  <div key={v.car.id} className={`flex items-center justify-between px-4 min-h-[44px] py-2.5 text-sm ${v.best ? 'bg-accent/5' : ''}`}>
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <img src={v.car.images[0]} alt="" className="w-8 h-6 rounded object-cover flex-shrink-0" />
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{v.car.brand} {v.car.model}</span>
                    </div>
                    <span className={`font-medium ml-2 flex-shrink-0 ${v.best ? 'text-accent font-bold' : 'text-gray-900 dark:text-dark-text'}`}>
                      {v.value}
                      {v.best && <span className="ml-1.5 text-[10px] text-accent">(meilleur)</span>}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <Header showSearch={false} />
      <div className="pt-20 sm:pt-24 pb-28 sm:pb-24 px-1 lg:px-2 max-w-screen-2xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 px-2 sm:px-0">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-accent transition-colors cursor-pointer self-start">
            <FaArrowLeft /> Retour au catalogue
          </button>
          <button onClick={() => { clearCompare(); navigate('/'); }} className="text-sm text-gray-400 dark:text-gray-500 hover:text-accent px-4 py-2 rounded-full border border-dark-border hover:border-accent transition-all cursor-pointer self-start sm:self-auto">
            Effacer la sélection
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-dark-text mb-2 px-2 sm:px-0">Comparateur de véhicules</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 px-2 sm:px-0">{count} véhicules sélectionnés</p>

        <div className="hidden lg:block">{renderDesktopView()}</div>
        <div className="lg:hidden px-1">{renderAccordionView()}</div>
      </div>
      <Footer />
    </div>
  );
}
