// Project type definitions
export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: 'ai' | 'automation' | 'trading' | 'data' | 'infrastructure';
  status: 'production' | 'development' | 'research';
  tech: string[];
  features: string[];
  metrics?: Record<string, string | number>;
  architecture?: ArchNode[];
  links?: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  color: string;
  icon: string;
}

export interface ArchNode {
  id: string;
  label: string;
  description: string;
  type: 'input' | 'process' | 'ai' | 'output' | 'database' | 'monitor';
  position: { x: number; y: number };
  connections: string[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  category: string;
}

export interface Metric {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  unit?: string;
}

export interface TechDomain {
  title: string;
  description: string;
  skills: string[];
  icon: string;
  color: string;
}
