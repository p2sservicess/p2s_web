import React from 'react';
import { Section } from '@/components/ui/Section';
import { motion, useScroll, useTransform } from 'framer-motion';

export function About() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div>
      <section className="relative min-h-[60vh] bg-surface-950 text-white flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[50vw] h-[50vw] bg-brand-600/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-accent/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 pt-20 pb-16">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-brand-300 text-sm font-medium mb-6">
                Our Story
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-8">
                Every Problem Has <br/>a <span className="text-gradient">Solution.</span>
              </h1>
              <p className="text-xl md:text-2xl text-surface-300 leading-relaxed font-light">
                We are P2S. A technology partner built on the belief that digital transformation shouldn't be complicated. It should be the exact answer to your business challenges.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Section className="bg-surface-50 dark:bg-surface-950/50 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-text-main tracking-tight">Our Philosophy</h2>
            <div className="space-y-8 text-lg md:text-xl text-text-muted leading-relaxed font-light">
              <p>
                At Problem 2 Solution (P2S), we don't just write code or design pretty graphics. We sit down with business owners, understand where they are bleeding time or money, and deploy technology to fix it.
              </p>
              <p>
                Whether it is a custom website that actually generates leads, an ERP subscription that stops inventory leakage, or a marketing campaign that drives real foot traffic—everything we do is tied to a business outcome.
              </p>
              <p>
                We believe in transparency, premium quality, and long-term partnerships. When you work with P2S, you are gaining a dedicated digital department for your company.
              </p>
            </div>
          </motion.div>
          <div className="relative">
            <motion.div style={{ y: y1 }} className="absolute -inset-4 bg-brand-500/10 rounded-[3rem] blur-2xl" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/5] rounded-[2.5rem] overflow-hidden glass p-3 relative z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="Team working together" 
                className="w-full h-full object-cover rounded-[2rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-950/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </Section>
    </div>
  );
}
