import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  X,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  MessageSquare,
  Zap,
  Target,
  DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AISolutionAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RecommendationResult {
  analysis: string;
  recommendedPackage: string;
  actionPlan: string[];
  estimatedRoi: string;
}

const PRESET_PROBLEMS = [
  "Low Instagram reach and zero views on Reels",
  "High Meta Ad spend with zero qualified sales calls",
  "Need automated DM lead capture & custom ERP sync",
  "Outdated visual branding and weak social authority"
];

export const AISolutionAssistant: React.FC<AISolutionAssistantProps> = ({
  isOpen,
  onClose,
}) => {
  const [problemText, setProblemText] = useState('');
  const [industry, setIndustry] = useState('');
  const [budget, setBudget] = useState('₹5,000 - ₹10,000/mo');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Lock background body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemText.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/ai-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemText, industry, budget }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch recommendation from AI engine.');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error('AI Recommendation Error:', err);
      setError('Connection notice: Operating on P2S Intelligent Growth Engine fallback.');
      
      // Fallback result if API is unreachable
      let fallbackPkg = 'Growth Package (₹12,000/mo)';
      if (budget.includes('Under') || budget.includes('5,000')) {
        fallbackPkg = 'Basic Package (₹4,000/mo)';
      } else if (budget.includes('20,000')) {
        fallbackPkg = 'Premium Package (₹16,000/mo)';
      }

      setResult({
        analysis: `Your business in ${industry || 'your industry'} faces growth stagnation caused by content reach bottlenecks and unoptimized direct-response funnels.`,
        recommendedPackage: fallbackPkg,
        actionPlan: [
          'Audit current video assets & script 12 high-retention short-form reels.',
          'Deploy multi-angle Meta & TikTok performance ads targeting buyer intent.',
          'Set up automated lead capture workflows to convert traffic directly into bookings.'
        ],
        estimatedRoi: '3.4x Pipeline Expansion in 60 Days'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApplyRecommendation = () => {
    onClose();
    navigate('/contact', {
      state: {
        prefilledProblem: problemText,
        prefilledPackage: result?.recommendedPackage,
      },
    });
  };

  const handleWhatsAppChat = () => {
    const text = `Hello P2S Team! I ran your AI Solution Finder for: "${problemText}". Recommended: ${result?.recommendedPackage || 'Growth Package'}. I would like to schedule a strategy call.`;
    const url = `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-0"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#181D27] border border-[#2589D0]/60 rounded-3xl shadow-[0_0_60px_rgba(37,137,208,0.35)] overflow-hidden z-10 my-auto text-white flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-[#0F172A]/90 shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-[#2589D0]/20 border border-[#2589D0]/50 text-[#2589D0] shadow-inner">
                  <Bot className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-['Outfit'] font-extrabold text-lg sm:text-xl text-white">
                      P2S AI Solution Finder
                    </h3>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#2589D0]/20 text-cyan-300 border border-[#2589D0]/40 uppercase font-bold tracking-wider">
                      LIVE DIAGNOSTIC
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mt-0.5">
                    Describe your growth bottleneck for an instant customized agency roadmap.
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
              {!result ? (
                /* FORM VIEW */
                <form onSubmit={handleDiagnose} className="space-y-5">
                  
                  {/* Preset Quick Chips */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                      Select A Common Pain Point or Type Below:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_PROBLEMS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setProblemText(preset)}
                          className="text-[11px] px-3 py-1.5 rounded-lg bg-[#0F172A] border border-white/10 hover:border-[#2589D0] text-gray-300 hover:text-white transition-all cursor-pointer text-left"
                        >
                          + {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 1: Textarea */}
                  <div>
                    <label className="block text-xs font-mono text-gray-200 uppercase tracking-wider mb-2 font-bold flex items-center justify-between">
                      <span>1. What is your primary business challenge / goal? *</span>
                      <span className="text-[10px] font-normal text-gray-400">Required</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={problemText}
                      onChange={(e) => setProblemText(e.target.value)}
                      placeholder="e.g. We get traffic on Instagram but no DMs, or our Meta ads CPA is too high with zero sales calls."
                      className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2589D0] focus:ring-1 focus:ring-[#2589D0] transition-all leading-relaxed"
                    />
                  </div>

                  {/* Step 2: Industry & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
                        2. Industry Vertical
                      </label>
                      <input
                        type="text"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        placeholder="e.g. E-Commerce, SaaS, Fitness"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2589D0] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
                        3. Target Monthly Budget
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-sm text-white focus:outline-none focus:border-[#2589D0] transition-colors cursor-pointer"
                      >
                        <option value="Under ₹5,000/mo" className="bg-[#0F172A] text-white">
                          Under ₹5,000/mo (Starter)
                        </option>
                        <option value="₹5,000 - ₹10,000/mo" className="bg-[#0F172A] text-white">
                          ₹5,000 - ₹10,000/mo (Basic / Expert)
                        </option>
                        <option value="₹10,000 - ₹20,000/mo" className="bg-[#0F172A] text-white">
                          ₹10,000 - ₹20,000/mo (Growth Engine)
                        </option>
                        <option value="₹20,000+/mo" className="bg-[#0F172A] text-white">
                          ₹20,000+/mo (Enterprise Scale)
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading || !problemText.trim()}
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-['Outfit'] font-bold text-base text-white bg-gradient-to-r from-[#2589D0] via-cyan-600 to-[#2589D0] hover:from-cyan-500 hover:to-[#2589D0] disabled:opacity-50 shadow-[0_0_30px_rgba(37,137,208,0.5)] transition-all cursor-pointer min-h-[48px]"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin text-cyan-300" />
                          <span>P2S Engine Diagnostic In Progress...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 text-yellow-300" />
                          <span>Generate Custom P2S Solution Roadmap</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-gray-400 text-center mt-2">
                      Instant response powered by Google Gemini & P2S Agency Growth Logic.
                    </p>
                  </div>
                </form>
              ) : (
                /* DIAGNOSTIC RESULTS VIEW */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-5"
                >
                  {/* Analysis Box */}
                  <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#2589D0]/40 space-y-2">
                    <span className="text-xs font-mono text-[#2589D0] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                      <TrendingUp className="w-4 h-4" />
                      Root Cause Diagnostic
                    </span>
                    <p className="text-sm text-gray-200 leading-relaxed font-normal">
                      {result.analysis}
                    </p>
                  </div>

                  {/* Recommended Package Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#2589D0]/20 to-cyan-500/10 border border-[#2589D0]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest block font-bold">
                        RECOMMENDED STRATEGY TIER
                      </span>
                      <span className="font-['Outfit'] font-black text-xl text-white block mt-0.5">
                        {result.recommendedPackage}
                      </span>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold">
                        PROJECTED OUTCOME
                      </span>
                      <span className="font-mono font-bold text-sm text-emerald-400 block mt-0.5">
                        {result.estimatedRoi}
                      </span>
                    </div>
                  </div>

                  {/* Action Plan */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold block">
                      Recommended 3-Step Execution Roadmap
                    </span>
                    <div className="space-y-2">
                      {result.actionPlan.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0F172A] border border-white/5 text-xs text-gray-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#2589D0] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="pt-3 border-t border-white/10 space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleApplyRecommendation}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-['Outfit'] font-bold text-sm text-white bg-gradient-to-r from-[#2589D0] to-cyan-600 hover:from-cyan-500 hover:to-[#2589D0] shadow-[0_0_20px_rgba(37,137,208,0.5)] transition-all cursor-pointer min-h-[48px]"
                      >
                        <span>Lock In Plan & Book Call</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={handleWhatsAppChat}
                        className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-['Outfit'] font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer min-h-[48px]"
                      >
                        <MessageSquare className="w-4 h-4 fill-current text-white" />
                        <span>Chat on WhatsApp</span>
                      </button>
                    </div>

                    <div className="text-center">
                      <button
                        onClick={() => setResult(null)}
                        className="text-xs font-mono text-gray-400 hover:text-white underline underline-offset-4 transition-colors cursor-pointer py-1"
                      >
                        &larr; Diagnose Another Problem or Goal
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
