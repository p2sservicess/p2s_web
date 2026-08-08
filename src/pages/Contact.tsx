import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import {
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  Building,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Calculator,
  ShieldCheck,
  Check,
  User,
  FileText,
  Zap,
  ChevronRight,
  ExternalLink,
  Sliders,
  DollarSign,
  Facebook,
  Instagram
} from 'lucide-react';
import { P2S_WHATSAPP_DISPLAY, P2S_WHATSAPP_NUMBER, createWhatsAppUrl, getWhatsAppContactMsg } from '../utils/whatsapp';

interface EstimatorAddon {
  id: string;
  name: string;
  price: number;
  description: string;
}

const ESTIMATOR_ADDONS: EstimatorAddon[] = [
  { id: 'erp', name: 'Custom ERP & GST Invoicing Module', price: 15000, description: 'Tailored billing, inventory & staff role management' },
  { id: 'ecom', name: 'E-Commerce Storefront & Payment Gateway', price: 12000, description: 'Online checkout with Razorpay/Stripe & order tracking' },
  { id: 'whatsapp', name: 'WhatsApp Business API & Bot Setup', price: 5000, description: 'Automated order notifications & 1-click chat widget' },
  { id: 'hosting', name: 'Domain, Cloud Hosting & SSL Setup', price: 3000, description: '256-bit SSL, DNS routing & corporate business emails' },
  { id: 'meta_ads', name: 'Meta Ads Setup & Pixel Integration', price: 6000, description: 'Campaign architecture, lookalike audiences & CAPI tracking' },
];

const PACKAGES_ESTIMATE = [
  { id: 'none', name: 'No Package / Custom Only', price: 0 },
  { id: 'basic', name: 'Basic Package (120 Posts + 24 Reels)', price: 4000 },
  { id: 'expert', name: 'Expert Package (240 Posts + 48 Reels)', price: 8000 },
  { id: 'growth', name: 'Growth Package (264 Posts + 84 Reels)', price: 12000 },
  { id: 'premium', name: 'Premium Package (384 Posts + 120 Reels)', price: 16000 },
];

export const Contact: React.FC = () => {
  const location = useLocation();

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Social Media Growth Packages',
    message: '',
  });

  // Submission Status State
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Estimator Widget State
  const [selectedPackageId, setSelectedPackageId] = useState<string>('growth');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['whatsapp', 'hosting']);

  // Handle Location state passed from other pages
  useEffect(() => {
    if (location.state) {
      const { selectedPackageName, selectedService, customConfig } = location.state;

      let defaultService = 'Social Media Growth Packages';
      let defaultMsg = '';

      if (selectedService) {
        defaultService = selectedService;
        defaultMsg = `Inquiry regarding: ${selectedService}`;
      } else if (selectedPackageName) {
        defaultService = 'Social Media Growth Packages';
        defaultMsg = `Package Booking Request: ${selectedPackageName}`;
      } else if (customConfig) {
        defaultService = 'Custom Full-Stack Project';
        defaultMsg = `Custom Scope Configured: ${customConfig.platforms.join(', ')} | ${customConfig.reelsCount} Reels/mo`;
      }

      setFormData((prev) => ({
        ...prev,
        service: defaultService,
        message: prev.message || defaultMsg,
      }));
    }
  }, [location.state]);

  // Toggle Estimator Addon
  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate Estimator Total
  const currentPackage = PACKAGES_ESTIMATE.find((p) => p.id === selectedPackageId) || PACKAGES_ESTIMATE[0];
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = ESTIMATOR_ADDONS.find((a) => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const estimatedTotal = currentPackage.price + addonsTotal;

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // Handle Direct WhatsApp Form Submission
  const handleDirectWhatsAppFormSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const msg = getWhatsAppContactMsg(
      formData.name,
      formData.company,
      formData.service,
      formData.phone,
      formData.message
    );
    window.open(createWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
  };

  // Handle WhatsApp Estimator Direct Launch
  const handleBookEstimateWhatsApp = () => {
    const addonNames = selectedAddons
      .map((id) => ESTIMATOR_ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean);

    const addonText = addonNames.length > 0 ? addonNames.join(' & ') : 'None';

    const message = `Hi P2S Team, I generated a custom estimate: Selected Package: ${currentPackage.name} + Add-ons: ${addonText}. Total Estimate: ₹${estimatedTotal.toLocaleString('en-IN')}`;

    window.open(createWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  // Pre-filled WhatsApp message link
  const rawWhatsAppMsg = `Hi P2S Team, I'm interested in your services! (Name: ${formData.name || 'Client'}, Company: ${formData.company || 'N/A'}, Service: ${formData.service})`;
  const whatsappUrl = createWhatsAppUrl(rawWhatsAppMsg);

  // Apply Estimate to Form
  const handleApplyEstimateToForm = () => {
    const addonNames = selectedAddons
      .map((id) => ESTIMATOR_ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const summaryText = `Project Estimate Booking:
- Base Package: ${currentPackage.name} (₹${currentPackage.price.toLocaleString('en-IN')})
- Add-ons: ${addonNames || 'None'} (₹${addonsTotal.toLocaleString('en-IN')})
- Estimated Total: ₹${estimatedTotal.toLocaleString('en-IN')}`;

    setFormData((prev) => ({
      ...prev,
      service: currentPackage.id !== 'none' ? 'Social Media Growth Packages' : 'Custom Full-Stack Project',
      message: summaryText,
    }));

    // Scroll to form smooth
    const formEl = document.getElementById('lead-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen pt-28 pb-24 space-y-20 overflow-hidden">
      
      {/* Background Floating Particles Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2589D0]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* HEADER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2589D0]/10 border border-[#2589D0]/40 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(37,137,208,0.25)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#2589D0]" />
          <span>DIRECT AGENCY HQ & ESTIMATOR</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-['Outfit'] font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight"
        >
          Connect with P2S{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2589D0] via-cyan-300 to-blue-400 drop-shadow-[0_0_25px_rgba(37,137,208,0.5)]">
            Growth Engineers
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          Calculate custom project estimates or send a direct inquiry to lock in your strategy session within 24 hours.
        </motion.p>
      </section>

      {/* SECTION 1: SPLIT-SCREEN CONTACT LAYOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Direct Contact Info & Live Messaging */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Agency HQ Info Cards */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 bg-[#181D27]/90 border border-white/10 space-y-6 shadow-xl">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                  DIRECT CHANNELS
                </span>
                <h3 className="font-['Outfit'] font-bold text-2xl text-white mt-1">
                  P2S Agency Information
                </h3>
              </div>

              <div className="space-y-4">
                {/* Email Card */}
                <div className="group p-4 rounded-2xl bg-[#0F172A] border border-white/10 hover:border-[#2589D0]/60 transition-all duration-300 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#2589D0]/15 text-[#2589D0] border border-[#2589D0]/30 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase block">Official Email</span>
                    <a href="mailto:p2sservicess@gmail.com" className="text-sm font-semibold text-white hover:text-cyan-300 transition-colors">
                      p2sservicess@gmail.com
                    </a>
                    <span className="text-[11px] text-gray-400 block mt-0.5">Average reply time: &lt; 15 minutes</span>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="group p-4 rounded-2xl bg-[#0F172A] border border-white/10 hover:border-[#2589D0]/60 transition-all duration-300 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#2589D0]/15 text-[#2589D0] border border-[#2589D0]/30 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase block">Phone & Hotline</span>
                    <a href="tel:+919274127836" className="text-sm font-semibold text-white hover:text-cyan-300 transition-colors">
                      {P2S_WHATSAPP_DISPLAY}
                    </a>
                    <span className="text-[11px] text-gray-400 block mt-0.5">Mon–Sat (9:00 AM – 8:00 PM IST)</span>
                  </div>
                </div>

                {/* Office Location */}
                <div className="group p-4 rounded-2xl bg-[#0F172A] border border-white/10 hover:border-[#2589D0]/60 transition-all duration-300 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#2589D0]/15 text-[#2589D0] border border-[#2589D0]/30 group-hover:scale-105 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase block">Headquarters</span>
                    <span className="text-sm font-semibold text-white block">
                      P2S Solution Hub, Digital Tech Park
                    </span>
                    <span className="text-[11px] text-gray-400 block mt-0.5">Ahmedabad & Mumbai, India</span>
                  </div>
                </div>

                {/* Official Social Channels */}
                <div className="pt-3 border-t border-white/10">
                  <span className="text-[10px] font-mono text-gray-400 uppercase block mb-2.5 font-bold">
                    Official Social Profiles
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href="https://www.facebook.com/share/19NEqZ2uqV/"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-3 min-h-[48px] rounded-xl bg-[#0F172A] text-gray-300 hover:text-white hover:bg-[#2589D0] border border-white/10 transition-all flex items-center gap-2 text-xs font-medium cursor-pointer active:scale-95"
                    >
                      <Facebook className="w-4 h-4 text-[#2589D0]" />
                      <span>Facebook</span>
                    </a>
                    <a
                      href="https://www.instagram.com/p2s_services?igsh=MWZjenJ2N3dubHRqdg=="
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-3 min-h-[48px] rounded-xl bg-[#0F172A] text-gray-300 hover:text-white hover:bg-pink-600 border border-white/10 transition-all flex items-center gap-2 text-xs font-medium cursor-pointer active:scale-95"
                    >
                      <Instagram className="w-4 h-4 text-pink-400" />
                      <span>Instagram</span>
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-3 min-h-[48px] rounded-xl bg-[#0F172A] text-emerald-400 hover:text-white hover:bg-emerald-600 border border-emerald-500/30 transition-all flex items-center gap-2 text-xs font-medium cursor-pointer active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4 fill-current text-emerald-400" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Direct Floating/Interactive CTA */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-[#2589D0] border border-emerald-400/40 shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-between text-white group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-white/20 backdrop-blur-md text-white animate-pulse">
                  <MessageSquare className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-['Outfit'] font-black text-lg text-white">
                      Instant WhatsApp Chat
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-black text-[9px] font-mono font-bold uppercase">
                      ONLINE NOW
                    </span>
                  </div>
                  <p className="text-xs text-emerald-100 mt-0.5">
                    Click to message our strategist directly on WhatsApp
                  </p>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white/10 group-hover:bg-white group-hover:text-emerald-700 transition-colors">
                <ExternalLink className="w-5 h-5" />
              </div>
            </motion.a>

            {/* Business Hours & Payment Terms Info Card */}
            <div className="p-6 rounded-3xl bg-[#0F172A] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase">
                <ShieldCheck className="w-4 h-4 text-[#2589D0]" />
                <span>P2S BILLING & GUARANTEE POLICY</span>
              </div>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2589D0] shrink-0 mt-0.5" />
                  <span><strong>50% Advance Policy:</strong> Work begins immediately upon 50% retainer confirmation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2589D0] shrink-0 mt-0.5" />
                  <span><strong>Monthly Due Windows:</strong> Balance invoices due 1st–10th of every month.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2589D0] shrink-0 mt-0.5" />
                  <span><strong>1-Month Fulfill Guarantee:</strong> All posts, reels, and setups completed within 30 days.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* RIGHT COLUMN: Animated Lead Generation Form */}
          <div id="lead-form" className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-8 sm:p-10 bg-[#181D27] border border-[#2589D0]/40 shadow-2xl relative">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                        LEAD GENERATION INTAKE
                      </span>
                      <h3 className="font-['Outfit'] font-extrabold text-2xl text-white mt-1">
                        Inquire About Your Project
                      </h3>
                      <p className="text-xs text-gray-400">
                        Fill out the details below and an account director will contact you within 24 hours.
                      </p>
                    </div>

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3.5 top-4 text-gray-500" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Vikram Patel"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-3.5 min-h-[48px] rounded-xl bg-[#0F172A] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2589D0] focus:ring-2 focus:ring-[#2589D0]/50 transition-all"
                          />
                        </div>
                      </div>

                      {/* Work Email */}
                      <div>
                        <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-1.5">
                          Work Email *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-500" />
                          <input
                            type="email"
                            required
                            placeholder="vikram@brand.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0F172A] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2589D0] focus:ring-2 focus:ring-[#2589D0]/50 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-1.5">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-500" />
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0F172A] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2589D0] focus:ring-2 focus:ring-[#2589D0]/50 transition-all"
                          />
                        </div>
                      </div>

                      {/* Company Name */}
                      <div>
                        <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-1.5">
                          Company / Brand Name
                        </label>
                        <div className="relative">
                          <Building className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-500" />
                          <input
                            type="text"
                            placeholder="Apex Innovations"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0F172A] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2589D0] focus:ring-2 focus:ring-[#2589D0]/50 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Service Selection Dropdown */}
                    <div>
                      <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-1.5">
                        Primary Service Module *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-white/10 text-sm text-white focus:outline-none focus:border-[#2589D0] focus:ring-2 focus:ring-[#2589D0]/50 transition-all"
                      >
                        <option value="Social Media Growth Packages">Social Media Growth Packages (Reels + Posts)</option>
                        <option value="Business Website | Landing Page | Portfolio Setup">Business Website | Landing Page | Portfolio Setup</option>
                        <option value="Custom ERP | Billing Software | Custom Business Modules">Custom ERP | Billing Software | Custom Business Modules</option>
                        <option value="E-Commerce Website Development">E-Commerce Website Development</option>
                        <option value="Domain & Hosting Setup Services">Domain & Hosting Setup Services</option>
                        <option value="WhatsApp Integration & Social Media Integration">WhatsApp Integration & Social Media Integration</option>
                        <option value="Website Maintenance & Updates">Website Maintenance & Updates</option>
                        <option value="Meta Ads Setup & Campaign Management">Meta Ads Setup & Campaign Management</option>
                        <option value="Custom Full-Stack Project">Custom Full-Stack Enterprise Project</option>
                      </select>
                    </div>

                    {/* Message Area */}
                    <div>
                      <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-1.5">
                        Project Brief / Message
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell us about your current channels, targets, or specific technical requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2589D0] focus:ring-2 focus:ring-[#2589D0]/50 transition-all resize-none"
                      />
                    </div>

                    {/* Submit Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleDirectWhatsAppFormSubmit}
                        className="w-full py-4 rounded-xl font-['Outfit'] font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-[#2589D0] hover:from-emerald-500 hover:to-[#2589D0] shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4 fill-current text-white" />
                        <span>Submit via Direct WhatsApp</span>
                      </button>

                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl font-['Outfit'] font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#2589D0] to-cyan-500 hover:from-cyan-400 hover:to-[#2589D0] shadow-[0_0_20px_rgba(37,137,208,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Online Inquiry</span>
                      </button>
                    </div>

                    <p className="text-[10px] text-gray-500 text-center">
                      Protected by 256-bit encryption. Zero spam guaranteed.
                    </p>

                  </motion.form>
                ) : (
                  /* Form Submission Success State */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-6"
                  >
                    {/* Glowing Blue Ripple Animation Box */}
                    <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-[#2589D0]/30 animate-ping" />
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#2589D0] to-cyan-400 text-white flex items-center justify-center shadow-[0_0_40px_#2589D0] z-10">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-['Outfit'] font-black text-3xl text-white">
                        Inquiry Sent Successfully!
                      </h3>
                      <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                        Thank you <span className="text-white font-semibold">{formData.name}</span>. Our team at P2S has received your request for <span className="text-cyan-300 font-semibold">{formData.service}</span>.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#2589D0]/30 text-xs text-gray-300 max-w-md mx-auto space-y-1 text-left">
                      <span className="text-cyan-400 font-mono font-bold block">CONFIRMATION SUMMARY:</span>
                      <p><strong>Email:</strong> {formData.email}</p>
                      <p><strong>Phone:</strong> {formData.phone}</p>
                      {formData.company && <p><strong>Company:</strong> {formData.company}</p>}
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-6 py-3 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Chat on WhatsApp Now</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: INTERACTIVE PROJECT COST ESTIMATOR WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-[#2589D0]/50 bg-gradient-to-b from-[#181D27] to-[#0F172A] space-y-10 shadow-2xl">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center justify-center gap-2">
              <Calculator className="w-4 h-4 text-[#2589D0]" />
              INSTANT PRICING CALCULATOR
            </span>
            <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-white">
              Interactive Project Cost Estimator
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              Select base social packages and technical add-on modules to dynamically calculate your total project budget.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Package & Addon Controls */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Base Social Package Selector */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-cyan-300 uppercase tracking-wider block font-bold">
                  1. Select Base Social Package (Monthly)
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PACKAGES_ESTIMATE.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#2589D0]/20 border-[#2589D0] ring-2 ring-[#2589D0]/50 shadow-[0_0_15px_rgba(37,137,208,0.3)]'
                            : 'bg-[#0F172A] border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-['Outfit'] font-bold text-xs text-white">
                            {pkg.name}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-cyan-300" />}
                        </div>
                        <span className="font-['Outfit'] font-black text-base text-cyan-300">
                          {pkg.price > 0 ? `₹${pkg.price.toLocaleString('en-IN')}/mo` : '₹0'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Technical Add-ons Checkboxes */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-cyan-300 uppercase tracking-wider block font-bold">
                  2. Select Custom Technical Add-on Modules
                </label>

                <div className="space-y-2.5">
                  {ESTIMATOR_ADDONS.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <label
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-[#2589D0]/15 border-[#2589D0]'
                            : 'bg-[#0F172A] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                            isChecked ? 'bg-[#2589D0] border-[#2589D0] text-white' : 'border-gray-500'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </div>

                          <div>
                            <span className="font-['Outfit'] font-semibold text-xs text-white block">
                              {addon.name}
                            </span>
                            <span className="text-[10px] text-gray-400 block">
                              {addon.description}
                            </span>
                          </div>
                        </div>

                        <span className="font-['Outfit'] font-bold text-xs text-cyan-300 shrink-0 ml-2">
                          +₹{addon.price.toLocaleString('en-IN')}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Total Estimate Calculation Display & Action Box */}
            <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-[#2589D0]/60 space-y-6 shadow-2xl sticky top-28">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  DYNAMIC ESTIMATE SUMMARY
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                  LIVE TOTAL
                </span>
              </div>

              {/* Animated Live Total Counter */}
              <div>
                <span className="text-[10px] font-mono text-gray-400 uppercase block">
                  Estimated Total Investment
                </span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <motion.span
                    key={estimatedTotal}
                    initial={{ scale: 1.1, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-['Outfit'] font-black text-4xl sm:text-5xl text-white tracking-tight"
                  >
                    &#8377;{estimatedTotal.toLocaleString('en-IN')}
                  </motion.span>
                  <span className="text-xs font-mono text-gray-400">INR</span>
                </div>
              </div>

              {/* Selected Breakdown */}
              <div className="space-y-2 text-xs border-t border-white/10 pt-4 text-gray-300">
                <div className="flex justify-between">
                  <span>Base Package:</span>
                  <span className="text-cyan-300 font-semibold">{currentPackage.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Selected Add-ons:</span>
                  <span className="text-white font-semibold">{selectedAddons.length} Modules</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Retainer:</span>
                  <span className="text-emerald-400 font-semibold">50% Advance Required</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleBookEstimateWhatsApp}
                  className="w-full py-4 rounded-xl font-['Outfit'] font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-[#2589D0] hover:from-emerald-500 hover:to-[#2589D0] shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-current text-white" />
                  <span>Book This Estimate (WhatsApp)</span>
                </button>

                <button
                  onClick={handleApplyEstimateToForm}
                  className="w-full py-3 rounded-xl font-['Outfit'] font-semibold text-xs text-gray-300 hover:text-white bg-[#0F172A] hover:bg-white/10 border border-white/10 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Apply Estimate to Intake Form</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
