import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sample, generateId, randomInt } from '../utils';

const WORDS = [
  "Success 💪", "Joy 😊", "Dream Big 🌟", "Love ❤️",
  "Peace ✌️", "Wealth 💰", "Health 🍎", "Adventure 🌍",
  "Happiness 😄", "Growth 🚀", "Magic ✨"
];

interface ClickEffect {
  id: string;
  x: number;
  y: number;
  word: string;
  color: string;
}

const InteractiveOverlay: React.FC = () => {
  const [effects, setEffects] = useState<ClickEffect[]>([]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const newEffect: ClickEffect = {
      id: generateId(),
      x: e.clientX,
      y: e.clientY,
      word: sample(WORDS),
      color: `hsl(${randomInt(0, 360)}, 80%, 60%)`,
    };

    setEffects((prev) => [...prev, newEffect]);

    // Cleanup after animation
    setTimeout(() => {
      setEffects((prev) => prev.filter((eff) => eff.id !== newEffect.id));
    }, 2000);
  }, []);

  return (
    <div
      className="fixed inset-0 z-30 cursor-pointer"
      onClick={handleClick}
    >
      <AnimatePresence>
        {effects.map((effect) => (
          <React.Fragment key={effect.id}>
            <motion.div
              initial={{ opacity: 0, y: effect.y, x: effect.x, scale: 0.5 }}
              animate={{ opacity: 1, y: effect.y - 100, scale: 1.2 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute pointer-events-none font-bold text-2xl drop-shadow-lg whitespace-nowrap"
              style={{ color: effect.color, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              {effect.word}
            </motion.div>

            <motion.div
              initial={{ opacity: 1, x: effect.x, y: effect.y, scale: 0 }}
              animate={{ opacity: 0, scale: 4 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute pointer-events-none rounded-full border-2"
              style={{
                width: 50,
                height: 50,
                borderColor: effect.color,
                marginLeft: -25, // Center anchor
                marginTop: -25
              }}
            />
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveOverlay;
