import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CompareProvider } from './context/CompareContext';
import { AdminProvider } from './context/AdminContext';
import Home from './pages/Home';
import CarDetail from './pages/CarDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import Avis from './pages/Avis';
import Compare from './pages/Compare';
import Actualites from './pages/Actualites';
import ArticleDetail from './pages/ArticleDetail';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminCars from './pages/admin/Cars';
import AdminCarForm from './pages/admin/CarForm';
import AdminContent from './pages/admin/Content';
import AdminReservations from './pages/admin/Reservations';
import ScrollToTop from './components/ScrollToTop';
import CompareBar from './components/CompareBar';

export default function App() {
  return (
    <ThemeProvider>
      <CompareProvider>
        <AdminProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text transition-colors duration-300">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/car/:id" element={<CarDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/avis" element={<Avis />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/actualites" element={<Actualites />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/cars" element={<AdminCars />} />
              <Route path="/admin/cars/new" element={<AdminCarForm />} />
              <Route path="/admin/cars/:id/edit" element={<AdminCarForm />} />
              <Route path="/admin/content" element={<AdminContent />} />
              <Route path="/admin/reservations" element={<AdminReservations />} />
            </Routes>
            <CompareBar />
            <ScrollToTop />
          </div>
          </BrowserRouter>
        </AdminProvider>
        </CompareProvider>
      </ThemeProvider>
  );
}
