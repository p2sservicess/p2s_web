import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  X,
  Sparkles,
  ArrowRight,
  Sliders,
  Zap,
  ShieldCheck,
  Layers,
  ChevronDown,
  ChevronUp,
  FileText,
  CheckCircle2,
  Clock,
  Star,
  Info,
  Calendar,
  Send,
  Building,
  User,
  Mail,
  Phone,
  Video,
  Image as ImageIcon,
  DollarSign,
  MessageSquare
} from 'lucide-react';
import { SOCIAL_PACKAGES } from '../data/mockData';
import { SocialPackage, CustomPackageConfig } from '../types';
import { createWhatsAppUrl, getWhatsAppPackageMsg } from '../utils/whatsapp';

export const Packages: React.FC = () => {
  const navigate = useNavigate();

  // Billing Cycle State: 'monthly' | 'quarterly'
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  // Filter Tab State: 'all' | 'starter' | 'scale'
  const [activeFilter, setActiveFilter] = useState<'all' | 'starter' | 'scale'>('all');

  // Terms Drawer Expansion State
  const [isTermsOpen, setIsTermsOpen] = useState<boolean>(false);

  // Booking Modal State
  const [bookingPackage, setBookingPackage] = useState<SocialPackage | null>(null);

  // Lock background body scroll when booking modal is open
  useEffect(() => {
    if (bookingPackage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [bookingPackage]);
  const [bookingForm, setBookingForm] = useState({
    clientName: '',
    email: '',
    phone: '',
    companyName: '',
    startDate: 'Immediate (Within 48 Hours)',
    notes: ''
  });

  // Custom Package Configurator State
  const [customConfig, setCustomConfig] = useState<CustomPackageConfig>({
    platforms: ['Instagram', 'Facebook'],
    postFrequency: 7, // posts per week
    reelsCount: 24, // reels per month
    adManagement: true,
    adSpendTier: '₹10,000 - ₹50,000/mo',
    brandIdentity: true,
    communityManagement: true,
    analyticsReporting: 'advanced',
  });

  const availablePlatforms = ['Instagram', 'Facebook', 'YouTube Shorts', 'TikTok'];

  const togglePlatform = (p: string) => {
    setCustomConfig(prev => {
      const exists = prev.platforms.includes(p);
      if (exists) {
        if (prev.platforms.length === 1) return prev;
        return { ...prev, platforms: prev.platforms.filter(x => x !== p) };
      } else {
        return { ...prev, platforms: [...prev.platforms, p] };
      }
    });
  };

  const calculateCustomPrice = () => {
    let base = 3000;
    base += customConfig.platforms.length * 800;
    base += customConfig.reelsCount * 120;
    base += customConfig.postFrequency * 200;
    if (customConfig.adManagement) base += 2500;
    if (customConfig.brandIdentity) base += 2000;
    if (customConfig.communityManagement) base += 1500;
    return base;
  };

  const customPrice = calculateCustomPrice();

  // Filter packages based on active filter
  const filteredPackages = SOCIAL_PACKAGES.filter((pkg) => {
    if (activeFilter === 'starter') return pkg.monthlyPrice <= 8000;
    if (activeFilter === 'scale') return pkg.monthlyPrice > 8000;
    return true;
  });

  const handleOpenBookingModal = (pkg: SocialPackage) => {
    setBookingPackage(pkg);
  };

  const handleWhatsAppPackageDirect = (pkg: SocialPackage) => {
    const displayPrice = billingCycle === 'monthly' ? pkg.monthlyPrice : pkg.quarterlyPrice;
    // Pre-filled message matching requirement exactly:
    // "Hi P2S Team, I'm interested in booking the Basic Package (₹4,000/mo)."
    const message = `Hi P2S Team, I'm interested in booking the ${pkg.name} (₹${displayPrice.toLocaleString('en-IN')}/mo).`;
    window.open(createWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  const handleConfirmBookingWhatsApp = () => {
    if (!bookingPackage) return;
    const price = billingCycle === 'monthly' ? bookingPackage.monthlyPrice : bookingPackage.quarterlyPrice;
    const message = `Hi P2S Team, I'm submitting a package booking request:
• Selected Package: ${bookingPackage.name} (₹${price.toLocaleString('en-IN')}/mo - ${billingCycle})
• Name: ${bookingForm.clientName || 'N/A'}
• Email: ${bookingForm.email || 'N/A'}
• Phone: ${bookingForm.phone || 'N/A'}
• Company: ${bookingForm.companyName || 'N/A'}
• Timeline: ${bookingForm.startDate}`;

    window.open(createWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
    setBookingPackage(null);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingPackage) return;

    navigate('/contact', {
      state: {
        selectedPackageId: bookingPackage.id,
        selectedPackageName: bookingPackage.name,
        packagePrice: billingCycle === 'monthly' ? bookingPackage.monthlyPrice : bookingPackage.quarterlyPrice,
        billingCycle,
        bookingForm,
      },
    });
  };

  const handleWhatsAppCustomScope = () => {
    const message = `Hi P2S Team, I'd like to request a custom social media scope quote:
• Platforms: ${customConfig.platforms.join(', ')}
• Reels: ${customConfig.reelsCount} Videos/mo
• Posts: ${customConfig.postFrequency} Posts/wk
• Paid Ads: ${customConfig.adManagement ? 'Yes' : 'No'}
• Brand Suite: ${customConfig.brandIdentity ? 'Yes' : 'No'}
• Total Estimated Budget: ₹${customPrice.toLocaleString('en-IN')}/mo`;

    window.open(createWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  const handleApplyCustomPackage = () => {
    navigate('/contact', {
      state: {
        selectedPackageId: 'custom-config',
        selectedPackageName: `Custom Scope (₹${customPrice.toLocaleString('en-IN')}/mo)`,
        customConfig,
      },
    });
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20 space-y-20 overflow-hidden">
      
      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2589D0]/10 border border-[#2589D0]/40 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(37,137,208,0.25)]"
        >
          <Layers className="w-3.5 h-3.5 text-[#2589D0]" />
          <span>TRANSPARENT P2S PRICING ARCHITECTURE</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-['Outfit'] font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight"
        >
          Social Media Growth &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2589D0] via-cyan-300 to-blue-400 drop-shadow-[0_0_25px_rgba(37,137,208,0.5)]">
            Content Packages
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          High-volume short-form reels, product photography, influencer UGC, and paid ad management — built for rapid brand scaling with guaranteed monthly outputs.
        </motion.p>

        {/* Toggles & Filter Tabs Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          
          {/* Filter Tabs: All / Starter / Scale */}
          <div className="flex p-1 rounded-2xl bg-[#181D27] border border-white/10 shadow-lg w-full sm:w-auto justify-center">
            <button
              onClick={() => setActiveFilter('all')}
              className={`flex-1 sm:flex-none px-3.5 py-3 min-h-[48px] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center active:scale-95 ${
                activeFilter === 'all'
                  ? 'bg-[#2589D0] text-white shadow-[0_0_15px_rgba(37,137,208,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              All Packages
            </button>
            <button
              onClick={() => setActiveFilter('starter')}
              className={`flex-1 sm:flex-none px-3.5 py-3 min-h-[48px] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center active:scale-95 ${
                activeFilter === 'starter'
                  ? 'bg-[#2589D0] text-white shadow-[0_0_15px_rgba(37,137,208,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Starter (&le; ₹8k)
            </button>
            <button
              onClick={() => setActiveFilter('scale')}
              className={`flex-1 sm:flex-none px-3.5 py-3 min-h-[48px] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center active:scale-95 ${
                activeFilter === 'scale'
                  ? 'bg-[#2589D0] text-white shadow-[0_0_15px_rgba(37,137,208,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Scale (&gt; ₹8k)
            </button>
          </div>

          {/* Billing Cycle Switcher: Monthly / Quarterly */}
          <div className="flex p-1 rounded-2xl bg-[#181D27] border border-white/10 shadow-lg w-full sm:w-auto justify-center">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`flex-1 sm:flex-none px-4 py-3 min-h-[48px] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center active:scale-95 ${
                billingCycle === 'monthly'
                  ? 'bg-[#2589D0] text-white shadow-[0_0_15px_rgba(37,137,208,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-3 min-h-[48px] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-95 ${
                billingCycle === 'quarterly'
                  ? 'bg-[#2589D0] text-white shadow-[0_0_15px_rgba(37,137,208,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Quarterly</span>
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] border border-emerald-500/30">
                SAVE 20%
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* RESPONSIVE 4-COLUMN GRID LAYOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredPackages.map((pkg) => {
            const displayPrice = billingCycle === 'monthly' ? pkg.monthlyPrice : pkg.quarterlyPrice;
            const isPopular = pkg.popular || pkg.id === 'pkg-growth';

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className={`relative glass-panel rounded-3xl p-6 flex flex-col justify-between border transition-all duration-300 group ${
                  isPopular
                    ? 'border-[#2589D0] bg-[#181D27]/95 shadow-[0_0_40px_rgba(37,137,208,0.35)] ring-2 ring-[#2589D0]/50'
                    : 'border-white/10 bg-[#181D27]/80 hover:border-[#2589D0]/60'
                }`}
                style={{ perspective: 1000 }}
              >
                {/* Glowing Border Background Highlight */}
                {isPopular && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#2589D0]/20 via-transparent to-transparent pointer-events-none" />
                )}

                {/* Popular Badge Header */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#2589D0] to-cyan-400 text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-[0_0_20px_#2589D0] flex items-center gap-1 z-20 whitespace-nowrap">
                    <Sparkles className="w-3 h-3 fill-current animate-pulse" />
                    MOST POPULAR
                  </div>
                )}

                <div className="space-y-5 relative z-10">
                  
                  {/* Package Title & Price Header */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-['Outfit'] font-extrabold text-xl text-white">
                        {pkg.name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0F172A] border border-white/10 text-cyan-300">
                        P2S
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 min-h-[36px] leading-relaxed">
                      {pkg.tagline}
                    </p>

                    {/* Price Display */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-baseline gap-1">
                      <span className="font-['Outfit'] font-black text-3xl text-white">
                        &#8377;{displayPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">/mo</span>
                      {billingCycle === 'quarterly' && (
                        <span className="text-[9px] text-emerald-400 font-mono block">
                          (Billed Qtr)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Deliverables Banner Badge */}
                  <div className="p-3 rounded-xl bg-[#0F172A] border border-[#2589D0]/30 text-xs font-mono text-cyan-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#2589D0] shrink-0" />
                    <span className="font-semibold">{pkg.deliverablesSummary}</span>
                  </div>

                  {/* Target Platforms */}
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5">
                      Supported Platforms
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {pkg.platforms.map((plat, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#0F172A] border border-white/10 text-gray-300"
                        >
                          {plat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-3 border-t border-white/10">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">
                      Package Features Included
                    </span>
                    <ul className="space-y-2 text-xs">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          {feat.included ? (
                            <Check className="w-3.5 h-3.5 text-[#2589D0] shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-gray-600 shrink-0 mt-0.5" />
                          )}
                          <span
                            className={
                              feat.included
                                ? feat.highlight
                                  ? 'text-white font-bold text-xs'
                                  : 'text-gray-300'
                                : 'text-gray-600 line-through'
                            }
                          >
                            {feat.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* CTA Choose Package Button */}
                <div className="pt-6 relative z-10 space-y-2">
                  <button
                    onClick={() => handleWhatsAppPackageDirect(pkg)}
                    className="w-full py-3.5 min-h-[48px] rounded-xl font-['Outfit'] font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-[#2589D0] hover:from-emerald-500 hover:to-[#2589D0] shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 fill-current text-white" />
                    <span>Choose {pkg.name}</span>
                  </button>

                  <button
                    onClick={() => handleOpenBookingModal(pkg)}
                    className="w-full py-3 min-h-[48px] rounded-xl font-['Outfit'] font-semibold text-xs text-gray-300 hover:text-white bg-[#0F172A] hover:bg-white/10 border border-white/10 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Customize & Book Online</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>
      </section>

      {/* TERMS & CONDITIONS EXPANDABLE ACCORDION / DRAWER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl border border-white/10 bg-[#181D27] overflow-hidden shadow-xl">
          
          <button
            onClick={() => setIsTermsOpen(!isTermsOpen)}
            className="w-full flex items-center justify-between p-6 text-left font-['Outfit'] font-bold text-base text-white hover:text-cyan-300 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#2589D0]/15 text-[#2589D0] border border-[#2589D0]/30 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-white font-extrabold text-base">
                  Official Billing & Engagement Terms
                </span>
                <span className="text-xs text-gray-400 font-normal">
                  50% Advance Policy, Monthly Due Windows & 30-Day Delivery Cycle
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 bg-[#2589D0]/10 px-2.5 py-1 rounded border border-[#2589D0]/30 hidden sm:inline-block">
                {isTermsOpen ? 'Collapse Terms' : 'Expand Terms'}
              </span>
              {isTermsOpen ? (
                <ChevronUp className="w-5 h-5 text-[#2589D0]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </button>

          <AnimatePresence>
            {isTermsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6 pt-2 border-t border-white/10 text-xs text-gray-300 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#0F172A] border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-cyan-300 font-mono font-bold text-xs uppercase">
                      <Clock className="w-4 h-4 text-[#2589D0]" />
                      <span>1. 50% Advance</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      50% advance payment is mandatory to initiate content strategy, filming setup, scripting, and onboarding.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0F172A] border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-cyan-300 font-mono font-bold text-xs uppercase">
                      <Calendar className="w-4 h-4 text-[#2589D0]" />
                      <span>2. Payment Window</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      Remaining payment is due between the 1st and 10th of each calendar month to maintain uninterrupted publishing & ad spend.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0F172A] border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-cyan-300 font-mono font-bold text-xs uppercase">
                      <CheckCircle2 className="w-4 h-4 text-[#2589D0]" />
                      <span>3. 1 Month Delivery</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      All deliverables (posts, reels, product photos, calendars, and ad setups) are completely fulfilled within 1 month.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#2589D0]/10 border border-[#2589D0]/30 text-gray-300 text-xs leading-relaxed flex items-start gap-3">
                  <Info className="w-4 h-4 text-[#2589D0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Quality & Revision Policy:</strong>
                    Every client receives a dedicated content approval dashboard. Scripts and video cuts are shared 5 days prior to publishing. Two revision rounds per asset are included at no extra cost.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* INTERACTIVE CUSTOM PACKAGE BUILDER / CONFIGURATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-[#2589D0]/40 bg-gradient-to-b from-[#181D27] to-[#0F172A] space-y-8 shadow-2xl">
          
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center justify-center gap-2">
              <Sliders className="w-4 h-4 text-[#2589D0]" />
              NEED A TAILORED SCOPE?
            </span>
            <h2 className="font-['Outfit'] font-bold text-3xl text-white">
              Interactive Custom Package Builder
            </h2>
            <p className="text-xs text-gray-400">
              Select custom video counts, target platforms, and ad management options to generate your custom agency estimate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Controls Left Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Platform Selector */}
              <div>
                <label className="block text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                  1. Choose Target Platforms
                </label>
                <div className="flex flex-wrap gap-2">
                  {availablePlatforms.map((plat) => {
                    const isSelected = customConfig.platforms.includes(plat);
                    return (
                      <button
                        key={plat}
                        onClick={() => togglePlatform(plat)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#2589D0] text-white border border-cyan-300 shadow-[0_0_12px_rgba(37,137,208,0.4)]'
                            : 'bg-[#0F172A] text-gray-400 hover:text-white border border-white/5'
                        }`}
                      >
                        {plat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reels Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono text-gray-300 uppercase">
                    2. Short Video Reels / Month
                  </label>
                  <span className="font-['Outfit'] font-bold text-base text-cyan-300">
                    {customConfig.reelsCount} Videos / mo
                  </span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={120}
                  step={6}
                  value={customConfig.reelsCount}
                  onChange={(e) => setCustomConfig({ ...customConfig, reelsCount: Number(e.target.value) })}
                  className="w-full h-2 bg-[#0F172A] rounded-lg appearance-none cursor-pointer accent-[#2589D0]"
                />
              </div>

              {/* Weekly Post Frequency Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono text-gray-300 uppercase">
                    3. Weekly Publishing Frequency
                  </label>
                  <span className="font-['Outfit'] font-bold text-base text-cyan-300">
                    {customConfig.postFrequency} Posts / week
                  </span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={28}
                  step={1}
                  value={customConfig.postFrequency}
                  onChange={(e) => setCustomConfig({ ...customConfig, postFrequency: Number(e.target.value) })}
                  className="w-full h-2 bg-[#0F172A] rounded-lg appearance-none cursor-pointer accent-[#2589D0]"
                />
              </div>

              {/* Feature Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 flex items-center justify-between cursor-pointer hover:border-[#2589D0]/50 transition-colors">
                  <div>
                    <span className="font-['Outfit'] font-semibold text-xs text-white block">
                      Paid Ad Campaign Management
                    </span>
                    <span className="text-[10px] text-gray-400 block">Meta Ads & Audience Targeting</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={customConfig.adManagement}
                    onChange={(e) => setCustomConfig({ ...customConfig, adManagement: e.target.checked })}
                    className="w-4 h-4 accent-[#2589D0] cursor-pointer"
                  />
                </label>

                <label className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 flex items-center justify-between cursor-pointer hover:border-[#2589D0]/50 transition-colors">
                  <div>
                    <span className="font-['Outfit'] font-semibold text-xs text-white block">
                      Instagram Branding Suite
                    </span>
                    <span className="text-[10px] text-gray-400 block">DP, Highlights & Bio Design</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={customConfig.brandIdentity}
                    onChange={(e) => setCustomConfig({ ...customConfig, brandIdentity: e.target.checked })}
                    className="w-4 h-4 accent-[#2589D0] cursor-pointer"
                  />
                </label>
              </div>

            </div>

            {/* Custom Quote Output Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0F172A] border border-[#2589D0]/50 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  ESTIMATED CUSTOM INVESTMENT
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  CALCULATED
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-gray-400 uppercase block">
                  Monthly Agency Fee
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-['Outfit'] font-black text-4xl text-white">
                    &#8377;{customPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">/month</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-300 border-t border-white/5 pt-4">
                <div className="flex justify-between">
                  <span>Selected Platforms:</span>
                  <span className="text-cyan-300 font-semibold">{customConfig.platforms.length} Platforms</span>
                </div>
                <div className="flex justify-between">
                  <span>Reels Output:</span>
                  <span className="text-white font-semibold">{customConfig.reelsCount} Videos /mo</span>
                </div>
                <div className="flex justify-between">
                  <span>Weekly Posts:</span>
                  <span className="text-white font-semibold">{customConfig.postFrequency} Posts /wk</span>
                </div>
                <div className="flex justify-between">
                  <span>Paid Ads Included:</span>
                  <span className="text-white font-semibold">{customConfig.adManagement ? 'Yes' : 'No'}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleWhatsAppCustomScope}
                  className="w-full py-3.5 rounded-xl font-['Outfit'] font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-[#2589D0] hover:from-emerald-500 hover:to-[#2589D0] shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-current text-white" />
                  <span>Send Custom Scope to WhatsApp</span>
                </button>

                <button
                  onClick={handleApplyCustomPackage}
                  className="w-full py-2.5 rounded-xl font-['Outfit'] font-semibold text-xs text-gray-300 hover:text-white bg-[#0F172A] hover:bg-white/10 border border-white/10 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Request Online Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* PRE-FILLED BOOKING MODAL PORTAL */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {bookingPackage && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setBookingPackage(null)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative w-full max-w-lg glass-panel rounded-3xl bg-[#181D27] border border-[#2589D0]/60 p-6 sm:p-8 shadow-2xl text-white space-y-6 z-[101] my-8"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setBookingPackage(null)}
                    className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Modal Header */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 bg-[#2589D0]/20 px-2.5 py-1 rounded border border-[#2589D0]/40 uppercase font-bold inline-block">
                      PACKAGE BOOKING REQUEST
                    </span>
                    <h3 className="font-['Outfit'] font-extrabold text-2xl text-white">
                      Confirm {bookingPackage.name}
                    </h3>
                    <p className="text-xs text-gray-300">
                      {bookingPackage.deliverablesSummary} &bull; &#8377;
                      {(billingCycle === 'monthly' ? bookingPackage.monthlyPrice : bookingPackage.quarterlyPrice).toLocaleString('en-IN')}/mo
                    </p>
                  </div>

                  {/* Booking Form */}
                  <form onSubmit={handleConfirmBooking} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-gray-300 font-mono text-[10px] uppercase mb-1">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-3 text-gray-500" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={bookingForm.clientName}
                          onChange={(e) => setBookingForm({ ...bookingForm, clientName: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-white focus:border-[#2589D0] outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-300 font-mono text-[10px] uppercase mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3.5 top-3 text-gray-500" />
                          <input
                            type="email"
                            required
                            placeholder="rahul@brand.com"
                            value={bookingForm.email}
                            onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-white focus:border-[#2589D0] outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-300 font-mono text-[10px] uppercase mb-1">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-3.5 top-3 text-gray-500" />
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={bookingForm.phone}
                            onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-white focus:border-[#2589D0] outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 font-mono text-[10px] uppercase mb-1">
                        Company / Brand Name
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 absolute left-3.5 top-3 text-gray-500" />
                        <input
                          type="text"
                          placeholder="e.g. Apex Apparel"
                          value={bookingForm.companyName}
                          onChange={(e) => setBookingForm({ ...bookingForm, companyName: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-white focus:border-[#2589D0] outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 font-mono text-[10px] uppercase mb-1">
                        Preferred Onboarding Timeline
                      </label>
                      <select
                        value={bookingForm.startDate}
                        onChange={(e) => setBookingForm({ ...bookingForm, startDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-white focus:border-[#2589D0] outline-none transition-colors"
                      >
                        <option value="Immediate (Within 48 Hours)">Immediate (Within 48 Hours)</option>
                        <option value="Next Week">Next Week</option>
                        <option value="Beginning of Next Month">Beginning of Next Month</option>
                      </select>
                    </div>

                    <div className="pt-2 space-y-2">
                      <button
                        type="button"
                        onClick={handleConfirmBookingWhatsApp}
                        className="w-full py-3.5 rounded-xl font-['Outfit'] font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-[#2589D0] hover:from-emerald-500 hover:to-[#2589D0] shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4 fill-current text-white" />
                        <span>Confirm & Chat on WhatsApp</span>
                      </button>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl font-['Outfit'] font-semibold text-xs text-gray-300 hover:text-white bg-[#0F172A] hover:bg-white/10 border border-white/10 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Proceed via Online Form</span>
                      </button>
                      <p className="text-[10px] text-gray-400 text-center mt-1">
                        50% advance due upon contract signing. Immediate strategist reply via WhatsApp.
                      </p>
                    </div>
                  </form>

                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

    </div>
  );
};
