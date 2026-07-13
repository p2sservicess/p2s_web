import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);


  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    
    document.body.classList.add('hide-cursor');

    let magneticTarget: HTMLElement | null = null;


    const onMouseMove = (e: MouseEvent) => {
      if (isHidden) setIsHidden(false);
      
      let targetX = e.clientX;
      let targetY = e.clientY;

      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate magnetic pull (move 30% towards the center)
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        targetX = centerX + distanceX * 0.3;
        targetY = centerY + distanceY * 0.3;
      }

      mouseX.set(targetX - 16);
      mouseY.set(targetY - 16);
    };

    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    document.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('button, a, [role="button"], .cursor-pointer') as HTMLElement;
      
      if (interactive) {
        setIsHovering(true);
        magneticTarget = interactive;
      } else {
        setIsHovering(false);
        magneticTarget = null;
      }
    };

    document.addEventListener('mouseover', handleMouseOver);


    return () => {
      document.body.classList.remove('hide-cursor');
      document.removeEventListener('mousemove', onMouseMove);

      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isHidden, mouseX, mouseY]);

  if (isHidden) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] mix-blend-difference flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <motion.div 
        className="w-2 h-2 bg-white rounded-full"
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      {isHovering && (
        <motion.div 
          className="absolute inset-0 rounded-full border border-white opacity-50"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        />
      )}
    </motion.div>
  );
}
