import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingScreen from './components/LandingScreen';
import CelebrationScreen from './components/CelebrationScreen';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [hasRevealed, setHasRevealed] = useState(false);
  const [flash, setFlash] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleReveal = () => {
    setFlash(true);


    setTimeout(() => {
      setHasRevealed(true);
    }, 400);

    setTimeout(() => {
      setFlash(false);
    }, 1000);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-900 overflow-hidden text-white">

      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block text-yellow-300"
        animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }}
        transition={{ type: "spring", damping: 10, stiffness: 50, mass: 0.1 }}
      >
        <Sparkles size={24} className="animate-pulse" />
      </motion.div>

      <AnimatePresence mode="wait">
        {!hasRevealed ? (
          <motion.div
            key="landing"
            className="w-full h-full absolute inset-0"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
          >
            <LandingScreen onReveal={handleReveal} />
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            className="w-full h-full absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <CelebrationScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
