import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { articles } from '../data/articles';
import ArticleCard from '../components/ArticleCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PER_PAGE = 6;

export default function Actualites() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(articles.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const paged = articles.slice(start, start + PER_PAGE);

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <Header showSearch={false} />
      <main className="pt-24 pb-16 px-1 lg:px-2 max-w-screen-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-dark-text mb-6 transition-colors cursor-pointer">
          <FaArrowLeft className="text-xs" /> Retour
        </button>

        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-dark-text mb-2">Actualités</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          Toute l'actualité automobile, les conseils et les événements de votre concession
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paged.map(article => (
            <ArticleCard key={article.id} article={article} className="animate-fade-in" />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-gray-200 dark:border-dark-border text-gray-500 dark:text-gray-400 hover:border-accent hover:text-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <FaChevronLeft size={12} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  p === page
                    ? 'bg-accent text-white shadow-md'
                    : 'border border-gray-200 dark:border-dark-border text-gray-500 dark:text-gray-400 hover:border-accent hover:text-accent'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-gray-200 dark:border-dark-border text-gray-500 dark:text-gray-400 hover:border-accent hover:text-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
