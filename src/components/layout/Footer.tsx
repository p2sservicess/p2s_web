import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, handle subscription here
    setEmail('');
  };

  return (
    <footer className="relative bg-surface-950 text-surface-400 py-24 border-t border-white/5 overflow-hidden">
      {/* Premium Background Mesh */}
      <div className="absolute inset-0 bg-surface-950 z-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-brand-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-[#00D4FF]/10 rounded-full blur-[140px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* Newsletter Section */}
        <div className="mb-20 glass-card p-10 md:p-14 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-10 border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-600/10 to-[#00D4FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="max-w-xl relative z-10">
            <h3 className="text-3xl font-heading font-bold text-white mb-4">Stay ahead of the curve.</h3>
            <p className="text-surface-300 text-lg">Subscribe to our newsletter for the latest insights in digital transformation, AI, and software engineering.</p>
          </div>
          <form onSubmit={handleSubmit} className="w-full md:w-auto flex-1 max-w-md relative z-10">
            <div className="relative flex items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full h-14 bg-surface-900/50 border border-white/10 rounded-full px-6 text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-2 bottom-2 w-10 bg-brand-600 hover:bg-brand-500 rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-4 pr-0 lg:pr-8">
            <Link to="/" className="flex flex-col justify-center items-start group z-50 hover:scale-105 transition-transform duration-300 mb-8 inline-block">
              <div className="flex items-center text-4xl font-extrabold font-heading tracking-tighter leading-none">
                <span className="text-white transition-colors">P</span>
                <span className="text-[#00D4FF] relative flex items-center">
                  2
                  <svg className="absolute -right-[0.15em] bottom-[0.15em] w-[0.4em] h-[0.4em] text-[#00D4FF]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="text-white transition-colors">S</span>
              </div>
              <span className="text-[0.6rem] uppercase tracking-[0.25em] text-surface-400 font-bold mt-1 group-hover:text-[#00D4FF] transition-colors">
                Problem To Solution
              </span>
            </Link>
            <p className="text-surface-400 mb-8 leading-relaxed">
              We are a premier Digital Transformation Company helping businesses launch, manage, automate, and scale through technology.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-surface-400 hover:text-white hover:border-brand-500 hover:bg-brand-500/10 transition-all hover:-translate-y-1">
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-heading font-semibold mb-6 text-lg">Solutions</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="hover:text-brand-400 transition-colors">Website Development</Link></li>
              <li><Link to="/erp" className="hover:text-brand-400 transition-colors">ERP Subscriptions</Link></li>
              <li><Link to="/services" className="hover:text-brand-400 transition-colors">Mobile Applications</Link></li>
              <li><Link to="/services" className="hover:text-brand-400 transition-colors">AI & Automation</Link></li>
              <li><Link to="/services" className="hover:text-brand-400 transition-colors">Digital Marketing</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-heading font-semibold mb-6 text-lg">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="hover:text-brand-400 transition-colors">About Us</Link></li>
              <li><Link to="/portfolio" className="hover:text-brand-400 transition-colors">Our Portfolio</Link></li>
              <li><Link to="/learning" className="hover:text-brand-400 transition-colors">AI Learning</Link></li>
              <li><Link to="/contact" className="hover:text-brand-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-heading font-semibold mb-6 text-lg">Contact</h4>
            <ul className="space-y-4">
              <li className="hover:text-white transition-colors cursor-pointer group flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-500/20 group-hover:text-brand-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                contact@p2sdigital.com
              </li>
              <li className="hover:text-white transition-colors cursor-pointer group flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-500/20 group-hover:text-brand-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </span>
                +1 (800) 123-4567
              </li>
              <li className="pt-2 text-surface-500 text-sm flex gap-3">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </span>
                <span>
                  123 Innovation Drive<br/>
                  Tech District, Suite 400<br/>
                  San Francisco, CA 94103
                </span>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-surface-500">
          <p>© {currentYear} Problem 2 Solution (P2S). All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
