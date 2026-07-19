import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaArrowLeft, FaTrash } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const STORAGE_KEY = 'autoshowroom_avis';

const defaults = [
  { name: 'Karim B.', note: 5, comment: 'Excellent service ! J\'ai achete ma BMW X5 chez eux, le conseiller etait tres professionnel et m\'a accompagne jusqu\'a la livraison. Je recommande vivement.', date: '2024-03-15' },
  { name: 'Sarah M.', note: 5, comment: 'Showroom magnifique avec un large choix de vehicules. J\'ai trouve la voiture de mes reves a un prix imbattable. Merci a toute l\'equipe !', date: '2024-04-02' },
  { name: 'Mohamed L.', note: 4, comment: 'Tres bonne experience globale. Le personnel est a l\'ecoute et les vehicules sont de qualite. Seul petit bemol : le delai de livraison un peu long.', date: '2024-05-20' },
  { name: 'Fatima Z.', note: 5, comment: 'Un grand merci a Auto Showroom pour leur professionnalisme. J\'ai ete conseillee au mieux pour choisir le vehicule adapte a mes besoins.', date: '2024-06-10' },
  { name: 'Amine K.', note: 4, comment: 'Rapport qualite-prix excellent. Le showroom est bien agence et l\'equipe commerciale est sympathique et sans pression.', date: '2024-07-05' },
  { name: 'Nadia R.', note: 5, comment: 'Je suis ravie de mon achat ! Procedure simple et rapide. Je reviendrai sans hesiter pour mon prochain vehicule.', date: '2024-08-18' },
];

function Etoiles({ note }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <FaStar key={i} className={i <= note ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} />
      ))}
    </div>
  );
}

export default function Avis() {
  const navigate = useNavigate();
  const [avis, setAvis] = useState([]);
  const [form, setForm] = useState({ name: '', note: 5, comment: '' });

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      setAvis(stored && stored.length ? stored : defaults);
    } catch {
      setAvis(defaults);
    }
  }, []);

  const addAvis = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) return;
    const newAvis = [...avis, { ...form, date: new Date().toISOString().split('T')[0] }];
    setAvis(newAvis);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAvis));
    setForm({ name: '', note: 5, comment: '' });
  };

  const removeAvis = (i) => {
    const filtered = avis.filter((_, idx) => idx !== i);
    setAvis(filtered);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  };

  return (
    <div>
      <Header showSearch={false} />
      <main className="pt-24 pb-16 px-1 lg:px-2 max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-dark-text mb-6 transition-colors cursor-pointer">
          <FaArrowLeft className="text-xs" /> Retour
        </button>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-dark-text mb-2">Avis clients</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Decouvrez ce que nos clients pensent de nous</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {avis.map((a, i) => (
            <div key={i} className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-dark-border shadow-sm relative group">
              <button
                onClick={() => removeAvis(i)}
                className="absolute top-3 right-3 text-gray-300 dark:text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                aria-label="Supprimer"
              >
                <FaTrash className="text-xs" />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm flex-shrink-0">
                  {a.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-dark-text">{a.name}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{a.date}</p>
                </div>
              </div>
              <Etoiles note={a.note} />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">{a.comment}</p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-dark-border shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-4">Ajouter un avis</h2>
          <form onSubmit={addAvis} className="space-y-4">
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Votre nom"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:border-accent focus:ring-3 focus:ring-accent/12 transition-all"
            />
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Note</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setForm({ ...form, note: i })}
                    className="cursor-pointer"
                  >
                    <FaStar className={`text-xl ${i <= form.note ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} hover:text-yellow-400 transition-colors`} />
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={form.comment}
              onChange={e => setForm({ ...form, comment: e.target.value })}
              placeholder="Votre commentaire"
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:border-accent focus:ring-3 focus:ring-accent/12 transition-all resize-y"
            />
            <button type="submit" className="w-full py-3.5 rounded-full font-semibold bg-accent text-white hover:bg-accent-hover transition-all cursor-pointer">
              Publier l'avis
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
