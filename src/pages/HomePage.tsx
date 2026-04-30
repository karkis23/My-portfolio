import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Download, Github, Cpu, Zap, BarChart2, Database,
  Activity, ExternalLink, User
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import TerminalPanel from '../components/ui/TerminalPanel';
import ProjectCard from '../components/ui/ProjectCard';
import SystemFlowDiagram from '../components/ui/SystemFlowDiagram';
import { SectionHeader, MetricsCard, TechStackBadge } from '../components/ui/UIComponents';
import SEO from '../components/SEO';
import CTA from '../components/ui/CTA';
import { projects, articles, techDomains } from '../data';
import karkiEmoji from '../assets/karki_emoji.png';

// Fake equity curve data
const equityData = [
  { day: 'Jan', pnl: 12000 }, { day: 'Feb', pnl: 18400 }, { day: 'Mar', pnl: 15200 },
  { day: 'Apr', pnl: 22800 }, { day: 'May', pnl: 28500 }, { day: 'Jun', pnl: 24100 },
  { day: 'Jul', pnl: 32400 }, { day: 'Aug', pnl: 41200 }, { day: 'Sep', pnl: 38700 },
  { day: 'Oct', pnl: 47900 }, { day: 'Nov', pnl: 55300 }, { day: 'Dec', pnl: 67450 },
];

const flowSteps = [
  { id: '1', label: 'Market Data Ingestion', description: 'Real-time tick data from NSE/BSE', icon: '📡', color: '#06b6d4' },
  { id: '2', label: 'Feature Engineering', description: '57 features from OHLCV + options data', icon: '⚙️', color: '#3b82f6' },
  { id: '3', label: 'AI Model Processing', description: 'XGBoost + LSTM ensemble prediction', icon: '🧠', color: '#8b5cf6' },
  { id: '4', label: 'Signal Generation', description: 'Rule-based validation and filtering', icon: '⚡', color: '#f59e0b' },
  { id: '5', label: 'Automated Execution', description: 'Order placement via broker API', icon: '🚀', color: '#10b981' },
];

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

// Floating particle effect
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent-blue/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Crossfading text animation
function AnimatedTitle() {
  const titles = [
    'Backend Architecture',
    'AI Systems Engineering',
    'Data Pipeline Orchestration',
    'Full Stack Development'
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [titles.length]);

  return (
    <div className="relative min-h-[2.4em] w-full mt-1">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="gradient-text inline-block"
        >
          {titles[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yHeroObjects = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yHeroText = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen overflow-x-hidden" ref={containerRef}>
      <SEO title="Home" description="I design and build high-throughput microservices, resilient automation frameworks, and intelligent data pipelines." />

      {/* HERO */}
      <motion.section
        className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 grid-bg"
        style={{ y: yHeroObjects, opacity: opacityHero }}
      >
        <FloatingParticles />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">

          {/* Left: Content */}
          <motion.div style={{ y: yHeroText }}>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-accent-green/30 bg-accent-green/5 mb-8"
            >
              <span className="dot-online" />
              <span className="text-accent-green text-xs font-mono font-medium">Systems Online — Available for Work</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-text-primary font-black text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-5 tracking-tight">
                Building
                <br />
                <AnimatedTitle />
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-text-secondary text-lg leading-relaxed mb-8 max-w-lg"
            >
              I design and build <strong className="text-text-primary">high-throughput microservices</strong>,
              {' '}<strong className="text-text-primary">resilient automation frameworks</strong>, and
              {' '}<strong className="text-text-primary">intelligent data pipelines</strong> that operate
              at production scale. While currently applied to complex algorithmic trading, my architectures are engineered to solve heavy data challenges across any industry.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link to="/projects" className="btn-primary">
                View Projects <ArrowRight size={16} />
              </Link>
              <a href="/resume.pdf" download="Karki_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Download size={16} /> Resume
              </a>
              <a href="https://github.com/karkis23?tab=repositories" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Github size={16} /> GitHub
              </a>
            </motion.div>


          </motion.div>

          {/* Right: Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-4"
          >
            <TerminalPanel />

            {/* Mini equity chart */}
            <div className="rounded-xl border border-border-subtle bg-bg-secondary p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-text-muted text-xs font-mono">ZENITH — EQUITY CURVE (2025)</p>
                  <p className="text-accent-green font-bold text-xl font-mono">+₹67,450</p>
                </div>
                <div className="flex items-center gap-1.5 text-accent-green text-xs font-mono">
                  <Activity size={12} />
                  <span>+462% YTD</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={80}>
                <AreaChart data={equityData}>
                  <defs>
                    <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="pnl"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#pnlGradient)"
                  />
                  <XAxis dataKey="day" hide />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '11px' }}
                    formatter={(v: any) => [`₹${v.toLocaleString()}`, 'P&L']}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* TECH DOMAINS */}
      <section className="py-24 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Engineering Domains"
            title="What I Build"
            description="Specializing in systems that combine AI, automation, and high-performance data infrastructure."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {techDomains.map((domain) => (
              <motion.div
                key={domain.title}
                variants={staggerItem}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group p-5 rounded-xl border border-border-subtle bg-bg-secondary hover:border-border transition-all duration-300 cursor-default"
                style={{
                  background: `linear-gradient(135deg, #0f172a, ${domain.color}06)`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 border"
                  style={{ background: `${domain.color}15`, borderColor: `${domain.color}30` }}
                >
                  {domain.icon}
                </div>
                <h3
                  className="text-text-primary font-bold text-base mb-2 group-hover:text-[var(--domain-color)] transition-colors"
                  style={{ '--domain-color': domain.color } as React.CSSProperties}
                >
                  {domain.title}
                </h3>
                <p className="text-text-muted text-xs leading-relaxed mb-4">{domain.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {domain.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="tech-badge text-xs">{skill}</span>
                  ))}
                  {domain.skills.length > 4 && (
                    <span className="tech-badge text-xs">+{domain.skills.length - 4}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-24 bg-bg-secondary/30 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between mb-12">
            <SectionHeader
              label="Featured Projects"
              title="Engineering Systems"
              description="Production-grade systems built for scale, reliability, and performance."
            />
            <Link to="/projects" className="hidden md:flex btn-secondary mt-2 whitespace-nowrap">
              All Projects <ArrowRight size={14} />
            </Link>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {projects.map((project, i) => (
              <motion.div key={project.id} variants={staggerItem}>
                <ProjectCard project={project} index={i} featured />
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-8 flex justify-center md:hidden">
            <Link to="/projects" className="btn-secondary">
              View All Projects <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* SYSTEM FLOW VISUALIZER */}
      <section className="py-24 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label="System Architecture"
                title="How Zenith Works"
                description="A five-stage pipeline from raw market data to automated execution, powered by AI and real-time decision making."
              />
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="space-y-4"
              >
                {[
                  { icon: <Cpu size={14} />, text: 'XGBoost + LSTM ensemble trained on 84K+ samples' },
                  { icon: <Zap size={14} />, text: '57 engineered features from OHLCV and options chain' },
                  { icon: <BarChart2 size={14} />, text: '74% directional accuracy in live trading' },
                  { icon: <Database size={14} />, text: 'Sub-50ms end-to-end signal latency' },
                ].map(({ icon, text }, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="flex items-center gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue flex-shrink-0">
                      {icon}
                    </div>
                    <span className="text-text-secondary text-sm">{text}</span>
                  </motion.div>
                ))}
              </motion.div>
              <div className="mt-8">
                <Link to="/projects/zenith-ai-trading" className="btn-primary">
                  Explore Architecture <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <SystemFlowDiagram steps={flowSteps} />
          </div>
        </div>
      </section>

      {/* PERFORMANCE METRICS */}
      <section className="py-24 bg-bg-secondary/30 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Live Metrics"
            title="Systems in Numbers"
            description="Real performance data from production systems running live."
            center
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-subtle bg-bg-secondary/50 text-xs text-text-muted font-mono">
              <Activity size={12} className="text-accent-blue" />
              <span>*Metrics derived from strictly validated forward-tested production logs. Live verification available upon request.</span>
            </div>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {[
              { label: 'Signal Accuracy', value: '74%', change: '↑ 6% vs v3', positive: true },
              { label: 'Daily Signals', value: '14', change: '↑ Active' },
              { label: 'MTD P&L', value: '₹67K', change: '+462%', positive: true },
              { label: 'Workflows', value: '24', change: '99.2% uptime', positive: true },
              { label: 'Data Latency', value: '<50ms', change: '↓ p99' },
              { label: 'AI Version', value: 'v4.2', change: 'Production' },
            ].map((m, i) => (
              <motion.div key={m.label} variants={staggerItem}>
                <MetricsCard {...m} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="py-24 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between mb-12">
            <SectionHeader
              label="Engineering Articles"
              title="Recent Writing"
            />
            <Link to="/articles" className="hidden md:flex btn-secondary mt-2">
              All Articles <ArrowRight size={14} />
            </Link>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {articles.map((article) => (
              <motion.article
                key={article.slug}
                variants={staggerItem}
                whileHover={{ y: -5, scale: 1.01 }}
                className="group p-5 rounded-xl border border-border-subtle bg-bg-secondary hover:border-border transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="section-label text-xs">{article.category}</span>
                  <span className="text-text-muted text-xs">·</span>
                  <span className="text-text-muted text-xs font-mono">{article.readTime} min read</span>
                </div>
                <h3 className="text-text-primary font-bold text-base mb-2 leading-snug group-hover:text-accent-blue transition-colors">
                  {article.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.slice(0, 3).map((tag) => (
                      <TechStackBadge key={tag} tech={tag} />
                    ))}
                  </div>
                  <Link
                    to={`/articles/${article.slug}`}
                    className="flex items-center gap-1 text-xs text-accent-blue/70 hover:text-accent-blue transition-colors"
                  >
                    Read <ExternalLink size={11} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ABOUT ME (HUMAN ELEMENT) */}
      <section className="py-24 border-t border-border-subtle bg-bg-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader
            label="Behind The Code"
            title="Hello, I'm Karki"
            center
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8 flex flex-col md:flex-row items-center gap-8 text-left"
          >
            <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full border-2 border-accent-blue/50 p-1 overflow-hidden">
              <div className="w-full h-full bg-bg-tertiary rounded-full overflow-hidden flex items-center justify-center">
                <img src={karkiEmoji} alt="Karki Emoji" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <p className="text-text-secondary text-lg leading-relaxed mb-4">
                I'm a Full Stack Engineer obsessed with pushing the boundaries of what's possible with code. My journey started with a fascination for automation, which evolved into architecting complex data systems, high-throughput microservices, and integrating state-of-the-art AI models.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                When I'm not building robust data pipelines or tuning XGBoost models, I'm exploring new ways to make software more resilient, efficient, and elegant. I believe the best engineering feels like magic to the user, but is built on a foundation of rigorous logic, fault-tolerance, and immutable principles.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-accent-blue hover:text-blue-400 font-medium transition-colors">
                Get to know me better <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <CTA
          title="Let's build something extraordinary"
          description="Looking to collaborate on AI systems, automation infrastructure, or trading technology. Let's engineer something that matters."
          buttonText="Start a Conversation"
          targetUrl="/contact"
        />
      </div>
    </div>
  );
}
