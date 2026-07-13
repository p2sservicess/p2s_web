import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  delay?: number;
}

export function Skeleton({ className, delay = 0, ...props }: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative overflow-hidden bg-surface-200 dark:bg-surface-800 rounded-xl",
        className
      )}
      {...props}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"
        animate={{
          translateX: ['-100%', '200%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
          delay,
        }}
      />
    </motion.div>
  );
}
