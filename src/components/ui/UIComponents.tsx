import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MetricsCardProps {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon?: ReactNode;
  color?: string;
  index?: number;
}

export function MetricsCard({ label, value, change, positive, icon, color = '#3b82f6', index = 0 }: MetricsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="metric-card group hover:border-border transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-text-muted text-xs font-medium uppercase tracking-wide">{label}</span>
        {icon && (
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center opacity-70"
            style={{ background: `${color}20`, border: `1px solid ${color}30` }}
          >
            <span style={{ color }}>{icon}</span>
          </div>
        )}
      </div>
      <div className="text-text-primary font-bold text-2xl font-mono mb-1">{value}</div>
      {change && (
        <div className={`text-xs font-medium flex items-center gap-1 ${positive ? 'text-accent-green' : 'text-accent-red'}`}>
          <span>{positive ? '↑' : '↓'}</span>
          {change}
        </div>
      )}
    </motion.div>
  );
}

interface TechStackBadgeProps {
  tech: string;
  active?: boolean;
}

export function TechStackBadge({ tech, active = false }: TechStackBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-mono font-medium transition-all duration-200 cursor-default
        ${active
          ? 'bg-accent-blue/10 border-accent-blue/40 text-accent-blue'
          : 'bg-bg-tertiary border-border-subtle text-text-secondary hover:border-border hover:text-text-primary'
        }`}
    >
      {tech}
    </span>
  );
}

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  center?: boolean;
}

export function SectionHeader({ label, title, description, center = false }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${center ? 'text-center' : ''}`}
    >
      <div className={`flex items-center gap-3 mb-3 ${center ? 'justify-center' : ''}`}>
        <div className="h-px w-8 bg-accent-blue/50" />
        <span className="section-label">{label}</span>
        <div className="h-px w-8 bg-accent-blue/50" />
      </div>
      <h2 className="text-text-primary font-bold text-3xl md:text-4xl mb-3 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = 'python', filename }: CodeBlockProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-border-subtle">
      {filename && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-bg-tertiary border-b border-border-subtle">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-accent-red/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent-amber/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent-green/70" />
          </div>
          <span className="text-text-muted text-xs font-mono ml-2">{filename}</span>
          <span className="ml-auto text-text-muted text-xs font-mono opacity-50">{language}</span>
        </div>
      )}
      <pre className="bg-bg-secondary p-4 overflow-x-auto font-mono text-xs text-text-secondary leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
