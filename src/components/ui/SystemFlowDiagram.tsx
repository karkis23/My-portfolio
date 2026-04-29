import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface FlowStep {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string;
}

interface SystemFlowDiagramProps {
  steps: FlowStep[];
  title?: string;
}

export default function SystemFlowDiagram({ steps, title }: SystemFlowDiagramProps) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-text-primary font-bold text-lg mb-8 text-center">{title}</h3>
      )}
      <div className="flex flex-col items-center gap-0">
        {steps.map((step, i) => (
          <div key={step.id} className="flex flex-col items-center w-full max-w-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="w-full rounded-xl border p-4 bg-bg-secondary transition-all duration-200 hover:shadow-card cursor-default"
              style={{ borderColor: `${step.color}30` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl border flex-shrink-0"
                  style={{
                    background: `${step.color}15`,
                    borderColor: `${step.color}30`,
                  }}
                >
                  {step.icon}
                </div>
                <div>
                  <div className="text-text-primary font-semibold text-sm">{step.label}</div>
                  <div className="text-text-muted text-xs mt-0.5">{step.description}</div>
                </div>
                <div className="ml-auto">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: step.color,
                      boxShadow: `0 0 8px ${step.color}`,
                      animation: 'pulse 2s ease-in-out infinite',
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Arrow connector */}
            {i < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                className="flex flex-col items-center my-1"
              >
                <div className="w-px h-4 bg-gradient-to-b from-border to-border-bright" />
                <ArrowDown size={12} className="text-text-muted" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
