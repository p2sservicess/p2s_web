import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../ui/ThemeToggle';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'ERP', href: '/erp' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Learning', href: '/learning' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        isScrolled 
          ? "py-4" 
          : "py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl flex items-center justify-between">
        {/* Navbar Container */}
        <div className={cn(
          "w-full flex items-center justify-between transition-all duration-500",
          isScrolled 
            ? "glass premium-shadow px-6 py-3 rounded-2xl" 
            : "bg-transparent px-2"
        )}>
          
          {/* Logo */}
          <Link to="/" className="flex flex-col justify-center items-start group z-50 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center text-3xl md:text-4xl font-extrabold font-heading tracking-tighter leading-none">
              <span className="text-surface-800 dark:text-white transition-colors">P</span>
              <span className="text-[#00D4FF] relative flex items-center">
                2
                <svg className="absolute -right-[0.15em] bottom-[0.15em] w-[0.4em] h-[0.4em] text-[#00D4FF]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="text-surface-800 dark:text-white transition-colors">S</span>
            </div>
            <span className="text-[0.45rem] md:text-[0.55rem] uppercase tracking-[0.25em] text-surface-500 font-bold mt-0.5 group-hover:text-[#00D4FF] transition-colors">
              Problem To Solution
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                to={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-brand-500",
                  location.pathname === link.href ? "text-brand-600 dark:text-brand-400" : "text-text-muted"
                )}
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-500 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button href="/contact" size="sm" className="hidden lg:flex shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-shadow">
              Book Consultation
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-4 z-50">
            <ThemeToggle />
            <button 
              className="p-2 -mr-2 text-text-main"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <motion.div animate={{ rotate: mobileMenuOpen ? 90 : 0 }}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 glass-card rounded-2xl overflow-hidden shadow-2xl border border-surface-200"
          >
            <div className="flex flex-col p-4 gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.label}
                >
                  <Link 
                    to={link.href}
                    className={cn(
                      "block text-lg font-medium py-3 px-4 rounded-xl transition-colors",
                      location.pathname === link.href 
                        ? "bg-brand-500/10 text-brand-600 dark:text-brand-400" 
                        : "text-text-main hover:bg-surface-100 dark:hover:bg-surface-800"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="h-px bg-surface-200 dark:bg-white/10 my-2" />
              <Button href="/contact" className="w-full justify-center">Book Free Consultation</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
