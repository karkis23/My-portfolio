import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index?: number;
  featured?: boolean;
}

const categoryColors: Record<string, string> = {
  ai: 'text-accent-purple border-accent-purple/30 bg-accent-purple/10',
  automation: 'text-accent-green border-accent-green/30 bg-accent-green/10',
  trading: 'text-accent-blue border-accent-blue/30 bg-accent-blue/10',
  data: 'text-accent-amber border-accent-amber/30 bg-accent-amber/10',
  infrastructure: 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10',
};

const statusColors: Record<string, string> = {
  production: 'text-accent-green',
  development: 'text-accent-amber',
  research: 'text-accent-blue',
};

export default function ProjectCard({ project, index = 0, featured = false }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group relative rounded-xl border border-border-subtle bg-bg-secondary
        hover:border-border hover:shadow-card-hover transition-all duration-300
        ${featured ? 'p-6' : 'p-5'}`}
    >
      {/* Gradient accent */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(200px circle at 50% 0%, ${project.color}08 0%, transparent 70%)`,
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl border"
            style={{
              background: `${project.color}15`,
              borderColor: `${project.color}30`,
            }}
          >
            {project.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`text-xs font-mono font-medium capitalize px-2 py-0.5 rounded border ${categoryColors[project.category]}`}>
                {project.category}
              </span>
              <span className={`flex items-center gap-1 text-xs font-mono ${statusColors[project.status]}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
                {project.status}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {project.links?.github && (
            <a href={project.links.github} className="p-1.5 rounded-lg hover:bg-bg-tertiary text-text-muted hover:text-text-primary transition-all">
              <Github size={14} />
            </a>
          )}
          {project.links?.demo && (
            <a href={project.links.demo} className="p-1.5 rounded-lg hover:bg-bg-tertiary text-text-muted hover:text-text-primary transition-all">
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Name & description */}
      <h3 className="text-text-primary font-bold text-base mb-1 group-hover:text-accent-blue transition-colors">
        {project.name}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Metrics */}
      {project.metrics && Object.entries(project.metrics).length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {Object.entries(project.metrics).slice(0, 3).map(([key, value]) => (
            <div key={key} className="bg-bg-tertiary rounded-lg p-2 flex flex-col justify-center text-center border border-border-subtle min-h-[64px] overflow-hidden">
              <div className="text-text-primary font-bold text-sm font-mono truncate w-full px-1" title={String(value)}>{value}</div>
              <div className="text-text-muted text-[11px] mt-0.5 truncate w-full px-1" title={key}>{key}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.slice(0, 5).map((tech) => (
          <span key={tech} className="tech-badge">{tech}</span>
        ))}
        {project.tech.length > 5 && (
          <span className="tech-badge">+{project.tech.length - 5}</span>
        )}
      </div>

      {/* CTA */}
      <Link
        to={`/projects/${project.slug}`}
        className="flex items-center gap-1.5 text-sm font-medium text-accent-blue/70 hover:text-accent-blue transition-colors group/link"
      >
        View case study
        <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
      </Link>
    </motion.div>
  );
}
