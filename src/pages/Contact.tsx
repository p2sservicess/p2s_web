import React from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Contact() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div>
      <section className="relative min-h-[50vh] bg-surface-950 text-white flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-accent/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] bg-brand-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-8">
              Let's solve your <br/><span className="text-gradient">business problems.</span>
            </h1>
            <p className="text-xl text-surface-300 max-w-2xl mx-auto leading-relaxed">
              Book a free consultation or request a live ERP demo today. We are ready when you are.
            </p>
          </motion.div>
        </div>
      </section>

      <Section className="bg-surface-50 dark:bg-surface-950/50 relative overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute -left-32 top-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px]" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto relative z-10">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10 text-text-main">Get in touch</h2>
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-surface-100 dark:bg-surface-800 rounded-2xl flex items-center justify-center border border-surface-200 shrink-0 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-500 transition-colors duration-300 shadow-sm text-brand-600 dark:text-brand-400">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-text-main mb-1 text-lg">Phone / WhatsApp</h4>
                  <p className="text-text-muted">+1 (800) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-surface-100 dark:bg-surface-800 rounded-2xl flex items-center justify-center border border-surface-200 shrink-0 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-500 transition-colors duration-300 shadow-sm text-brand-600 dark:text-brand-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-text-main mb-1 text-lg">Email</h4>
                  <p className="text-text-muted">contact@p2sdigital.com</p>
                </div>
              </div>
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-surface-100 dark:bg-surface-800 rounded-2xl flex items-center justify-center border border-surface-200 shrink-0 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-500 transition-colors duration-300 shadow-sm text-brand-600 dark:text-brand-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-text-main mb-1 text-lg">Office</h4>
                  <p className="text-text-muted">123 Innovation Drive<br/>Tech District, Suite 400<br/>San Francisco, CA 94103</p>
                </div>
              </div>
            </div>
            
            <Button className="w-full sm:w-auto flex items-center gap-2 h-14 px-8" size="lg">
              <MessageSquare className="w-5 h-5" /> Chat on WhatsApp
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-card p-10 rounded-[2.5rem]">
              <h3 className="text-3xl font-bold font-heading mb-8 text-text-main">Send an Inquiry</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">First Name</label>
                    <input type="text" className="w-full px-5 py-4 rounded-xl border border-surface-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-surface-50 dark:bg-surface-900/50 text-text-main transition-shadow" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Last Name</label>
                    <input type="text" className="w-full px-5 py-4 rounded-xl border border-surface-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-surface-50 dark:bg-surface-900/50 text-text-main transition-shadow" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Email Address</label>
                  <input type="email" className="w-full px-5 py-4 rounded-xl border border-surface-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-surface-50 dark:bg-surface-900/50 text-text-main transition-shadow" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Service of Interest</label>
                  <select className="w-full px-5 py-4 rounded-xl border border-surface-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-surface-50 dark:bg-surface-900/50 text-text-main transition-shadow appearance-none">
                    <option>Website Development</option>
                    <option>ERP Subscription</option>
                    <option>Mobile App</option>
                    <option>AI Solutions</option>
                    <option>Digital Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Message</label>
                  <textarea rows={4} className="w-full px-5 py-4 rounded-xl border border-surface-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-surface-50 dark:bg-surface-900/50 text-text-main transition-shadow resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <Button type="submit" className="w-full h-14 text-lg mt-4">
                  Submit Inquiry <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>
          </motion.div>

        </div>
      </Section>
    </div>
  );
}
