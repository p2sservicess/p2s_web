import React from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function Portfolio() {
  const projects = [
    { category: 'ERP Solution', title: 'Global Retail POS', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop', desc: 'A multi-store ERP system handling 10k+ daily transactions.' },
    { category: 'Website', title: 'Luxury Real Estate', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop', desc: 'Premium property listings with immersive 3D tours.' },
    { category: 'Branding', title: 'Artisan Coffee Co.', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1975&auto=format&fit=crop', desc: 'Complete brand identity and e-commerce platform.' },
    { category: 'Mobile App', title: 'Fitness Tracker Plus', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop', desc: 'AI-powered workout routines and health analytics.' },
    { category: 'Marketing', title: 'TechStart SaaS Launch', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop', desc: 'Multi-channel campaign driving $2M ARR.' },
    { category: 'ERP Solution', title: 'Garment Manufacturing Suite', image: 'https://images.unsplash.com/photo-1558769132-cb1fac0840c2?q=80&w=2070&auto=format&fit=crop', desc: 'Supply chain automation and inventory control.' },
  ];

  return (
    <div>
      <section className="relative min-h-[50vh] bg-surface-950 text-white flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] bg-accent/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[40vw] h-[40vw] bg-brand-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-8">
              Selected <span className="text-gradient">Work</span>
            </h1>
            <p className="text-xl text-surface-300 max-w-2xl mx-auto leading-relaxed">
              A showcase of premium digital solutions built for industry leaders. We turn complex problems into elegant experiences.
            </p>
          </motion.div>
        </div>
      </section>

      <Section className="bg-surface-50 dark:bg-surface-950/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-[2rem] mb-6 aspect-[4/3] bg-surface-100 dark:bg-surface-800 relative">
                <div className="absolute inset-0 bg-surface-950/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay hover content */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950/90 via-surface-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex flex-col justify-end p-8">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white/80 mb-4">{project.desc}</p>
                    <div className="inline-flex items-center text-white font-medium gap-2">
                      View Case Study <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-2">
                <div className="text-sm font-medium text-brand-600 dark:text-brand-400 mb-2 uppercase tracking-wider">{project.category}</div>
                <h3 className="text-2xl font-bold font-heading text-text-main group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-24 text-center">
          <Button href="/contact" size="lg" className="h-14 px-10 text-lg">Ready to start your project?</Button>
        </div>
      </Section>
    </div>
  );
}
