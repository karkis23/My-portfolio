import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { BarChart2, Brain, Layers, TrendingUp } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { SectionHeader, MetricsCard, CodeBlock } from '../components/ui/UIComponents';
import TerminalPanel from '../components/ui/TerminalPanel';
import SEO from '../components/SEO';
import CTA from '../components/ui/CTA';

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

// AI Network Background
function AINetworkBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="ai-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <rect width="120" height="120" fill="none" />
            <circle cx="20" cy="20" r="3" fill="#8b5cf6" opacity="0.6" />
            <circle cx="100" cy="40" r="2" fill="#8b5cf6" opacity="0.4" />
            <circle cx="60" cy="100" r="4" fill="#a855f7" opacity="0.5" />
            <polygon points="20,20 100,40 60,100" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.1" />
            <line x1="20" y1="20" x2="60" y2="100" stroke="#8b5cf6" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ai-grid)" />
      </svg>
    </div>
  );
}

const modelPerformanceData = [
  { feature: 'Accuracy', score: 74 },
  { feature: 'Precision', score: 71 },
  { feature: 'Recall', score: 68 },
  { feature: 'F1 Score', score: 69 },
  { feature: 'ROC AUC', score: 79 },
  { feature: 'Sharpe', score: 82 },
];

const featureImportance = [
  { name: 'RSI_14', importance: 0.142 },
  { name: 'OI_Change', importance: 0.128 },
  { name: 'IV_Skew', importance: 0.115 },
  { name: 'ATR_14', importance: 0.098 },
  { name: 'VWAP_Dev', importance: 0.087 },
  { name: 'BB_Width', importance: 0.076 },
  { name: 'Streak', importance: 0.071 },
  { name: 'PCR', importance: 0.063 },
];

const modelCode = `# Zenith AI — XGBoost + LSTM Ensemble
import xgboost as xgb
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
import numpy as np

class EnsemblePredictor:
    def __init__(self):
        self.xgb = xgb.XGBClassifier(
            n_estimators=500, max_depth=6,
            learning_rate=0.05, subsample=0.8,
            eval_metric='auc', use_label_encoder=False
        )
        self.lstm = self._build_lstm()
        
    def _build_lstm(self):
        model = Sequential([
            LSTM(128, return_sequences=True, input_shape=(30, 57)),
            Dropout(0.2),
            LSTM(64, return_sequences=False),
            Dropout(0.2),
            Dense(32, activation='relu'),
            Dense(1, activation='sigmoid'),
        ])
        model.compile(optimizer='adam', loss='binary_crossentropy')
        return model
    
    def predict_ensemble(self, features: np.ndarray) -> dict:
        xgb_prob = self.xgb.predict_proba(features[-1:])[0][1]
        lstm_prob = self.lstm.predict(features[-30:].reshape(1,30,57))[0][0]
        # Weighted ensemble: XGBoost 60%, LSTM 40%
        ensemble_prob = 0.6 * xgb_prob + 0.4 * float(lstm_prob)
        return {
            "signal": "LONG" if ensemble_prob > 0.5 else "SHORT",
            "confidence": abs(ensemble_prob - 0.5) * 2,
            "xgb_prob": float(xgb_prob),
            "lstm_prob": float(lstm_prob),
        }`;

const aiTerminalLines = [
  { type: 'cmd', text: 'zenith-ai --model v4.2 --status' },
  { type: 'success', text: '[MODEL] XGBoost v4.2 + LSTM v2.1 — LOADED' },
  { type: 'info', text: '[STATS] Training samples: 84,230 | Features: 57' },
  { type: 'info', text: '[PERF]  Accuracy: 74.2% | AUC-ROC: 0.79 | F1: 0.69' },
  { type: 'cmd', text: 'zenith-ai --predict --symbol NIFTY --interval 5m' },
  { type: 'success', text: '[FEAT]  Features extracted: 57 | Latency: 12ms' },
  { type: 'signal', text: '[XGB]   P(Bull): 0.782 | P(Bear): 0.218' },
  { type: 'signal', text: '[LSTM]  P(Bull): 0.731 | P(Bear): 0.269' },
  { type: 'success', text: '[ENSEMBLE] Signal: LONG | Confidence: 0.82 | Risk: 0.31' },
  { type: 'info', text: '[SHAP]  Top features: RSI_14, OI_Change, IV_Skew' },
];

export default function AIPage() {
  return (
    <div className="min-h-screen py-20 relative">
      <SEO title="AI Systems" description="Production machine learning systems from raw feature engineering to deployment." />
      <AINetworkBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent-purple/50" />
            <span className="section-label text-accent-purple/70">AI Systems</span>
          </div>
          <h1 className="text-text-primary font-black text-5xl mb-4">
            AI / <span className="text-accent-purple">ML Engineering</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            Building production machine learning systems — from raw feature engineering to 
            ensemble model deployment with explainability and continuous retraining.
          </p>
        </motion.div>

        {/* Metrics */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-16"
        >
          {[
            { label: 'Accuracy', value: '74.2%', positive: true },
            { label: 'AUC-ROC', value: '0.79', positive: true },
            { label: 'F1 Score', value: '0.69', positive: true },
            { label: 'Training Samples', value: '84K+' },
            { label: 'Features', value: '57' },
          ].map((m, i) => (
            <motion.div key={m.label} variants={staggerItem}>
              <MetricsCard {...m} index={i} />
            </motion.div>
          ))}
        </motion.div>

        {/* Charts grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          {/* Radar chart */}
          <motion.div variants={staggerItem} className="p-5 rounded-xl bg-bg-secondary border border-border-subtle">
            <h3 className="text-text-primary font-bold text-base mb-4 flex items-center gap-2">
              <BarChart2 size={16} className="text-accent-purple" />
              Model Performance Radar
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={modelPerformanceData} outerRadius={90}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="feature" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Feature importance */}
          <motion.div variants={staggerItem} className="p-5 rounded-xl bg-bg-secondary border border-border-subtle">
            <h3 className="text-text-primary font-bold text-base mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-accent-blue" />
              Top Feature Importance (SHAP)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={featureImportance} layout="vertical" barSize={10}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }} width={75} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '11px' }}
                />
                <Bar dataKey="importance" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>

        {/* Terminal & code */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          <motion.div variants={staggerItem}>
            <h2 className="text-text-primary font-bold text-xl mb-5">Live Inference</h2>
            <TerminalPanel lines={aiTerminalLines} />
          </motion.div>
          <motion.div variants={staggerItem}>
            <h2 className="text-text-primary font-bold text-xl mb-5">Ensemble Architecture</h2>
            <CodeBlock code={modelCode} language="python" filename="ai/predictor.py" />
          </motion.div>
        </motion.div>

        {/* Pipeline stages */}
        <div className="mb-16">
          <SectionHeader label="ML Pipeline" title="End-to-End AI Pipeline" />
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { icon: <Layers size={20} className="text-accent-cyan" />, title: 'Data Collection', desc: '3yr+ tick data, options chain, OI, IV from NSE/BSE feeds', color: '#06b6d4' },
              { icon: <Brain size={20} className="text-accent-blue" />, title: 'Feature Engineering', desc: '57 features: technical indicators, market microstructure, sentiment', color: '#3b82f6' },
              { icon: <BarChart2 size={20} className="text-accent-purple" />, title: 'Model Training', desc: 'XGBoost + LSTM ensemble, walk-forward validation, Optuna tuning', color: '#8b5cf6' },
              { icon: <TrendingUp size={20} className="text-accent-green" />, title: 'Deployment & Monitoring', desc: 'MLflow versioning, drift detection, auto-retraining pipeline', color: '#10b981' },
            ].map(({ icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="p-5 rounded-xl bg-bg-secondary border border-border-subtle hover:border-border transition-all"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                  {icon}
                </div>
                <div className="text-xs font-mono text-text-muted mb-1">STAGE {i + 1}</div>
                <h3 className="text-text-primary font-bold text-sm mb-2">{title}</h3>
                <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <CTA 
          title="Looking to integrate AI into your product?" 
          description="Whether it's predictive modeling, natural language processing, or an autonomous trading system, I can design the architecture and build the pipeline."
          buttonText="Discuss Your Use Case"
        />
      </div>
    </div>
  );
}
