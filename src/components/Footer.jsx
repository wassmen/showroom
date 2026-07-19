import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaMapMarkedAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-dark-bg-alt border-t border-gray-200 dark:border-dark-border transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-1 lg:px-2 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div>
            <div className="inline-flex items-center justify-center bg-black/40 dark:bg-black/60 rounded-xl ring-1 ring-accent/50 p-1.5 mb-4 drop-shadow-[0_0_10px_rgba(139,94,60,0.35)]">
              <img src="/746729992_18275557168293964_1498530892815492404_n.jpg" alt="Auto Showroom" className="h-16 w-auto" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Votre showroom automobile de confiance depuis 2010. Véhicules premium neufs et d'occasion, sélectionnés avec rigueur pour vous offrir le meilleur de l'automobile.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-accent mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3"><FaEnvelope className="w-4 text-copper flex-shrink-0" />contact@autoshowroom.dz</div>
              <div className="flex items-center gap-3"><FaPhone className="w-4 text-copper flex-shrink-0" />+213 21 123 456</div>
              <div className="flex items-center gap-3"><FaMapMarkerAlt className="w-4 text-copper flex-shrink-0" />123 Rue Didouche Mourad, Alger</div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-accent mb-4">Localisation</h3>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              <FaMapMarkedAlt className="inline mr-2 text-copper" />
              <a href="https://maps.google.com/?q=Alger+centre" target="_blank" rel="noopener noreferrer" className="text-accent font-medium hover:underline">Voir sur Google Maps</a>
            </div>
            <div className="rounded-lg overflow-hidden border border-accent/20 dark:border-accent/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25577.73533280825!2d3.056201!3d36.753768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e4b6b7b7b7b7b%3A0x7b7b7b7b7b7b7b7b!2sAlger+Centre%2C+Alger!5e0!3m2!1sfr!2sdz!4v1"
                width="100%" height="140" style={{ border: 0 }} allowFullScreen loading="lazy" title="Carte Auto Showroom"
              />
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-dark-border text-center text-sm text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} Auto Showroom. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
