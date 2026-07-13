import React from 'react';
import { useTheme } from '../../providers/ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn(
        "relative p-2 rounded-full overflow-hidden border border-surface-200 dark:border-white/10 glass transition-all hover:scale-105 active:scale-95",
        className
      )}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            opacity: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : -90,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 text-brand-400"
        >
          <Moon className="w-5 h-5" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'light' ? 1 : 0,
            opacity: theme === 'light' ? 1 : 0,
            rotate: theme === 'light' ? 0 : 90,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 text-brand-600"
        >
          <Sun className="w-5 h-5" />
        </motion.div>
      </div>
    </button>
  );
}
