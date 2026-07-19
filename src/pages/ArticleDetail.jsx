import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaTag, FaUser, FaArrowRight } from 'react-icons/fa';
import { articles } from '../data/articles';
import ArticleCard from '../components/ArticleCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const categoryStyles = {
  'Nouveautés': 'bg-accent/15 text-accent border-accent/20',
  'Conseils': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Entretien': 'bg-success/10 text-success border-success/20',
  'Concession': 'bg-warning/10 text-warning border-warning/20',
};

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find(a => a.id === Number(id));

  if (!article) {
    return (
      <div>
        <Header showSearch={false} />
        <div className="pt-32 text-center text-gray-400 dark:text-gray-500 px-4">
          <p>Article non trouvé.</p>
          <button onClick={() => navigate('/actualites')} className="mt-4 text-accent hover:underline cursor-pointer">Retour aux actualités</button>
        </div>
      </div>
    );
  }

  const related = articles.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3);
  const catStyle = categoryStyles[article.category] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';

  return (
    <div>
      <Header showSearch={false} />
      <main className="pt-24 pb-16 px-1 lg:px-2 max-w-screen-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-dark-text mb-6 transition-colors cursor-pointer">
          <FaArrowLeft className="text-xs" /> Retour
        </button>

        <article className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[16/9] mb-8">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${catStyle}`}>
              {article.category}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-xs" />
              {new Date(article.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <FaTag className="text-xs" />
              {article.category}
            </span>
            <span className="flex items-center gap-1.5">
              <FaUser className="text-xs" />
              {article.author}
            </span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-dark-text mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line mb-8">
            {article.content}
          </p>

          <div className="border-t border-gray-200 dark:border-dark-border pt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
            <button onClick={() => navigate('/contact')} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-full bg-accent text-white text-sm font-semibold hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer">
              Nous contacter
            </button>
            <button onClick={() => navigate('/actualites')} className="inline-flex items-center justify-center gap-1.5 text-sm text-accent hover:gap-2.5 transition-all cursor-pointer py-2">
              Tous les articles <FaArrowRight size={11} />
            </button>
          </div>
        </article>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-dark-text mb-6">
              Dans la même catégorie
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(a => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
