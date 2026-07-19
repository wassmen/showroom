import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaArrowLeft, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { cars } from '../data/cars';
import Header from '../components/Header';
import Footer from '../components/Footer';

const brandLogos = {
  'Audi': '/logo-audi-480x480.webp',
  'BMW': '/logos/bmw.jfif',
  'Mercedes-Benz': '/logos/mercedes.jfif',
  'Toyota': '/logos/toyota.png',
  'Volkswagen': '/logos/volkswagen.jfif',
  'Hyundai': '/logos/hyundai.png',
  'Peugeot': '/logos/peugeot.jfif',
  'Range Rover': '/logos/range-rover.png',
  'Renault': '/logos/renault.jfif',
};

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find(c => c.id === Number(id));

  const [currentColor, setCurrentColor] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const images = car?.colors?.[currentColor]?.images || car?.images || [];

  const next = useCallback(() => setCurrentImage(i => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrentImage(i => (i - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  if (!car) {
    return (
      <div>
        <Header showSearch={false} />
        <div className="pt-32 text-center text-gray-400 dark:text-gray-500 px-4">
          <p>Voiture non trouvee.</p>
          <button onClick={() => navigate('/')} className="mt-4 text-accent hover:underline cursor-pointer">Retour a l'accueil</button>
        </div>
      </div>
    );
  }

  const badgeStyles = {
    'Promotion': 'bg-accent text-white',
    'Nouveau': 'bg-success text-white',
    'Meilleure vente': 'bg-warning text-white',
  };

  return (
    <div>
      <Header showSearch={false} />
      <main className="pt-24 pb-16 px-1 lg:px-2 max-w-screen-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-dark-text mb-6 transition-colors cursor-pointer">
          <FaArrowLeft className="text-xs" /> Retour
        </button>

        <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[16/9] mb-8 group">
          <div className="flex h-full transition-transform duration-600 ease-out"
            style={{ transform: `translateX(-${currentImage * 100}%)` }}>
            {images.map((img, i) => (
              <div key={i} className="min-w-full h-full flex-shrink-0">
                <img src={img} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
              </div>
            ))}
          </div>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-gray-700 flex items-center justify-center text-xl shadow-md opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all z-10 cursor-pointer" aria-label="Image precedente"><FaChevronLeft /></button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-gray-700 flex items-center justify-center text-xl shadow-md opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all z-10 cursor-pointer" aria-label="Image suivante"><FaChevronRight /></button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrentImage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${i === currentImage ? 'bg-white scale-125 border-2 border-white' : 'bg-white/50 border-2 border-white/30'}`}
                aria-label={`Image ${i + 1}`} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-dark-text mb-1 flex items-center gap-3">
              {brandLogos[car.brand] && (
                <img src={brandLogos[car.brand]} alt={car.brand} className="h-9 w-auto" />
              )}
              {car.brand}
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">{car.model}</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                ['Marque', car.brand],
                ['Modele', car.model],
                ['Annee', car.year],
                ['Kilometrage', `${car.mileage.toLocaleString('fr-FR')} km`],
                ['Energie', car.fuel],
                ['Boite', car.transmission],
                ['Puissance', car.power],
                ['Moteur', car.engine],
                ['Transmission', car.drivetrain],
                ['Portes', car.doors],
                ['Places', car.seats],
                ['Consommation', car.consumption],
                ['Couleur', car.color],
              ].map(([label, value]) => (
                <div key={label} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold mb-1">{label}</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-dark-text">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 self-start">
            <div className="bg-white dark:bg-dark-card rounded-2xl p-7 border border-gray-200 dark:border-dark-border shadow-sm">
              <div className="mb-2">
                <span className="text-3xl font-extrabold text-accent">{car.price.toLocaleString('fr-FR')} €</span>
                {car.originalPrice && <span className="text-lg text-gray-400 dark:text-gray-500 line-through ml-3">{car.originalPrice.toLocaleString('fr-FR')} €</span>}
              </div>
              {car.badge && (
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mt-2 ${badgeStyles[car.badge] || 'bg-accent text-white'}`}>
                  {car.badge}
                </span>
              )}

              {car.colors && car.colors.length > 1 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Couleur disponible</p>
                  <div className="flex gap-2.5">
                    {car.colors.map((c, i) => (
                      <button
                        key={c.name}
                        onClick={() => { setCurrentColor(i); setCurrentImage(0); }}
                        className={`w-9 h-9 rounded-full border-3 transition-all cursor-pointer flex items-center justify-center ${i === currentColor ? 'border-accent shadow-md scale-110' : 'border-transparent'}`}
                        style={{ background: c.hex }}
                        aria-label={c.name}
                        title={c.name}
                      >
                        {i === currentColor && <FaCheck className="text-white text-xs" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6">
                <button onClick={() => navigate('/contact')} className="w-full py-4 rounded-full font-semibold bg-accent text-white hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer">Nous contacter</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
