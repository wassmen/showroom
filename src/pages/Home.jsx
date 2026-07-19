import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import { cars } from '../data/cars';
import { articles } from '../data/articles';
import CarCard from '../components/CarCard';
import ArticleCard from '../components/ArticleCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const handlePriceChange = (type, value) => {
    if (type === 'min') setPriceMin(value);
    else setPriceMax(value);
  };

  const filtered = useMemo(() => {
    return cars.filter(c => {
      const matchSearch = !searchQuery ||
        c.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.model.toLowerCase().includes(searchQuery.toLowerCase());
      const matchBrand = !brandFilter || c.brand === brandFilter;
      const matchPriceMin = !priceMin || c.price >= Number(priceMin);
      const matchPriceMax = !priceMax || c.price <= Number(priceMax);
      return matchSearch && matchBrand && matchPriceMin && matchPriceMax;
    });
  }, [searchQuery, brandFilter, priceMin, priceMax]);

  const hasFilters = searchQuery || brandFilter || priceMin || priceMax;
  const featured = cars.filter(c => c.featured);
  const remaining = filtered.filter(c => !c.featured);

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        brandFilter={brandFilter}
        onBrandChange={setBrandFilter}
        priceMin={priceMin}
        priceMax={priceMax}
        onPriceChange={handlePriceChange}
      />

      {hasFilters && filtered.length === 0 && (
        <div className="pt-32 pb-16 text-center text-gray-400 dark:text-gray-500">
          Aucun resultat trouve.
        </div>
      )}
      {hasFilters && filtered.length > 0 && (
        <div className="px-1 lg:px-2 pt-32 pb-8 max-w-screen-2xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-dark-text">Resultats de recherche</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(car => (
              <CarCard key={car.id} car={car} className="animate-fade-in" />
            ))}
          </div>
        </div>
      )}

      {!hasFilters && <HeroSection featured={featured} />}

      {!hasFilters && (
        <section className="px-1 lg:px-2 pb-8 max-w-screen-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-dark-text animate-fade-in">Meilleures offres</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8 animate-fade-in">Nos vehicules en promotion avec les meilleurs prix</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map(car => (
              <CarCard key={car.id} car={car} className="animate-fade-in" />
            ))}
          </div>
        </section>
      )}

      {!hasFilters && (
        <section className="px-1 lg:px-2 pb-16 max-w-screen-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-dark-text animate-fade-in">Tous nos vehicules</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8 animate-fade-in">Decouvrez notre selection complete</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {remaining.map(car => (
              <CarCard key={car.id} car={car} className="animate-fade-in" />
            ))}
          </div>
        </section>
      )}

      {!hasFilters && (
        <section className="px-1 lg:px-2 pb-16 max-w-screen-2xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-dark-text animate-fade-in">Actualités</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 animate-fade-in">Suivez toute l'actualité automobile</p>
            </div>
            <button onClick={() => navigate('/actualites')} className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all cursor-pointer">
              Voir tous les articles <FaArrowRight size={11} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 3).map(article => (
              <ArticleCard key={article.id} article={article} className="animate-fade-in" />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <button onClick={() => navigate('/actualites')} className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-accent text-accent text-sm font-semibold hover:bg-accent hover:text-white transition-all cursor-pointer">
              Voir tous les articles <FaArrowRight size={11} />
            </button>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

function HeroSection({ featured }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const car = featured[current];

  const next = useCallback(() => setCurrent(c => (c + 1) % featured.length), [featured.length]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + featured.length) % featured.length), [featured.length]);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  if (!car) return null;

  return (
    <section className="pt-32 pb-16 px-1 lg:px-2 max-w-screen-2xl mx-auto" aria-label="Vehicules en vedette">
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 items-stretch">
        <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[16/9] group">
          <div className="flex h-full transition-transform duration-600 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}>
            {featured.map((c, i) => (
              <div key={c.id} className="min-w-full h-full relative flex-shrink-0">
                <img src={c.images[0]} alt={`${c.brand} ${c.model}`} className="w-full h-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
                <div className="absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg z-10">
                  {c.price.toLocaleString('fr-FR')} €
                  {c.originalPrice && <small className="font-normal text-xs opacity-80 ml-1">au lieu de {c.originalPrice.toLocaleString('fr-FR')} €</small>}
                </div>
              </div>
            ))}
          </div>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-gray-700 flex items-center justify-center text-xl shadow-md opacity-0 group-hover:opacity-100 hover:bg-accent hover:text-white hover:scale-110 transition-all z-10 cursor-pointer" aria-label="Image precedente"><FaChevronLeft /></button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-gray-700 flex items-center justify-center text-xl shadow-md opacity-0 group-hover:opacity-100 hover:bg-accent hover:text-white hover:scale-110 transition-all z-10 cursor-pointer" aria-label="Image suivante"><FaChevronRight /></button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {featured.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${i === current ? 'bg-white scale-125 border-2 border-white' : 'bg-white/50 border-2 border-white/30'}`}
                aria-label={`Voir voiture ${i + 1}`} />
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-2xl p-7 border border-gray-200 dark:border-dark-border shadow-sm flex flex-col">
          <div className="mb-5">
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-dark-text">{car.brand}</h3>
            <p className="text-gray-500 dark:text-gray-400">{car.model}</p>
            <p className="text-3xl font-extrabold text-accent mt-2">{car.price.toLocaleString('fr-FR')} €</p>
            {car.originalPrice && <p className="text-gray-400 dark:text-gray-500 line-through">{car.originalPrice.toLocaleString('fr-FR')} €</p>}
          </div>
          <div className="grid grid-cols-2 gap-3 flex-1">
            {[
              ['Annee', car.year],
              ['Kilometrage', `${car.mileage.toLocaleString('fr-FR')} km`],
              ['Energie', car.fuel],
              ['Boite', car.transmission],
              ['Puissance', car.power],
              ['Moteur', car.engine],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold">{label}</p>
                <p className="text-sm font-medium text-gray-900 dark:text-dark-text">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={() => navigate(`/car/${car.id}`)} className="flex-1 px-6 py-3 rounded-full font-semibold text-sm bg-transparent text-gray-900 dark:text-dark-text border-2 border-gray-200 dark:border-dark-border hover:border-accent hover:text-accent transition-all cursor-pointer">Details</button>
            <button onClick={() => navigate('/contact')} className="flex-1 px-6 py-3 rounded-full font-semibold text-sm bg-accent text-white hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer">Nous contacter</button>
          </div>
        </div>
      </div>
    </section>
  );
}
