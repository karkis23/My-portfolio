import { Link } from 'react-router-dom';
import { Terminal, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center">
                <Terminal size={16} className="text-accent-blue" />
              </div>
              <span className="font-bold font-mono">
                <span className="text-text-primary">KARKI</span>
                <span className="text-accent-blue">.DEV</span>
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm mb-5">
              Building AI systems, automation frameworks, and trading technology. 
              Focused on engineering depth, system reliability, and technical excellence.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: 'https://github.com/karkis23?tab=repositories', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/karki-senthil-kumar-444230180/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:karkisenthilkumar@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-border-subtle flex items-center justify-center
                    text-text-muted hover:text-accent-blue hover:border-accent-blue/50 transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/projects', label: 'Projects' },
                { href: '/automation', label: 'Automation' },
                { href: '/ai', label: 'AI Systems' },
                { href: '/architecture', label: 'Architecture' },
                { href: '/articles', label: 'Articles' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors flex items-center gap-1 group"
                  >
                    {label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Systems Status */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-4">System Status</h4>
            <div className="space-y-2.5">
              {[
                { name: 'Zenith AI Engine', status: 'operational', color: 'bg-accent-green' },
                { name: 'Data Pipeline', status: 'operational', color: 'bg-accent-green' },
                { name: 'Automation (n8n)', status: 'operational', color: 'bg-accent-green' },
                { name: 'Monitoring', status: 'operational', color: 'bg-accent-green' },
              ].map(({ name, status, color }) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-text-secondary text-xs">{name}</span>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
                    <span className="text-text-muted text-xs capitalize">{status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border-subtle mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs font-mono">
            © 2026 Karki.dev — Built with React, TypeScript, TailwindCSS
          </p>
          <p className="text-text-muted text-xs font-mono">
            <span className="text-accent-green">●</span> All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
