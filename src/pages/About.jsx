import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const STORAGE_KEY = 'autoshowroom_about';

const defaults = {
  histoire: 'Fondé en 2010, Auto Showroom est le leader de la vente de véhicules premium en Algérie. Nous sélectionnons rigoureusement chaque véhicule pour garantir qualité et fiabilité à nos clients. Notre showroom situé au cœur d\'Alger vous accueille 7 jours sur 7.',
  adresse: '123 Rue Didouche Mourad\n16000 Alger, Algérie',
  valeurs: ['Transparence totale', 'Qualité garantie', 'Service client premium', 'Prix compétitifs', 'Financement flexible'],
};

export default function About() {
  const navigate = useNavigate();
  const [histoire, setHistoire] = useState('');
  const [adresse, setAdresse] = useState('');
  const [valeurs, setValeurs] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (stored) {
        setHistoire(stored.histoire || defaults.histoire);
        setAdresse(stored.adresse || defaults.adresse);
        setValeurs(stored.valeurs || defaults.valeurs);
      } else {
        setHistoire(defaults.histoire);
        setAdresse(defaults.adresse);
        setValeurs(defaults.valeurs);
      }
    } catch {
      setHistoire(defaults.histoire);
      setAdresse(defaults.adresse);
      setValeurs(defaults.valeurs);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ histoire, adresse, valeurs }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addValeur = () => setValeurs([...valeurs, '']);
  const updateValeur = (i, v) => {
    const next = [...valeurs];
    next[i] = v;
    setValeurs(next);
  };
  const removeValeur = (i) => setValeurs(valeurs.filter((_, idx) => idx !== i));

  return (
    <div>
      <Header showSearch={false} />
      <main className="pt-24 pb-16 px-1 lg:px-2 max-w-3xl mx-auto">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-dark-text mb-6 transition-colors cursor-pointer">
          <FaArrowLeft className="text-xs" /> Retour
        </button>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-dark-text">Gestion A propos</h1>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-accent text-white hover:bg-accent-hover transition-all cursor-pointer"
          >
            <FaSave /> {saved ? 'Enregistre !' : 'Enregistrer'}
          </button>
        </div>

        <div id="histoire" className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-dark-border shadow-sm mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-4">Notre Histoire</h2>
          <textarea
            value={histoire}
            onChange={e => setHistoire(e.target.value)}
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:border-accent focus:ring-3 focus:ring-accent/12 transition-all resize-y"
          />
        </div>

        <div id="adresse" className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-dark-border shadow-sm mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-4">Adresse</h2>
          <textarea
            value={adresse}
            onChange={e => setAdresse(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:border-accent focus:ring-3 focus:ring-accent/12 transition-all resize-y"
          />
        </div>

        <div id="valeurs" className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-dark-border shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text">Nos Valeurs</h2>
            <button onClick={addValeur} className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover font-semibold transition-colors cursor-pointer">
              <FaPlus /> Ajouter
            </button>
          </div>
          <div className="space-y-3">
            {valeurs.map((v, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  value={v}
                  onChange={e => updateValeur(i, e.target.value)}
                  placeholder="Valeur..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:border-accent focus:ring-3 focus:ring-accent/12 transition-all"
                />
                <button onClick={() => removeValeur(i)} className="text-red-400 hover:text-red-600 transition-colors cursor-pointer p-2" aria-label="Supprimer">
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pb-8">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-accent text-white hover:bg-accent-hover transition-all cursor-pointer text-lg"
          >
            <FaSave /> {saved ? 'Enregistre !' : 'Enregistrer les modifications'}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
