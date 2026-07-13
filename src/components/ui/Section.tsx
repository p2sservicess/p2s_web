import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClassName?: string;
  dark?: boolean;
}

export function Section({ className, containerClassName, children, dark, ...props }: SectionProps) {
  return (
    <section 
      className={cn(
        "py-20 md:py-32 relative",
        dark ? "bg-surface-950 text-white" : "bg-transparent text-text-main",
        className
      )} 
      {...props}
    >
      <div className={cn("container mx-auto px-6 md:px-12 max-w-7xl", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ 
  title, 
  subtitle, 
  align = 'center',
  className 
}: { 
  title: string; 
  subtitle?: string; 
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "mb-16 md:mb-24",
        align === 'center' ? "text-center mx-auto max-w-3xl" : "text-left max-w-2xl",
        className
      )}
    >
      <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight mb-6">{title}</h2>
      {subtitle && <p className="text-lg md:text-xl opacity-80 leading-relaxed font-light">{subtitle}</p>}
    </motion.div>
  );
}
