import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import p2sLogo from "../images/p2sLogo.png";

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  const tagline = "Problem To Solution";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 3200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Container exit animation
  const containerVariants = {
    exit: {
      y: "-100%",
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  // Character animation
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },

    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="p2s-preloader"
          variants={containerVariants}
          initial={{ y: 0, opacity: 1 }}
          exit="exit"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0F172A] text-white overflow-hidden select-none"
        >
          {/* Ambient Glow */}
          <div className="absolute w-[360px] h-[360px] md:w-[500px] md:h-[500px] bg-[#2589D0]/25 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

          {/* Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(rgba(37, 137, 208, 0.6) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center px-4 text-center">
            {/* =========================
                LOGO
            ========================== */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative mb-6"
            >
              {/* Rotating Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-4 rounded-3xl border border-[#2589D0]/30 border-dashed"
              />

              {/* Additional Glow Ring */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-2 rounded-2xl border border-[#2589D0]/40"
              />

              {/* Logo Box */}
              <div className="relative flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-[#181D27] border border-[#2589D0]/50 shadow-[0_0_40px_rgba(37,137,208,0.4)] overflow-hidden">
                {/* Logo Image */}
                <motion.img
                  src={p2sLogo}
                  alt="P2S Logo"
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.25,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-[72%] h-[72%] object-contain"
                />

                {/* Soft Logo Glow */}
                <div className="absolute inset-0 bg-[#2589D0]/5 pointer-events-none" />

                {/* Glowing Corner Accents */}
                <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#2589D0]" />

                <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#2589D0]" />

                <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#2589D0]" />

                <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#2589D0]" />
              </div>
            </motion.div>

            {/* =========================
                TAGLINE
            ========================== */}
            <div className="flex items-center space-x-1 md:space-x-1.5 overflow-hidden">
              {tagline.split("").map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={letterVariants}
                  className={`font-['Outfit'] font-semibold text-lg md:text-2xl tracking-widest uppercase ${
                    char === " " ? "w-2 md:w-3" : "text-gray-200"
                  }`}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>

            {/* =========================
                SUBTITLE
            ========================== */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.8,
                duration: 0.5,
              }}
              className="mt-6 px-4 py-1.5 rounded-full text-xs font-mono text-[#2589D0] bg-[#2589D0]/10 border border-[#2589D0]/30 tracking-wider flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#2589D0] opacity-75 animate-ping" />

                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2589D0]" />
              </span>
              DIGITAL GROWTH ENGINE
            </motion.div>

            {/* =========================
                PROGRESS BAR
            ========================== */}
            <div className="mt-8 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="h-full bg-gradient-to-r from-[#2589D0] to-cyan-300"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
