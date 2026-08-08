import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Target,
  Palette,
  Zap,
  CheckCircle2,
  XCircle,
  Calculator,
  ChevronDown,
  ChevronUp,
  Bot,
  Play,
  ShieldCheck,
  Award,
  Layers,
  Database,
  BarChart3,
  Video,
  Users,
  Clock,
  AlertTriangle,
  ArrowRightCircle,
  RefreshCw,
  Cpu
} from 'lucide-react';
import { PROBLEM_SOLUTION_PAIRS, AGENCY_STATS, TESTIMONIALS } from '../data/mockData';

interface HomeProps {
  onOpenAiAssistant: () => void;
}

// Section 2 Counter Component with Scroll Triggered Count-Up
const CounterItem: React.FC<{
  targetNumber: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}> = ({ targetNumber, suffix, label, icon }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1800; // 1.8 seconds
      const steps = 50;
      const increment = targetNumber / steps;
      const stepTime = duration / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= targetNumber) {
          setCount(targetNumber);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, targetNumber]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative glass-panel rounded-2xl p-6 bg-[#181D27]/80 backdrop-blur-md border border-white/10 hover:border-[#2589D0]/80 hover:shadow-[0_0_30px_rgba(37,137,208,0.3)] transition-all duration-300 group overflow-hidden flex flex-col justify-between"
    >
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#2589D0]/10 rounded-full blur-xl group-hover:bg-[#2589D0]/30 transition-all" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-[#0F172A] border border-white/10 group-hover:border-[#2589D0]/50 transition-colors shadow-inner">
          {icon}
        </div>
        <span className="text-[10px] font-mono text-[#2589D0] bg-[#2589D0]/10 px-2 py-0.5 rounded border border-[#2589D0]/30 uppercase tracking-wider font-semibold">
          LIVE METRIC
        </span>
      </div>

      <div>
        <div className="font-['Outfit'] font-black text-3xl sm:text-4xl text-white tracking-tight flex items-baseline">
          <span>{count}</span>
          <span className="text-[#2589D0]">{suffix}</span>
        </div>
        <p className="text-xs text-gray-300 mt-1 font-medium">{label}</p>
      </div>
    </motion.div>
  );
};

export const Home: React.FC<HomeProps> = ({ onOpenAiAssistant }) => {
  const navigate = useNavigate();

  // State for Problem to Solution Interactive Graphic
  const [selectedPainPoint, setSelectedPainPoint] = useState<number>(0);

  // State for ROI Calculator
  const [monthlySpend, setMonthlySpend] = useState<number>(12000);
  const [calcIndustry, setCalcIndustry] = useState<string>('E-Commerce');

  // State for FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ROI calculation formulas
  const estimatedImpressions = Math.round(monthlySpend * 25);
  const estimatedLeads = Math.round(monthlySpend * 0.015);
  const projectedRevenue = Math.round(monthlySpend * 3.8);

  // Pain Points for Section 3
  const painPointItems = [
    {
      id: 0,
      title: "Low Engagement",
      problemSummary: "Posts getting zero reach, stagnant under 300 views, and buried by social algorithms.",
      solutionTitle: "High ROI Content",
      solutionSummary: "Algorithm-engineered 4K short-form reels with hook scripting, motion callouts & trending sound triggers.",
      impact: "+380% Impression Growth",
      deliverable: "16 Studio Reels / Month"
    },
    {
      id: 1,
      title: "Inconsistent Branding",
      problemSummary: "Fragmented social templates, outdated logos, and lack of visual authority turning leads away.",
      solutionTitle: "Complete Instagram Branding",
      solutionSummary: "Unified high-tech visual design system with Figma templates, motion logo stingers & guidelines.",
      impact: "92% Visual Authority",
      deliverable: "Full Brand Guidelines & Assets"
    },
    {
      id: 2,
      title: "No Leads",
      problemSummary: "DMs sit unread for hours while warm prospects lose interest and switch to competitors.",
      solutionTitle: "Custom ERP Systems",
      solutionSummary: "Automated 24/7 DM keyword lead capture funnels & instant CRM sync that books calls automatically.",
      impact: "< 10 Sec Lead Response",
      deliverable: "24/7 Automated Direct Funnels"
    },
    {
      id: 3,
      title: "Wasted Ad Spend",
      problemSummary: "Spending ₹20,000-₹50,000/mo on Meta or Google Ads with high bounce rates and zero qualified pipeline.",
      solutionTitle: "High-Converting Meta Campaigns",
      solutionSummary: "Precision multi-angle creative testing, lookalike audience segmentation & high-intent CRO landing pages.",
      impact: "3.4x+ Verified ROAS",
      deliverable: "Multi-Angle Meta & TikTok Ads"
    }
  ];

  const activePair = painPointItems[selectedPainPoint];

  const faqs = [
    {
      q: "How quickly do we start seeing results with P2S?",
      a: "Our content onboarding takes 5-7 business days. On average, short-form reels begin gaining algorithmic momentum within the first 14 days, while performance ad campaigns achieve ROAS stabilization within 10-14 days."
    },
    {
      q: "Do we need to record videos ourselves or do you handle production?",
      a: "We offer both! You can either send raw smartphone footage for our studio team to edit into viral reels, or our remote directors will script and guide your team step-by-step during a 1-hour monthly filming session."
    },
    {
      q: "How does the AI Solution Assistant work?",
      a: "Our AI model analyzes your specific business bottleneck, industry, and target budget to recommend the exact package tier, creative hooks, and action roadmap tailored to your goals."
    },
    {
      q: "Is there a long-term contract requirement?",
      a: "We offer flexible month-to-month options as well as quarterly growth packages with a 20% savings discount. We earn your business every 30 days based on performance."
    }
  ];

  return (
    <div className="relative min-h-screen pt-20 pb-12 space-y-16 sm:space-y-28 overflow-hidden">
      
      {/* SECTION 1: ANIMATED HERO BANNER */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text & CTAs */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            
            {/* Top Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2589D0]/10 border border-[#2589D0]/40 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(37,137,208,0.2)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2589D0] animate-spin" />
              <span>P2S DIGITAL GROWTH ENGINE</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-['Outfit'] font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.12] break-words"
            >
              We Turn Complex Business Problems Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2589D0] via-cyan-300 to-blue-400 drop-shadow-[0_0_30px_rgba(37,137,208,0.5)]">
                High-Impact Solutions
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-lg text-gray-300 max-w-xl leading-relaxed font-normal"
            >
              End-to-end Social Media Growth, Custom Software Development, and High-Converting Meta Campaigns.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1"
            >
              {/* Primary CTA */}
              <button
                onClick={() => navigate('/packages')}
                className="group relative flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[48px] rounded-xl font-['Outfit'] font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#2589D0] to-cyan-600 hover:from-cyan-500 hover:to-[#2589D0] shadow-[0_0_25px_rgba(37,137,208,0.6)] active:scale-98 transition-all cursor-pointer"
              >
                <span>Explore Social Packages</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => navigate('/services')}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl font-['Outfit'] font-bold text-sm sm:text-base text-cyan-300 bg-[#181D27]/90 border border-[#2589D0]/50 hover:border-[#2589D0] hover:bg-[#2589D0]/15 active:scale-98 transition-all cursor-pointer overflow-hidden shadow-lg"
              >
                <span>Our Custom Services</span>
                <ArrowRight className="w-4 h-4 text-[#2589D0] group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* AI Assistant Quick Trigger */}
            <div className="pt-2">
              <button
                onClick={onOpenAiAssistant}
                className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-white min-h-[44px] py-1 transition-colors cursor-pointer group text-left"
              >
                <Bot className="w-4 h-4 text-[#2589D0] shrink-0 group-hover:rotate-12 transition-transform" />
                <span className="underline underline-offset-4 decoration-[#2589D0]">Unsure where to start? Run AI Solution Diagnostic &rarr;</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-gray-400 font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2589D0] shrink-0" />
                <span>3.8x Avg ROAS</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#2589D0] shrink-0" />
                <span>99% Client Retention</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating 3D/Interactive Elements Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative min-h-[420px] flex items-center justify-center"
          >
            {/* Ambient Electric Blue Backdrop Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2589D0]/30 via-cyan-500/10 to-transparent rounded-full blur-3xl opacity-60 animate-pulse-glow" />

            {/* Central Glow Canvas Ring */}
            <div className="relative w-full max-w-md p-6 space-y-5">
              
              {/* Floating Card 1: Meta Ads ROI +340% */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.05 }}
                className="glass-panel p-5 rounded-2xl bg-[#181D27]/90 border border-[#2589D0]/60 shadow-[0_0_25px_rgba(37,137,208,0.3)] backdrop-blur-xl relative z-10 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                        PERFORMANCE ADVERTS
                      </span>
                      <h3 className="font-['Outfit'] font-black text-xl text-white">
                        Meta Ads ROI +340%
                      </h3>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 flex justify-between text-xs text-gray-300">
                  <span>Tested Creatives: <strong className="text-white">48/mo</strong></span>
                  <span className="text-cyan-300 font-bold">Active Scale</span>
                </div>
              </motion.div>

              {/* Floating Card 2: Custom ERP Active */}
              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.05 }}
                className="glass-panel p-5 rounded-2xl bg-[#181D27]/90 border border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.25)] backdrop-blur-xl relative z-20 -mt-2 ml-4 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-[#2589D0]/20 border border-[#2589D0]/40 text-[#2589D0]">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest block font-bold">
                        SYSTEM AUTOMATION
                      </span>
                      <h3 className="font-['Outfit'] font-black text-xl text-white">
                        Custom ERP Active
                      </h3>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#2589D0]/20 text-cyan-300 text-[10px] font-mono font-bold border border-[#2589D0]/40">
                    ONLINE
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 flex justify-between text-xs text-gray-300">
                  <span>Lead Response: <strong className="text-cyan-300">&lt; 10 Secs</strong></span>
                  <span className="text-gray-400">24/7 DM Sync</span>
                </div>
              </motion.div>

              {/* Floating Card 3: Reels Generated 100k+ */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.05 }}
                className="glass-panel p-5 rounded-2xl bg-[#181D27]/90 border border-[#2589D0]/60 shadow-[0_0_25px_rgba(37,137,208,0.3)] backdrop-blur-xl relative z-10 -mt-2 mr-4 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest block font-bold">
                        SHORT-FORM MEDIA
                      </span>
                      <h3 className="font-['Outfit'] font-black text-xl text-white">
                        Reels Generated 100k+
                      </h3>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold border border-purple-500/40">
                    VIRAL
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 flex justify-between text-xs text-gray-300">
                  <span>Total Views: <strong className="text-white">45.2M</strong></span>
                  <span className="text-emerald-400 font-bold">4.8x Reach</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>


      {/* SECTION 2: INTERACTIVE COUNTER / LIVE METRICS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-[#2589D0]/10 border border-[#2589D0]/30">
            VERIFIED TRACK RECORD
          </span>
          <h2 className="font-['Outfit'] font-bold text-2xl sm:text-3xl text-white">
            Agency Performance By The Numbers
          </h2>
        </div>

        {/* 4-Column Counter Bar with Framer Motion Count-Up & Glassmorphism Finish */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <CounterItem
            targetNumber={384}
            suffix="+"
            label="Posts Delivered Across Social Channels"
            icon={<Layers className="w-6 h-6 text-[#2589D0]" />}
          />
          <CounterItem
            targetNumber={120}
            suffix="+"
            label="High-Converting Reels Produced"
            icon={<Video className="w-6 h-6 text-[#2589D0]" />}
          />
          <CounterItem
            targetNumber={99}
            suffix="%"
            label="Client Retention Rate"
            icon={<Users className="w-6 h-6 text-[#2589D0]" />}
          />
          <CounterItem
            targetNumber={24}
            suffix="/7"
            label="Dedicated Client Support"
            icon={<Clock className="w-6 h-6 text-[#2589D0]" />}
          />
        </div>
      </section>


      {/* SECTION 3: "PROBLEM TO SOLUTION" INTERACTIVE GRAPHIC SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest px-3.5 py-1 rounded-full bg-[#2589D0]/10 border border-[#2589D0]/30">
            THE P2S ARCHITECTURE
          </span>
          <h2 className="font-['Outfit'] font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Problem To Solution Matrix
          </h2>
          <p className="text-sm text-gray-300">
            Click a business pain point below to see how P2S re-engineers bottlenecks into revenue engines.
          </p>
        </div>

        {/* Pain Point Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {painPointItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedPainPoint(idx)}
              className={`px-4 py-3 min-h-[48px] rounded-xl text-xs sm:text-sm font-['Outfit'] font-bold transition-all cursor-pointer flex items-center gap-2 active:scale-95 ${
                selectedPainPoint === idx
                  ? 'bg-[#2589D0] text-white shadow-[0_0_20px_rgba(37,137,208,0.5)] border border-cyan-300'
                  : 'bg-[#181D27] text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${selectedPainPoint === idx ? 'bg-white animate-ping' : 'bg-gray-500'}`} />
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Split-View Interactive Graphic Component */}
        <div className="relative glass-panel rounded-3xl p-6 sm:p-10 border border-[#2589D0]/40 bg-[#181D27]/90 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT SIDE: "The Problem" (Red/Dark Card) */}
            <motion.div
              key={`problem-${activePair.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#181D27] via-[#231215] to-[#181D27] border border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.15)] relative overflow-hidden space-y-5"
            >
              <div className="flex items-center justify-between pb-4 border-b border-red-500/20">
                <div className="flex items-center gap-2 text-red-400">
                  <XCircle className="w-5 h-5 shrink-0" />
                  <span className="font-['Outfit'] font-extrabold text-lg text-white">
                    The Problem
                  </span>
                </div>
                <span className="text-[10px] font-mono text-red-400 bg-red-500/15 px-2.5 py-1 rounded border border-red-500/30 uppercase font-semibold">
                  BOTTLENECK
                </span>
              </div>

              <div>
                <h3 className="font-['Outfit'] font-bold text-xl text-red-300 mb-2">
                  {activePair.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {activePair.problemSummary}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0F172A]/90 border border-red-500/20 space-y-1 text-xs">
                <span className="text-[10px] font-mono text-red-400 block uppercase">
                  Business Impact
                </span>
                <span className="text-gray-300 block font-medium">
                  Stagnant growth, zero predictability, and wasted operational bandwidth.
                </span>
              </div>
            </motion.div>

            {/* CENTER: Animated Blue Arrow Icon with Glowing Particle Pulses */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 lg:py-0 relative">
              <div className="relative flex items-center justify-center">
                {/* Glowing Pulse Rings */}
                <div className="absolute w-16 h-16 rounded-full bg-[#2589D0]/30 animate-ping opacity-75" />
                <div className="p-4 rounded-full bg-[#2589D0] text-white shadow-[0_0_30px_#2589D0] z-10 relative">
                  <ArrowRight className="w-8 h-8 animate-pulse" />
                </div>
              </div>

              <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest mt-3 font-bold">
                P2S TRANSFORM
              </span>

              {/* Glowing Particle Beam Trail (Desktop) */}
              <div className="hidden lg:block w-full h-1 bg-gradient-to-r from-red-500 via-[#2589D0] to-emerald-400 rounded-full mt-2 opacity-60" />
            </div>

            {/* RIGHT SIDE: "The P2S Solution" (Green/Blue Card) */}
            <motion.div
              key={`solution-${activePair.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#181D27] via-[#0d2238] to-[#181D27] border border-[#2589D0]/60 shadow-[0_0_35px_rgba(37,137,208,0.25)] relative overflow-hidden space-y-5"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#2589D0]/30">
                <div className="flex items-center gap-2 text-cyan-300">
                  <CheckCircle2 className="w-5 h-5 text-[#2589D0] shrink-0" />
                  <span className="font-['Outfit'] font-extrabold text-lg text-white">
                    The P2S Solution
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-300 bg-[#2589D0]/20 px-2.5 py-1 rounded border border-[#2589D0]/40 uppercase font-semibold">
                  ACTIVATED
                </span>
              </div>

              <div>
                <h3 className="font-['Outfit'] font-bold text-xl text-cyan-300 mb-2">
                  {activePair.solutionTitle}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                  {activePair.solutionSummary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#0F172A] border border-[#2589D0]/30">
                  <span className="text-[10px] font-mono text-cyan-400 block uppercase">
                    Target Impact
                  </span>
                  <span className="text-sm font-bold text-white block mt-0.5">
                    {activePair.impact}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#0F172A] border border-[#2589D0]/30">
                  <span className="text-[10px] font-mono text-cyan-400 block uppercase">
                    Key Deliverable
                  </span>
                  <span className="text-xs font-semibold text-gray-200 block mt-0.5 truncate">
                    {activePair.deliverable}
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* SECTION 4: INTERACTIVE REVENUE SIMULATOR (ROI CALCULATOR) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-[#2589D0]/40 bg-gradient-to-b from-[#181D27] to-[#0F172A] space-y-8 shadow-2xl">
          
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center justify-center gap-2">
              <Calculator className="w-4 h-4" />
              INTERACTIVE REVENUE SIMULATOR
            </span>
            <h2 className="font-['Outfit'] font-bold text-3xl text-white">
              Calculate Your P2S Growth Trajectory
            </h2>
            <p className="text-xs text-gray-400">
              Adjust your monthly budget to project estimated impressions, lead pipeline, and revenue impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono text-gray-300 uppercase">
                    Monthly Marketing Budget (INR)
                  </label>
                  <span className="font-['Outfit'] font-bold text-xl text-cyan-300">
                    ₹{monthlySpend.toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <input
                  type="range"
                  min={4000}
                  max={50000}
                  step={1000}
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full h-2 bg-[#0F172A] rounded-lg appearance-none cursor-pointer accent-[#2589D0]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
                  <span>₹4,000/mo</span>
                  <span>₹25,000/mo</span>
                  <span>₹50,000/mo</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase mb-2">
                  Industry Vertical
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['E-Commerce', 'B2B SaaS', 'Professional Services'].map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setCalcIndustry(ind)}
                      className={`py-3 px-3 min-h-[48px] rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center justify-center active:scale-95 ${
                        calcIndustry === ind
                          ? 'bg-[#2589D0] text-white border border-cyan-400 font-bold'
                          : 'bg-[#0F172A] text-gray-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Projected Output Display */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/10 text-center space-y-1">
                <span className="text-[10px] font-mono text-gray-400 uppercase">
                  Projected Impressions
                </span>
                <span className="font-['Outfit'] font-black text-2xl text-white block">
                  {estimatedImpressions.toLocaleString()}+
                </span>
                <span className="text-[10px] text-cyan-400">Organic & Paid</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/10 text-center space-y-1">
                <span className="text-[10px] font-mono text-gray-400 uppercase">
                  Estimated Qualified Leads
                </span>
                <span className="font-['Outfit'] font-black text-2xl text-cyan-300 block">
                  {estimatedLeads.toLocaleString()}
                </span>
                <span className="text-[10px] text-gray-400">Inbound Bookings</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#2589D0]/15 border border-[#2589D0]/40 text-center space-y-1 shadow-[0_0_20px_rgba(37,137,208,0.2)]">
                <span className="text-[10px] font-mono text-cyan-300 uppercase">
                  Projected Revenue Impact
                </span>
                <span className="font-['Outfit'] font-black text-2xl text-white block">
                  ₹{projectedRevenue.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-cyan-400">~3.8x Avg Return</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-['Outfit'] font-bold text-sm text-white bg-[#2589D0] hover:bg-cyan-600 transition-colors cursor-pointer shadow-lg"
            >
              <span>Lock In Your Custom Revenue Strategy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>


      {/* SECTION 5: CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            PROVEN CLIENT IMPACT
          </span>
          <h2 className="font-['Outfit'] font-bold text-3xl text-white">
            Trusted By High-Growth Founders & Brands
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-6 space-y-4 border border-white/10 bg-[#181D27] flex flex-col justify-between hover:border-[#2589D0]/40 transition-colors"
            >
              <p className="text-xs text-gray-300 leading-relaxed italic">
                "{t.quote}"
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.clientName}
                    className="w-10 h-10 rounded-full object-cover border border-[#2589D0]"
                  />
                  <div>
                    <h4 className="font-['Outfit'] font-bold text-sm text-white">
                      {t.clientName}
                    </h4>
                    <span className="text-[10px] text-gray-400 block">
                      {t.role}, {t.company}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold text-cyan-300 px-2.5 py-1 rounded bg-[#2589D0]/15 border border-[#2589D0]/30">
                  {t.stats}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* SECTION 6: FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            CLEAR ANSWERS
          </span>
          <h2 className="font-['Outfit'] font-bold text-3xl text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-xl border border-white/10 bg-[#181D27] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 min-h-[48px] text-left font-['Outfit'] font-semibold text-sm text-white hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span className="pr-2">{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-[#2589D0] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4 text-xs text-gray-300 leading-relaxed border-t border-white/5 pt-3"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>


      {/* SECTION 7: BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden bg-gradient-to-r from-[#181D27] via-[#12243d] to-[#181D27] border border-[#2589D0]/50 shadow-[0_0_50px_rgba(37,137,208,0.25)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="font-['Outfit'] font-bold text-2xl md:text-3xl text-white">
              Ready to turn your problem into a solution?
            </h3>
            <p className="text-xs text-gray-300">
              Schedule your 30-minute growth diagnostic session or explore our fixed monthly social media packages.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3.5 rounded-xl font-['Outfit'] font-bold text-sm text-white bg-gradient-to-r from-[#2589D0] to-cyan-500 hover:from-cyan-400 hover:to-[#2589D0] shadow-[0_0_20px_rgba(37,137,208,0.5)] transition-all text-center cursor-pointer"
            >
              Book Strategy Session
            </button>
            <button
              onClick={onOpenAiAssistant}
              className="px-6 py-3.5 rounded-xl font-medium text-sm text-cyan-300 bg-[#0F172A] border border-[#2589D0]/40 hover:bg-[#2589D0]/10 transition-all text-center cursor-pointer"
            >
              Run AI Assistant
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
