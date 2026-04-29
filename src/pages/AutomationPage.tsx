import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { CheckCircle2, Settings, AlertCircle } from 'lucide-react';
import { SectionHeader, CodeBlock, MetricsCard } from '../components/ui/UIComponents';
import TerminalPanel from '../components/ui/TerminalPanel';
import SystemFlowDiagram from '../components/ui/SystemFlowDiagram';
import SEO from '../components/SEO';
import CTA from '../components/ui/CTA';
import { projects } from '../data';

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

// Automation Nodes Background
function AutomationBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="node-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="none" />
            <circle cx="50" cy="50" r="4" fill="#3b82f6" opacity="0.5" />
            <path d="M 50 0 L 50 100 M 0 50 L 100 50" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#node-grid)" />
      </svg>
    </div>
  );
}

const automationProject = projects.find(p => p.slug === 'automation-workflow-engine')!;

const workflowCode = `// n8n Workflow: AI Signal + Order Execution
{
  "name": "Zenith Signal → Execution",
  "nodes": [
    {
      "type": "n8n-nodes-base.webhook",
      "name": "Signal Trigger",
      "parameters": { "path": "/signal", "method": "POST" }
    },
    {
      "type": "n8n-nodes-base.function",
      "name": "Validate Signal",
      "parameters": {
        "code": "const { signal, confidence, risk } = items[0].json;\\nif (confidence < 0.70 || risk > 0.40) return [];\\nreturn items;"
      }
    },
    {
      "type": "n8n-nodes-base.httpRequest",
      "name": "Place Order",
      "parameters": { "url": "https://api.zerodha.com/orders", "method": "POST" }
    }
  ]
}`;

const automationFlowSteps = [
  { id: '1', label: 'Event Trigger', description: 'Webhook, schedule, or API event', icon: '📡', color: '#06b6d4' },
  { id: '2', label: 'Input Validation', description: 'Schema validation and sanitization', icon: '✅', color: '#3b82f6' },
  { id: '3', label: 'Business Logic', description: 'Custom code node processing', icon: '⚙️', color: '#8b5cf6' },
  { id: '4', label: 'External Actions', description: 'API calls, database updates', icon: '🔗', color: '#f59e0b' },
  { id: '5', label: 'Notification', description: 'Slack/email alerts on completion', icon: '🔔', color: '#10b981' },
];

const automationTerminalLines = [
  { type: 'cmd', text: 'n8n --workflows --status' },
  { type: 'success', text: '[n8n] Instance: ONLINE | Version: 1.30.0' },
  { type: 'info', text: '[WORKFLOW] Signal Trigger → active | executions: 1,247' },
  { type: 'info', text: '[WORKFLOW] Data Sync → active | executions: 340' },
  { type: 'info', text: '[WORKFLOW] Error Reporter → active | executions: 12' },
  { type: 'cmd', text: 'n8n --latest-executions --count 3' },
  { type: 'success', text: '[EXEC #1247] Signal Trigger → SUCCESS | 312ms' },
  { type: 'success', text: '[EXEC #1246] Data Sync → SUCCESS | 841ms' },
  { type: 'signal', text: '[EXEC #1244] Error Reporter → RETRY | attempt 2/3' },
  { type: 'success', text: '[HEALTH] Queue: 0 pending | Error rate: 0.8%' },
];

export default function AutomationPage() {
  return (
    <div className="min-h-screen py-20 relative">
      <SEO title="Automation" description="Enterprise-grade automation pipelines using n8n and custom orchestration." />
      <AutomationBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent-green/50" />
            <span className="section-label text-accent-green/70">Automation Systems</span>
          </div>
          <h1 className="text-text-primary font-black text-5xl mb-4">
            Workflow <span className="text-accent-green">Automation</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
            Building enterprise-grade automation pipelines using n8n as the orchestration layer. 
            From simple data syncs to complex multi-system workflows with error recovery.
          </p>
        </motion.div>

        {/* Metrics */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
        >
          {[
            { label: 'Active Workflows', value: '24', positive: true },
            { label: 'Daily Executions', value: '1,247', change: '↑ 8% week', positive: true },
            { label: 'Success Rate', value: '99.2%', positive: true },
            { label: 'Avg Latency', value: '340ms', change: 'p50' },
          ].map((m, i) => (
            <motion.div key={m.label} variants={staggerItem}>
              <MetricsCard {...m} index={i} />
            </motion.div>
          ))}
        </motion.div>

        {/* Main content grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid lg:grid-cols-2 gap-12 mb-20"
        >
          <motion.div variants={staggerItem}>
            <h2 className="text-text-primary font-bold text-2xl mb-6">Automation Architecture</h2>
            <SystemFlowDiagram steps={automationFlowSteps} />
          </motion.div>
          <motion.div variants={staggerItem}>
            <h2 className="text-text-primary font-bold text-2xl mb-6">Live System Status</h2>
            <TerminalPanel lines={automationTerminalLines} />
          </motion.div>
        </motion.div>

        {/* Features */}
        <div className="mb-16">
          <SectionHeader label="Engineering" title="Automation Capabilities" />
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {(automationProject?.features || []).map((feat, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex items-start gap-3 p-4 rounded-xl bg-bg-secondary border border-border-subtle"
              >
                <CheckCircle2 size={15} className="text-accent-green flex-shrink-0 mt-0.5" />
                <span className="text-text-secondary text-sm">{feat}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Code */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16"
        >
          <motion.h2 variants={staggerItem} className="text-text-primary font-bold text-2xl mb-6">Sample Workflow Definition</motion.h2>
          <motion.div variants={staggerItem}>
            <CodeBlock code={workflowCode} language="json" filename="workflows/zenith-signal-execution.json" />
          </motion.div>
        </motion.div>

        {/* Design principles */}
        <div className="mb-16">
          <SectionHeader label="Design Principles" title="Building Resilient Automation" />
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-3 gap-5"
          >
            {[
              {
                icon: <CheckCircle2 size={18} className="text-accent-green" />,
                title: 'Idempotent Operations',
                desc: 'Every workflow step is designed to be safely retried without side effects.',
              },
              {
                icon: <AlertCircle size={18} className="text-accent-amber" />,
                title: 'Error Recovery',
                desc: 'Dead letter queues, exponential backoff, and Slack alerts on failures.',
              },
              {
                icon: <Settings size={18} className="text-accent-blue" />,
                title: 'Observable by Default',
                desc: 'Structured logging, execution metrics, and real-time Grafana dashboards.',
              },
            ].map(({ icon, title, desc }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="p-5 rounded-xl bg-bg-secondary border border-border-subtle"
              >
                <div className="w-10 h-10 rounded-lg bg-bg-tertiary border border-border-subtle flex items-center justify-center mb-4">
                  {icon}
                </div>
                <h3 className="text-text-primary font-bold text-sm mb-2">{title}</h3>
                <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <CTA 
          title="Need to automate complex workflows?" 
          description="From simple data syncs to enterprise-grade integrations, let's streamline your operations."
        />
      </div>
    </div>
  );
}
