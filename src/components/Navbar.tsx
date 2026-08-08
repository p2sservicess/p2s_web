
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  ArrowRight,
  Bot,
  RotateCcw,
  ChevronRight,
} from "lucide-react";

import p2sLogo from "../images/p2sLogo.png";

interface NavbarProps {
  onOpenAiAssistant?: () => void;
  onReplayPreloader?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAiAssistant,
  onReplayPreloader,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  /* ==========================================
     HANDLE NAVBAR SCROLL STATE
  ========================================== */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ==========================================
     CLOSE MOBILE MENU WHEN ROUTE CHANGES
  ========================================== */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  /* ==========================================
     LOCK BODY SCROLL WHEN MOBILE MENU IS OPEN
  ========================================== */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  /* ==========================================
     NAVIGATION LINKS
  ========================================== */
  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Packages",
      path: "/packages",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "Contact Us",
      path: "/contact",
    },
  ];

  return (
    <>
      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#181D27]/95 backdrop-blur-md border-b border-[#2589D0]/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-2.5"
            : "bg-[#181D27]/80 backdrop-blur-sm border-b border-white/5 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* =================================================
                BRAND / LOGO
            ================================================== */}
            <NavLink
              to="/"
              className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none shrink-0"
            >
              {/* Logo Container */}
              <motion.div
                whileHover={{
                  scale: 1.04,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#181D27] border border-[#2589D0]/60 shadow-[0_0_15px_rgba(37,137,208,0.3)] group-hover:border-[#2589D0] group-hover:shadow-[0_0_22px_rgba(37,137,208,0.5)] transition-all overflow-hidden"
              >
                {/* Actual P2S Logo */}
                <img
                  src={p2sLogo}
                  alt="P2S Logo"
                  className="w-[78%] h-[78%] object-contain"
                />

                {/* Glowing Notification Dot */}
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2589D0] opacity-75" />

                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2589D0]" />
                </span>

                {/* Small Corner Accents */}
                <span className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l border-[#2589D0]" />

                <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r border-[#2589D0]" />
              </motion.div>

              {/* Brand Name */}
              <div className="flex flex-col">
                <span className="font-['Outfit'] font-bold text-base sm:text-lg text-white leading-none tracking-tight group-hover:text-[#2589D0] transition-colors">
                  P2S
                </span>

                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-gray-400 uppercase hidden sm:block">
                  Problem To Solution
                </span>
              </div>
            </NavLink>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================== */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `relative px-3.5 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors ${
                        isActive
                          ? "text-white font-semibold"
                          : "text-gray-300 hover:text-white"
                      }`
                    }
                  >
                    {link.name}

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#2589D0] to-cyan-300 rounded-full shadow-[0_0_8px_#2589D0]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* =================================================
                DESKTOP RIGHT ACTIONS
            ================================================== */}
            <div className="hidden md:flex items-center gap-2.5 lg:gap-3">

              {/* AI ASSISTANT */}
              {onOpenAiAssistant && (
                <button
                  onClick={onOpenAiAssistant}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-cyan-300 bg-[#2589D0]/10 border border-[#2589D0]/30 hover:bg-[#2589D0]/20 hover:border-[#2589D0]/60 transition-all cursor-pointer"
                  title="AI Solution Finder"
                >
                  <Bot className="w-3.5 h-3.5 text-[#2589D0] animate-bounce" />

                  <span className="hidden lg:inline">
                    AI Solution Finder
                  </span>

                  <span className="lg:hidden">
                    AI Diagnostic
                  </span>
                </button>
              )}

              {/* REPLAY PRELOADER */}
              {onReplayPreloader && (
                <button
                  onClick={onReplayPreloader}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  title="Replay Intro Splash"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}

              {/* GET STARTED */}
              <button
                onClick={() => navigate("/contact")}
                className="group relative inline-flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-xl font-['Outfit'] font-semibold text-xs lg:text-sm text-white bg-gradient-to-r from-[#2589D0] to-[#1d6ba4] hover:from-[#2ba1f5] hover:to-[#2589D0] shadow-[0_0_20px_rgba(37,137,208,0.4)] hover:shadow-[0_0_30px_rgba(37,137,208,0.7)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-1.5 lg:gap-2">
                  Get Started

                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>

                {/* Hover Shine */}
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>

            {/* =================================================
                MOBILE ACTIONS
            ================================================== */}
            <div className="flex items-center gap-2 md:hidden">

              {/* MOBILE AI */}
              {onOpenAiAssistant && (
                <button
                  onClick={onOpenAiAssistant}
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-cyan-400 bg-[#2589D0]/10 border border-[#2589D0]/30 active:scale-95 transition-transform"
                  aria-label="Open AI Assistant"
                >
                  <Bot className="w-5 h-5 text-[#2589D0]" />
                </button>
              )}

              {/* MOBILE MENU */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-11 h-11 rounded-xl flex items-center justify-center text-gray-300 hover:text-white bg-[#181D27] border border-white/10 active:scale-95 transition-transform cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-cyan-400" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE NAVIGATION DRAWER
      ====================================================== */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-[100] md:hidden">

                {/* BACKDROP */}
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
                />

                {/* RIGHT SIDE DRAWER */}
                <motion.div
                  initial={{
                    x: "100%",
                  }}
                  animate={{
                    x: 0,
                  }}
                  exit={{
                    x: "100%",
                  }}
                  transition={{
                    type: "spring",
                    damping: 28,
                    stiffness: 280,
                  }}
                  className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-[#181D27] border-l border-[#2589D0]/40 p-5 sm:p-6 z-[101] flex flex-col justify-between overflow-y-auto shadow-[0_0_50px_rgba(37,137,208,0.4)]"
                >

                  {/* =================================================
                      DRAWER HEADER
                  ================================================== */}
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">

                      <div className="flex items-center gap-2">

                        {/* MOBILE LOGO */}
                        <motion.div
                          whileHover={{
                            scale: 1.04,
                          }}
                          className="relative w-9 h-9 rounded-xl bg-[#2589D0]/10 border border-[#2589D0]/60 flex items-center justify-center overflow-hidden"
                        >
                          <img
                            src={p2sLogo}
                            alt="P2S Logo"
                            className="w-[75%] h-[75%] object-contain"
                          />

                          {/* Small Glow */}
                          <span className="absolute inset-0 bg-[#2589D0]/5 pointer-events-none" />
                        </motion.div>

                        <span className="font-['Outfit'] font-bold text-white text-base">
                          Navigation
                        </span>
                      </div>

                      {/* CLOSE BUTTON */}
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-11 h-11 rounded-xl bg-white/5 text-gray-400 hover:text-white flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
                        aria-label="Close menu"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    {/* =================================================
                        MOBILE NAVIGATION LINKS
                    ================================================== */}
                    <div className="space-y-2.5">
                      {navLinks.map((link, idx) => {
                        const isActive = location.pathname === link.path;

                        return (
                          <motion.div
                            key={link.path}
                            initial={{
                              opacity: 0,
                              x: 20,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              delay: 0.08 + idx * 0.06,
                            }}
                          >
                            <NavLink
                              to={link.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`flex items-center justify-between px-4 py-3.5 min-h-[48px] rounded-2xl text-base font-semibold transition-all ${
                                isActive
                                  ? "bg-gradient-to-r from-[#2589D0]/30 to-cyan-500/20 border border-[#2589D0] text-white shadow-[0_0_15px_rgba(37,137,208,0.3)]"
                                  : "text-gray-300 hover:bg-white/5 hover:text-white border border-transparent"
                              }`}
                            >
                              <span className="font-['Outfit']">
                                {link.name}
                              </span>

                              <ChevronRight
                                className={`w-5 h-5 ${
                                  isActive
                                    ? "text-[#2589D0]"
                                    : "text-gray-500"
                                }`}
                              />
                            </NavLink>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* =================================================
                      DRAWER BOTTOM ACTIONS
                  ================================================== */}
                  <div className="pt-5 border-t border-white/10 space-y-3">

                    {/* MOBILE AI */}
                    {onOpenAiAssistant && (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenAiAssistant();
                        }}
                        className="w-full flex items-center justify-center gap-2 py-3.5 min-h-[48px] rounded-xl font-medium text-xs text-cyan-300 bg-[#2589D0]/15 border border-[#2589D0]/40 active:scale-98 transition-transform cursor-pointer"
                      >
                        <Bot className="w-4 h-4 text-[#2589D0]" />

                        <span>
                          AI Solution Diagnostic
                        </span>
                      </button>
                    )}

                    {/* MOBILE GET STARTED */}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate("/contact");
                      }}
                      className="w-full py-3.5 min-h-[48px] rounded-xl font-['Outfit'] font-bold text-sm text-white bg-gradient-to-r from-[#2589D0] to-cyan-500 shadow-[0_0_25px_rgba(37,137,208,0.5)] flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-transform"
                    >
                      <span>
                        Get Started Now
                      </span>

                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* FOOTER TEXT */}
                    <p className="text-[10px] text-gray-500 text-center font-mono pt-1">
                      P2S Agency • Problem To Solution
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default Navbar;
