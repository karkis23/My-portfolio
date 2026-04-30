import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Mail, Github, Linkedin, Phone, Send, MapPin, Clock, CheckCircle2, Check, Copy } from 'lucide-react';
import SEO from '../components/SEO';

const socialLinks = [
  { icon: Github, label: 'GitHub', url: 'https://github.com/karkis23?tab=repositories', handle: '@karkis23', color: '#a8b3cf' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/karki-senthil-kumar-444230180/', handle: '/in/karki-senthil-kumar-444230180', color: '#0a66c2' },
  { icon: Phone, label: 'Phone', url: '#', handle: '+91 7010251160', color: '#1d9bf0', copyValue: '+917010251160' },
  { icon: Mail, label: 'Email', url: '#', handle: 'karkisenthilkumar@gmail.com', color: '#10b981', copyValue: 'karkisenthilkumar@gmail.com' },
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

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, label: string, value: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(value);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Using FormSubmit.co for free form to email routing
      const response = await fetch("https://formsubmit.co/ajax/karkisenthilkumar@gmail.com", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
            _captcha: "false" // Disable recaptcha for seamless UI
        })
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("FormSubmit Error");
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen py-20">
      <SEO title="Contact" description="Get in touch. Open to collaboration on AI systems, automation projects, and trading technology." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent-blue/50" />
            <span className="section-label">Let's Work Together</span>
          </div>
          <h1 className="text-text-primary font-black text-5xl mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            Open to collaboration on AI systems, automation projects, and trading technology. 
            Let's build something exceptional together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-accent-green/10 border border-accent-green/30 flex items-center justify-center mb-4">
                  <CheckCircle2 size={28} className="text-accent-green" />
                </div>
                <h2 className="text-text-primary font-bold text-xl mb-2">Message Sent!</h2>
                <p className="text-text-muted">I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="btn-secondary mt-6"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-text-secondary text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-subtle text-text-primary
                        placeholder-text-muted text-sm focus:outline-none focus:border-accent-blue transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-text-secondary text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-subtle text-text-primary
                        placeholder-text-muted text-sm focus:outline-none focus:border-accent-blue transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Project collaboration, consulting, etc."
                    className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-subtle text-text-primary
                      placeholder-text-muted text-sm focus:outline-none focus:border-accent-blue transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project, what you're building, and how I can help..."
                    className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-subtle text-text-primary
                      placeholder-text-muted text-sm focus:outline-none focus:border-accent-blue transition-colors resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center py-3 text-base">
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Availability */}
            <motion.div variants={staggerItem} className="p-5 rounded-xl bg-bg-secondary border border-border-subtle">
              <div className="flex items-center gap-2 mb-4">
                <span className="dot-online" />
                <h3 className="text-text-primary font-bold text-sm">Currently Available</h3>
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                Open to freelance projects, consulting work, and full-time opportunities in AI, automation, and trading technology.
              </p>
              <div className="space-y-2">
                {[
                  { icon: MapPin, text: 'Chennai - 603202, India' },
                  { icon: Clock, text: 'Response time: ~12 hours' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-text-muted text-sm">
                    <Icon size={13} className="text-accent-blue" />
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div variants={staggerItem} className="p-5 rounded-xl bg-bg-secondary border border-border-subtle">
              <h3 className="text-text-primary font-bold text-sm mb-4">Connect</h3>
              <div className="space-y-3">
                {socialLinks.map(({ icon: Icon, label, url, handle, color, copyValue }) => {
                  const isCopied = copiedItem === label;
                  return (
                    <a
                      key={label}
                      href={copyValue ? '#' : url}
                      onClick={copyValue ? (e) => handleCopy(e, label, copyValue) : undefined}
                      target={copyValue ? undefined : "_blank"}
                      rel={copyValue ? undefined : "noopener noreferrer"}
                      className="flex items-center justify-between p-3 rounded-lg border border-border-subtle hover:border-border transition-all group bg-bg-secondary hover:bg-bg-tertiary cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                        >
                          <Icon size={14} style={{ color }} />
                        </div>
                        <div>
                          <div className="text-text-primary text-xs font-semibold">{label}</div>
                          <div className="text-text-muted text-xs font-mono">{handle}</div>
                        </div>
                      </div>
                      {copyValue && (
                        <div className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                          {isCopied ? (
                            <div className="flex items-center gap-1 text-accent-green text-xs font-medium">
                              <Check size={14} /> Copied
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-xs">
                              <Copy size={14} /> Copy
                            </div>
                          )}
                        </div>
                      )}
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div variants={staggerItem} className="p-5 rounded-xl bg-bg-secondary border border-border-subtle">
              <h3 className="text-text-primary font-bold text-sm mb-4">I'm Interested In</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'FastAPI', 'XGBoost', 'React', 'TypeScript', 'TailwindCSS', 'n8n', 'Node.js', 'Supabase', 'Sanity.io', 'Pandas', 'JavaScript', 'HTML5/CSS3', 'AI Agents', 'LLMs', 'Automation', 'Data Pipelines'].map((tag) => (
                  <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-bg-tertiary border border-border-subtle text-text-secondary">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
