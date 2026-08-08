import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { P2S_WHATSAPP_DISPLAY, createWhatsAppUrl } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const QUICK_PROMPTS = [
    { label: 'Social Media Packages', fullMsg: "Hi P2S Team, I'm interested in your Social Media Packages!" },
    { label: 'Custom ERP & Software', fullMsg: "Hi P2S Team, I need a Custom ERP & Billing Software solution." },
    { label: 'Free Strategy Call', fullMsg: "Hi P2S Team, I'd like to book a free 30-min strategy consultation." },
    { label: 'Custom Web Development', fullMsg: "Hi P2S Team, I have a custom web development requirement." }
  ];

  const handleSend = (msgText?: string) => {
    const textToSend = msgText || customMsg || "Hi P2S Team, I'm interested in your services!";
    const url = createWhatsAppUrl(textToSend);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* EXPANDABLE COMPACT CHAT POPUP WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="pointer-events-auto mb-3 w-[260px] rounded-2xl bg-[#181D27] border border-[#2589D0]/40 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(37,137,208,0.25)] overflow-hidden flex flex-col"
          >
            {/* Minimal Header */}
            <div className="p-3 bg-gradient-to-r from-emerald-700 via-teal-700 to-[#2589D0] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-['Outfit'] font-black text-white border border-white/30 text-xs">
                    P2S
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#181D27] rounded-full" />
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-['Outfit'] font-bold text-xs text-white">
                      P2S Support
                    </span>
                    <span className="px-1 py-0.2 rounded bg-emerald-400 text-black text-[8px] font-mono font-bold uppercase">
                      ONLINE
                    </span>
                  </div>
                  <p className="text-[10px] text-emerald-100 font-mono">
                    {P2S_WHATSAPP_DISPLAY}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Compact Chat Body */}
            <div className="p-2.5 bg-[#0F172A] space-y-2 max-h-[250px] overflow-y-auto">
              {/* Agent Greeting Bubble */}
              <div className="p-2.5 rounded-xl bg-[#181D27] border border-white/10 text-[11px] text-gray-200 leading-snug space-y-1 shadow-sm">
                <p className="font-semibold text-cyan-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#2589D0]" />
                  <span>Hello! Welcome to P2S 👋</span>
                </p>
                <p className="text-[10px] text-gray-300">
                  Select a topic below or type a message to start chatting on WhatsApp.
                </p>
              </div>

              {/* Quick Topics */}
              <div className="space-y-1 pt-0.5">
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block font-semibold px-0.5">
                  Quick Topics
                </span>
                <div className="flex flex-col gap-1">
                  {QUICK_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt.fullMsg)}
                      className="p-1.5 px-2.5 rounded-lg bg-[#181D27] hover:bg-[#2589D0]/20 border border-white/10 hover:border-[#2589D0] text-left text-[11px] text-gray-300 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <span className="truncate">{prompt.label}</span>
                      <ArrowRight className="w-3 h-3 text-[#2589D0] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Compact Footer / Custom Input */}
            <div className="p-2.5 bg-[#181D27] border-t border-white/10 space-y-1.5">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                placeholder="Type your message..."
                className="w-full px-2.5 py-1.5 rounded-lg bg-[#0F172A] border border-white/10 text-[11px] text-white placeholder-gray-500 focus:outline-none focus:border-[#2589D0]"
              />

              <button
                onClick={() => handleSend()}
                className="w-full py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 via-teal-600 to-[#2589D0] hover:from-emerald-500 hover:to-[#2589D0] text-white font-['Outfit'] font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>Chat on WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-1 text-[9px] text-gray-500">
                <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                <span>Opens direct WhatsApp chat</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SLEEK COMPACT CIRCULAR TRIGGER BUTTON */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="pointer-events-auto relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-emerald-500 via-teal-600 to-[#2589D0] text-white shadow-[0_0_25px_rgba(16,185,129,0.55)] border border-emerald-300/40 flex items-center justify-center cursor-pointer"
        aria-label="Open WhatsApp Support Chat"
      >
        {/* Pulsing Outer Aura */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping pointer-events-none" />

        {isOpen ? (
          <X className="w-5 h-5 text-white z-10" />
        ) : (
          <div className="relative flex items-center justify-center text-white z-10">
            <MessageSquare className="w-5 h-5 fill-current" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full border-2 border-[#181D27]" />
          </div>
        )}
      </motion.button>

    </div>
  );
};
