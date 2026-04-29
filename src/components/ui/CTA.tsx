import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface CTAProps {
  title: string;
  description: string;
  buttonText?: string;
  targetUrl?: string;
}

export default function CTA({ title, description, buttonText = "Let's Talk", targetUrl = "/contact" }: CTAProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="relative mt-24 mb-12 rounded-3xl p-1 overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/40 via-accent-cyan/40 to-accent-green/40 opacity-50 blur-xl group-hover:opacity-75 transition-opacity duration-500" />
      <div className="relative glass-strong p-8 md:p-12 rounded-[22px] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left z-10 border border-border/50">
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h3>
          <p className="text-text-secondary max-w-xl text-lg">{description}</p>
        </div>
        <button
          onClick={() => navigate(targetUrl)}
          className="btn-primary group/btn items-center justify-center shrink-0 w-full md:w-auto shadow-glow-blue"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
