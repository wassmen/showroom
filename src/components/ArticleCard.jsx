import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt, FaTag } from 'react-icons/fa';

const categoryStyles = {
  'Nouveautés': 'bg-accent/15 text-accent border-accent/20',
  'Conseils': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Entretien': 'bg-success/10 text-success border-success/20',
  'Concession': 'bg-warning/10 text-warning border-warning/20',
};

export default function ArticleCard({ article, className = '' }) {
  const navigate = useNavigate();
  const catStyle = categoryStyles[article.category] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';

  return (
    <div
      className={`group bg-white dark:bg-dark-card rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer ${className}`}
      onClick={() => navigate(`/article/${article.id}`)}
    >
      <div className="relative overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${catStyle}`}>
          {article.category}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-2">
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="text-[10px]" />
            {new Date(article.date).toLocaleDateString('fr-FR')}
          </span>
          <span className="flex items-center gap-1">
            <FaTag className="text-[10px]" />
            {article.category}
          </span>
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-dark-text leading-snug mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4">{article.excerpt}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
          Lire la suite <FaArrowRight size={11} />
        </span>
      </div>
    </div>
  );
}
