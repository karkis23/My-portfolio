import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SEO from '../components/SEO';
import { articles } from '../data';
import { TechStackBadge } from '../components/ui/UIComponents';

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

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const article = articles.find((a) => a.slug === slug);

  useEffect(() => {
    async function loadMarkdown() {
      if (!slug) return;
      
      try {
        setLoading(true);
        // Vite specific dynamic raw import
        const mdModule = await import(`../data/markdown/${slug}.md?raw`);
        setContent(mdModule.default);
      } catch (err) {
        console.error('Failed to load markdown:', err);
        setError('Article content could not be loaded.');
      } finally {
        setLoading(false);
      }
    }

    loadMarkdown();
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Article Not Found</h1>
          <p className="text-text-secondary mb-8">The requested article could not be found.</p>
          <Link to="/articles" className="text-accent-blue hover:underline inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEO title={article.title} description={article.excerpt} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/articles" 
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Articles
        </Link>
        
        <motion.article 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Article Header */}
          <motion.header variants={staggerItem} className="mb-12 border-b border-border pb-12">
            <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-text-muted mb-6">
              <span className="text-accent-blue border border-accent-blue/30 bg-accent-blue/10 px-2.5 py-1 rounded">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {article.readTime} min read
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-text-primary leading-tight mb-6">
              {article.title}
            </h1>
            
            <p className="text-xl text-text-secondary leading-relaxed mb-8">
              {article.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-3">
              {article.tags.map((tag) => (
                <TechStackBadge key={tag} tech={tag} />
              ))}
            </div>
          </motion.header>
          
          {/* Article Content */}
          <motion.div variants={staggerItem} className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-accent-blue hover:prose-a:text-blue-400 prose-pre:bg-bg-secondary prose-pre:border prose-pre:border-border prose-hr:border-border">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-pulse flex items-center gap-3 text-text-secondary">
                  <div className="h-5 w-5 rounded-full border-2 border-accent-blue border-t-transparent animate-spin"/>
                  <span>Loading article...</span>
                </div>
              </div>
            ) : error ? (
               <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-lg font-mono">
                 {error}
               </div>
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            )}
          </motion.div>
        </motion.article>
      </div>
    </div>
  );
}
