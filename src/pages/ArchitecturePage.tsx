import { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { projects } from '../data';
import SEO from '../components/SEO';
import CTA from '../components/ui/CTA';

// Blueprint Background
function BlueprintBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="none" />
            <path d="M 40 0 L 40 40 M 0 40 L 40 40" stroke="#f59e0b" strokeWidth="0.5" opacity="0.3" />
            <path d="M 10 0 L 10 40 M 20 0 L 20 40 M 30 0 L 30 40 M 0 10 L 40 10 M 0 20 L 40 20 M 0 30 L 40 30" stroke="#f59e0b" strokeWidth="0.2" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
      </svg>
    </div>
  );
}

const ArchitectureDiagram = lazy(() => import('../components/ui/ArchitectureDiagram'));

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

export default function ArchitecturePage() {
  const [selected, setSelected] = useState(projects[0]);

  return (
    <div className="min-h-screen py-20 relative">
      <SEO title="System Architecture" description="Interactive architecture diagrams for each engineering system." />
      <BlueprintBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent-amber/50" />
            <span className="section-label text-accent-amber/70">System Diagrams</span>
          </div>
          <h1 className="text-text-primary font-black text-5xl mb-4">
            System <span className="text-accent-amber">Architecture</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            Interactive architecture diagrams for each engineering system. 
            Click on nodes to view component details. Drag to explore.
          </p>
        </motion.div>

        {/* Project selector */}
        <div className="flex flex-wrap gap-3 mb-8">
          {projects.filter(p => p.architecture?.length).map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all
                ${selected.id === p.id
                  ? 'border-accent-blue bg-accent-blue/10 text-accent-blue'
                  : 'border-border-subtle bg-bg-secondary text-text-secondary hover:border-border hover:text-text-primary'
                }`}
            >
              <span>{p.icon}</span>
              {p.name}
            </button>
          ))}
        </div>

        {/* Diagram */}
        {selected.architecture && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-text-primary font-bold text-xl">{selected.name}</h2>
                <p className="text-text-muted text-sm">{selected.tagline}</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-text-muted">
                {[
                  { color: '#06b6d4', label: 'Input' },
                  { color: '#3b82f6', label: 'Process' },
                  { color: '#8b5cf6', label: 'AI' },
                  { color: '#10b981', label: 'Output' },
                  { color: '#ef4444', label: 'Monitor' },
                ].map(({ color, label }) => (
                  <span key={label} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <Suspense fallback={
              <div className="h-[500px] rounded-xl border border-border-subtle bg-bg-secondary flex items-center justify-center">
                <span className="text-text-muted font-mono text-sm animate-pulse">Loading diagram...</span>
              </div>
            }>
              <ArchitectureDiagram nodes={selected.architecture} className="h-[500px]" />
            </Suspense>

            {/* Node legend */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              {selected.architecture.map((node) => (
                <motion.div key={node.id} variants={staggerItem} className="p-3 rounded-lg bg-bg-secondary border border-border-subtle flex items-start gap-3">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                    style={{
                      background: {
                        input: '#06b6d4', process: '#3b82f6', ai: '#8b5cf6',
                        output: '#10b981', database: '#f59e0b', monitor: '#ef4444',
                      }[node.type] || '#3b82f6',
                    }}
                  />
                  <div>
                    <div className="text-text-primary text-xs font-semibold">{node.label}</div>
                    <div className="text-text-muted text-xs mt-0.5 leading-snug">{node.description}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        <CTA 
          title="Need a robust system architecture?" 
          description="From high-frequency trading engines to planetary-scale data pipelines, I design architectures that don't fail under pressure."
          buttonText="Get Architecture Consulting"
        />
      </div>
    </div>
  );
}
