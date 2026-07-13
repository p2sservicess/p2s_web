import React from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Code, Megaphone, Smartphone, Cloud, PenTool, BrainCircuit, Database } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Services() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const serviceCategories = [
    {
      title: "Website Development",
      icon: Code,
      desc: "Premium, fast, and SEO-optimized web experiences.",
      items: ["Business & Corporate Websites", "High-Converting Landing Pages", "E-Commerce Platforms", "Custom Web Applications", "Ongoing Maintenance"]
    },
    {
      title: "Software & ERP Development",
      icon: Database,
      desc: "Custom business logic and enterprise resource planning.",
      items: ["Custom ERP Solutions", "CRM & HRMS", "Inventory & Billing Software", "Manufacturing & Retail POS", "Garment Industry ERP"]
    },
    {
      title: "Mobile App Development",
      icon: Smartphone,
      desc: "Native and cross-platform mobile solutions.",
      items: ["Android Applications", "iOS Applications", "Cross-Platform (React Native/Flutter)", "App Maintenance & Updates"]
    },
    {
      title: "Digital Marketing & SEO",
      icon: Megaphone,
      desc: "Data-driven campaigns to maximize your ROI.",
      items: ["Search Engine Optimization (SEO)", "Google Ads & PPC", "Meta Ads (Facebook/Instagram)", "LinkedIn Marketing", "Social Media Management"]
    },
    {
      title: "AI & Automation Solutions",
      icon: BrainCircuit,
      desc: "Work smarter, not harder, with custom AI integration.",
      items: ["Intelligent Chatbots", "Workflow Automation", "AI Agents", "Content Generation AI", "Business Operations AI"]
    },
    {
      title: "Branding & Creative Design",
      icon: PenTool,
      desc: "Establish a premium brand identity that builds trust.",
      items: ["UI/UX Design", "Logo & Brand Identity", "Product Packaging & Mockups", "Promotional Video Production", "Motion Graphics & Reels"]
    }
  ];

  return (
    <div>
      <section className="relative min-h-[60vh] bg-surface-950 text-white flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-600/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 pt-20 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-sm font-medium mb-8 text-brand-100">
              Complete Digital Solutions
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-8">
              Services & <span className="text-gradient">Capabilities</span>
            </h1>
            <p className="text-xl text-surface-300 max-w-2xl mx-auto leading-relaxed">
              Comprehensive digital solutions designed to solve your business challenges and drive measurable growth.
            </p>
          </motion.div>
        </div>
      </section>

      <Section className="bg-surface-50 dark:bg-surface-950/50 relative overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute -left-32 top-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px]" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {serviceCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="glass-card p-10 rounded-[2rem] hover-lift group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-5 mb-8 relative z-10">
                <div className="w-16 h-16 bg-surface-100 dark:bg-surface-900 text-brand-600 dark:text-brand-400 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                  <category.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-heading">{category.title}</h3>
              </div>
              <p className="text-lg text-text-muted mb-8 relative z-10">{category.desc}</p>
              <ul className="space-y-4 relative z-10">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-brand-500/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    </div>
                    <span className="text-text-main font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 leading-tight">Ready to transform your business?</h2>
          <p className="text-brand-100 mb-12 text-xl font-light">Let's discuss how our services can solve your specific challenges and help you scale efficiently.</p>
          <Button href="/contact" size="lg" className="h-14 px-10 text-lg bg-white text-brand-900 hover:bg-surface-100 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            Schedule a Free Consultation
          </Button>
        </div>
      </Section>
    </div>
  );
}
