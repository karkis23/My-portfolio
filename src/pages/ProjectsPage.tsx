import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import ProjectCard from '../components/ui/ProjectCard';
import SEO from '../components/SEO';
import CTA from '../components/ui/CTA';
import { projects } from '../data';

const categories = ['all', 'ai', 'automation', 'trading', 'data', 'infrastructure'];

export default function ProjectsPage() {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen py-20 pb-0">
      <SEO title="Projects" description="Engineering projects spanning AI, automation, trading infrastructure, and data." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent-blue/50" />
            <span className="section-label">Portfolio</span>
          </div>
          <h1 className="text-text-primary font-black text-5xl mb-4 leading-tight">
            Engineering <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            Production systems spanning AI, automation, trading infrastructure, and data engineering.
            Each project is built for reliability, scalability, and real-world performance.
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex items-center gap-3 mb-10 flex-wrap">
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <Filter size={14} />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-medium capitalize transition-all duration-200
                ${active === cat
                  ? 'bg-accent-blue text-white'
                  : 'border border-border-subtle text-text-secondary hover:border-border hover:text-text-primary bg-bg-secondary'
                }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-text-muted text-xs font-mono">{filtered.length} project{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} index={i} featured />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-text-muted">
            <p className="text-lg">No projects in this category yet.</p>
          </div>
        )}

        <CTA 
          title="Interested in a similar project?" 
          description="If you need a robust engineering solution tailored to your specific requirements, I'm available for new opportunities."
        />
      </div>
    </div>
  );
}
