import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, CheckCircle2, FileText } from 'lucide-react';
import { lazy, Suspense, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TechStackBadge, CodeBlock } from '../components/ui/UIComponents';
import SystemFlowDiagram from '../components/ui/SystemFlowDiagram';
import SEO from '../components/SEO';
import CTA from '../components/ui/CTA';
import { projects } from '../data';

const ArchitectureDiagram = lazy(() => import('../components/ui/ArchitectureDiagram'));

const statusColors: Record<string, string> = {
  production: 'text-accent-green border-accent-green/30 bg-accent-green/10',
  development: 'text-accent-amber border-accent-amber/30 bg-accent-amber/10',
  research: 'text-accent-blue border-accent-blue/30 bg-accent-blue/10',
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

const sampleCode = `# Zenith AI Signal Generation Engine
import xgboost as xgb
import numpy as np
from feature_engine import FeatureEngine

class ZenithPredictor:
    """
    Ensemble predictor combining XGBoost + LSTM
    with confidence-weighted signal generation
    """
    def __init__(self, model_path: str):
        self.model = xgb.Booster()
        self.model.load_model(model_path)
        self.feature_engine = FeatureEngine(n_features=57)
    
    def predict(self, ohlcv: np.ndarray) -> dict:
        features = self.feature_engine.transform(ohlcv)
        dmatrix = xgb.DMatrix(features.reshape(1, -1))
        
        prob_bull = self.model.predict(dmatrix)[0]
        confidence = abs(prob_bull - 0.5) * 2
        
        return {
            "signal": "LONG" if prob_bull > 0.5 else "SHORT",
            "confidence": round(confidence, 3),
            "probability": round(float(prob_bull), 4),
            "risk_score": round(1 - confidence, 3),
        }`;

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const [docContent, setDocContent] = useState<string>('');
  const [loadingDoc, setLoadingDoc] = useState(false);

  useEffect(() => {
    async function loadDoc() {
      if (!slug) return;
      try {
        setLoadingDoc(true);
        const mdModule = await import(`../data/markdown/${slug}.md?raw`);
        setDocContent(mdModule.default);
      } catch (err) {
        console.warn('No documentation file found for this project.');
      } finally {
        setLoadingDoc(false);
      }
    }

    loadDoc();
  }, [slug]);

  if (!project) return <Navigate to="/projects" replace />;

  const flowSteps = project.architecture?.slice(0, 5).map((node) => ({
    id: node.id,
    label: node.label,
    description: node.description,
    icon: ['📡', '⚙️', '🧠', '⚡', '🚀', '📊', '🔍'][['input', 'process', 'ai', 'output', 'database', 'monitor', 'process'].indexOf(node.type)] || '📡',
    color: ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'][['input', 'process', 'ai', 'output', 'database', 'monitor', 'process'].indexOf(node.type)] || '#3b82f6',
  })) || [];

  return (
    <div className="min-h-screen py-20">
      <SEO title={project.name} description={project.tagline} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link to="/projects" className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary text-sm mb-8 transition-colors group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Hero header */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl border"
                  style={{ background: `${project.color}15`, borderColor: `${project.color}30` }}
                >
                  {project.icon}
                </div>
                <div>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border capitalize ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>
              </div>
              <h1 className="text-text-primary font-black text-4xl md:text-5xl mb-3 leading-tight">
                {project.name}
              </h1>
              <p className="text-text-secondary text-lg mb-6">{project.tagline}</p>
              <p className="text-text-muted leading-relaxed mb-6">{project.description}</p>

              <div className="flex gap-3 flex-wrap">
                {project.links?.github && (
                  <a href={project.links.github} className="btn-secondary">
                    <Github size={14} /> Source Code
                  </a>
                )}
                {project.links?.demo && (
                  <a href={project.links.demo} className="btn-primary">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
                {project.links?.docs && (
                  <a href={project.links.docs} className="btn-secondary">
                    Docs
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Metrics sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {project.metrics && (
              <div className="rounded-xl border border-border-subtle bg-bg-secondary p-5">
                <h3 className="text-text-primary font-bold text-sm mb-4 font-mono">SYSTEM METRICS</h3>
                <div className="space-y-3">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-2 border-b border-border-subtle last:border-none">
                      <span className="text-text-muted text-sm">{key}</span>
                      <span
                        className="text-sm font-bold font-mono"
                        style={{ color: project.color }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Tech stack */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16"
        >
          <motion.h2 variants={staggerItem} className="text-text-primary font-bold text-xl mb-5 flex items-center gap-3">
            <span className="w-6 h-6 rounded bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center text-accent-blue text-xs">T</span>
            Technology Stack
          </motion.h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <motion.div key={tech} variants={staggerItem}>
                <TechStackBadge tech={tech} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16"
        >
          <motion.h2 variants={staggerItem} className="text-text-primary font-bold text-xl mb-5 flex items-center gap-3">
            <span className="w-6 h-6 rounded bg-accent-green/10 border border-accent-green/30 flex items-center justify-center text-accent-green text-xs">F</span>
            Core Features
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.features.map((feat, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex items-start gap-3 p-3 rounded-lg bg-bg-secondary border border-border-subtle"
              >
                <CheckCircle2 size={15} className="text-accent-green flex-shrink-0 mt-0.5" />
                <span className="text-text-secondary text-sm">{feat}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Architecture diagram */}
        {project.architecture && project.architecture.length > 0 && (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="mb-16"
          >
            <motion.h2 variants={staggerItem} className="text-text-primary font-bold text-xl mb-5 flex items-center gap-3">
              <span className="w-6 h-6 rounded bg-accent-purple/10 border border-accent-purple/30 flex items-center justify-center text-accent-purple text-xs">A</span>
              System Architecture
            </motion.h2>
            <motion.p variants={staggerItem} className="text-text-muted text-sm mb-6">Click on nodes to view details. Drag to explore the diagram.</motion.p>
            <motion.div variants={staggerItem}>
              <Suspense fallback={
                <div className="h-96 rounded-xl border border-border-subtle bg-bg-secondary flex items-center justify-center">
                  <span className="text-text-muted text-sm font-mono">Loading diagram...</span>
                </div>
              }>
                <ArchitectureDiagram nodes={project.architecture} className="h-96" />
              </Suspense>
            </motion.div>
          </motion.div>
        )}

        {/* System flow */}
        {flowSteps.length > 0 && (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="mb-16"
          >
            <motion.h2 variants={staggerItem} className="text-text-primary font-bold text-xl mb-8 flex items-center gap-3">
              <span className="w-6 h-6 rounded bg-accent-amber/10 border border-accent-amber/30 flex items-center justify-center text-accent-amber text-xs">S</span>
              System Flow
            </motion.h2>
            <motion.div variants={staggerItem} className="max-w-md mx-auto">
              <SystemFlowDiagram steps={flowSteps} />
            </motion.div>
          </motion.div>
        )}

        {/* Code sample */}
        {project.slug === 'zenith-ai-trading' && (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="mb-16"
          >
            <motion.h2 variants={staggerItem} className="text-text-primary font-bold text-xl mb-5 flex items-center gap-3">
              <span className="w-6 h-6 rounded bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan text-xs">{'<>'}</span>
              Code Sample
            </motion.h2>
            <motion.div variants={staggerItem}>
              <CodeBlock code={sampleCode} language="python" filename="zenith/predictor.py" />
            </motion.div>
          </motion.div>
        )}

        {/* Documentation / Markdown Content */}
        {loadingDoc ? (
          <div className="mb-16 flex items-center justify-center py-20 border border-border-subtle rounded-xl bg-bg-secondary">
            <div className="animate-pulse flex items-center gap-3 text-text-secondary">
              <div className="h-5 w-5 rounded-full border-2 border-accent-blue border-t-transparent animate-spin"/>
              <span>Loading system specifications...</span>
            </div>
          </div>
        ) : docContent ? (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="mb-16"
          >
            <motion.h2 variants={staggerItem} className="text-text-primary font-bold text-xl mb-8 flex items-center gap-3">
              <span className="w-6 h-6 rounded bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center text-accent-blue text-xs"><FileText size={12} /></span>
              System Documentation
            </motion.h2>
            <motion.div variants={staggerItem} className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-accent-blue hover:prose-a:text-blue-400 prose-pre:bg-bg-secondary prose-pre:border prose-pre:border-border prose-hr:border-border bg-bg-secondary border border-border-subtle p-8 rounded-2xl">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {docContent}
              </ReactMarkdown>
            </motion.div>
          </motion.div>
        ) : null}

        <CTA 
          title="Interested in this project strategy?" 
          description="I can help you build similar systems or consult on the architecture and implementation phase."
        />
      </div>
    </div>
  );
}
