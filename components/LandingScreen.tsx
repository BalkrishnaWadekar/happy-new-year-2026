import React from 'react';
import { motion } from 'framer-motion';

interface LandingScreenProps {
  onReveal: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onReveal }) => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * -20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <h1 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-wide font-display drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Something special is waiting for you… ✨
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-12 font-light tracking-wider opacity-80">
          Click when you’re ready
        </p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 255, 255, 0.6)" }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.4)", "0 0 0px rgba(255,255,255,0)"],
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
        onClick={onReveal}
        className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-xl font-semibold tracking-wide shadow-2xl transition-colors hover:bg-white/20"
      >
        🎁 Reveal the Surprise
      </motion.button>
    </div>
  );
};

export default LandingScreen;
