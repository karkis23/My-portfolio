import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight, Tag } from 'lucide-react';
import { TechStackBadge } from '../components/ui/UIComponents';
import SEO from '../components/SEO';
import CTA from '../components/ui/CTA';
import { articles } from '../data';

const categoryColors: Record<string, string> = {
  Systems: 'text-accent-blue border-accent-blue/30 bg-accent-blue/10',
  Automation: 'text-accent-green border-accent-green/30 bg-accent-green/10',
  'AI/ML': 'text-accent-purple border-accent-purple/30 bg-accent-purple/10',
  Frontend: 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10',
};

// Stagger Animation Variants
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function ArticlesPage() {
  return (
    <div className="min-h-screen py-20 pb-0">
      <SEO title="Articles" description="In-depth engineering articles on AI systems, automation design, and trading technology." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent-blue/50" />
            <span className="section-label">Engineering Blog</span>
          </div>
          <h1 className="text-text-primary font-black text-5xl mb-4">
            Technical <span className="gradient-text">Articles</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            In-depth engineering articles on AI systems, automation design, trading technology, 
            and system architecture. Written for engineers by an engineer.
          </p>
        </motion.div>

        {/* Featured article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-8 hover:border-border transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/3 to-transparent pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-mono px-2 py-0.5 rounded border font-medium ${categoryColors[articles[0].category] || ''}`}>
                  {articles[0].category}
                </span>
                <span className="text-text-muted text-xs font-mono flex items-center gap-1">
                  <Clock size={11} /> {articles[0].readTime} min read
                </span>
                <span className="text-text-muted text-xs font-mono">{articles[0].date}</span>
                <span className="ml-auto text-xs font-mono text-accent-blue border border-accent-blue/30 bg-accent-blue/5 px-2 py-0.5 rounded">
                  Featured
                </span>
              </div>
              <h2 className="text-text-primary font-black text-2xl md:text-3xl mb-3 group-hover:text-accent-blue transition-colors leading-snug">
                {articles[0].title}
              </h2>
              <p className="text-text-secondary text-base leading-relaxed mb-5 max-w-3xl">{articles[0].excerpt}</p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex flex-wrap gap-2">
                  {articles[0].tags.map((tag) => (
                    <TechStackBadge key={tag} tech={tag} />
                  ))}
                </div>
                <Link
                  to={`/articles/${articles[0].slug}`}
                  className="flex items-center gap-1.5 text-sm font-semibold text-accent-blue hover:text-blue-400 transition-colors"
                >
                  Read article <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Article grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {articles.slice(1).map((article) => (
            <motion.article
              key={article.slug}
              variants={staggerItem}
              whileHover={{ y: -3 }}
              className="group p-5 rounded-xl border border-border-subtle bg-bg-secondary hover:border-border transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-mono px-2 py-0.5 rounded border font-medium ${categoryColors[article.category] || 'text-text-muted border-border-subtle'}`}>
                  {article.category}
                </span>
                <span className="text-text-muted text-xs font-mono ml-auto">{article.readTime}m</span>
              </div>
              <h3 className="text-text-primary font-bold text-base mb-2 leading-snug group-hover:text-accent-blue transition-colors">
                {article.title}
              </h3>
              <p className="text-text-muted text-xs leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs font-mono text-text-muted flex items-center gap-0.5">
                      <Tag size={9} /> {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/articles/${article.slug}`}
                  className="text-xs text-accent-blue/70 hover:text-accent-blue transition-colors flex items-center gap-1"
                >
                  Read <ArrowUpRight size={11} />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Coming soon */}
        <div className="mt-12 text-center py-12 border border-dashed border-border rounded-xl">
          <p className="text-text-muted text-sm font-mono">More articles coming soon...</p>
          <p className="text-text-muted text-xs mt-1">Topics: MLOps, Options Greeks, Microservices, Real-time Systems</p>
        </div>

        <CTA 
          title="Looking for technical expertise?" 
          description="If you're building systems similar to what I write about, I'm available for consulting and freelance engineering."
          buttonText="Hire Me"
        />
      </div>
    </div>
  );
}
