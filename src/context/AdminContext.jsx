import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cars as seedCars } from '../data/cars';

const AdminContext = createContext(null);

const CARS_KEY = 'admin_cars';
const CONTENT_KEY = 'admin_content';
const RESERVATIONS_KEY = 'admin_reservations';

const defaultContent = {
  email: 'contact@autoshowroom.fr',
  phone: '01 23 45 67 89',
  address: '12 Rue de l\'Automobile',
  city: '75001 Paris',
  gps: { lat: 48.8566, lng: 2.3522 },
};

const defaultReservations = [
  { id: 1, customer: 'Jean Dupont', email: 'jean@email.com', phone: '06 12 34 56 78', carId: 1, carName: 'BMW X5 M60i', date: '2025-03-15', status: 'confirmée' },
  { id: 2, customer: 'Marie Martin', email: 'marie@email.com', phone: '06 98 76 54 32', carId: 5, carName: 'Volkswagen Golf 8 R', date: '2025-03-12', status: 'en attente' },
  { id: 3, customer: 'Pierre Durand', email: 'pierre@email.com', phone: '06 45 67 89 01', carId: 4, carName: 'Toyota Land Cruiser 300', date: '2025-03-08', status: 'terminée' },
];

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch { return fallback; }
}

export function AdminProvider({ children }) {
  const [cars, setCars] = useState(() => {
    const saved = loadData(CARS_KEY, null);
    if (saved) return saved;
    return seedCars.map(c => ({ ...c, status: c.status || 'disponible' }));
  });

  const [content, setContent] = useState(() => loadData(CONTENT_KEY, defaultContent));
  const [reservations, setReservations] = useState(() => loadData(RESERVATIONS_KEY, defaultReservations));
  const [nextReservationId, setNextReservationId] = useState(() => {
    const saved = loadData(RESERVATIONS_KEY, defaultReservations);
    return saved.length > 0 ? Math.max(...saved.map(r => r.id)) + 1 : 1;
  });

  useEffect(() => { localStorage.setItem(CARS_KEY, JSON.stringify(cars)); }, [cars]);
  useEffect(() => { localStorage.setItem(CONTENT_KEY, JSON.stringify(content)); }, [content]);
  useEffect(() => { localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations)); }, [reservations]);
  useEffect(() => { localStorage.setItem('admin_next_reservation_id', JSON.stringify(nextReservationId)); }, [nextReservationId]);

  const addCar = useCallback((car) => {
    const newCar = { ...car, id: Date.now(), images: car.images?.length ? car.images : ['/images.jfif'] };
    setCars(prev => [...prev, newCar]);
    return newCar;
  }, []);

  const updateCar = useCallback((id, data) => {
    setCars(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  }, []);

  const deleteCar = useCallback((id) => {
    setCars(prev => prev.filter(c => c.id !== id));
  }, []);

  const updateContent = useCallback((data) => {
    setContent(prev => ({ ...prev, ...data }));
  }, []);

  const addReservation = useCallback((r) => {
    const newR = { ...r, id: nextReservationId, date: new Date().toISOString().split('T')[0], status: 'en attente' };
    setNextReservationId(prev => prev + 1);
    setReservations(prev => [...prev, newR]);
    return newR;
  }, [nextReservationId]);

  const updateReservation = useCallback((id, data) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
  }, []);

  const updateReservationStatus = useCallback((id, status) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  }, []);

  const deleteReservation = useCallback((id) => {
    setReservations(prev => prev.filter(r => r.id !== id));
  }, []);

  const stats = {
    total: cars.length,
    disponibles: cars.filter(c => c.status === 'disponible' || !c.status).length,
    réservées: cars.filter(c => c.status === 'réservée').length,
    vendues: cars.filter(c => c.status === 'vendue').length,
  };

  return (
    <AdminContext.Provider value={{
      cars, addCar, updateCar, deleteCar,
      content, updateContent,
      reservations, addReservation, updateReservation, updateReservationStatus, deleteReservation,
      stats,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
