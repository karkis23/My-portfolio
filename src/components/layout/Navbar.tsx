import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Menu, X, Cpu, GitBranch, Zap, BookOpen, Mail, Home, ChevronRight } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects', icon: GitBranch },
  { href: '/automation', label: 'Automation', icon: Zap },
  { href: '/ai', label: 'AI Systems', icon: Cpu },
  { href: '/architecture', label: 'Architecture', icon: Terminal },
  { href: '/articles', label: 'Articles', icon: BookOpen },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-bg-primary/95 backdrop-blur-xl border-b border-border-subtle shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 rounded-lg bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center group-hover:border-accent-blue transition-all">
                <Terminal size={16} className="text-accent-blue" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent-green dot-online" />
              </div>
              <div>
                <span className="text-text-primary font-bold text-sm font-mono">KARKI</span>
                <span className="text-accent-blue font-bold text-sm font-mono">.DEV</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = location.pathname === link.href || 
                  (link.href !== '/' && location.pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`nav-link px-3 py-2 rounded-lg hover:bg-bg-secondary transition-all ${
                      active ? 'text-accent-blue bg-accent-blue/5' : ''
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-px bg-accent-blue"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-mono text-accent-green">
                <span className="dot-online" />
                <span>Available for work</span>
              </div>
              <Link to="/contact" className="btn-primary text-xs py-2">
                Hire Me <ChevronRight size={14} />
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-all"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-bg-primary/98 backdrop-blur-xl border-b border-border-subtle"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = location.pathname === link.href ||
                  (link.href !== '/' && location.pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      active
                        ? 'bg-accent-blue/10 text-accent-blue'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="font-medium text-sm">{link.label}</span>
                  </Link>
                );
              })}
              <div className="border-t border-border-subtle mt-2 pt-4 px-4">
                <div className="flex items-center gap-1.5 text-xs font-mono text-accent-green mb-3">
                  <span className="dot-online" />
                  <span>Available for work</span>
                </div>
                <Link to="/contact" className="btn-primary w-full justify-center">
                  Get in Touch <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
