import React from 'react';
import { motion, Variants } from 'framer-motion';
import BackgroundFireworks from './BackgroundFireworks';
import FloatingEmojis from './FloatingEmojis';
import InteractiveOverlay from './InteractiveOverlay';

const CelebrationScreen: React.FC = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const letter: Variants = {
    hidden: { y: 100, opacity: 0, scale: 0 },
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  const titleText = "HAPPY NEW YEAR 2026";

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center">
      <BackgroundFireworks />
      <FloatingEmojis />
      <InteractiveOverlay />

      <div className="z-20 flex flex-col items-center justify-center w-full max-w-5xl px-4 text-center pointer-events-none">

        {/* Animated 2026 Header */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mb-8 md:mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 overflow-hidden py-4">
            <motion.span
              variants={letter}
              className="text-4xl md:text-7xl lg:text-8xl inline-block mr-4 md:mr-8"
            >
              🎉
            </motion.span>
            {titleText.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letter}
                className={`text-4xl md:text-7xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-t from-yellow-300 via-yellow-100 to-white drop-shadow-[0_0_15px_rgba(253,224,71,0.5)] font-display ${char === ' ' ? 'w-4 md:w-' : ''}`}
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              variants={letter}
              className="text-4xl md:text-7xl lg:text-8xl inline-block ml-4 md:ml-8"
            >
              🎉
            </motion.span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 200, opacity: 0, rotateX: 20 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1, delay: 2, type: "spring" }}
          className="pointer-events-auto"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] max-w-2xl mx-auto transform transition-all hover:scale-105 hover:bg-white/15"
          >
            <p className="text-xl md:text-3xl text-white font-light leading-relaxed font-display">
              “May this year bring you growth, happiness, success,
              and unforgettable moments 🚀”
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-4 left-0 right-0 text-center z-20 pointer-events-none"
      >
        <p className="text-white/60 text-sm md:text-base">
          Made with ❤️ to start your year with a smile
        </p>
      </motion.footer>
    </div>
  );
};

export default CelebrationScreen;