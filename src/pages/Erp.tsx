import React from 'react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Cloud, Shield, Zap, Users, BarChart3, Package, Smartphone, Database, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Erp() {
  const features = [
    { icon: Cloud, title: "Cloud Access", desc: "Access your business data securely from anywhere in the world." },
    { icon: Shield, title: "Enterprise Security", desc: "Bank-level encryption and automated daily backups." },
    { icon: Zap, title: "Lightning Fast", desc: "Optimized infrastructure for zero-lag operations." },
    { icon: Users, title: "Role Management", desc: "Granular permissions for employees, managers, and admins." },
    { icon: BarChart3, title: "Advanced Analytics", desc: "Real-time dashboards for sales, inventory, and growth." },
    { icon: Package, title: "Smart Inventory", desc: "Automated stock tracking, alerts, and supplier management." },
  ];

  const industries = [
    "Retail & Supermarkets",
    "Garment & Textile Stores",
    "Manufacturing Units",
    "Restaurants & Cafes",
    "Wholesale & Distribution",
    "Pharmacies & Clinics"
  ];

  return (
    <div>
      <section className="relative min-h-[70vh] bg-surface-950 text-white flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-brand-600/10 rounded-full blur-[120px] mix-blend-screen translate-x-1/3 -translate-y-1/3" />
        
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 pt-20 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand-500/30 text-brand-300 text-sm font-medium mb-6">
                Flagship Product
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-6 leading-[1.1]">
                Next-Gen <br/><span className="text-gradient">Cloud ERP</span>
              </h1>
              <p className="text-lg md:text-xl text-surface-300 leading-relaxed mb-10 max-w-xl font-light">
                Don't buy software that becomes outdated. Subscribe to a living, evolving ecosystem that scales with your business. Stop worrying about maintenance and servers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact" size="lg" className="h-14 px-8 text-lg">Request Live Demo</Button>
                <Button href="#pricing" variant="outline" size="lg" className="glass h-14 px-8 text-lg text-white border-white/20 hover:bg-white/10">
                  View Subscription Plans
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 glass p-2 rounded-[2rem] border border-white/10 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Dashboard" className="rounded-3xl w-full h-auto" />
              </div>
              
              {/* Floating elements */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-10 -left-10 glass p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-xs text-surface-300 font-medium">Monthly Revenue</div>
                  <div className="text-xl font-bold font-heading text-white">+$42,500</div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -bottom-10 -right-10 glass p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-brand-400" />
                </div>
                <div>
                  <div className="text-xs text-surface-300 font-medium">Active Users</div>
                  <div className="text-xl font-bold font-heading text-white">1,248</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Section className="bg-surface-50 dark:bg-surface-900">
        <SectionHeader 
          title="Why Subscribe Instead of Buy?" 
          subtitle="The traditional software purchase model is broken. Here is why modern businesses choose P2S ERP subscriptions."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-heading mb-6">Continuous Innovation, <br/>Zero Maintenance</h3>
            <p className="text-lg text-text-muted mb-8 leading-relaxed">
              When you purchase traditional software, it begins aging the day you install it. You are responsible for servers, security patches, and paid upgrades. With P2S ERP, you get a premium cloud service that is constantly updated with new features, zero downtime, and dedicated support included.
            </p>
            <ul className="space-y-4">
              {['No hidden upgrade fees', 'Included premium technical support', 'Automatic daily cloud backups', 'New features rolled out monthly'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-text-main font-medium">
                  <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-3xl"
          >
             <h4 className="font-heading font-bold text-2xl mb-8 flex items-center gap-3">
               <Database className="w-6 h-6 text-brand-600 dark:text-brand-400" />
               Industry-Specific Solutions
             </h4>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {industries.map((ind, i) => (
                 <div key={i} className="bg-surface-50 dark:bg-surface-950 p-4 rounded-xl border border-surface-200 shadow-sm font-medium text-text-main flex items-center gap-3 group cursor-pointer hover:border-brand-500/50 transition-colors">
                   <div className="w-2 h-2 rounded-full bg-brand-500 group-hover:scale-150 transition-transform" />
                   {ind}
                 </div>
               ))}
             </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 rounded-3xl hover-lift group"
            >
              <div className="w-14 h-14 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                <feature.icon className="w-7 h-7" />
              </div>
              <h4 className="font-bold font-heading text-xl mb-3">{feature.title}</h4>
              <p className="text-text-muted leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="pricing" className="bg-surface-950 text-white border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-600/10 rounded-full blur-[150px] pointer-events-none" />
        
        <SectionHeader title="Flexible Subscription Models" subtitle="Choose the plan that fits your business scale. Cancel or change anytime." className="relative z-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
          {[
            { name: 'Monthly', desc: 'Perfect for testing the waters', price: 'Flexible', period: '/month' },
            { name: '6-Month', desc: 'Ideal for growing businesses', price: 'Save 15%', period: 'commitment', popular: true },
            { name: 'Yearly', desc: 'Best value for enterprises', price: 'Save 30%', period: 'commitment' }
          ].map((plan, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className={`glass p-10 rounded-[2.5rem] relative ${plan.popular ? 'border-brand-500 shadow-[0_0_40px_rgba(124,58,237,0.2)] md:-mt-8 md:mb-8' : 'border-white/10'}`}
            >
              {plan.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-600 to-accent text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">Most Popular</div>}
              
              <h3 className="text-2xl font-bold font-heading mb-2">{plan.name}</h3>
              <p className="text-surface-400 text-sm mb-8">{plan.desc}</p>
              
              <div className="mb-10">
                <span className="text-4xl font-bold font-heading">{plan.price}</span>
                <span className="text-surface-500 ml-2 font-medium">{plan.period}</span>
              </div>
              
              <ul className="space-y-5 mb-10">
                <li className="flex items-center gap-3 text-surface-200"><CheckCircle2 className="w-5 h-5 text-brand-400" /> Full Cloud Access</li>
                <li className="flex items-center gap-3 text-surface-200"><CheckCircle2 className="w-5 h-5 text-brand-400" /> Premium Support</li>
                <li className="flex items-center gap-3 text-surface-200"><CheckCircle2 className="w-5 h-5 text-brand-400" /> Free Updates</li>
              </ul>
              
              <Button href="/contact" variant={plan.popular ? 'primary' : 'outline'} className={cn("w-full h-12", !plan.popular && "glass text-white hover:bg-white/10 border-white/20")}>
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
