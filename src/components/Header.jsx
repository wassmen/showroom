import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { brands } from '../data/cars';


export default function Header({
  searchQuery, onSearchChange,
  brandFilter, onBrandChange,
  priceMin, priceMax, onPriceChange,
  showSearch = true
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-dark-bg/95 backdrop-blur-md border-b border-gray-200 dark:border-dark-border transition-colors duration-300">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between h-16 px-2 lg:px-4 gap-4">
          <Link to="/" className="flex-shrink-0 pl-0 lg:pl-0 pr-8" onClick={closeMenu}>
            <div className="flex items-center justify-center bg-black/40 dark:bg-black/60 rounded-xl ring-1 ring-accent/50 p-1.5 drop-shadow-[0_0_10px_rgba(139,94,60,0.35)]">
              <img src="/746729992_18275557168293964_1498530892815492404_n.jpg" alt="Auto Showroom" className="h-12 w-auto hover:opacity-90 transition-all duration-300" />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Navigation principale">
            <Link to="/avis" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-dark-text py-2 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">
              Avis
            </Link>
            <Link to="/actualites" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-dark-text py-2 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">
              Actualités
            </Link>
            <Link to="/contact" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-dark-text py-2 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">
              Contact
            </Link>
            <div className="relative group">
              <Link to="/about" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-dark-text py-2 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">
                A propos
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 translate-y-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 min-w-[200px] p-2 z-50">
                <button onClick={() => navigate('/about#histoire')} className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-dark-text transition-colors cursor-pointer">
                  Notre histoire
                </button>
                <button onClick={() => navigate('/about#adresse')} className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-dark-text transition-colors cursor-pointer">
                  Adresse
                </button>
                <button onClick={() => navigate('/about#valeurs')} className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-dark-text transition-colors cursor-pointer">
                  Nos valeurs
                </button>
              </div>
            </div>

          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              aria-label="Menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {showSearch && (
          <div className="border-t border-gray-200 dark:border-dark-border bg-white/95 dark:bg-dark-bg/95 backdrop-blur-md">
            <div className="max-w-screen-2xl mx-auto px-2 lg:px-4 py-3">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery || ''}
                    onChange={e => onSearchChange(e.target.value)}
                    placeholder="Rechercher par marque, modele..."
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:border-accent focus:ring-3 focus:ring-accent/15 transition-all"
                    aria-label="Rechercher une voiture"
                  />
                </div>

                <div className="w-full md:w-44 relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  <select
                    value={brandFilter || ''}
                    onChange={e => onBrandChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-accent focus:ring-3 focus:ring-accent/15 transition-all appearance-none cursor-pointer"
                    aria-label="Filtrer par marque"
                  >
                    <option value="">Toutes les marques</option>
                    {brands.map(b => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full md:w-56">
                  <input
                    type="number"
                    value={priceMin || ''}
                    onChange={e => onPriceChange('min', e.target.value)}
                    placeholder="Prix min"
                    min={0}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-accent focus:ring-3 focus:ring-accent/15 transition-all"
                    aria-label="Prix minimum"
                  />
                  <span className="text-gray-400 dark:text-gray-500 text-sm flex-shrink-0">-</span>
                  <input
                    type="number"
                    value={priceMax || ''}
                    onChange={e => onPriceChange('max', e.target.value)}
                    placeholder="Prix max"
                    min={0}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-accent focus:ring-3 focus:ring-accent/15 transition-all"
                    aria-label="Prix maximum"
                  />
                </div>

                {(searchQuery || brandFilter || priceMin || priceMax) && (
                  <button
                    onClick={() => {
                      onSearchChange('');
                      onBrandChange('');
                      onPriceChange('min', '');
                      onPriceChange('max', '');
                    }}
                    className="flex-shrink-0 px-4 py-2.5 rounded-xl border border-accent text-accent text-sm font-semibold hover:bg-accent hover:text-white transition-all cursor-pointer"
                  >
                    Effacer
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg">
            <div className="px-2 lg:px-4 py-4 space-y-3">
              <Link to="/avis" onClick={closeMenu} className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Avis</Link>
              <Link to="/actualites" onClick={closeMenu} className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Actualités</Link>
              <Link to="/contact" onClick={closeMenu} className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Contact</Link>
              <div className="px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300">
                <Link to="/about" onClick={closeMenu} className="block font-semibold mb-2 hover:text-accent transition-colors">A propos</Link>
                <div className="ml-2 space-y-2">
                  <Link to="/about#histoire" onClick={closeMenu} className="block text-xs text-gray-500 dark:text-gray-400 hover:text-accent py-1.5 transition-colors">Notre histoire</Link>
                  <Link to="/about#adresse" onClick={closeMenu} className="block text-xs text-gray-500 dark:text-gray-400 hover:text-accent py-1.5 transition-colors">Adresse</Link>
                  <Link to="/about#valeurs" onClick={closeMenu} className="block text-xs text-gray-500 dark:text-gray-400 hover:text-accent py-1.5 transition-colors">Nos valeurs</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>


    </>
  );
}
