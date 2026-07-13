const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

const newHero = `
import React from 'react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { TextReveal } from '@/components/ui/TextReveal';
import { motion, useScroll, useTransform } from 'motion/react';
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
`;

code = code.replace(/import React from 'react';[\s\S]*?<\/section>/, newHero);
fs.writeFileSync('src/pages/Home.tsx', code);
