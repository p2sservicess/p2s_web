import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Globe,
  Code,
  ShoppingCart,
  Server,
  MessageCircle,
  Wrench,
  Target,
  X,
  ArrowRight,
  Sparkles,
  Cpu,
  CheckCircle2,
  Layers,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Zap,
  ChevronRight,
  BarChart3,
  Bot,
  MessageSquare
} from 'lucide-react';
import { SERVICES_LIST } from '../data/mockData';
import { ServiceDetail } from '../types';
import { createWhatsAppUrl, getWhatsAppServiceMsg } from '../utils/whatsapp';

export const Services: React.FC = () => {
  const navigate = useNavigate();

  // Modal State for inspecting a service card
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  // Lock background body scroll when service modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedService]);

  // Helper function to render unique Lucide icon per service
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-6 h-6 text-[#2589D0]" />;
      case 'Code':
        return <Code className="w-6 h-6 text-[#2589D0]" />;
      case 'ShoppingCart':
        return <ShoppingCart className="w-6 h-6 text-[#2589D0]" />;
      case 'Server':
        return <Server className="w-6 h-6 text-[#2589D0]" />;
      case 'MessageCircle':
        return <MessageCircle className="w-6 h-6 text-[#2589D0]" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-[#2589D0]" />;
      case 'Target':
        return <Target className="w-6 h-6 text-[#2589D0]" />;
      default:
        return <Cpu className="w-6 h-6 text-[#2589D0]" />;
    }
  };

  const handleWhatsAppServiceDirect = (serviceTitle: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const msg = getWhatsAppServiceMsg(serviceTitle);
    window.open(createWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  const handleInquireService = (serviceTitle: string) => {
    setSelectedService(null);
    navigate('/contact', {
      state: { selectedService: serviceTitle },
    });
  };

  return (
    <div className="relative min-h-screen pt-28 pb-24 space-y-20 overflow-hidden">
      
      {/* SECTION 1: HEADER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2589D0]/10 border border-[#2589D0]/40 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(37,137,208,0.25)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#2589D0]" />
          <span>FULL-STACK DIGITAL & SOFTWARE CAPABILITIES</span>
        </motion.div>

        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-['Outfit'] font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight"
        >
          Comprehensive Digital &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2589D0] via-cyan-300 to-blue-400 drop-shadow-[0_0_30px_rgba(37,137,208,0.5)]">
            Tech Solutions
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          From high-converting web applications and enterprise ERP systems to WhatsApp Cloud API automation and performance Meta ad campaigns — explore our specialized service modules.
        </motion.p>
      </section>

      {/* SECTION 2: INTERACTIVE 3-COLUMN GRID LAYOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_LIST.map((svc, idx) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedService(svc)}
              className="group relative glass-panel rounded-3xl p-6 sm:p-7 bg-[#181D27]/80 backdrop-blur-xl border border-white/10 hover:border-[#2589D0] hover:shadow-[0_0_35px_rgba(37,137,208,0.35)] transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              {/* Animated Gradient Light Border Overlay on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#2589D0]/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="space-y-5 relative z-10">
                {/* Top Badge & Icon Row */}
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-white/10 group-hover:border-[#2589D0]/50 group-hover:scale-105 transition-all shadow-inner">
                    {getServiceIcon(svc.icon)}
                  </div>

                  <span className="text-[10px] font-mono text-cyan-300 bg-[#2589D0]/15 px-2.5 py-1 rounded-full border border-[#2589D0]/30 font-semibold tracking-wider uppercase">
                    {svc.badge}
                  </span>
                </div>

                {/* Service Title */}
                <div>
                  <h3 className="font-['Outfit'] font-extrabold text-xl text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                    {svc.shortDesc}
                  </p>
                </div>

                {/* Key Metric Snapshot */}
                <div className="p-3 rounded-xl bg-[#0F172A]/90 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase block">
                      {svc.impactLabel}
                    </span>
                    <span className="font-['Outfit'] font-black text-lg text-white">
                      {svc.impactMetric}
                    </span>
                  </div>
                  <Zap className="w-4 h-4 text-[#2589D0]" />
                </div>

                {/* Tech Stack Pills Preview */}
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5 font-semibold">
                    Integrated Stack
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {svc.toolsUsed.slice(0, 3).map((tool, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#0F172A] border border-white/10 text-cyan-300 font-mono"
                      >
                        {tool}
                      </span>
                    ))}
                    {svc.toolsUsed.length > 3 && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#0F172A] border border-white/10 text-gray-400 font-mono">
                        +{svc.toolsUsed.length - 3}
                      </span>
                    )}
                  </div>
                </div>

              </div>

              {/* Card Footer: WhatsApp Direct CTA & Inspect Details */}
              <div className="pt-5 mt-5 border-t border-white/10 space-y-2 relative z-10">
                <button
                  onClick={(e) => handleWhatsAppServiceDirect(svc.title, e)}
                  className="w-full py-3 min-h-[48px] rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-[#2589D0] hover:from-emerald-500 hover:to-[#2589D0] text-white font-['Outfit'] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>Inquire on WhatsApp</span>
                </button>

                <div className="flex items-center justify-between min-h-[44px] text-[11px] font-['Outfit'] font-bold text-cyan-300 hover:text-white transition-colors cursor-pointer pt-1">
                  <span>Inspect Tech Scope & Workflow</span>
                  <div className="p-2 rounded-lg bg-[#2589D0]/20 group-hover:bg-[#2589D0] group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE SLIDE-OVER / MODAL DETAILED INSPECTOR PORTAL */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedService && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedService(null)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full max-w-2xl glass-panel rounded-3xl bg-[#181D27] border border-[#2589D0]/60 p-6 sm:p-8 shadow-2xl text-white space-y-6 my-8 max-h-[90vh] overflow-y-auto custom-scrollbar z-[101]"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedService(null)}
                    className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Modal Header */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-[#0F172A] border border-[#2589D0]/40">
                        {getServiceIcon(selectedService.icon)}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-cyan-300 bg-[#2589D0]/20 px-2.5 py-0.5 rounded border border-[#2589D0]/40 uppercase font-bold tracking-wider">
                          {selectedService.badge}
                        </span>
                        <h2 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl text-white mt-1">
                          {selectedService.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pt-1">
                      {selectedService.overview}
                    </p>
                  </div>

                  {/* Impact Metric & Tech Stack Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#2589D0]/30 space-y-1">
                      <span className="text-[10px] font-mono text-gray-400 uppercase block">
                        Target Impact Metric
                      </span>
                      <span className="font-['Outfit'] font-black text-2xl text-cyan-300 block">
                        {selectedService.impactMetric}
                      </span>
                      <span className="text-xs text-gray-300 block font-medium">
                        {selectedService.impactLabel}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-2">
                      <span className="text-[10px] font-mono text-gray-400 uppercase block">
                        Tech Stack & Frameworks
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedService.toolsUsed.map((tool, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2.5 py-1 rounded-md bg-[#181D27] border border-[#2589D0]/30 text-cyan-300 font-mono"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Execution Process Steps */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                      4-Step Engineering Workflow
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedService.processSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-[#0F172A] border border-white/5 space-y-1"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-[#2589D0] bg-[#2589D0]/10 px-2 py-0.5 rounded border border-[#2589D0]/30">
                              {step.step}
                            </span>
                            <span className="font-['Outfit'] font-semibold text-xs text-white">
                              {step.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 leading-relaxed pl-7">
                            {step.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Deliverables List */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block font-semibold">
                      Guaranteed Deliverables
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedService.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0F172A] border border-white/5 text-xs text-gray-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#2589D0] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Modal CTA: Inquire About This Service */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-gray-400">
                      <span>Need custom scope modifications or API integrations?</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                      <button
                        onClick={() => handleWhatsAppServiceDirect(selectedService.title)}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl font-['Outfit'] font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-[#2589D0] hover:from-emerald-500 hover:to-[#2589D0] shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
                      >
                        <MessageSquare className="w-4 h-4 fill-current text-white" />
                        <span>Inquire on WhatsApp</span>
                      </button>

                      <button
                        onClick={() => handleInquireService(selectedService.title)}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl font-['Outfit'] font-semibold text-xs text-gray-300 hover:text-white bg-[#0F172A] hover:bg-white/10 border border-white/10 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
                      >
                        <span>Online Form</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* SECTION 4: BOTTOM FULL-WIDTH ENTERPRISE CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden bg-gradient-to-r from-[#181D27] via-[#0d2138] to-[#181D27] border border-[#2589D0]/60 shadow-[0_0_50px_rgba(37,137,208,0.3)] flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-xl text-center md:text-left relative z-10">
            <span className="text-xs font-mono text-cyan-300 bg-[#2589D0]/20 px-3 py-1 rounded-full border border-[#2589D0]/40 font-bold uppercase tracking-wider inline-block">
              ENTERPRISE & TAILORED BUILDS
            </span>
            <h2 className="font-['Outfit'] font-black text-2xl md:text-3xl text-white">
              Have a Custom Enterprise Need or Multi-Module System Request?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Our engineering team builds custom web architectures, automated GST billing systems, dedicated API pipelines, and omnichannel marketing funnels tailored precisely to your organization.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10">
            <button
              onClick={() => navigate('/contact')}
              className="px-7 py-4 rounded-xl font-['Outfit'] font-bold text-sm text-white bg-gradient-to-r from-[#2589D0] to-cyan-500 hover:from-cyan-400 hover:to-[#2589D0] shadow-[0_0_25px_rgba(37,137,208,0.6)] transition-all text-center cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Schedule Enterprise Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Background Ambient Glow Accent */}
          <div className="absolute right-0 bottom-0 w-72 h-72 bg-[#2589D0]/20 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

    </div>
  );
};
