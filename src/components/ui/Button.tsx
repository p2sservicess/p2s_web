import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  href, 
  children,
  ...props 
}: ButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group";
  
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-500 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] border border-brand-500/50",
    secondary: "bg-surface-900 text-white hover:bg-surface-800 shadow-sm border border-surface-800",
    outline: "border border-surface-200 dark:border-white/10 bg-surface-50/50 dark:bg-surface-900/50 hover:bg-surface-100/50 dark:hover:bg-surface-800/50 text-text-main backdrop-blur-md",
    ghost: "hover:bg-surface-100/50 dark:hover:bg-white/10 text-text-muted hover:text-text-main",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  const innerContent = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
      )}
    </>
  );

  if (href) {
    return (
      <Link to={href}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={classes}>
          {innerContent}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }} 
      whileTap={{ scale: 0.98 }} 
      className={classes} 
      {...props}
    >
      {innerContent}
    </motion.button>
  );
}
