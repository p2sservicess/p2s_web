import React from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { BookOpen, ExternalLink, GraduationCap, Video } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function AiLearning() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const courses = [
    {
      title: 'AI Automation Mastery',
      category: 'AI & Automation',
      desc: 'Learn how to automate standard business workflows using modern AI tools.',
      provider: 'Trusted Partner'
    },
    {
      title: 'Prompt Engineering for Business',
      category: 'ChatGPT / AI',
      desc: 'Master the art of prompt engineering to generate content, analyze data, and save time.',
      provider: 'Trusted Partner'
    },
    {
      title: 'No-Code Development',
      category: 'Web Development',
      desc: 'Build applications without writing code using AI-assisted no-code platforms.',
      provider: 'Trusted Partner'
    },
    {
      title: 'Digital Marketing Growth',
      category: 'Marketing',
      desc: 'Advanced strategies for scaling businesses using Meta Ads and SEO.',
      provider: 'Trusted Partner'
    }
  ];

  return (
    <div>
      <section className="relative min-h-[50vh] bg-surface-950 text-white flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-brand-600/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-brand-300 text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" /> Partner Programs
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-8">
              Learn AI & <br/><span className="text-gradient">Digital Skills</span>
            </h1>
            <p className="text-xl text-surface-300 max-w-2xl mx-auto leading-relaxed">
              P2S recommends premium professional courses through our trusted education partners to help you stay ahead of the digital curve.
            </p>
          </motion.div>
        </div>
      </section>

      <Section className="bg-surface-50 dark:bg-surface-950/50 relative overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute -right-32 top-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card p-10 md:p-12 rounded-[2rem] mb-20 text-center relative z-10"
        >
           <div className="w-20 h-20 bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-full flex items-center justify-center mx-auto mb-6">
             <BookOpen className="w-10 h-10" />
           </div>
           <h2 className="text-3xl font-bold font-heading mb-6">Why learn with our partners?</h2>
           <p className="text-lg text-text-muted leading-relaxed mb-8">
             Technology moves fast. To ensure our clients always have access to the best education, we have partnered with industry-leading educators. The programs below are curated by P2S for their practical business value. 
           </p>
           <p className="text-sm text-text-muted/80">
             *Note: Some learning programs are provided by trusted partners and we may earn a referral commission at no extra cost to you.
           </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
          {courses.map((course, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-card p-8 md:p-10 rounded-[2rem] hover-lift group flex flex-col relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-4 inline-flex items-center gap-2 bg-brand-500/10 px-3 py-1 rounded-full">
                  {course.category}
                </div>
                <h3 className="text-2xl font-bold font-heading mb-4 text-text-main">{course.title}</h3>
                <p className="text-text-muted mb-8 text-lg">{course.desc}</p>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-surface-200 mt-auto relative z-10">
                <div className="flex items-center gap-2 text-sm font-medium text-text-muted">
                  <Video className="w-4 h-4" /> {course.provider}
                </div>
                <Button variant="ghost" className="text-brand-600 dark:text-brand-400 group-hover:bg-brand-50 dark:group-hover:bg-brand-900/30 px-4 h-10 rounded-xl">
                  View Course <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
