
import React from 'react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { TextReveal } from '@/components/ui/TextReveal';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, MonitorSmartphone, Database, Code2, LineChart, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
        {/* Premium Background Mesh */}
        <div className="absolute inset-0 bg-surface-950 z-0 overflow-hidden">
          <div className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] bg-brand-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] bg-[#00D4FF]/10 rounded-full blur-[140px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left pt-10 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-sm font-medium mb-8 text-white mx-auto lg:mx-0 shadow-xl backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#00D4FF]" />
                <span className="tracking-wide">Award-Winning Digital Agency</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter mb-8 leading-[1.05] text-white flex flex-wrap justify-center lg:justify-start gap-x-4">
                <TextReveal text="Turn Problems Into" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-[#00D4FF] to-brand-300 w-full lg:w-auto mt-2">
                  <TextReveal text="Solutions." />
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-surface-300 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                We craft premium, enterprise-grade software, websites, and digital experiences that drive measurable growth.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                <Button href="/services" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                  Explore Services <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button href="/erp" variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg glass text-white hover:bg-white/10 border-white/20">
                  <Play className="w-5 h-5 mr-2" /> Watch ERP Demo
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Floating Hero UI Elements */}
          <div className="flex-1 relative w-full aspect-square max-w-2xl hidden lg:block">
            <motion.div 
              style={{ y: y1 }}
              className="absolute top-10 right-10 w-[85%] aspect-video rounded-2xl border border-white/10 shadow-2xl overflow-hidden glass-card p-2"
            >
              <div className="w-full h-full rounded-xl bg-surface-900/80 overflow-hidden relative border border-white/5">
                <div className="absolute top-0 inset-x-0 h-10 bg-surface-950/50 border-b border-white/5 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="pt-16 px-8 flex flex-col gap-4">
                  <div className="w-3/4 h-8 bg-surface-800 rounded-lg animate-pulse" />
                  <div className="w-1/2 h-6 bg-surface-800 rounded-lg animate-pulse delay-75" />
                  <div className="w-full h-24 bg-surface-800 rounded-lg mt-4 animate-pulse delay-150" />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              style={{ y: y2 }}
              className="absolute -bottom-10 -left-10 w-64 glass-card p-6 rounded-2xl shadow-2xl border border-white/10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-400">
                  <LineChart className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-surface-400 font-medium">Growth Rate</div>
                  <div className="text-2xl font-bold text-white">+148%</div>
                </div>
              </div>
              <div className="w-full h-2 bg-surface-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="h-full bg-gradient-to-r from-brand-500 to-[#00D4FF]"
                />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
          style={{ opacity }}
        >
          <span className="text-sm font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>


      {/* Stats / Trust */}
      <section className="py-16 border-y border-surface-200 bg-surface-50 dark:bg-surface-950/50">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-surface-200">
            {[
              { label: 'Years Experience', value: '10+' },
              { label: 'Projects Delivered', value: '500+' },
              { label: 'Businesses Served', value: '300+' },
              { label: 'Countries', value: '15+' }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center px-4"
              >
                <div className="text-4xl md:text-5xl font-bold text-text-main mb-2 font-heading tracking-tight">{stat.value}</div>
                <div className="text-text-muted text-sm md:text-base font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services */}
      <Section className="bg-surface-50 dark:bg-surface-950/50">
        <SectionHeader 
          title="End-to-End Digital Transformation" 
          subtitle="Everything you need to scale your business, under one roof. We don't just build software; we build solutions."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: MonitorSmartphone, title: 'Website & App Development', desc: 'Premium corporate websites, e-commerce platforms, and native mobile applications.' },
            { icon: Database, title: 'ERP Subscriptions', desc: 'Cloud-based Enterprise Resource Planning to automate inventory, billing, and HR.' },
            { icon: LineChart, title: 'Digital Marketing & SEO', desc: 'Data-driven marketing, Meta ads, and SEO strategies to guarantee business growth.' },
            { icon: Code2, title: 'AI & Automation', desc: 'Custom AI agents, workflow automation, and intelligent chatbots to save hours of manual work.' },
          ].map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="glass-card p-8 rounded-3xl hover-lift group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-14 h-14 bg-surface-100 dark:bg-surface-800 text-brand-600 dark:text-brand-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-sm relative z-10">
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3 font-heading relative z-10">{service.title}</h3>
              <p className="text-text-muted mb-8 leading-relaxed relative z-10">{service.desc}</p>
              <Link to="/services" className="inline-flex items-center text-brand-600 dark:text-brand-400 font-medium group/link relative z-10">
                Learn more 
                <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
           <Button href="/services" variant="outline" size="lg">Explore All Services</Button>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section className="bg-surface-900 text-white overflow-hidden relative border-t border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-600/10 blur-[100px] pointer-events-none rounded-full" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-8 leading-tight">One Partner.<br/><span className="text-gradient">Everything Digital.</span></h2>
            <p className="text-lg md:text-xl text-surface-300 mb-10 leading-relaxed font-light">
              Stop juggling multiple agencies for your website, software, branding, and marketing. P2S provides a complete ecosystem for your business growth. We take a business-first approach to technology.
            </p>
            <ul className="space-y-6 mb-12">
              {[
                'Premium Enterprise-Grade Support',
                'Business-First Approach',
                'Modern, Scalable Technologies',
                'Transparent Pricing & Subscriptions'
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.4 }}
                  className="flex items-center gap-4 text-surface-50 text-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-brand-400" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
            <Button href="/about" size="lg">Discover Our Story</Button>
          </motion.div>
          <motion.div 
            style={{ y: y1 }}
            className="relative hidden lg:block"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="Team meeting" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent" />
            </div>
            
            {/* Floating Glass Widget */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-10 -left-10 glass p-6 rounded-3xl shadow-2xl min-w-[280px]"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-brand-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <Database className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-bold font-heading text-xl text-white mb-1">Flagship ERP</div>
                  <div className="text-surface-300 text-sm font-medium">Trusted by 200+ brands</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
