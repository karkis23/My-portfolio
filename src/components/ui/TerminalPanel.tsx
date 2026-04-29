import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { terminalLines } from '../../data';

type LineType = 'cmd' | 'info' | 'success' | 'signal' | 'error';

const lineColors: Record<LineType, string> = {
  cmd: 'text-accent-blue',
  info: 'text-text-secondary',
  success: 'text-accent-green',
  signal: 'text-accent-amber',
  error: 'text-accent-red',
};

const linePrefix: Record<LineType, string> = {
  cmd: '$ ',
  info: '  ',
  success: '✓ ',
  signal: '⚡ ',
  error: '✗ ',
};

interface TerminalPanelProps {
  className?: string;
  autoPlay?: boolean;
  lines?: typeof terminalLines;
}

export default function TerminalPanel({ className = '', autoPlay = true, lines = terminalLines }: TerminalPanelProps) {
  const [visibleLines, setVisibleLines] = useState<typeof terminalLines>([]);
  const [cursor, setCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoPlay || !lines || lines.length === 0) {
      setVisibleLines(lines || []);
      return;
    }

    let isSubscribed = true;
    let index = 0;
    let currentInterval: ReturnType<typeof setInterval>;
    let currentTimeout: ReturnType<typeof setTimeout>;

    const typeLine = () => {
      currentInterval = setInterval(() => {
        if (!isSubscribed) return;
        
        if (index < lines.length) {
          const nextLine = lines[index];
          if (nextLine) {
            setVisibleLines(prev => [...prev, nextLine]);
          }
          index++;
          if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }
        } else {
          clearInterval(currentInterval);
          if (isSubscribed) {
            currentTimeout = setTimeout(() => {
              if (isSubscribed) {
                setVisibleLines([]);
                index = 0;
                typeLine(); // loop
              }
            }, 4000);
          }
        }
      }, 600);
    };

    typeLine();

    return () => {
      isSubscribed = false;
      clearInterval(currentInterval);
      clearTimeout(currentTimeout);
    };
  }, [autoPlay, lines]);

  useEffect(() => {
    const blink = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <motion.div 
      whileHover={{ y: -4, boxShadow: '0 20px 40px -15px rgba(59, 130, 246, 0.15)' }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl overflow-hidden border border-border-subtle bg-bg-secondary shadow-card ${className}`}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-bg-tertiary border-b border-border-subtle">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-accent-red/80" />
          <div className="w-3 h-3 rounded-full bg-accent-amber/80" />
          <div className="w-3 h-3 rounded-full bg-accent-green/80" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-text-muted text-xs font-mono">karki@zenith — main</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-accent-green">
          <span className="dot-online" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Terminal body */}
      <div
        ref={containerRef}
        className="bg-bg-secondary p-4 h-64 overflow-y-auto font-mono text-xs space-y-1 scroll-smooth"
        style={{ scrollbarWidth: 'thin' }}
      >
        {visibleLines.map((line, i) => {
          const colorClass = lineColors[line.type as LineType] || 'text-text-secondary';
          const prefix = linePrefix[line.type as LineType] || '  ';
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`${colorClass} leading-relaxed`}
            >
              <span className="opacity-40 mr-2 text-text-muted">{String(i + 1).padStart(2, '0')}</span>
              <span className={line.type === 'cmd' ? 'text-accent-cyan' : 'opacity-40'}>{prefix}</span>
              {line.text}
            </motion.div>
          );
        })}
        {/* Cursor */}
        <div className="text-accent-blue font-mono text-xs">
          <span className="text-accent-cyan opacity-40">$ </span>
          <span className={`inline-block w-2 h-3.5 bg-accent-blue/80 align-middle ${cursor ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
        </div>
      </div>
    </motion.div>
  );
}
