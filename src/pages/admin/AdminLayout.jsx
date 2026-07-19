import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaCar, FaEnvelope, FaCalendarCheck, FaArrowLeft, FaBars, FaTimes, FaHome, FaSignOutAlt } from 'react-icons/fa';

const navItems = [
  { path: '/admin', label: 'Vue d\'ensemble', icon: FaTachometerAlt },
  { path: '/admin/cars', label: 'Stock / Voitures', icon: FaCar },
  { path: '/admin/content', label: 'Contenu du site', icon: FaEnvelope },
  { path: '/admin/reservations', label: 'Réservations', icon: FaCalendarCheck },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col lg:flex-row">
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 w-10 h-10 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-dark-text hover:bg-dark-bg-alt transition-colors cursor-pointer"
        aria-label="Menu"
      >
        <FaBars size={16} />
      </button>

      <div className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)} />

      <aside className={`fixed lg:sticky top-0 left-0 z-50 min-h-screen w-72 bg-dark-card border-r border-dark-border flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-dark-border">
          <Link to="/admin" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-accent/30">
              <img src="/746729992_18275557168293964_1498530892815492404_n.jpg" alt="Auto Showroom" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-accent font-bold text-base leading-tight">Auto Showroom</p>
              <p className="text-[10px] text-gray-500">Administration</p>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-dark-text cursor-pointer" aria-label="Fermer">
            <FaTimes size={16} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const active = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-accent/15 text-accent'
                    : 'text-gray-400 hover:text-dark-text hover:bg-dark-bg-alt'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-dark-border space-y-1">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-dark-text hover:bg-dark-bg-alt transition-all cursor-pointer">
            <FaHome size={16} />
            Retour au site
          </button>
          <button onClick={() => setShowLogoutModal(true)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/5 transition-all cursor-pointer">
            <FaSignOutAlt size={16} />
            Se déconnecter
          </button>
        </div>
      </aside>

      <main className="flex-1 pb-16 lg:pb-0">
        <div className="px-4 sm:px-8 lg:px-10 py-8 sm:py-10 pt-16 lg:pt-8">
          {children}
        </div>
      </main>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowLogoutModal(false)}>
          <div className="bg-dark-card rounded-2xl border border-dark-border w-full max-w-sm p-6 sm:p-8 text-center" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full bg-red-400/15 flex items-center justify-center mx-auto mb-4">
              <FaSignOutAlt className="text-red-400" size={18} />
            </div>
            <h2 className="text-lg font-bold text-dark-text mb-2">Se déconnecter ?</h2>
            <p className="text-sm text-gray-400 mb-6">Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowLogoutModal(false)} className="flex-1 px-4 py-2.5 rounded-xl bg-dark-bg text-dark-text text-sm font-semibold border border-dark-border hover:bg-dark-border transition-all cursor-pointer">Non</button>
              <button onClick={() => { setShowLogoutModal(false); navigate('/admin/login'); }} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all cursor-pointer">Oui</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
