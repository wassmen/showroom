import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaInstagram, FaFacebook, FaTiktok, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkedAlt } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const socials = [
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com/autoshowroom', color: 'hover:text-pink-500' },
  { icon: FaFacebook, label: 'Facebook', href: 'https://facebook.com/autoshowroom', color: 'hover:text-blue-600' },
  { icon: FaTiktok, label: 'TikTok', href: 'https://tiktok.com/@autoshowroom', color: 'hover:text-gray-900 dark:hover:text-white' },
  { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/21321123456', color: 'hover:text-green-500' },
];

export default function Contact() {
  const navigate = useNavigate();
  return (
    <div>
      <Header showSearch={false} />
      <main className="pt-28 pb-16 px-1 lg:px-2 max-w-5xl mx-auto">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-dark-text mb-4 transition-colors cursor-pointer">
          <FaArrowLeft className="text-xs" /> Retour
        </button>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-dark-text mb-2 text-center">Contact</h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-12">
          Notre equipe est a votre disposition pour toute information
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-dark-border shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-6">Suivez-nous</h2>
            <div className="grid grid-cols-2 gap-4">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 ${s.color} hover:border-accent hover:-translate-y-0.5 transition-all duration-300`}
                >
                  <s.icon className="text-xl" />
                  <span className="font-semibold text-sm">{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-dark-border shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-6">Coordonnees</h2>
            <div className="space-y-5">
              <a href="mailto:contact@autoshowroom.dz" className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors">
                <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-copper" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Email</p>
                  <p className="font-medium text-gray-900 dark:text-dark-text">contact@autoshowroom.dz</p>
                </div>
              </a>
              <a href="tel:+21321123456" className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors">
                <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-copper" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Telephone</p>
                  <p className="font-medium text-gray-900 dark:text-dark-text">+213 21 123 456</p>
                </div>
              </a>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <FaMapMarkedAlt className="text-copper" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Adresse</p>
                  <p className="font-medium text-gray-900 dark:text-dark-text">123 Rue Didouche Mourad, Alger</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm">
          <div className="p-6 pb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text">Localisation</h2>
          </div>
          <div className="h-[350px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25577.73533280825!2d3.056201!3d36.753768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e4b6b7b7b7b7b%3A0x7b7b7b7b7b7b7b7b!2sAlger+Centre%2C+Alger!5e0!3m2!1sfr!2sdz!4v1"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Carte Auto Showroom"
            />
          </div>
        </div>
      </main>

    </div>
  );
}
