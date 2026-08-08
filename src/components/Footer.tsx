import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Instagram,
  Facebook,
  MessageSquare,
  Send,
  ShieldCheck,
  CheckCircle2,
  ArrowUp,
  Clock,
  Zap,
  Mail,
} from "lucide-react";

import { P2S_WHATSAPP_NUMBER } from "../utils/whatsapp";
import p2sLogo from "../images/p2sLogo.png";

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  /* ==========================================
     NEWSLETTER SUBMIT
  ========================================== */
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      setSubscribed(true);

      setTimeout(() => {
        setSubscribed(false);
      }, 5000);

      setEmail("");
    }
  };

  /* ==========================================
     SCROLL TO TOP
  ========================================== */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#181D27] to-[#0F172A] border-t border-white/10 text-gray-400 overflow-hidden z-10">

      {/* =====================================================
          ANIMATED TOP BORDER
      ====================================================== */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2589D0] to-transparent shadow-[0_0_15px_#2589D0]" />

      {/* =====================================================
          BACKGROUND AMBIENT GLOW
      ====================================================== */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-40 bg-[#2589D0]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* =====================================================
          MAIN FOOTER CONTAINER
      ====================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">

        {/* ===================================================
            4 COLUMN RESPONSIVE LAYOUT
        ==================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* =================================================
              COLUMN 1 — BRAND & SOCIALS
          ================================================== */}
          <div className="space-y-4">

            {/* Brand */}
            <NavLink
              to="/"
              className="inline-flex items-center gap-3 group"
            >

              {/* =================================================
                  P2S LOGO IMAGE
              ================================================== */}
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-[#0F172A] border border-[#2589D0]/60 shadow-[0_0_20px_rgba(37,137,208,0.3)] group-hover:border-[#2589D0] group-hover:shadow-[0_0_28px_rgba(37,137,208,0.5)] transition-all overflow-hidden"
              >
                {/* Actual P2S Logo */}
                <img
                  src={p2sLogo}
                  alt="P2S Logo"
                  className="w-[78%] h-[78%] object-contain"
                />

                {/* Subtle Logo Glow */}
                <div className="absolute inset-0 bg-[#2589D0]/5 pointer-events-none" />

                {/* Corner Accents */}
                <span className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l border-[#2589D0]" />

                <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r border-[#2589D0]" />

                {/* Animated Glow Dot */}
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2589D0] opacity-75" />

                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2589D0]" />
                </span>
              </motion.div>

              {/* Brand Text */}
              <div>
                <span className="font-['Outfit'] font-bold text-xl text-white tracking-tight block group-hover:text-[#2589D0] transition-colors">
                  P2S Agency
                </span>

                <span className="text-[10px] font-mono tracking-widest text-[#2589D0] uppercase font-bold block">
                  Problem To Solution
                </span>
              </div>
            </NavLink>

            {/* Description */}
            <p className="text-xs text-gray-300 leading-relaxed">
              We diagnose business growth bottlenecks, craft viral social
              media campaigns, build high-performance ERPs, and deliver
              end-to-end digital engineering.
            </p>

            {/* Email */}
            <div className="flex items-center gap-2 text-xs text-cyan-300 font-mono">
              <Mail className="w-3.5 h-3.5 text-[#2589D0] shrink-0" />

              <a
                href="mailto:p2sservicess@gmail.com"
                className="hover:text-white transition-colors"
              >
                p2sservicess@gmail.com
              </a>
            </div>

            {/* =================================================
                SOCIAL MEDIA LINKS
            ================================================== */}
            <div className="flex items-center gap-2.5 pt-1">

              {/* Instagram */}
              <motion.a
                whileHover={{
                  scale: 1.15,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                href="https://www.instagram.com/p2s_services?igsh=MWZjenJ2N3dubHRqdg=="
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#0F172A] text-gray-300 hover:text-white hover:bg-pink-600 border border-white/10 hover:border-pink-500 transition-all duration-200 shadow-md"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>

              {/* Facebook */}
              <motion.a
                whileHover={{
                  scale: 1.15,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                href="https://www.facebook.com/share/19NEqZ2uqV/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#0F172A] text-gray-300 hover:text-white hover:bg-[#2589D0] border border-white/10 hover:border-[#2589D0] transition-all duration-200 shadow-md"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                whileHover={{
                  scale: 1.15,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                href={`https://wa.me/${P2S_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#0F172A] text-emerald-400 hover:text-white hover:bg-emerald-600 border border-emerald-500/30 transition-all duration-200 shadow-md"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
              </motion.a>
            </div>
          </div>

          {/* =================================================
              COLUMN 2 — QUICK LINKS
          ================================================== */}
          <div className="space-y-4">

            <h4 className="font-['Outfit'] font-bold text-white text-sm tracking-wider uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2589D0]" />
              Quick Navigation
            </h4>

            <ul className="space-y-2.5 text-xs">

              <li>
                <NavLink
                  to="/"
                  className="text-gray-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#2589D0] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />

                  <span>Home Overview</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/packages"
                  className="text-gray-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#2589D0] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />

                  <span>Social Media Packages</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/services"
                  className="text-gray-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#2589D0] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />

                  <span>Services & ERP Solutions</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className="text-gray-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#2589D0] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />

                  <span>Contact & Project Intake</span>
                </NavLink>
              </li>

            </ul>
          </div>

          {/* =================================================
              COLUMN 3 — POPULAR SERVICES & PACKAGES
          ================================================== */}
          <div className="space-y-4">

            <h4 className="font-['Outfit'] font-bold text-white text-sm tracking-wider uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2589D0]" />
              Popular Solutions
            </h4>

            <ul className="space-y-2.5 text-xs text-gray-300">

              <li>
                <button
                  onClick={() => navigate("/packages")}
                  className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#2589D0] font-bold">
                    •
                  </span>

                  <span>
                    Basic Package (₹4,000/mo)
                  </span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/packages")}
                  className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#2589D0] font-bold">
                    •
                  </span>

                  <span>
                    Growth Package (₹12,000/mo)
                  </span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/packages")}
                  className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#2589D0] font-bold">
                    •
                  </span>

                  <span>
                    Premium Package (₹16,000/mo)
                  </span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/services")}
                  className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#2589D0] font-bold">
                    •
                  </span>

                  <span>
                    Custom ERP & Billing Software
                  </span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/services")}
                  className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#2589D0] font-bold">
                    •
                  </span>

                  <span>
                    Meta Ads & Pixel Conversion
                  </span>
                </button>
              </li>

            </ul>
          </div>

          {/* =================================================
              COLUMN 4 — NEWSLETTER & HOURS
          ================================================== */}
          <div className="space-y-4">

            <h4 className="font-['Outfit'] font-bold text-white text-sm tracking-wider uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2589D0]" />
              Growth Newsletter
            </h4>

            <p className="text-xs text-gray-300">
              Subscribe for weekly agency growth insights and viral
              algorithm updates.
            </p>

            {/* Newsletter Form */}
            <form
              onSubmit={handleNewsletterSubmit}
              className="space-y-2"
            >
              <div className="relative">

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter work email"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2589D0] transition-colors"
                />

                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#2589D0] hover:bg-cyan-500 text-white rounded-lg transition-colors flex items-center justify-center cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>

              </div>

              {/* Subscription Success */}
              <AnimatePresence>
                {subscribed && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className="flex items-center gap-1.5 text-[11px] text-emerald-400"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />

                    <span>
                      Subscribed successfully!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Privacy */}
              <span className="text-[10px] text-gray-500 flex items-center gap-1 pt-1">
                <ShieldCheck className="w-3 h-3 text-[#2589D0]" />

                Strict privacy. Zero spam policy.
              </span>
            </form>

            {/* Operating Hours */}
            <div className="p-3 rounded-xl bg-[#0F172A] border border-white/10 text-[11px] text-gray-400 space-y-1">

              <div className="flex items-center gap-1.5 text-cyan-300 font-mono font-bold">
                <Clock className="w-3 h-3" />

                <span>
                  HOURS & PAYMENT TERMS
                </span>
              </div>

              <p>
                Mon–Sat: 9:00 AM – 8:00 PM IST
              </p>

              <p className="text-gray-400">
                Terms: 50% Advance | Due 1st–10th
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">

          {/* Copyright */}
          <div className="flex items-center gap-2">
            <span>
              © {new Date().getFullYear()} P2S (Problem To Solution)
              Agency. All rights reserved.
            </span>
          </div>

          {/* Bottom Links */}
          <div className="flex items-center gap-6">

            <span className="hover:text-cyan-300 cursor-pointer transition-colors">
              Privacy Policy
            </span>

            <span className="hover:text-cyan-300 cursor-pointer transition-colors">
              Terms of Service
            </span>

            <span className="hidden lg:flex items-center gap-1 text-cyan-300 font-mono">
              <Zap className="w-3 h-3 fill-current text-[#2589D0]" />

              System Status: Active
            </span>
          </div>

          {/* =================================================
              BACK TO TOP
          ================================================== */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{
              scale: 1.1,
              y: -3,
            }}
            whileTap={{
              scale: 0.9,
            }}
            className="p-3 rounded-xl bg-[#0F172A] text-cyan-300 border border-[#2589D0]/50 hover:bg-[#2589D0] hover:text-white shadow-[0_0_15px_rgba(37,137,208,0.3)] transition-all cursor-pointer flex items-center gap-1.5"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />

            <span className="text-[10px] font-mono font-bold uppercase hidden sm:inline">
              TOP
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;